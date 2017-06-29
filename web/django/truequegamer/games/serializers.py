#!/usr/bin/env python
# -*- coding: utf-8 -*-
from rest_framework import serializers
from django.contrib.auth.models import User
import urllib, json, logging

from .models import Game, Dvd
from chat.models import UserAuth

import constants,utils

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("games.serializers")

url = "https://graph.facebook.com/me?fields=id,name,first_name,last_name,picture,location&access_token=%s" % constants.FB_ACCESS_TOKEN

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
        fields = ('id', 'username', 'first_name', 'last_name', 'picture',)

class UserProfileSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    city = serializers.SerializerMethodField()
    numberOfGames = serializers.SerializerMethodField()

    def get_picture(self, user):
        return utils.get_user_large_profile_pic(user)

    def get_location(self, user):
        return utils.get_user_location(user)

    def get_city(self, user):
        return "bogota" #TODO: correct this bullshit, location and city? wtf?

    def get_numberOfGames(self, user):
        return "4" #TODO: return the real value

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'picture', 'city','numberOfGames', 'location')

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

class GameSerializerWithOwner(GameSerializer):
    username = serializers.SerializerMethodField()

    def get_username(self, game):
        return game.owner.username

    class Meta:
        model = Game
        fields = ('pk', 'name', 'cover', 'psPrice', 'xboxPrice', 'psExchange', 'xboxExchange', 'psOnly', 'xboxOnly', 'availableOnPs', 'availableOnXbox', 'psOnlyPrice', 'xboxOnlyPrice', 'username')


class GameDetailsSerializer(serializers.ModelSerializer):
    higher_prices = serializers.SerializerMethodField()
    min_price = serializers.SerializerMethodField()

    def get_min_price(self, instance):
        return 13000

    def get_higher_prices(self, instance):
        return True

    class Meta:
        model = Game
        fields = ('pk','name','min_price','higher_prices','cover','availableOnPs','availableOnXbox')
        
class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('name',)

class DvdSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    cover = serializers.SerializerMethodField()
    psPrice = serializers.SerializerMethodField()
    xboxPrice = serializers.SerializerMethodField()
    psExchange = serializers.SerializerMethodField()

    class Meta:
        model = Dvd
        fields = ('pk', 'name', 'cover', 'psPrice', 'xboxPrice', 'psExchange', 'xboxExchange', 'psOnly', 'xboxOnly', 'availableOnPs', 'availableOnXbox', 'psOnlyPrice', 'xboxOnlyPrice')

class SingleDvdSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    cover = serializers.SerializerMethodField()
    used = serializers.SerializerMethodField()

    def get_name(self, dvd):
        return dvd.game.name

    def get_cover(self, dvd):
        return dvd.game.cover

    def get_used(self, dvd):
        return not dvd.new

    class Meta:
        model = Dvd
        fields = ('pk', 'name', 'cover', 'price', 'exchange', 'used', 'console', 'comment')
        #validators = [] 
