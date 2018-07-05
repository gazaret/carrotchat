import json
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_jwt.settings import api_settings

from .serializers import AccountRegistrationSerializer
from .models import Account

def get_token(account):
  jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
  jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

  payload = jwt_payload_handler(account)
  token = jwt_encode_handler(payload)

  return token

class AccountRegister(APIView):
  serializer_class = AccountRegistrationSerializer
  permission_classes = (AllowAny,)

  def post(self, request, format=None):
    serializer = self.serializer_class(data=request.data)

    if serializer.is_valid():
      serializer.save()

      username = request.data['username']
      account = Account.objects.get(username=username)
      token = get_token(account)

      response = Response({
        'status': True,
        'username': username,
        'token': token,
      })
      response.set_cookie('token', token)
      return response

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AccountAuthorization(APIView):
  permission_classes = (AllowAny,)

  def post(self, request, format=None):
    try:
      username = request.data['username']
      password = request.data['password']

      account = Account.objects.get(username=username)
      is_correct_password = account.check_password(password)
    except Exception as e:
      return Response({
        'status': False,
        'message': 'Неизвестный аккаунт. Зарегистрируемся?'
      }, status=status.HTTP_400_BAD_REQUEST)

    if account and is_correct_password:
      token = get_token(account)

      response = Response({
        'status': True,
        'username': username,
        'token': token,
      })
      response.set_cookie('token', token)
      return response

    return Response({
      'status': False,
      'message': 'Неверный логин или пароль'
    }, status=status.HTTP_400_BAD_REQUEST)