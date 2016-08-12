from django.contrib.auth.models import User
from django.db.models import Q
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.conf import settings
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from games.serializers import UserSerializer, SuggestionSerializer, GameSerializer
from games.models import Game


# Create your views here.
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
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)

    else: 
        return HttpResponse('Unauthorized', status=401)

@api_view(['GET'])
def LocalSuggestions(request, serializerType, console, new, sell, string):
    if request.method == 'GET':
        
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
        return Response('Unauthorized', status=401)
