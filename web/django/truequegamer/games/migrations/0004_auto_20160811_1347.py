# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2016-08-11 13:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0003_auto_20160810_1321'),
    ]

    operations = [
        migrations.AddField(
            model_name='game',
            name='psNew',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='game',
            name='psUsed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='game',
            name='xboxNew',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='game',
            name='xboxUsed',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='game',
            name='psPrice',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
        migrations.AlterField(
            model_name='game',
            name='xboxPrice',
            field=models.IntegerField(blank=True, default=None, null=True),
        ),
    ]
