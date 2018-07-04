from django.db import models
from accounts.models import Account

class Messages(models.Model):
  account = models.ForeignKey(Account, default=None, on_delete=models.CASCADE)
  message = models.TextField(max_length=3000)
  created = models.DateTimeField(auto_now_add=True)
  updated = models.DateTimeField(auto_now=True)