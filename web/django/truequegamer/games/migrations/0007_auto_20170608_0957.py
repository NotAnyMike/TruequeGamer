# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2017-06-08 09:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0006_auto_20170608_0950'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dvd',
            name='exchange',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='dvd',
            name='new',
            field=models.BooleanField(default=False),
        ),
    ]
