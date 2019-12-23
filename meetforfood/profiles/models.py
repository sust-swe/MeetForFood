from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.conf import settings
from django.db.models.fields import DateField
from rest_framework.settings import api_settings
from phonenumber_field.modelfields import PhoneNumberField
import datetime
from datetime import date

from friendship.models import Friend, FriendshipRequest

from explorerestaurants.models import RestaurantInfo,MenuInfo

AUTH_USER_MODEL = getattr(settings, "AUTH_USER_MODEL", "auth.User")


class UserProfileManager(BaseUserManager):
    """Manager for User Profiles"""

    def create_user(self, email, name, password=None):
        """New User Profile"""
        if not email:
            raise ValueError('User Must Specify Email Address')
        email = self.normalize_email(email)
        user = self.model(email=email, name=name)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, name, password):
        """Super User Profile"""
        user = self.create_user(email, name, password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class UserProfile(AbstractBaseUser, PermissionsMixin):
    """User Model for Database"""
    username = None
    email = models.EmailField(max_length=256, unique=True)
    name = models.CharField(max_length=256)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    first_name = None
    last_name = None
    

    objects = UserProfileManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        """return string representation of User"""
        return self.name


class ProfileSettings(models.Model):
    partner_CHOICES = (
        
        ('M', 'Male'),
        ('F', 'Female'),
    )

    user_profile = models.OneToOneField(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    

    foodie_partner = models.CharField(
        max_length=1, choices=partner_CHOICES, default=partner_CHOICES[0][0], blank=False, null=False)
    #location_range = models.IntegerField(blank=False,default= 10)
    min_age = models.IntegerField(blank=False, default=18)
    max_age = models.IntegerField(blank=False, default=23)

    def __str__(self):
        """return string representation of User"""
        return self.user_profile.name

def nameFile(instance,filename):
    return '/'.join(['images', instance.user_profile.name,filename])


# class MyFriendRequests(Friend):
    
#     def __str__(self):
#         return self.from_user +"---- "+ self.to_user

    # message = models.TextField(_("Message"), blank=True,null=True)

    # created = models.DateTimeField(default=timezone.now)
    # rejected = models.DateTimeField(blank=True, null=True)





# class Image(models.Model):
#     user_profile = models.OneToOneField(
#         AUTH_USER_MODEL,
#         on_delete=models.CASCADE
#     )
#     image = models.ImageField(upload_to=nameFile, max_length=254, blank=True, null=True,default=None)
    

#     def __str__(self):
#         """return string representation of User Profile"""
#         return self.user_profile.email
    

class ProfileAboutItem(models.Model):

    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    user_profile = models.OneToOneField(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE, related_name='profiles'
    )

    user_settings = models.OneToOneField(
        ProfileSettings,
        on_delete=models.CASCADE, related_name='settings',
    )
    
    # user_image = models.OneToOneField(
    #     Image,
    #     on_delete=models.CASCADE,blank=True,null=True,
    # )
    
    
    # friend_requests = models.ForeignKey(
    #     FriendshipRequest,on_delete=models.CASCADE,blank = True,null = True,related_name='friend_requests')
    
    

    # user_bio = models.OneToOneField(
    #     Bio,
    #     on_delete=models.CASCADE,blank=True,null=True
    # )
    
    phone_number = PhoneNumberField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES,
                              default=GENDER_CHOICES[1][1], blank=False, null=False)
    birth_date = models.DateField(default=date.today, blank=False, null=True)
    what_you_crave_for = models.CharField(max_length=320,blank=True,null=True)
    #current_city = models.CharField(max_length=1, choices=Current_City_CHOICES,default=Current_City_CHOICES[1][1],blank=False,null=False)
    #foodie_partner = models.CharField(max_length=1, choices=partner_CHOICES,default=partner_CHOICES[0][0],blank=False,null=False)
    #one_wish = models.CharField(max_length=100,null=True)
    created_time = models.DateTimeField(auto_now_add=True)

    @property
    def age(self):
        return int((date.today() - self.birth_date).days / 365.25)

    @age.setter
    def age(self, value):
        self.birth_date = value

    def __str__(self):
        # return '%s: %s: %s: %s' % (self.user_profile.name, self.gender,self.birth_date,self.what_you_crave_for)
        return self.user_profile.email
    
class ExploreRestaurantsCard(models.Model):
    user_profile = models.ForeignKey(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,related_name='explorerestaurants'
    )
    user_about = models.ForeignKey(ProfileAboutItem,on_delete = models.CASCADE)
    restaurant_name=models.CharField(max_length=320,blank=False,default='a')
    menu_choice = models.CharField(max_length = 500,blank=False,default='a')
    eating_time = models.CharField(max_length=10,blank=False,default='0')
    
    
    
    
    # user_menu = models.ManyToManyField(MenuInfo,on_delete = models.CASCADE,blank=True,null=True)
    
    def __str__(self):
        """return string representation of User Profile"""
        return self.user_profile.email


class Image(models.Model):
    user_profile = models.OneToOneField(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    user_about = models.OneToOneField(
        ProfileAboutItem,
        on_delete=models.CASCADE
    )
    restaurant_card = models.OneToOneField(
        ExploreRestaurantsCard,
        on_delete=models.CASCADE,blank=True, null=True,default = None
    )
    
    
    
    # request_list = models.ForeignKey(
    #     FriendshipRequest,
    #     on_delete=models.CASCADE,blank=True,null=True,default=None
    # ) 
    
    image = models.ImageField(upload_to=nameFile, max_length=254, blank=True, null=True,default=None)
    

    def __str__(self):
        """return string representation of User Profile"""
        return self.user_profile.email
    
