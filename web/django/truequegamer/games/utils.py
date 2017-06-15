import constants

def get_fb_large_profile_pic(fb_id):
    return "%s%s%s" % (constants.FB_PROFILE_PIC_PART1,fb_id,constants.FB_PROFILE_PIC_PART2)
