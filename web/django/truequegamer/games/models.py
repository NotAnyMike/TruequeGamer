from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

class Game(models.Model):
    name = models.CharField(max_length=300, null=False, blank=False, unique=True)
    cover = models.URLField(max_length=300, null=False, blank=False, unique=True) 
    psOnly = models.BooleanField(null=False, blank=False, default=False)
    xboxOnly = models.BooleanField(null=False, blank=False, default=False)
    score = models.IntegerField(null=True, blank=True, default=None)

    def __str__(self):
        return '%s' % (self.name)
    
class Dvd(models.Model):
    price = models.IntegerField(null=True, blank=True, default=None)
    exchange = models.BooleanField(null=False, blank=False, default=False)
    new = models.BooleanField(null=False, blank=False, default=False)
    owner = models.ForeignKey(User, null=False, blank=False, default=False)
    game = models.ForeignKey('Game', null=False, blank=False, default=False)

    #psPrice= models.IntegerField(null=True, blank=True, default=None)
    #xboxPrice= models.IntegerField(null=True, blank=True, default=None)
    #psExchange= models.BooleanField(null=False, blank=False, default=False)
    #xboxExchange= models.BooleanField(null=False, blank=False, default=False)
    #psNew= models.BooleanField(null=False, blank=False, default=False)
    #xboxNew= models.BooleanField(null=False, blank=False, default=False)
    #psUsed= models.BooleanField(null=False, blank=False, default=False)
    #xboxUsed= models.BooleanField(null=False, blank=False, default=False)
    #availableOnXbox= models.BooleanField(null=False, blank=False, default=True)
    #availableOnPs= models.BooleanField(null=False, blank=False, default=True)
    #psOnlyPrice= models.BooleanField(null=False, blank=False, default=False)
    #xboxOnlyPrice= models.BooleanField(null=False, blank=False, default=False)
