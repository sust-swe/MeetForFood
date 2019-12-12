from django.db.models import Subquery
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from rest_framework.settings import api_settings
from rest_framework.permissions import IsAuthenticated
from django.apps import apps
from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist, ValidationError

from profiles import serializers
from profiles import models
from profiles import permissions
from django.shortcuts import get_object_or_404
from rest_framework.parsers import FileUploadParser
from .models import UserProfile, ProfileAboutItem, ProfileSettings,Image

from django.conf import settings

from django.db.models import Q

#from django_filters.rest_framework import DjangoFilterBackend

from friendship.models import Friend, FriendshipRequest
from .serializers import FriendshipRequestSerializer,MyTokenObtainPairSerializer

from rest_framework_simplejwt.views import TokenObtainPairView


config = apps.get_app_config('rest_friendship')


class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProfileSerializer
    queryset = models.UserProfile.objects.all()
    http_method_names = ['post','get']
    # authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.UpdateOwnProfile,)
    #filter_class = SettingsFilter
    #filter_backends = (filters.SearchFilter,)
    #search_fields = ('name','email',)


# class UserLoginApiView(ObtainAuthToken):
#     renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

# class ProfileAboutItemPostView(APIView):
#     permission_classes = [IsAuthenticated]
    
#     def post(self, request, format=None):
#         serializer = ProfileAboutItemSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    
class ProfileAboutItemView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request,format = None):
        
        profile_settings = models.ProfileSettings.objects.all()
        user_id = self.request.user.id
        print(profile_settings)
        ps = models.ProfileAboutItem.objects.all()
        print(ps)
        
        print(user_id)        
        print(profile_settings.values('foodie_partner'))
        age_list = [obj.age for obj in ps]
        print(age_list)
        print(ps.get(user_profile__id=user_id).age)
        
        foodie_partner = profile_settings.get(user_profile__id=user_id).foodie_partner
        min_age = profile_settings.get(user_profile__id=user_id).min_age
        max_age = profile_settings.get(user_profile__id=user_id).max_age
        
        print(profile_settings.get(user_profile__id=user_id).foodie_partner)
        print(profile_settings.get(user_profile__id=user_id).min_age)
        print(profile_settings.get(user_profile__id=user_id).max_age)
        
        
        result_list = []

        for item in ps :
            if (item.age >= min_age) and (item.age <= max_age) and (item.gender == foodie_partner):
                result_list.append(item)

        print (result_list)

        serializer = serializers.ProfileAboutItemSerializer(result_list, many=True)
        return Response(serializer.data)
    
    
    
    # def put(self, request, pk, format=None):
    #     query = self.get_object(pk)
    #     serializer = ProfileAboutItemSerializer(query, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    # def delete(self, request, pk, format=None):
    #     query = self.get_object(pk)
    #     query.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class ProfileAboutItemDetailView(APIView):
    permission_classes = [IsAuthenticated]
    """
    """
    def get_object(self, pk):
        try:
            if ProfileAboutItem.user_profile==request.user.id:
                return ProfileAboutItem.objects.get(pk=pk)

        except ProfileAboutItem.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        query = self.get_object(pk)
        serializer = ProfileAboutItemSerializer(query, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        query = self.get_object(pk)
        query.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfileAboutItemViewSet(viewsets.ModelViewSet):
    # authentication_classes = (TokenAuthentication,)
    parser_class = (FileUploadParser,)
    serializer_class = serializers.ProfileAboutItemSerializer
    http_method_names = ['post','put','delete','get']
    queryset = ProfileAboutItem.objects.all()
    permission_classes = (permissions.UpdateOwnAbout, IsAuthenticated)
    

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)
        
    def get_queryset(self):
        return ProfileAboutItem.objects.filter(user_profile=self.request.user)

    # def get_queryset(self):
    #     profile_settings = models.ProfileSettings.objects.all()
    #     ps = models.ProfileAboutItem.objects.all()
    #     print(ps)
    #     print(self.request.user.id)
    #     ps.filter(gender__in=Subquery(profile_settings.values('foodie_partner')),
    #                                            user_settings__min_age__lte=ps.get(
    #                                                id=self.request.user.id).age,
    #                                            user_settings__max_age__gte=ps.get(
    #                                                id=self.request.user.id).age)
    #     print(ps)
    #     return ps
        
            
            


