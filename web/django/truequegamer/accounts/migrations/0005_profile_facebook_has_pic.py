# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2017-07-09 03:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_remove_profile_facebook_short_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='facebook_has_pic',
            field=models.BooleanField(default=False),
        ),
    ]