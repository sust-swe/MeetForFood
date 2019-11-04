from django.contrib import admin
from profiles import models

admin.site.register(models.UserProfile)
admin.site.register(models.ProfileAboutItem)
admin.site.register(models.ProfileSettings)
