from django.db import models

class Messages(models.Model):
  owner = models.IntegerField()
  message = models.TextField()
  date = models.DateTimeField()