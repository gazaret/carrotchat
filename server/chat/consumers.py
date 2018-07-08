import json
import time
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

from .models import Messages, Commands, OnlineUsers
from .serializers import CommandSerializer, OnlineUsersSerializer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        commands = Commands.objects.all()
        serialized_commands = CommandSerializer(commands, many=True)
        self.commands = serialized_commands.data

        # TODO: сделать различные группы
        self.room_name = 'general'
        self.room_group_name = 'chat_' + self.room_name

        if self.scope['user'] is None:
            return self.close(code=403)

        self.account = self.scope['user']
        self.username = self.account.get_username()

        self.set_online_user()

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        self.set_offline_user()

        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Обработчик сообщений
    def receive(self, text_data):
        text_json = json.loads(text_data)
        type = text_json['type']

        actions = {
            'chat_message': self.chat_message_action,
            'chat_command': self.chat_command_action
        }

        actions[type](text_json)

    def chat_message_action(self, message_data):
        model = Messages(account=self.account, message=message_data['message'])
        model.save()

        created = int(model.created.timestamp()) * 1000

        # Отправляем сообщение в группу
        async_to_sync(self.channel_layer.group_send)(
          self.room_group_name,
          {
            'type': 'chat_message',
            'message': message_data['message'],
            'username': self.username,
            'created': created
          }
        )

    def chat_command_action(self, command_data):
        current_command = None

        for command in self.commands:
            if command['command'] == command_data['command']:
                current_command = dict(command)

        if current_command is None:
            return

        async_to_sync(self.channel_layer.group_send)(
          self.room_group_name,
          {
            'type': current_command['action'],
            'username': self.username,
          }
        )

    # Слушатель события chat_message
    def chat_message(self, event):
        message = event['message']
        username = event['username']
        created = event['created']

        self.send(text_data=json.dumps({
            'message': message,
            'username': username,
            'created': created,
        }))

    def command_who_action(self, event):
        username = event['username']

        online_users_raw = OnlineUsers.objects.filter(is_online=True)
        serialized_users = OnlineUsersSerializer(online_users_raw, many=True)

        online_users = serialized_users.data

        usernames = 'Сейчас онлайн: '

        for user in online_users:
            usernames += user['account']['username'] + ', '

        created = int(time.time()) * 1000

        self.send(text_data=json.dumps({
            'message': usernames,
            'username': username,
            'created': created,
        }))

    def set_online_user(self):
        self.change_online_user(True)

    def set_offline_user(self):
        if self.account:
            self.change_online_user(False)

    def change_online_user(self, is_online):
        try:
            online_user = OnlineUsers.objects.get(account_id=self.account.id)
            online_user.is_online = is_online
            online_user.save()

        except Exception as e:
            model = OnlineUsers(is_online=is_online, account_id=self.account.id)
            model.save()
