from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=30, blank=True)
    facebook_id = models.CharField(max_length=10, blank=False, unique=True, null=False)
    facebook_about = models.TextField(max_length=500, blank=True, unique=False, null=True, default=None)
    facebook_short_name = models.CharField(max_length=20, blank=True, unique=False, null=True, default=None)
