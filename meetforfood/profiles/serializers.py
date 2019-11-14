from rest_framework import serializers

from profiles import models
from friendship.models import FriendshipRequest
    
class ProfileSerializer(serializers.ModelSerializer):

    #profiles = serializers.StringRelatedField(many=False)
    class Meta:
        model = models.UserProfile
        fields = ('id','name','email','password')
        extra_kwargs = {
            'password':{
                'write_only': True,
                'style':{'input_type': 'password'}   
            }
        }


    def create(self,validated_data):
        user = models.UserProfile.objects.create_user(
            email = validated_data['email'],
            name = validated_data['name'],
            password = validated_data['password']
        )
        return user

class ProfileAboutItemSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source = "user_profile.name")
    email = serializers.ReadOnlyField(source = "user_profile.email")
    
    image = serializers.ReadOnlyField(source = "user_image.image")
    bio = serializers.ReadOnlyField(source = "user_bio.bio")
    
    min_age = serializers.ReadOnlyField(source = "user_settings.min_age")
    max_age = serializers.ReadOnlyField(source = "user_settings.max_age")
    foodie_partner = serializers.ReadOnlyField(source = "user_settings.foodie_partner")
    
    
    
    user_age = serializers.IntegerField(source='age',read_only=True)
    
    class Meta:
        model = models.ProfileAboutItem
        fields = ('id','name','user_settings','email','image','bio','phone_number','birth_date','user_age',
        'gender','what_you_crave_for','min_age','max_age','foodie_partner','created_time')
        extra_kwargs = {'user_profile':{'read_only': True}}
        

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = "__all__"
        
class BioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Bio
        fields = "__all__"
   


class ProfileSettingsSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source = "user_profile.name")
    #age = serializers.ReadOnlyField(source = "user_about.id")
    
    class Meta:
        model = models.ProfileSettings
        fields = ('id','user_profile','name','foodie_partner',
        'min_age','max_age')
        #extra_kwargs = {'profile_about':{'read_only': True}}        
        

class FriendshipRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendshipRequest
        fields = ('id', 'from_user', 'to_user', 'message', 'created', 'rejected')        