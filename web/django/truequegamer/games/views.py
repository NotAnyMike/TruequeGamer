#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.contrib.auth.models import User
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from games.serializers import UserSerializer, SuggestionSerializer, GameSerializer, CurrentUserSerializer, DvdSerializer, GameDetailsSerializer, UserProfileSerializer, SingleDvdSerializer
from games.models import Game, Dvd
import constants, utils

def index(req):
    template = 'games/base.html'
    if settings.DEBUG:
        template = 'games/base_dev.html'
    return render(req,  template)

def img(req):
    return redirect('/static/games' + req.path)
class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

@api_view(['GET'])
def CurrentUser(request):
    if request.method == "GET":
        user = request.user
        if user.is_anonymous():
            return HttpResponse("Please log in", status=440);
        else:
            serializer = CurrentUserSerializer(user, many=False)
            return Response(serializer.data)

    else: 
        return HttpResponse('Unauthorized', status=401)

@api_view(['GET'])
def SomeUser(request, username):
    if request.method == 'GET':
        user = User.objects.filter(username=username)
        if user != None:
            user = user[0]

            #Get her dvds
            dvds = Dvd.objects.filter(owner=user)
            #TODO: remove the repeated games

            dvdsSerializer = SingleDvdSerializer(dvds, many=True)
            profileSerializer = UserProfileSerializer(user, many=False)

            return Response({
                'profile' : profileSerializer.data,
                'list' : dvdsSerializer.data,
                })
        else:
            return HttpResponse('Not found', status=404)
    else:
        return HttpResponse('Unauthorized', status=401)

