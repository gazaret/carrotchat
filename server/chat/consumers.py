import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from accounts.models import Account
from .models import Messages

class ChatConsumer(WebsocketConsumer):
  def connect(self):
    # TODO: сделать различные группы
    self.room_name = 'general'
    self.room_group_name = 'chat_' + self.room_name

    if self.scope['user'] is None:
      return self.close(code=403)

    self.account = self.scope['user']
    self.username = self.account.get_username()

    async_to_sync(self.channel_layer.group_add)(
      self.room_group_name,
      self.channel_name
    )

    self.accept()

  def disconnect(self, close_code):
    async_to_sync(self.channel_layer.group_discard)(
      self.room_group_name,
      self.channel_name
    )

  # Обработчик сообщений
  def receive(self, text_data):
    text_json = json.loads(text_data)
    message = text_json['message']

    model = Messages(account=self.account, message=message)
    model.save()

    # Отправляем сообщение в группу
    async_to_sync(self.channel_layer.group_send)(
      self.room_group_name,
      {
        'type': 'chat_message',
        'message': message,
        'username': self.username
      }
    )

  # Слушатель события chat_message
  def chat_message(self, event):
    message = event['message']
    username = event['username']

    self.send(text_data=json.dumps({
      'message': message,
      'username': username
    }))