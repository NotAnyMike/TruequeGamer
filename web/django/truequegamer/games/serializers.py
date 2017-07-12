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

class UserSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    
    def get_picture(self, user):
        return utils.get_user_large_profile_pic(user)

    def get_location(self, user):
        return utils.get_user_location(user)

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
        if hasattr(user, 'numberOfGames'):
            return user.numberOfGames
        return 0

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'picture', 'city','numberOfGames', 'location')

class CurrentUserSerializer(serializers.ModelSerializer):
    picture = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()
    chat_token = serializers.SerializerMethodField()
    
    def get_picture(self, user):
        return utils.get_user_small_profile_pic(user)

    def get_location(self, user):
        return utils.get_user_location(user)

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
        fields = ('pk', 'name', 'cover', 'psPrice', 'xboxPrice', 'psExchange', 'xboxExchange', 'psExclusive', 'xboxExclusive', 'availableOnPs', 'availableOnXbox', 'psOnlyPrice', 'xboxOnlyPrice')

class GameSerializerWithOwner(GameSerializer):
    username = serializers.SerializerMethodField()

    def get_username(self, game):
        return game.owner.username

    class Meta:
        model = Game
        fields = ('pk', 'name', 'cover', 'psPrice', 'xboxPrice', 'psNew', 'xboxNew', 'psUsed', 'xboxUsed', 'psExchange', 'xboxExchange', 'psExclusive', 'xboxExclusive', 'availableOnPs', 'availableOnXbox', 'psOnlyPrice', 'xboxOnlyPrice', 'username')


class GameDetailsSerializer(serializers.ModelSerializer):
    higher_prices = serializers.SerializerMethodField()
    min_price = serializers.SerializerMethodField()

    def get_min_price(self, instance):
        if instance.psPrice != None and instance.xboxPrice != None:
            if instance.psPrice > instance.xboxPrice:
                return instance.xboxPrice
            else:
                return instance.psPrice
        elif instance.psPrice != None: return instance.psPrice
        elif instance.xboxPrice != None: return instance.xboxPrice
        return None

    def get_higher_prices(self, instance):
        toReturn = False
        if instance.psPrice > 0 and instance.psOnlyPrice == False:
            toReturn = True
        elif instance.xboxPrice > 0 and instance.xboxOnlyPrice == False:
            toReturn = True
        elif instance.xboxPrice > 0 and instance.psPrice > 0 and instance.xboxPrice != instance.psPrice:
            toReturn = True

        return toReturn

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
        fields = ('pk', 'name', 'cover', 'psPrice', 'xboxPrice', 'psExchange', 'xboxExchange', 'psExclusive', 'xboxExclusive', 'availableOnPs', 'availableOnXbox', 'psOnlyPrice', 'xboxOnlyPrice')

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
