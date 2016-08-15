from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models

import urllib2
import urllib
import json
import logging

import constants
import token

class UserAuth(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=300, null=False, blank=False)
    last_update = models.DateTimeField(auto_now=True)

def save_user(instance, access_token):
    instanceToSave = UserAuth(user = instance, access_token = jsonInfo['access_token'])
    instanceToSave.save()

def get_name(instance):
    toReturn = ""
    if(instance.first_name != "" or instance.last_name != ""):
        toReturn = "{0} {1}".format(instance.first_name, instance.last_name)
    else:
        toReturn = "unknown"
    return toReturn

@receiver(post_save, sender=User)
def create_auth(sender, instance, created, **kwargs):
    headers = {'Api-Token' : token.API_TOKEN}
    values = {
        "user_id" : instance.pk,
        "nickname" : get_name(instance),
        "profile_url" : "",
        "issue_access_token" : True
    }
    data = json.dumps(values)
    request = urllib2.Request(constants.API_CREATE_USER_URL, data, headers)
    try:
        response = urllib2.urlopen(request)
        
        #save the token
        info = response.read()
        jsonInfo = json.loads(info)
        save_user(instance, jsonInfo['access_token'])
    except urllib2.HTTPError as e:
        jsonData = json.loads(e.read())
        errorCode = jsonData['code']
        if errorCode == 400201:
            #User exists then update it
            values = {
                "nickname" : get_name(instance),
                "profile_url" : "",
                "issue_access_token" : True
            }
            data = json.dumps(values)
            request = urllib2.Request("{0}/{1}".format(constants.API_CREATE_USER_URL, instance.pk), data, header)
            try:
                response = urllib2.urlopen(request)

                #save the token
                info = response.read()
                jsonInfo = json.loads(info)
                save_user(instance, jsonInfo['access_token'])
            except urllib2.HTTPError as e:
                print e.code
                print e.read()
                logger = logging.getLogger("updating user")
                logger.error('Error while updating user, some error ... code: {0}, error: {1}'.format(e.code, e.read())
        else:
            pass
            #logger = logging.getLogger("creating user")
            #logger.error('Error while creating user, some error different from "user already exists" found ... code: {0}, error: {1}'.format(e.code, e.read())
