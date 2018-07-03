import json
from rest_framework import (
  generics, status
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.contrib.auth import login, authenticate

from .serializers import AccountSerializer
from .models import Account

class AuthRegister(APIView):
  serializer_class = AccountSerializer
  permission_classes = (AllowAny,)

  def post(self, request, format=None):
    serializer = self.serializer_class(data=request.data)

    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)