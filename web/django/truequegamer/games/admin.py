from django.contrib import admin

from .models import Game

# Register your models here.

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ('pk', 'name','psPrice', 'psExchange', 'xboxPrice', 'xboxExchange')
