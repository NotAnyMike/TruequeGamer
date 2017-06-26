#!/usr/bin/env python
# -*- coding: utf-8 -*-
FB_PROFILE_PIC_PART1 = "https://graph.facebook.com/"
FB_PROFILE_PIC_PART2 = "/picture?type=large"

LARGE_PROFILE_PIC_URL = "/img/details_profile.png"
DEFAULT_LOCATION = "Bogotá, Colombia"

FB_ACCESS_TOKEN = "EAAMFSTFTluYBAJ1tKIMX26iP5XO0JoTPtxJn5e2L6KQWHSpmtl3rie4xMgXrHj88KS5SSKdSqk6YjFetgnFMFOQnO16hIAxFzSS6iHHTau6NoWp9tMNYnBc3W8OoeAfUb0MZA2y43dUoM0l6y1F6SNIxPxJsZD"
IGDB_ACCESS_TOKEN = "bTMJ0oS2atmshMYWLcFGLs6VgsoNp1NhDEijsn9rm93XJSPeFg"

CONSOLES = {'xbox':'xbox','ps':'ps', 'both':'ps-xbox'}
CONSOLES_TUPLE = ((CONSOLES['xbox'],'xbox one'),(CONSOLES['ps'],'ps4'))

IGDB_API = {
        "base_url": "https://igdbcom-internet-game-database-v1.p.mashape.com",
        "games_url": "/games/",
        "fields_simple": "name,slug",
        "fields_extended": "name,slug,popularity,cover.url,cover.cloudinary_id",
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
