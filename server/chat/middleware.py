from django.db import close_old_connections
from accounts.models import Account
from rest_framework_jwt.settings import api_settings

class AuthJWTMiddleware:
  def __init__(self, inner):
    self.inner = inner

  def __call__(self, scope):
    headers = dict(scope['headers'])
    token = None
    user = None

    if b'cookie' in headers:
      print(headers[b'cookie'].decode())
      token = headers[b'cookie'].decode()[6:]

    if token:
      try:
        user_id = self.get_user_id(token)
        user = Account.objects.get(id=user_id)
      except Exception as e:
        print('user not found')

    close_old_connections()

    return self.inner(dict(scope, user=user))

  def get_user_id(self, token):
    jwt_decode_handler = api_settings.JWT_DECODE_HANDLER

    token_data = jwt_decode_handler(token)
    return token_data['user_id']
