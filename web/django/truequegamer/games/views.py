from django.http import HttpResponse
from django.shortcuts import render, redirect
from rest_framework import viewsets
from django.contrib.auth.models import User

from games.serializers import UserSerializer


# Create your views here.
def index(req):
    return render(req, 'games/base.html')

def img(req):
    return redirect('/static/games' + req.path)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
