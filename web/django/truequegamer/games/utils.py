from django.core.exceptions import ObjectDoesNotExist
import time
import constants

def get_fb_large_profile_pic(fb_id):
    return "%s%s%s" % (constants.FB_PROFILE_PIC_PART1,fb_id,constants.FB_PROFILE_PIC_PART2)

def get_user_large_profile_pic(user):
    toReturn = constants.LARGE_PROFILE_PIC_URL
    try:
        if user.profile.facebook_id != None:
           toReturn = get_fb_large_profile_pic(user.profile.facebook_id) 
    except ObjectDoesNotExist:
        pass
    return toReturn

def get_user_location(user):
    toReturn = constants.DEFAULT_LOCATION
    try:
        if user.profile.facebook_location != None:
           toReturn = user.profile.facebook_location 
    except ObjectDoesNotExist:
        pass
    return toReturn

def get_IGDB_url(console=','.join(constants.IGDB_API['consoles'].values()), string = ""):
    timeInEpoch = str(long(time.time()*1000 + (31*24*60*60*1000)))
    if console == constants.CONSOLES['xbox']: console = constants.IGDB_API['consoles']['xbox']
    elif console == constants.CONSOLES['ps']: console = constants.IGDB_API['consoles']['ps']
    return "%s%s%s" % (
            constants.IGDB_API['base_url'],
            constants.IGDB_API['games_url'],
            constants.IGDB_API['normal_query'].replace('{search}', str(string).replace(' ', '+')).replace('{platform}', console).replace('{time_in_epoch}', timeInEpoch))
