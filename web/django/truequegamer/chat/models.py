from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.contrib.auth.signals import user_logged_in
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models

import json, requests, logging, datetime, pytz

from games import utils
import constants, token

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("chat.models")

################## user logged signal ##################

def check_token(sender, request, user, **kwargs):
    userAuth = None
    try:
        userAuth = UserAuth.objects.get(user = user)
    except UserAuth.DoesNotExist:
        logger.error('Error while trying to update the chat token for a user that just signed in')
    if userAuth != None:
        #Check last update
        utc=pytz.UTC
        dateNow = datetime.datetime.now()
        timeNowNormalized = dateNow.replace(tzinfo=utc)
        timeNormilized = userAuth.last_update.replace(tzinfo=utc)
        timeNowNormalized -= timeNormilized

        if timeNowNormalized.days >= 1 :
            #Update token
            create_auth_function(user)
        else:
            #Do nothing
            pass
    else:
        create_auth_function(user)

user_logged_in.connect(check_token)

########################################################

class UserAuth(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    access_token = models.CharField(max_length=300, null=False, blank=False)
    last_update = models.DateTimeField(auto_now=True)

def save_user(instance, access_token):
    if instance.pk == None: 
        instanceToSave = UserAuth(user = instance, access_token = access_token)
    else:
        instanceToSave = None
        try:
            instanceToSave = UserAuth.objects.get(user = instance)
        except UserAuth.DoesNotExist:
            logger.error("Error")
        if instanceToSave == None :
            instanceToSave = UserAuth(user= instance, access_token = access_token)
        instanceToSave.access_token = access_token
    instanceToSave.save()

def get_name(instance):
    toReturn = ""
    if(instance.first_name != "" or instance.last_name != ""):
        toReturn = "{0} {1}".format(instance.first_name, instance.last_name)
    else:
        toReturn = "unknown"
    return toReturn

#@receiver(post_save, sender=User)
#def create_auth(sender, instance, created, **kwargs):
#    create_auth_function(instance)
    
def create_auth_function(instance):
    errorCode = 0;
    headers = {'Api-Token' : token.API_TOKEN}
    nickname = get_name(instance) 
    pic = utils.get_user_small_profile_pic(instance)
    values = {
        "user_id" : instance.pk,
        "nickname" : nickname,
        "profile_url" : pic,
        "issue_access_token" : True
    }
    data = json.dumps(values)
    request = requests.post(constants.API_CREATE_USER_URL, data=None, json=values, headers=headers)
    if request.status_code < 400 : 
        jsonInfo = json.loads(request.content)
        save_user(instance, jsonInfo['access_token'])
    else:
        jsonData = json.loads(request.content)
        errorCode = jsonData['code']
        print jsonData
 
        if errorCode == 400202:
            #User exists then update it
            values = {
                "nickname" : get_name(instance),
                "profile_url" : pic,
                "issue_access_token" : True
            }
            data = json.dumps(values)
            request = requests.put("{0}/{1}".format(constants.API_CREATE_USER_URL,instance.pk), data= data, headers=headers)
            if request.status_code < 400:
                jsonInfo = json.loads(request.content)
                save_user(instance, jsonInfo['access_token'])
            else:
                errorMsg = "Error while updating user, some error ... code: {0}, error: {1}".format(request.status_code, request.content)
                logger.error(errorMsg)
            
        elif errorCode != 0:
            
            errorMsg = 'Error while creating user, some error different from "user already exists" found ... code: {0}, error: {1}'.format(errorCode, jsonData)
            logger.error(errorMsg)
