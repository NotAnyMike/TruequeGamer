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
from django.core.exceptions import ObjectDoesNotExist

import urllib2,json,re

from games.serializers import UserSerializer, SuggestionSerializer, GameSerializer, CurrentUserSerializer, DvdSerializer, GameDetailsSerializer, UserProfileSerializer, SingleDvdSerializer, GameSerializerWithOwner
from games.models import Game, Dvd, Bug
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

@api_view(['PUT'])
def AddBug(request):
    if request.method == 'PUT':
        data = request.data
        newData = dict((key.encode('utf-8'), value) for key, value in data.items())
        data = newData

        if('comment' in data.keys() and data['comment'] != "" and data['comment'] != None):

            user = None
            if('user_id' in data and data['user_id'] != None): 
                user = User.objects.get(pk=data['user_id'])

            bug = Bug(user=user, comment=data['comment'])
            bug.save()

            return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)

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
            dvds = Dvd.objects.filter(owner=user).filter(state=constants.STATE['available']).order_by('-game__score', 'game__name')
            #TODO: remove the repeated games

            dvdsSerializer = SingleDvdSerializer(dvds, many=True)
            
            user.numberOfGames = len(dvds)
            profileSerializer = UserProfileSerializer(user, many=False)

            return Response({
                'profile' : profileSerializer.data,
                'list' : dvdsSerializer.data,
                })
        else:
            return HttpResponse('Not found', status=404)
    else:
        return HttpResponse('Unauthorized', status=401)

@api_view(['GET'])
def GetListOfGames(request,console,string):
    if request.method == 'GET':
        response = utils.get_list_from_IGDB(console,string)
        
        response_str = response.read()
        if response.getcode() >= 200 and response.getcode() < 300: 
            return Response(json.loads(response_str), status=status.HTTP_200_OK)

    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE', 'PATCH'])
def DeleteDvd(request, id_of_game):
    if request.user.is_authenticated():
        if request.method in ('DELETE','PATCH'):
            dvd = Dvd.objects.get(pk=id_of_game)
            if request.user.pk == dvd.owner.pk:

                if request.method == 'DELETE':
                    dvd.state = constants.STATE['deleted']
                elif request.method == 'PATCH':
                    if request.data[u'type'] == constants.STATE['exchanged']:
                        dvd.state = constants.STATE['exchanged']
                    if request.data[u'type'] == constants.STATE['sold']:
                        dvd.state = constants.STATE['sold']

                dvd.save()
                return Response(status=status.HTTP_200_OK)
    
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def DvdApi(request):
    #Add
    if request.method == 'PUT':
        data = request.data
        newData = dict((key.encode('utf-8'), value) for key,value in data.items())
        newData2 = dict((key, re.sub(r'\s+','',str(value)) if value != None else None) for key,value in newData.items())
        newData2['comment'] = re.sub(r'(^\s+)|(\s+$)', '', str(newData['comment'])) if newData['comment'] != None else ""
        newData2['price'] = None if newData2['price'] == "" else newData2['price']
        newData2['used'] = False if newData2['used'] == "False" else True
        data = newData2
        
        data['console'] = constants.CONSOLES['xbox']
        if 'ps' in data:
            if data['ps'].lower() == 'true':
                data['console'] = constants.CONSOLES['ps']

        #Check if the user is logged in
        serializer = SingleDvdSerializer(data=data, partial=True)
        if request.user.is_authenticated() and serializer.is_valid():
            #Check if the price is positive
            if data['price'] == None or data['price'] >= 0:
                #Check if the console is right
                if data['console'] in list(constants.CONSOLES.values()):
                    #Construct an Dvd Object
                    #Get the game with the id field
                    #Get the game from IGDB
                    
                    dvdToSave = None
                    game = None

                    if 'id' in data and data['id'] != None:
                        #Get dvd
                        dvdToSave = Dvd.objects.get(pk=int(data['id']))
                        if dvdToSave.owner.pk != request.user.pk:
                            dvdToSave = None

                    #Create variables for the next if
                    idOfGameDifferent = nameOfGameDifferent = consoleOfGameDifferent = False
                    idOfGameExists = 'idOfGame' in data and data['idOfGame'] != None 

                    if(dvdToSave != None and idOfGameExists):
                        if (dvdToSave.game.pk != data['idOfGame']):
                            idOfGameDifferent = True
                        if ('name' in data and data['name'] != None and data['name'].replace(' ', '') != "" and data['name'] != dvdToSave.game.name):
                            nameOfGameDifferent = True
                        if ('console' in data and data['console'] and data['console'] != dvdToSave):
                            consoleOfGameDifferent = True
                    somethingIsDifferent = idOfGameDifferent or nameOfGameDifferent or consoleOfGameDifferent
                        
                    if dvdToSave == None or somethingIsDifferent:
                        #get game
                        try:
                            if 'idOfGame' in data and data['idOfGame'] != None:
                                game = Game.objects.get(id_igdb=data['idOfGame'])
                        except ObjectDoesNotExist:
                            pass

                        if game == None and idOfGameExists:
                            resp = utils.get_list_from_IGDB(console=data['console'], string="", id_of_game= data['idOfGame'])
                
                            if resp.getcode() >= 200 and resp.getcode() <300:
                                #Try to get the game
                                resp_str = resp.read()
                                json_resp = json.loads(resp_str)
                                json_resp = dict((key.encode('utf-8'), value) for key, value in json_resp[0].items())
                                cover = str(json_resp['cover']['url'])
                                cover = cover.replace('//','https://')
                                cover = cover.replace(constants.IGDB_API['cover']['default'], constants.IGDB_API['cover']['big'])

                                psExclusive = False
                                xboxExclusive = False

                                if len(filter(lambda item : item['platform'] == int(constants.IGDB_API['consoles']['xbox']), json_resp['release_dates'])) == 0:
                                    psExclusive = True
                                    xboxExclusive = False

                                if len(filter(lambda item : item['platform'] == int(constants.IGDB_API['consoles']['ps']), json_resp['release_dates'])) == 0:
                                    xboxExclusive = True
                                    psExclusive = False

                                game = Game(
                                    name= json_resp['name'],
                                    cover = cover,
                                    score = json_resp['popularity'],
                                    id_igdb = json_resp['id'],
                                    slug = json_resp['slug'],
                                    psExclusive = psExclusive,
                                    xboxExclusive = xboxExclusive
                                    )
                                game.save()

                    #if game is to create
                    if dvdToSave is None and game is not None:
                        data['new'] = not data['used']
                        dvdToSave = Dvd(
                                price = data['price'],
                                exchange = data['exchange'],
                                new = data['new'],
                                owner = request.user,
                                game = game,
                                console = data['console'],
                                comment = data['comment'],
                                )
                        #Save it
                        dvdToSave.save()
                        serializer = SingleDvdSerializer(dvdToSave)
                        return Response(serializer.data, status=status.HTTP_201_CREATED)
                    elif dvdToSave is not None:
                        #update dvd
                        changed = False
                        if game is not None:
                            dvdToSave.game = game
                            changed = True
                        if data['price'] != dvdToSave.price:
                            dvdToSave.price = data['price']
                            changed = True
                        if data['console'] != dvdToSave.console:
                            dvdToSave.console = data['console']
                            changed = True
                        if data['exchange'] != str(dvdToSave.exchange):
                            dvdToSave.exchange = not dvdToSave.exchange
                            changed = True
                        if data['used'] == str(dvdToSave.new):
                            dvdToSave.new = not dvdToSave.new
                            changed = True
                        if data['comment'] != dvdToSave.comment:
                            dvdToSave.comment = data['comment']
                            changed = True
                        
                        if changed: dvdToSave.save()
                        serializer = SingleDvdSerializer(dvdToSave)
                        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
                

        else:
            return Response("unauthorized", status=status.HTTP_401_UNAUTHORIZED)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    else:
        return Response('Unauthorized', status=401)

