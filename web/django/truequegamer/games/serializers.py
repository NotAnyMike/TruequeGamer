from rest_framework import serializers
from django.contrib.auth.models import User
import urllib, json, logging

from .models import Game
from chat.models import UserAuth

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("games.serializers")

url = "https://graph.facebook.com/10153958248812809?fields=picture,location&access_token=EAAMFSTFTluYBACRT4t1ZALRsQZA2LsoRIJeEWFmeZBIuDPguZAXGXbpSt3zHFZCdJAFRzs4qsi2yH8jcdXq7zlc9PNkMfMTKyBv9po84wfspRE8uRQM3ky2fodYZA17cvF4mwXt3eKeqcwgWkRrNZBH7UIDYFSSNEzZCSQY0U85z8gG8D4ZBsl993"
response = urllib.urlopen(url)
data = json.load(response)
print data

class UserSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    
    def get_picture(self, user):
        return data['picture']['data']['url']

    def get_location(self, user):
        return data['location']['name']

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'picture')

class CurrentUserSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    chat_token = serializers.SerializerMethodField()
    
    def get_picture(self, user):
        return data['picture']['data']['url']

    def get_location(self, user):
        return data['location']['name']

    def get_chat_token(self, instance):
        tokenToReturn = ""
        try:
            userAuth = UserAuth.objects.get(user = instance)
        except UserAuth.DoesNotExist:
            logger.error("user with pk {0} has no UserAuth".format(instance.pk))
            userAuth = None

        if userAuth != None :
            tokenToReturn = userAuth.access_token

        return tokenToReturn

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'picture', 'location', 'chat_token')

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('pk', 'name', 'cover', 'psPrice', 'xboxPrice', 'psExchange', 'xboxExchange', 'psOnly', 'xboxOnly', 'availableOnPs', 'availableOnXbox', 'psOnlyPrice', 'xboxOnlyPrice')
        
class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('name',)
