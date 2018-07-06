from django.conf.urls import url

from .views import MessageHistory

urlpatterns = [
  url(r'^messages/$', MessageHistory.as_view()),
]