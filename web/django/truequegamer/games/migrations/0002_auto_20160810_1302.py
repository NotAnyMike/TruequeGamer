# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-10 13:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='psPrice',
            field=models.IntegerField(default=None),
        ),
    ]