class ProfileSettingsViewSet(viewsets.ModelViewSet):
    # authentication_classes = (TokenAuthentication,)
    http_method_names = ['post', 'put', 'delete','get']
    serializer_class = serializers.ProfileSettingsSerializer
    queryset = models.ProfileSettings.objects.all()
    permission_classes = (permissions.UpdateOwnSettings, IsAuthenticated)

    def get_queryset(self):
        return ProfileSettings.objects.filter(user_profile=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)
        
        
class ImageViewSet(viewsets.ModelViewSet):
    # authentication_classes = (TokenAuthentication,)
    http_method_names = ['post', 'put', 'get','delete']
    serializer_class = serializers.ImageSerializer
    queryset = models.Image.objects.all()
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)
        
    def get_queryset(self):
        return Image.objects.filter(user_profile=self.request.user)
        
class BioViewSet(viewsets.ModelViewSet):
    # authentication_classes = (TokenAuthentication,)
    http_method_names = ['post', 'put', 'get','delete']
    serializer_class = serializers.BioSerializer
    queryset = models.Bio.objects.all()
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user_profile=self.request.user)
        
        
class FriendViewSet(viewsets.ViewSet):
    # authentication_classes = (TokenAuthentication,)
    permission_classes = config.permission_classes
    serializer_class = config.user_serializer

    def list(self, request):
        friends = Friend.objects.friends(request.user)
        serializer = serializers.ProfileSerializer(friends, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def requests(self, request):
        friend_requests = Friend.objects.unrejected_requests(user=request.user)
        return Response(FriendshipRequestSerializer(friend_requests, many=True).data)

    @action(detail=False)
    def sent_requests(self, request):
        friend_requests = Friend.objects.sent_requests(user=request.user)
        return Response(FriendshipRequestSerializer(friend_requests, many=True).data)

    @action(detail=False)
    def rejected_requests(self, request):
        friend_requests = Friend.objects.rejected_requests(user=request.user)
        return Response(FriendshipRequestSerializer(friend_requests, many=True).data)

    def create(self, request):
        """
        Creates a friend request
        POST data:
        - user_id
        - message
        """

        friend_obj = Friend.objects.add_friend(
            request.user,                                                     # The sender
            get_object_or_404(get_user_model(),
                              email=request.data['email']),  # The recipient
            message=request.data.get('message', 'Add Me')
        )

        return Response(
            FriendshipRequestSerializer(friend_obj).data,
            status.HTTP_201_CREATED
        )

    def destroy(self, request, pk=None):
        """
        Deletes a friend relationship
        The user id specified in the URL will be removed from the current user's friends
        """

        user_friend = get_object_or_404(get_user_model(), pk=pk)

        if Friend.objects.remove_friend(request.user, user_friend):
            message = 'deleted'
            status_code = status.HTTP_204_NO_CONTENT
        else:
            message = 'not deleted'
            status_code = status.HTTP_304_NOT_MODIFIED

        return Response(
            {"message": message},
            status=status_code
        )


class FriendshipRequestViewSet(viewsets.ViewSet):
    # authentication_classes = (TokenAuthentication,)
    permission_classes = config.permission_classes

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        friendship_request = get_object_or_404(FriendshipRequest,
                                               pk=pk, to_user=request.user)

        friendship_request.accept()
        return Response(
            FriendshipRequestSerializer(friendship_request).data,
            status.HTTP_201_CREATED
        )

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        friendship_request = get_object_or_404(
            FriendshipRequest, pk=pk, to_user=request.user)
        friendship_request.reject()
        return Response(
            FriendshipRequestSerializer(friendship_request).data,
            status.HTTP_201_CREATED
        )

# class SettingsFilter(filters.FilterSet):
    #settings = filters.ModelChoiceFilter(queryset=models.ProfileSettings.objects.all())
