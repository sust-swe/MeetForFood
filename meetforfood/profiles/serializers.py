from rest_framework import serializers

from profiles import models
    
class ProfileSerializer(serializers.ModelSerializer):
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
    
    class Meta:
        model = models.ProfileAboutItem
        fields = ('id','user_profile','phone_number','birth_date',
        'gender','what_you_crave_for','created_time')
        extra_kwargs = {'user_profile':{'read_only': True}}


class ProfileSettingsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = models.ProfileSettings
        fields = ('id','user_profile','foodie_partner','location_range',
        'min_age','max_age')
        extra_kwargs = {'user_profile':{'read_only': True}}        
        