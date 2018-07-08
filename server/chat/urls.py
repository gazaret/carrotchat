from django.conf.urls import url

from .views import MessageHistory, CommandsList

urlpatterns = [
  url(r'^messages/$', MessageHistory.as_view()),
  url(r'^commands/$', CommandsList.as_view()),
]