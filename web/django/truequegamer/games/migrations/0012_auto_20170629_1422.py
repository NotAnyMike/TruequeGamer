# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2017-06-29 14:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0011_auto_20170625_0206'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dvd',
            name='comment',
            field=models.TextField(blank=True, default='', max_length=500),
        ),
    ]
