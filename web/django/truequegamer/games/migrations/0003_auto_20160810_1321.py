# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-10 13:21
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0002_auto_20160810_1302'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='psPrice',
            field=models.IntegerField(default=None, null=True),
        ),
    ]
