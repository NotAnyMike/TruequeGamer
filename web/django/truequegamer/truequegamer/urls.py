"""truequegamer URL Configuration
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.contrib.auth.views import logout

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^logout/*.*$', logout,{'next_page': '/'}),
    url(r'^', include('games.urls')),
]
