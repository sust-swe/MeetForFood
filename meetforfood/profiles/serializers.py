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

class ProfileFeedItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.ProfileFeedItem
        fields = ('id','user_profile','feed_text','created_time')
        extra_kwargs = {'user_profile':{'read_only': True}}