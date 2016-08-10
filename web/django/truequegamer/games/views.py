from django.http import HttpResponse
from django.shortcuts import render, redirect
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

from games.serializers import UserSerializer, SuggestionSerializer
from games.models import Game


# Create your views here.
def index(req):
    return render(req, 'games/base.html')

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
def LocalSuggestions(request, string):
    if request.method == 'GET':
        games = Game.objects.filter(name__icontains=string)
        serializer = SuggestionSerializer(games, many=True)
        return Response(serializer.data)

    else:
        return Response('Unauthorized', status=401)
