from django.contrib import admin

from .models import Profile

# Register your models here.

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('pk', 'get_username',)

    def get_username(self, obj):
        return obj.user.username
