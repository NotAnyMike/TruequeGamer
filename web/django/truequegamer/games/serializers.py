from rest_framework import serializers
from django.contrib.auth.models import User
import urllib, json, logging

from .models import Game
from chat.models import UserAuth

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("games.serializers")

url = "https://graph.facebook.com/10153958248812809?fields=picture,location&access_token=EAAMFSTFTluYBAGZC6L4IaRSAORMFcrreGPArUL9t5viSYR44sjNKNbV3ZC8miPv2hMLLZB19ZAs8dBbyGxSvEUzeXE6pyPdVha2WkI7DOIoYcTJ5uuDh9oDr1hnKc5B4A2AXMYXZCzjhxyaR7stUL1FXr3zXvCqsZD"
response = urllib.urlopen(url)
data = json.load(response)

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

class SearchUsersSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()

    def get_picture(self, user):
        return data['picture']['data']['url']

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
