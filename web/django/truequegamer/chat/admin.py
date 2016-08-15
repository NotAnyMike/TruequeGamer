from django.contrib import admin

from chat.models import UserAuth

@admin.register(UserAuth)
class UserAuthAdmin(admin.ModelAdmin):
    readonly_fields = ('last_update',)
    list_display = ('pk', 'user', 'last_update')
