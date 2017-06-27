from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.signals import user_logged_in

import urllib, json, logging

from games import constants as Constants

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    facebook_id = models.CharField(max_length=10, blank=False, unique=True, null=True)
    facebook_location = models.CharField(max_length=30, blank=True)
    facebook_location_id = models.CharField(max_length=20, blank=True, null=True, default=None)
    facebook_about = models.TextField(max_length=500, blank=True, unique=False, null=True, default=None)


@receiver(post_save, sender=User)
def createUserProfile(sender, instance, created, **kwargs):
    
    if created or hasattr(instance, 'profile') == False:
        Profile.objects.create(user=instance)

def saveUserProfile(sender, user, **kwargs): 

    url = "https://graph.facebook.com/me?fields=id,name,email,first_name,last_name,picture,location,about&access_token=%s" % Constants.FB_ACCESS_TOKEN

    response = urllib.urlopen(url)
    data = json.load(response)

    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.email = data['email']

    user.profile.facebook_id = data['id']
    if 'location' in data: 
        user.profile.facebook_location = data['location']['id']
        user.profile.facebook_location_id = data['location']['name']
    if 'about' in data: user.profile.facebook_about = data['about']

    user.profile.save()
    user.save()

user_logged_in.connect(saveUserProfile)