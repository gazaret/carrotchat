from django.conf.urls import url

from .views import (
  AccountRegister,
  AccountAuthorization
)

urlpatterns = [
  url(r'^login/$', AccountAuthorization.as_view()),
  url(r'^registration/$', AccountRegister.as_view())
]
