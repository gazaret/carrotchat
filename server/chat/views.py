from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import MessagesSerializer
from .models import Messages


class MessageHistory(APIView):
    serializer_class = MessagesSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, format=None):
        queryset = Messages.objects.order_by("-created")[:10]
        serializer = self.serializer_class(queryset, many=True)
        messages = reversed(serializer.data)

        return Response({
            'status': True,
            'messages': messages
        }, status=status.HTTP_200_OK)
