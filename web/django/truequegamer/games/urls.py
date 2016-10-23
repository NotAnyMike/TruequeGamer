from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^api/user/$', views.CurrentUser, name='current_user'),
    url(r'^api/users/(?P<userName>(.+))/$', views.SearchUser, name='search_user'),
    url(r'^api/(?P<serializerType>(suggestions)|(games))/(?P<console>.+)/(?P<new>.+)/(?P<sell>.+)/(?P<string>.*)/$', views.LocalSuggestions, name='local_suggestions'),
    url(r'^api/', include(router.urls)),
    url(r'^$', views.index, name='index'),
    url(r'^img/', views.img, name='img'),
]
