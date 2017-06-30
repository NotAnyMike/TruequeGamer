from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

import constants

#constants.CONSOLES = {'xbox':'xbox','ps':'ps'}
#constants.CONSOLES_TUPLE = ((constants.CONSOLES['xbox'],'xbox one'),(constants.CONSOLES['ps'],'ps4'))


class Game(models.Model):
    name = models.CharField(max_length=300, null=False, blank=False, unique=True)
    cover = models.URLField(max_length=300, null=False, blank=False, unique=True) 
    score = models.IntegerField(null=True, blank=True, default=None)
    id_igdb = models.BigIntegerField(null=False, blank=False, default=None, unique=True)
    slug = models.CharField(max_length=300, null=False, blank=False, default=None,unique=True)
    psOnly = models.BooleanField(null=False, blank=False, default=False)
    xboxOnly = models.BooleanField(null=False, blank=False, default=False)
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
    console = models.CharField(null=False, blank=False, default=constants.CONSOLES_TUPLE[0][1], choices=constants.CONSOLES_TUPLE, max_length=30)
    comment = models.TextField(null=False, blank=True, default="", max_length=500)
    state = models.CharField(null=False, blank=False, default=constants.STATE['available'], choices = constants.STATE_TUPLE, max_length=30)

    def __str__(self):
        return "%s, console: %s" % (self.game.name, self.console)

@receiver(post_save, sender=Dvd)
def updatingGames(sender, instance, **kwargs):

    modified = False
    if instance.console == constants.CONSOLES['ps']:
        #Get all Dvds for this game which are for ps
        dvds = Dvd.objects.filter(game=instance.game, console=constants.CONSOLES['ps'], state=constants.STATE['available'])

        if instance.game.psPrice != 0 or \
            instance.game.psExchange != False or \
            instance.game.psNew != False or \
            instance.game.psUsed != False or \
            instance.game.availableOnPs != False or \
            instance.game.psOnlyPrice != True: 
                modified= True

        instance.game.psPrice = 0
        instance.game.psExchange = False
        instance.game.psNew = False
        instance.game.psUsed = False
        instance.game.availableOnPs = False
        instance.game.psOnlyPrice = True

        for dvd in dvds: 
            #Are at least two prices different
            if dvd.price != None and instance.game.psPrice < dvd.price:  
                if instance.game.psPrice != 0:
                    instance.game.psOnlyPrice = False
                instance.game.psPrice = dvd.price
                modified = True

            if dvd.exchange == True:
                instance.game.psExchange = True
                modified = True

            if dvd.new == True:
                instance.game.psNew = True
                modified = True
            else:
                instance.game.psUsed = True
                modified = True
        
        if instance.game.psPrice == 0: instance.game.psPrice = None
        if modified: instance.game.availableOnPs = True

    else:
        dvds = Dvd.objects.filter(game=instance.game, console=constants.CONSOLES['xbox'], state=constants.STATE['available'])

        if instance.game.xboxPrice != 0 or \
            instance.game.xboxExchange != False or \
            instance.game.xboxNew != False or \
            instance.game.xboxUsed != False or \
            instance.game.availableOnXbox != False or \
            instance.game.xboxOnlyPrice != True: 
                modified= True

        instance.game.xboxPrice = 0
        instance.game.xboxExchange = False
        instance.game.xboxNew = False
        instance.game.xboxUsed = False
        instance.game.availableOnXbox = False
        instance.game.xboxOnlyPrice = True

        for dvd in dvds: 
            #Are at least two prices different
            if dvd.price != None and instance.game.xboxPrice < dvd.price:  
                if instance.game.xboxPrice != 0:
                    instance.game.xboxOnlyPrice = False
                instance.game.xboxPrice = dvd.price
                modified = True

            if dvd.exchange == True:
                instance.game.xboxExchange = True
                modified = True

            if dvd.new == True:
                instance.game.xboxNew = True
                modified = True
            else:
                instance.game.xboxUsed = True
                modified = True

        if instance.game.xboxPrice == 0: instance.game.xboxPrice = None
        if modified: instance.game.availableOnXbox = True
    
    if modified :
        if instance.comment == None: instance.comment = ""
        instance.game.save()
