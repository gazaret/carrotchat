from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers

from .models import Account

class AccountSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True, required=True)
  confirm_password = serializers.CharField(write_only=True, required=True)

  class Meta:
    model = Account
    fields = (
      'id', 'username', 'date_created', 'date_modified', 'password', 'confirm_password'
    )
    read_only_fields = ('date_created', 'date_modified')

  def create(self, validated_data):
    return Account.objects.create_user(**validated_data)

  def update(self, instance, validated_data):
    instance.username = validated_data.get('username', instance.username)
    password = validated_data.get('password', None)
    confirm_password = validated_data.get('confirm_password', None)

    if password and password == confirm_password:
      instance.set_password(password)

    instance.save()

    return instance

  def validate(self, data):
    if data['password'] != data['confirm_password']:
      raise serializers.ValidationError('Пароли не должны совпадать')

    return data