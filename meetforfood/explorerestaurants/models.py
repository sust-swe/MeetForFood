from django.db import models
from django.db.models.fields import DateField
from rest_framework.settings import api_settings
from phonenumber_field.modelfields import PhoneNumberField
from datetime import date

# Create your models here.
def nameFileRestaurant(instance,filename):
    return '/'.join(['restaurants', instance.name,filename])
class RestaurantInfo(models.Model):

    reservation_CHOICES = (
        ('A', 'Available'),
        ('U', 'Unavailable'),
    )
    offer_CHOICES = (
        ('Y', 'Yes'),
        ('N', 'No'),
    )
    name = models.CharField(max_length=120)
    restaurant_image = models.ImageField(upload_to=nameFileRestaurant, max_length=254, blank=True, null=True,default=None)
    location = models.CharField(max_length=460)
    email = models.EmailField(max_length=256,unique=True)
    phone_no = PhoneNumberField()
    reservation_status = models.CharField(max_length=1, choices=reservation_CHOICES,default=reservation_CHOICES[1][1],blank=False,null=False)
    has_offer = models.CharField(max_length=1, choices=offer_CHOICES,default=offer_CHOICES[1][1],blank=False,null=False)

    def __str__(self):
        return self.name

def nameFileMenu(instance,filename):
    return '/'.join(['menu', instance.item_name,filename])
class MenuInfo(models.Model):
       
    restaurant_id = models.ForeignKey(RestaurantInfo, on_delete=models.CASCADE)   
    item_name = models.CharField(max_length=120)
    item_image = models.ImageField(upload_to=nameFileMenu, max_length=254, blank=True, null=True,default=None)
    serving = models.IntegerField()
    price = models.CharField(max_length=10)

    def __str__(self):
        return self.item_name