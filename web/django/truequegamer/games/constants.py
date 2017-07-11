#!/usr/bin/env python
# -*- coding: utf-8 -*-
FB_PROFILE_PIC_PART1 = "https://graph.facebook.com/"
FB_PROFILE_PIC_PART2 = "/picture?type=large"
FB_PROFILE_PIC_PART2_SMALL = "/picture?type=small"

LARGE_PROFILE_PIC_URL = "/img/default_pic.png"
SMALL_PROFILE_PIC_URL = "/img/profile_pic.png"
DEFAULT_LOCATION = "Bogotá, Colombia"

IGDB_ACCESS_TOKEN = "bTMJ0oS2atmshMYWLcFGLs6VgsoNp1NhDEijsn9rm93XJSPeFg"

CONSOLES = {'xbox':'xbox','ps':'ps', 'both':'ps-xbox'}
CONSOLES_TUPLE = ((CONSOLES['xbox'],'xbox one'),(CONSOLES['ps'],'ps4'))

STATE = {'available': 'available', 'sold': 'sold', 'exchanged':'exchanged', 'deleted':'deleted'}
STATE_TUPLE = ((STATE['available'], 'available'), (STATE['sold'], 'sold'), (STATE['exchanged'], 'exchanged'), (STATE['deleted'], 'deleted'))

IGDB_API = {
        "base_url": "https://igdbcom-internet-game-database-v1.p.mashape.com",
        "games_url": "/games/",
        "fields_simple": "name,slug",
        "fields_extended": "name,slug,popularity,cover.url,cover.cloudinary_id,release_dates.platform",
        "normal_query": "[id]?fields=[fields]&limit=5&offset=0&search={search}&filter[release_dates.platform][eq]={platform}&filter[release_dates.date][lte]={time_in_epoch}&filter[category][any]=0,3,4",
        "consoles": {
            "xbox": '49',
            "ps": '48',
            },
        "cover": {
                "default": "thumb",
                "small": "cover_small",
                "big": "cover_big",
            },
        }
