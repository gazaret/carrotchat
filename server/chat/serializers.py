from rest_framework import serializers

from accounts.serializers import AccountSerializer
from .models import Messages


class MessagesSerializer(serializers.ModelSerializer):
    account = AccountSerializer()

    class Meta:
        model = Messages
        fields = ('account', 'message', 'created', 'updated')
        read_only_fields = ('account', 'message', 'created', 'updated')
