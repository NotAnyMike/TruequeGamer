from django.contrib import admin

from .models import Game, Dvd

# Register your models here.

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('pk', 'name', 'score')

@admin.register(Dvd)
class GameAdmin(admin.ModelAdmin):
    list_display = ('pk', 'get_game_name', 'owner', 'price', 'exchange', 'new')

    def get_game_name(self, obj):
        return obj.game.name
