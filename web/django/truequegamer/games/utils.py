from django.core.exceptions import ObjectDoesNotExist
import urllib2,json
import time
import constants

def get_fb_large_profile_pic(fb_id):
    return "%s%s%s" % (constants.FB_PROFILE_PIC_PART1,fb_id,constants.FB_PROFILE_PIC_PART2)

def get_fb_small_profile_pic(fb_id):
    return "%s%s%s" % (constants.FB_PROFILE_PIC_PART1,fb_id,constants.FB_PROFILE_PIC_PART2_SMALL)

def get_user_large_profile_pic(user):
    toReturn = constants.LARGE_PROFILE_PIC_URL
    try:
        if user.profile.facebook_id != None:
           toReturn = get_fb_large_profile_pic(user.profile.facebook_id) 
    except ObjectDoesNotExist:
        pass
    return toReturn

def get_user_small_profile_pic(user):
    toReturn = constants.LARGE_PROFILE_PIC_URL
    try:
        if user.profile.facebook_id != None:
           toReturn = get_fb_small_profile_pic(user.profile.facebook_id) 
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

def get_IGDB_url(console=','.join(constants.IGDB_API['consoles'].values()), string = "", id_of_game=None):
    timeInEpoch = str(long(time.time()*1000 + (31*24*60*60*1000)))
    if console == constants.CONSOLES['xbox']: console = constants.IGDB_API['consoles']['xbox']
    elif console == constants.CONSOLES['ps']: console = constants.IGDB_API['consoles']['ps']
    url = "%s%s%s" % (
            constants.IGDB_API['base_url'],
            constants.IGDB_API['games_url'],
            constants.IGDB_API['normal_query'].replace('{search}', str(string).replace(' ', '+')).replace('{platform}', console).replace('{time_in_epoch}', timeInEpoch))

    if id_of_game != None:
        url = url.replace('[id]',str(id_of_game)).replace('[fields]', constants.IGDB_API['fields_extended'])
    else:
        url = url.replace('[id]','').replace('[fields]', constants.IGDB_API['fields_simple'])

    return url

def get_list_from_IGDB(console,string="",id_of_game=None):

    url = get_IGDB_url(console,string, id_of_game=id_of_game)
    opener = urllib2.build_opener(urllib2.HTTPHandler)
    request = urllib2.Request(url)
    request.add_header("Accept", "application/json")
    request.add_header("X-Mashape-Key", constants.IGDB_ACCESS_TOKEN)

    response = opener.open(request)

    return response
