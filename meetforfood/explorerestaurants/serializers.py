from rest_framework import serializers
from explorerestaurants import models
from .models import RestaurantInfo,MenuInfo

class RestaurantInfoSerializer(serializers.ModelSerializer):
    restaurant_image = serializers.ImageField(max_length=254,allow_null = True,use_url =True,required = False)
    
    class Meta:
        model = models.RestaurantInfo
        fields = ('id', 'name','restaurant_image', 'location', 'email', 'phone_no', 
        'reservation_status', 'has_offer')

class MenuInfoSerializer(serializers.ModelSerializer):
    menu_image = serializers.ImageField(max_length=254,allow_null = True,use_url =True,required = False)
    class Meta:
        model = models.MenuInfo
        fields = ('id', 'restaurant_id', 'item_name', 'menu_image', 'serving', 'price')


        
        