#The POST: Update and the PUT add
@api_view(['GET'])
def LocalSuggestions(request, serializerType, console, new, sell, string):
    if request.method == 'GET':
        
        if serializerType != 'game':
            games = Game.objects.filter(name__icontains=string).order_by('-score', 'name')
            
            #Checking console
            if console == "ps-xbox":
                games = games.filter(Q(availableOnPs=True) | Q(availableOnXbox=True))
                
                #Checking new
                if new == 'both':
                    games = games.filter(Q(xboxNew=True) | Q(psNew=True) | Q(psUsed=True) | Q(xboxUsed=True))
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

                dvds = Dvd.objects.order_by('owner__pk').filter(state=constants.STATE['available']).filter(game=game).order_by('-game__score','game__name') #Needed in order to make the for work as expected
                gameSerializer = GameDetailsSerializer(game, many = False)

                #Create a list of 'games' with the Dvds
                ownerPk = None
                gamesList = []
                for dvd in dvds:
                    if ownerPk == None or ownerPk != dvd.owner.pk:
                        ownerPk = dvd.owner.pk
                        gameFromDvds = Game()

                        gameFromDvds.name = "%s %s" % (dvd.owner.first_name, dvd.owner.last_name)
                        gameFromDvds.cover = utils.get_user_large_profile_pic(dvd.owner)
                        gameFromDvds.xboxExclusive = game.xboxExclusive
                        gameFromDvds.psExclusive = game.psExclusive 
                        gameFromDvds.xboxOnlyPrice = True
                        gameFromDvds.psOnlyPrice = True
                        gameFromDvds.availableOnXbox = False
                        gameFromDvds.availableOnPs = False
                        gameFromDvds.owner = dvd.owner
                        gameFromDvds.pk = ownerPk

                        #Adding the game created to a list
                        gamesList.append(gameFromDvds)
                    
                    #Get all the values to create a valid Game object from the dvds for the same user (and the same game)
                    if dvd.console == 'xbox':
                        
                        gameFromDvds.availableOnXbox = True
                        
                        if dvd.price < gameFromDvds.xboxPrice or (dvd.price != None and gameFromDvds.xboxPrice == None):
                            if gameFromDvds.xboxPrice != None: #This if must be before the xboxprice = dvd.price
                                gameFromDvds.xboxOnlyPrice = False
                            gameFromDvds.xboxPrice = dvd.price

                        if dvd.exchange: gameFromDvds.xboxExchange = True
                        if dvd.new : gameFromDvds.xboxNew = True
                        if dvd.new == False : gameFromDvds.xboxUsed = True
                        
                    else:
                        
                        gameFromDvds.availableOnPs = True
                        
                        if dvd.price < gameFromDvds.psPrice or (dvd.price != None and gameFromDvds.psPrice == None):
                            if gameFromDvds.psPrice != None: #This if must be before the psprice = dvd.price
                                gameFromDvds.psOnlyPrice = False
                            gameFromDvds.psPrice = dvd.price

                        if dvd.exchange: gameFromDvds.psExchange = True
                        if dvd.new : gameFromDvds.psNew = True
                        if dvd.new == False : gameFromDvds.psUsed = True


                gamesSerializer = GameSerializerWithOwner(gamesList, many = True)


                return Response({
                        'game': gameSerializer.data,
                        'list': gamesSerializer.data,
                    })
            else:
                #throw error
                return Response('Bad request', status=400)

    #Every case in the if ( != "game") has its own return statement, if it comes to here something happened
    else:
        return Response('Unauthorized', status=401)
