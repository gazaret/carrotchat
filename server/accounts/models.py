from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

class AccountManager(BaseUserManager):
  def create_user(self, password=None, **kwargs):
    if not kwargs.get('username'):
      raise ValueError('Username validation error')

    account = self.model(
      username=kwargs.get('username')
    )

    account.set_password(password)
    account.save()

    return account

  def create_superuser(self, password=None, **kwargs):
    account = self.create_user(password, kwargs)

    account.is_admin = True
    account.save()

    return account

class Account(AbstractBaseUser):
  username = models.CharField(unique=True, max_length=30)

  date_created = models.DateTimeField(auto_now_add=True)
  date_modified = models.DateTimeField(auto_now=True)

  is_admin = models.BooleanField(default=False)

  objects = AccountManager()

  USERNAME_FIELD = 'username'
  REQUIRED_FIELDS = ['username']

