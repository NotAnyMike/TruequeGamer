from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

CONSOLES = {'xbox':'xbox','ps':'ps'}
CONSOLES_TUPLE = ((CONSOLES['xbox'],'xbox one'),(CONSOLES['ps'],'ps4'))


class Game(models.Model):
    name = models.CharField(max_length=300, null=False, blank=False, unique=True)
    cover = models.URLField(max_length=300, null=False, blank=False, unique=True) 
    psOnly = models.BooleanField(null=False, blank=False, default=False)
    xboxOnly = models.BooleanField(null=False, blank=False, default=False)
    score = models.IntegerField(null=True, blank=True, default=None)
    psPrice= models.IntegerField(null=True, blank=True, default=None)
    xboxPrice= models.IntegerField(null=True, blank=True, default=None)
    psExchange= models.BooleanField(null=False, blank=False, default=False)
    xboxExchange= models.BooleanField(null=False, blank=False, default=False)
    psNew= models.BooleanField(null=False, blank=False, default=False)
    xboxNew= models.BooleanField(null=False, blank=False, default=False)
    psUsed= models.BooleanField(null=False, blank=False, default=False)
    xboxUsed= models.BooleanField(null=False, blank=False, default=False)
    availableOnXbox= models.BooleanField(null=False, blank=False, default=True)
    availableOnPs= models.BooleanField(null=False, blank=False, default=True)
    psOnlyPrice= models.BooleanField(null=False, blank=False, default=False)
    xboxOnlyPrice= models.BooleanField(null=False, blank=False, default=False)

    def __str__(self):
        return '%s' % (self.name)
    
class Dvd(models.Model):
    price = models.IntegerField(null=True, blank=True, default=None)
    exchange = models.BooleanField(null=False, blank=False, default=False)
    new = models.BooleanField(null=False, blank=False, default=False)
    owner = models.ForeignKey(User, null=False, blank=False, default=False)
    game = models.ForeignKey('Game', null=False, blank=False, default=False)
    console = models.CharField(null=False, blank=False, default=CONSOLES_TUPLE[0][1], choices=CONSOLES_TUPLE, max_length=30)
    comment = models.TextField(null=True, blank=False, default=None, max_length=500)

    def __str__(self):
        return "%s, console: %s" % (self.game.name, self.console)

@receiver(post_save, sender=Dvd)
def updatingGames(sender, instance, **kwargs):

    modified = False
    if instance.console == CONSOLES['ps']:
        if instance.price != None and instance.game.psPrice > instance.price: 
            instance.game.psPrice = instance.price
            modified = True
        if instance.exchange : 
            instance.game.psExchange = True
            modified = True
        if instance.new is False: 
            instance.game.psUsed = True
            modified = True
        if instance.new is True: 
            instance.game.psNew = True
            modified = True
        if instance.exchange or instance.price != None : 
            instance.game.availableOnPs = True
            modified = True

        #Get all Dvds for this game which are for ps
        dvds = Dvd.objects.filter(game=instance.game, console=CONSOLES['ps'])
        for dvd in dvds: 
            #Are at least two prices different
            if instance.price != None and dvd.price != None and instance.price != dvd.price:  
                instance.game.psOnlyPrice = False
                modified = True
    else:
        if instance.price != None and instance.game.xboxPrice > instance.price: 
            instance.game.xboxPrice = instance.price
            modified = True
        if instance.exchange : 
            instance.game.xboxExchange = True
            modified = True
        if instance.new is False: 
            instance.game.xboxUsed = True
            modified = True
        if instance.new is True: 
            instance.game.xboxNew = True
            modified = True
        if instance.exchange or instance.price != None : 
            instance.game.availableOnXbox = True
            modified = True

        #Get all Dvds for this game which are for xbox
        dvds = Dvd.objects.filter(game=instance.game, console=CONSOLES['xbox'])
        for dvd in dvds: 
            #Are at least two prices different
            if instance.price != None and dvd.price != None and instance.price != dvd.price:  
                instance.game.xboxOnlyPrice = False
                modified = True
    
    if modified :
        instance.game.save()
