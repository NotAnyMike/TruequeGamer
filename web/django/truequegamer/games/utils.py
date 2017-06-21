from django.core.exceptions import ObjectDoesNotExist
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
