from rest_framework import fields, serializers
from explorerestaurants import models
from .models import RestaurantInfo,MenuInfo

class CustomMultipleChoiceField(serializers.MultipleChoiceField):
    def to_representation(self, value):
        return list(super().to_representation(value))

class RestaurantInfoSerializer(serializers.ModelSerializer):
    restaurant_image = serializers.ImageField(max_length=254,allow_null = True,use_url =True,required = False)
    
    category = CustomMultipleChoiceField(choices=RestaurantInfo.CATEGORY_CHOICES)
    
    
    class Meta:
        model = models.RestaurantInfo
        fields = ('id', 'name','restaurant_image','category','price_category', 'address', 'email', 'phone_no', 'latitude','longitude')

class MenuInfoSerializer(serializers.ModelSerializer):
    # menu_image = serializers.ImageField(max_length=254,allow_null = True,use_url =True,required = False)
    class Meta:
        model = models.MenuInfo
        fields = ('id', 'restaurant_id','category_name', 'item_name', 'serving', 'price')


        
        