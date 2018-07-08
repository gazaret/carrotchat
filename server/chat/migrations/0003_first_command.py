# Generated by Django 2.0.7 on 2018-07-08 08:42

from django.db import migrations


def first_command(apps, schema_editor):
    Commands = apps.get_model('chat', 'Commands')
    command = Commands(command='/who', action='command_who_action')
    command.save()


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_commands'),
    ]

    operations = [
        migrations.RunPython(first_command),
    ]