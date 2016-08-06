from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
def index(req):
    return render(req, 'games/base.html')

def img(req):
    return redirect('/static/games' + req.path)
