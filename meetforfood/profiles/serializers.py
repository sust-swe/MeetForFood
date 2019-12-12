from rest_framework import serializers

from profiles import models
from friendship.models import FriendshipRequest

from rest_framework.authtoken.models import Token


from stream_chat import StreamChat

from django.conf import settings

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class ProfileSerializer(serializers.ModelSerializer):

    #profiles = serializers.StringRelatedField(many=False)
    image = serializers.ImageField(source = "image.image",allow_null = True,required = False)
    class Meta:
        model = models.UserProfile
        fields = ('id','name','image','email','password')
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def create(self, validated_data):
        user = models.UserProfile.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            password=validated_data['password']
        )
        return user
    

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # # Add custom claims
        # token['name'] = user.name
        # # ...

        return token
    
    def validate(self,attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        
        client = StreamChat(api_key=settings.STREAM_API_KEY, api_secret=settings.STREAM_API_SECRET)
        token = client.create_token(self.user.id)
        
        data['stream-token'] = token

        # Add extra responses here
        # data['username'] = self.user.username
        # data['groups'] = self.user.groups.values_list('name', flat=True)
        return data
    

class CustomTokenSerializer(serializers.ModelSerializer):
    auth_token = serializers.CharField(source="key")

    class Meta:
        model = Token
        fields = ("auth_token",)
        
class StreamTokenSerializer(CustomTokenSerializer):
    stream_token = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ('auth_token','stream_token')

    def get_stream_token(self, obj):
        client = StreamChat(api_key=settings.STREAM_API_KEY, api_secret=settings.STREAM_API_SECRET)
        token = client.create_token(obj.user.id)

        return token


class ProfileAboutItemSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source="user_profile.name")
    email = serializers.ReadOnlyField(source="user_profile.email")

    # user_settings = serializers.ReadOnlyField(allow_null = True)

    # min_age = serializers.ReadOnlyField(source = "user_settings.min_age")
    # max_age = serializers.ReadOnlyField(source = "user_settings.max_age")
    # foodie_partner = serializers.ReadOnlyField(source = "user_settings.foodie_partner")

    user_age = serializers.IntegerField(source='age', read_only=True)

    class Meta:
        model = models.ProfileAboutItem
        fields = ('id', 'name', 'user_settings', 'email', 'user_image', 'user_bio', 'phone_number', 'birth_date', 'user_age',
                  'gender', 'what_you_crave_for', 'created_time')
        extra_kwargs = {'user_profile': {'read_only': True}}


class ImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        max_length=254, allow_null=True, use_url=True, required=False)

    class Meta:
        model = models.Image
        fields = ('user_profile', 'image')


class BioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Bio
        fields = "__all__"


class ProfileSettingsSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source="user_profile.name")
    #age = serializers.ReadOnlyField(source = "user_about.id")

    class Meta:
        model = models.ProfileSettings
        fields = ('id', 'user_profile', 'name', 'foodie_partner',
                  'min_age', 'max_age')
        #extra_kwargs = {'profile_about':{'read_only': True}}


class FriendshipRequestSerializer(serializers.ModelSerializer):
    
    name = serializers.ReadOnlyField(source = "from_user.name")
    

    class Meta:
        model = FriendshipRequest
        fields = ('id','name','from_user', 'to_user', 'message', 'created', 'rejected')        
