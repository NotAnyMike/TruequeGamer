from rest_framework import serializers
from django.contrib.auth.models import User
import urllib, json

from .models import Game

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
        fields = ('id', 'username', 'first_name', 'last_name', 'picture', 'location')

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('pk', 'name', 'cover', 'psPrice', 'xboxPrice', 'psExchange', 'xboxExchange', 'psOnly', 'xboxOnly', 'availableOnPs', 'availableOnXbox', 'psOnlyPrice', 'xboxOnlyPrice')
        
class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('name',)
