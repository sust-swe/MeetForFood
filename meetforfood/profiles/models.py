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


AUTH_USER_MODEL = getattr(settings, "AUTH_USER_MODEL", "auth.User")

class UserProfileManager(BaseUserManager):
    """Manager for User Profiles"""
    def create_user(self, email, name, password=None):
        """New User Profile"""
        if not email:
            raise ValueError('User Must Specify Email Address')
        email = self.normalize_email(email)
        user = self.model(email=email,name=name)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self,email,name,password):
        """Super User Profile"""
        user = self.create_user(email,name,password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user




class UserProfile(AbstractBaseUser,PermissionsMixin):
    """User Model for Database"""
    username = None
    email = models.EmailField(max_length=256,unique=True)
    name = models.CharField(max_length=256)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()
    

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def get_full_name(self):
        return self.name
    
    def get_short_name(self):
        return self.name

    def __str__(self):
        """return string representation of User"""
        return self.email

class ProfileSettings(models.Model):
    partner_CHOICES = (
        ('A', 'Any'),
        ('F', 'Female'),
        ('M', 'Male'),
         )
    
    user_profile = models.OneToOneField(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE
    ) 
    
    foodie_partner = models.CharField(max_length=1, choices=partner_CHOICES,default=partner_CHOICES[0][0],blank=False,null=False)
    #location_range = models.IntegerField(blank=False,default= 10)
    min_age = models.IntegerField(blank=False,default=18)
    max_age = models.IntegerField(blank=False,default=23)


    def __str__(self):
        """return string representation of User"""
        return self.user_profile.name

class ProfileAboutItem(models.Model):
   
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    user_profile = models.OneToOneField(
        AUTH_USER_MODEL,
        on_delete=models.CASCADE,related_name='profiles'
    )
    
    user_settings = models.OneToOneField(
        ProfileSettings,
        on_delete=models.CASCADE,related_name='settings'
    )
    
    phone_number = PhoneNumberField()
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES,default=GENDER_CHOICES[1][1],blank=False,null=False)
    birth_date = models.DateField(default=date.today,blank=False,null=True)
    what_you_crave_for = models.CharField(max_length=320)
    #current_city = models.CharField(max_length=1, choices=Current_City_CHOICES,default=Current_City_CHOICES[1][1],blank=False,null=False)
    #foodie_partner = models.CharField(max_length=1, choices=partner_CHOICES,default=partner_CHOICES[0][0],blank=False,null=False)
    #one_wish = models.CharField(max_length=100,null=True)
    created_time = models.DateTimeField(auto_now_add=True)

    @property
    def age(self):
        return int((date.today() - self.birth_date).days / 365.25)
    
    @age.setter
    def age(self, value):
        self._birth_date = value

    def __str__(self):
        #return '%s: %s: %s: %s' % (self.user_profile.name, self.gender,self.birth_date,self.what_you_crave_for)
        return self.user_profile.email





