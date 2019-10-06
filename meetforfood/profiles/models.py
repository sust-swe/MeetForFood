from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.models import BaseUserManager
from django.conf import settings

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

class ProfileFeedItem(models.Model):
    user_profile = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    feed_text = models.CharField(max_length=320)
    created_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.feed_text