from rest_framework import serializers

from accounts.serializers import AccountSerializer
from .models import Messages, Commands, OnlineUsers


class MessagesSerializer(serializers.ModelSerializer):
    account = AccountSerializer()

    class Meta:
        model = Messages
        fields = ('account', 'message', 'created', 'updated')
        read_only_fields = ('account', 'message', 'created', 'updated')


class CommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commands
        fields = ('command', 'action')
        read_only_fields = ('command', 'action')


class OnlineUsersSerializer(serializers.ModelSerializer):
    account = AccountSerializer()

    class Meta:
        model = OnlineUsers
        fields = ('account', 'is_online')
        read_only_fields = ('account', 'is_online')
