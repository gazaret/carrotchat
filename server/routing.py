from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter

import chat.routing
from chat.middleware import AuthJWTMiddleware

application = ProtocolTypeRouter({
  'websocket': AuthJWTMiddleware(
    URLRouter(
      chat.routing.websocket_urlpatterns
    )
  )
})