# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2017-06-29 22:51
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('games', '0012_auto_20170629_1422'),
    ]

    operations = [
        migrations.AddField(
            model_name='dvd',
            name='state',
            field=models.CharField(choices=[(b'available', b'available'), (b'sold', b'sold'), (b'exchanged', b'exchanged')], default=b'available', max_length=30),
        ),
    ]
