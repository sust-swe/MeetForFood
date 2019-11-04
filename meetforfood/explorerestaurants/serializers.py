from rest_framework import serializers
from explorerestaurants import models
from .models import RestaurantInfo,MenuInfo

class RestaurantInfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.RestaurantInfo
        fields = ('id', 'name', 'location', 'email', 'phone_no', 
        'reservation_status', 'has_offer')

class MenuInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MenuInfo
        fields = ('id', 'restaurant_id', 'item_name', 'serving', 'price')


        
        