#The POST: Update and the PUT add
@api_view(['GET', 'PUT', 'POST'])
def LocalSuggestions(request, serializerType, console, new, sell, string):
    if request.method == 'GET':
        
        if serializerType != 'game':
            games = Game.objects.filter(name__icontains=string)
            
            #Checking console
            if console == "ps-xbox":
                games = games.filter(Q(availableOnPs=True) | Q(availableOnXbox=True))
                
                #Checking new
                if new == 'both':
                    games = games.filter(Q(xboxNew=True) | Q(psNew=True) | Q(psUsed=True) | Q(xboxUsed=True))
                    print "count: %i" % games.count()
                elif new == 'new':
                    games = games.filter(Q(xboxNew=True) | Q(psNew=True)) 
                elif new == 'used':
                    games = games.filter(Q(psUsed=True) | Q(xboxUsed=True))
                else:
                    return Response('Bad request', status=400)

                #Checking sell
                if sell == 'both':
                    games = games.filter(Q(psPrice__isnull=False) | Q(xboxPrice__isnull=False) | Q(psExchange=True) | Q(xboxExchange=True))
                elif sell == 'sell':
                    games = games.filter(Q(psPrice__isnull=False) | Q(xboxPrice__isnull=False))
                elif sell == 'exchange':
                    games = games.filter(Q(psExchange=True) | Q(xboxExchange=True))
                else:
                    return Response('Bad request', status=400)
                    
            elif console == "ps":
                games = games.filter(availableOnPs=True)

                #Checking new
                if new == 'both':
                    games = games.filter(Q(psNew=True) | Q(psUsed=True))
                elif new == 'new':
                    games = games.filter(psNew=True)
                elif new == 'used':
                    games = games.filter(psUsed=True)
                else:
                    return Response('Bad request', status=400)

                #Checking sell
                if sell == 'both':
                    games = games.filter(Q(psPrice__isnull=False) | Q(psExchange=True))
                elif sell == 'sell':
                    games = games.filter(psPrice__isnull=False)
                elif sell == 'exchange':
                    games = games.filter(psExchange=True)
                else:
                    return Response('Bad request', status=400)
                    
            elif console == "xbox":
                games = games.filter(availableOnXbox=True)

                #Checking new
                if new == 'both':
                    games = games.filter(Q(xboxNew=True) | Q(xboxUsed=True))
                elif new == 'new':
                    games = games.filter(xboxNew=True)
                elif new == 'used':
                    games = games.filter(xboxUsed=True)
                else:
                    return Response('Bad request', status=400)

                #Checking sell
                if sell == 'both':
                    games = games.filter(Q(xboxPrice__isnull=False) | Q(xboxExchange=True))
                elif sell == 'sell':
                    games = games.filter(xboxPrice__isnull=False)
                elif sell == 'exchange':
                    games = games.filter(xboxExchange=True)
                else:
                    return Response('Bad request', status=400)
            else:
                return Response('Bad request', status=400)


            if serializerType == "suggestions":
                games = games[:5]
                serializer = SuggestionSerializer(games, many=True)
            else:
                serializer = GameSerializer(games, many=True)
            
            
            return Response(serializer.data)

        else:
            #Get game
            game = Game.objects.filter(name=string)

            #Get games for that console and with those values
            if game != None:
                game = game[0]

                dvds = Dvd.objects.order_by('owner__pk').filter(game=game) #Needed in order to make the for work as expected
                gameSerializer = GameDetailsSerializer(game, many = False)

                #Create a list of 'games' with the Dvds
                owner = None
                gamesList = []
                for dvd in dvds:
                    if owner == None or owner != dvd.owner:
                        owner = dvd.owner.pk
                        gameFromDvds = Game()

                        gameFromDvds.name = "%s %s" % (dvd.owner.first_name, dvd.owner.last_name)
                        gameFromDvds.cover = utils.get_user_large_profile_pic(dvd.owner)
                        gameFromDvds.xboxOnly = game.xboxOnly
                        gameFromDvds.psOnly = game.psOnly 
                        gameFromDvds.xboxOnlyPrice = True
                        gameFromDvds.psOnlyPrice = True
                        gameFromDvds.availableOnXbox = False
                        gameFromDvds.availableOnPs = False

                        #Adding the game created to a list
                        gamesList.append(gameFromDvds)
                    
                    #Get all the values to create a valid Game object from the dvds for the same user (and the same game)
                    if dvd.console == 'xbox':
                        
                        gameFromDvds.availableOnXbox = True
                        
                        if dvd.price > gameFromDvds.xboxPrice: 
                            if gameFromDvds.xboxPrice != None: #This if must be before the xboxprice = dvd.price
                                gamefromDvds.xboxonlyprice = false
                            gameFromDvds.xboxPrice = dvd.price

                        if dvd.exchange: gameFromDvd.sxboxExchange = True
                        if dvd.new : gameFromDvds.xboxNew = True
                        if dvd.new == False : gameFromDvds.xboxUsed = False
                        
                    else:
                        
                        gameFromDvds.availableOnPs = True
                        
                        if dvd.price > gameFromDvds.psPrice: 
                            if gameFromDvds.psPrice != None: #This if must be before the psprice = dvd.price
                                gamefromDvds.psonlyprice = false
                            gameFromDvds.psPrice = dvd.price

                        if dvd.exchange: gameFromDvds.psExchange = True
                        if dvd.new : gameFromDvds.psNew = True
                        if dvd.new == False : gameFromDvds.psUsed = False


                gamesSerializer = GameSerializer(gamesList, many = True)


                return Response({
                        'game': gameSerializer.data,
                        'list': gamesSerializer.data,
                    })
            else:
                #throw error
                return Response('Bad request', status=400)

    #Update
    elif request.method == 'POST':
        pass
    
    #Add
    elif request.method == 'PUT':
        data = request.data
        new_data = dict((key.encode('utf-8'), value) for key, value in data.items())
        data.update(new_data) #adding data without the unicode encoding on the key's items

        serializer = SingleDvdSerializer(data=data, partial=True)
        #return Response(serializer.initial_data, status=status.HTTP_201_CREATED)
        if serializer.is_valid():
            #Check if the user is logged in
            if True or request.user.is_authenticated():
                #Check if the price is positive
                if request.data['price'] >= 0:
                    #Check if the console is right
                    #if serializer.data.console in list(constants.CONSOLES.values()):
                        #Construct an Dvd Object
                        #Save it
                        #pass
                    pass
            else:
                return Response("unauthorized", status=status.HTTP_401_UNAUTHORIZED)

            
            return Response("ok", status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #Every case in the if ( != "game") has its own return statement, if it comes to here something happened
    else:
        return Response('Unauthorized', status=401)
