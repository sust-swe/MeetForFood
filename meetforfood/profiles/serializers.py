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
    
    class Meta:
        model = models.ProfileAboutItem
        fields = ('id','name','email','phone_number','birth_date',
        'gender','what_you_crave_for','created_time')
        extra_kwargs = {'user_profile':{'read_only': True}}
        
    def update(self, instance, validated_data):

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.age()


class ProfileSettingsSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source = "user_profile.name")
    #user_id = serializers.ReadOnlyField(source = "user_profile.id")
    
    class Meta:
        model = models.ProfileSettings
        fields = ('id','name','profile_about','foodie_partner',
        'min_age','max_age')
        #extra_kwargs = {'profile_about':{'read_only': True}}        
        

class FriendshipRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendshipRequest
        fields = ('id', 'from_user', 'to_user', 'message', 'created', 'rejected')        