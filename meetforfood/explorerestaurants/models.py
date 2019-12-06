from django.db import models
from django.db.models.fields import DateField
from rest_framework.settings import api_settings
from phonenumber_field.modelfields import PhoneNumberField
from datetime import date

from multiselectfield import MultiSelectField

# Create your models here.
def nameFileRestaurant(instance,filename):
    return '/'.join(['restaurants', instance.name,filename])
class RestaurantInfo(models.Model):

    # reservation_CHOICES = (
    #     ('A', 'Available'),
    #     ('U', 'Unavailable'),
    # )
    # offer_CHOICES = (
    #     ('Y', 'Yes'),
    #     ('N', 'No'),
    # )
    CATEGORY_CHOICES = ( ('Bangladeshi', 'Bangladeshi'),
                        ('Chinese', 'Chinese'),
                        ('Indian', 'Indian'),
                        ('Italian', 'Italian'),
                        ('Thai', 'Thai'),
                        ('Japanese', 'Japanese'),
                        ('Korean', 'Korean'),
                        ('Fast_Food', 'Fast Food'),
                        ('Juice_Bar', 'Juice Bar'),
                        ('Coffee_Shop', 'Coffee Shop'),
                        ('IceCream_Shop', 'Ice Cream Shop'),
                        ('Buffet', 'Buffet'),
                        ('Turkish', 'Turkish'),
                        ('Bakery', 'Bakery'),
                        ('Cake_Shop', 'Cake Shop'),
    )
    
    PRICE_CATEGORY_CHOICES = ( ('$', 'Affordable'),
                        ('$$', 'Inexpensive'),
                        ('$$$', 'Expensive'),
                        ('$$$$', 'Posh'),
    )
    
    name = models.CharField(max_length=120,blank=False)
    
    category = MultiSelectField(choices=CATEGORY_CHOICES,
                                 max_choices=6,
                                 max_length=100,blank=False,default=CATEGORY_CHOICES[0][0])
    
    price_category =  models.CharField(max_length=4, choices=PRICE_CATEGORY_CHOICES, default=PRICE_CATEGORY_CHOICES[0][0],blank=False, null=False)
    
    restaurant_image = models.ImageField(upload_to=nameFileRestaurant, max_length=254, blank=True, null=True,default=None)
    address = models.CharField(max_length=460,blank=False)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    email = models.EmailField(max_length=256,unique=True)
    phone_no = PhoneNumberField()
    # reservation_status = models.CharField(max_length=1, choices=reservation_CHOICES,default=reservation_CHOICES[1][1],blank=False,null=False)
    # has_offer = models.CharField(max_length=1, choices=offer_CHOICES,default=offer_CHOICES[1][1],blank=False,null=False)

    def __str__(self):
        return self.name

# def nameFileMenu(instance,filename):
#     return '/'.join(['menu', instance.item_name,filename])
class MenuInfo(models.Model):
       
    restaurant_id = models.ForeignKey(RestaurantInfo, on_delete=models.CASCADE)   
    item_name = models.CharField(max_length=120)
    category_name = models.CharField(max_length=40,default=None)
    # item_image = models.ImageField(upload_to=nameFileMenu, max_length=254, blank=True, null=True,default=None)
    serving = models.CharField(max_length=10)
    price = models.CharField(max_length=10)

    def __str__(self):
        return self.item_name