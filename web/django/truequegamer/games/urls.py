from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^img/', views.img, name='img'),
    url(r'^landing$', views.landing, name='landing_page'),
    url(r'^api/user/$', views.CurrentUser, name='current_user'),
    url(r'^api/profile/(?P<username>.+)/$', views.SomeUser, name='user'),
    url(r'^api/(?P<serializerType>(suggestions)|(games)|(game))/(?P<console>.+)/(?P<new>.+)/(?P<sell>.+)/(?P<string>.*)/$', views.LocalSuggestions, name='local_suggestions'),
    url(r'^api/game/$', views.DvdApi, name='add_dvd'),
    url(r'^api/game/suggestions/(?P<console>.+)/(?P<string>.+)/$', views.GetListOfGames, name='get_list_of_games'),
    url(r'^api/game/delete/(?P<id_of_game>\d+)/$', views.DeleteDvd, name='change-state-of-dvd'),
    url(r'api/bug/', views.AddBug, name="add_bug"),
    url(r'^api/', include(router.urls)),
    url(r'^$', views.index, name='index'),
    url(r'.*', views.index, name='index_general'),
]
