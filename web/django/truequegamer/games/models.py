from __future__ import unicode_literals

from django.db import models

# Create your models here.
class Game(models.Model):
    name= models.CharField(max_length=300, null=False, blank=False, unique=True)
    cover= models.URLField(max_length=300, null=False, blank=False, unique=True) 
    psPrice= models.IntegerField(null=True, blank=True, default=None)
    xboxPrice= models.IntegerField(null=True, blank=True, default=None)
    psExchange= models.BooleanField(null=False, blank=False, default=False)
    xboxExchange= models.BooleanField(null=False, blank=False, default=False)
    psOnly= models.BooleanField(null=False, blank=False, default=False)
    xboxOnly= models.BooleanField(null=False, blank=False, default=False)
    availableOnXbox= models.BooleanField(null=False, blank=False, default=True)
    availableOnPs= models.BooleanField(null=False, blank=False, default=True)
    psOnlyPrice= models.BooleanField(null=False, blank=False, default=False)
    xboxOnlyPrice= models.BooleanField(null=False, blank=False, default=False)
