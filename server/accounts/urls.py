from django.conf.urls import include, url
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

from .views import AuthRegister

urlpatterns = [
  url(r'^login/$', obtain_jwt_token),
  url(r'^registration/$', AuthRegister.as_view())
]
