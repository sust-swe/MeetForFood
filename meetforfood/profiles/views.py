from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings 
from rest_framework.permissions import IsAuthenticated
from django.apps import apps
from rest_framework.decorators import action



from profiles import serializers
from profiles import models
from profiles import permissions
from django.shortcuts import get_object_or_404

from .models import UserProfile,ProfileAboutItem,ProfileSettings

# from django_filters.rest_framework import DjangoFilterBackend

from friendship.models import Friend, FriendshipRequest
from .serializers import FriendshipRequestSerializer

config = apps.get_app_config('rest_friendship')

# # class HellooApiView(APIView):
# #     serializer_class = serializers.HelloSerializer

#     # """Testing API View"""
#     def get(self, request, format=None):
#         an_apiview= [
			

#         ]
#         return Response({'message':'Hello!!!','an_apiview':an_apiview})

#     def post(self,request):
#         serializer = self.serializer_class(data=request.data)

#         if serializer.is_valid():
#             name = serializer.validated_data.get('name')
#             message = f'Hello {name}'
#             return Response({'message':message})

#         else:
#             return Response(
#                 serializer.errors,
#                 status = status.HTTP_400_BAD_REQUEST
#             )    

#     def put(self,request,pk=None):
#         return Response({'method':'PUT'})


#     def patch(self,request,pk=None):
#         return Response({'method':'PATCH'})

#     def delete(self,request,pk=None):
#         return Response({'method':'DELETE'})    


# class HelloViewset(viewsets.ViewSet):
#     serializer_class = serializers.HelloSerializer

#     def list(self,request):
#         a_viewset =[

#         ]
#         return Response({'message':'Hello!','a_viewset':a_viewset})

#     def create(self,request):
#         serializer = self.serializer_class(data=request.data)

#         if serializer.is_valid():
#             name = serializer.validated_data.get('name')
#             message = f'Hello {name}'
#             return Response({'message':message})

#         else:
#             return Response(
#                 serializer.errors,
#                 status= status.HTTP_400_BAD_REQUEST

#             )    

#     def retrieve(self,request,pk=None):
#         return Response({'http_response':'GET'})

	 
#     def update(self,request,pk=None):
#         return Response({'http_response':'PUT'})

	
#     def partial_update(self,request,pk=None):
#         return Response({'http_response':'PATCH'})

	
#     def destroy(self,request,pk=None):
#         return Response({'http_response':'DELETE'})
	  
class UserProfileViewSet(viewsets.ModelViewSet):
	serializer_class = serializers.ProfileSerializer
	queryset = models.UserProfile.objects.all()


	authentication_classes = (TokenAuthentication,)
	permission_classes = (permissions.UpdateOwnProfile,)
	#filter_class = SettingsFilter
	#filter_backends = (filters.SearchFilter,)
	#search_fields = ('name','email',)


class UserLoginApiView(ObtainAuthToken):
	renderer_classes=api_settings.DEFAULT_RENDERER_CLASSES

class ProfileAboutView(APIView):
	def get(self,request):
		foodie_partner = request.GET.get('foodie_partner', None)
		#location_range = request.GET.get('location_range', None)
		min_age = request.GET.get('min_age', None)
		max_age = request.GET.get('max_age', None)
		gender = request.GET.get('gender', None)

		query = ProfileSettings.objects.filter(foodie_partner__iexact=gender,min_age__level__lte=ProfileAboutItem.age,max_age__level_gte=ProfileAboutItem.age)
		serializer = ProfileAboutItemSerializer(query, many=True)
		return Response(serializer.data)
	

	
class ProfileAboutItemViewSet(viewsets.ModelViewSet):

	authentication_classes = (TokenAuthentication,)
	serializer_class = serializers.ProfileAboutItemSerializer
	queryset = models.ProfileAboutItem.objects.all()
	permission_classes= (permissions.UpdateOwnAbout,IsAuthenticated)

	def perform_create(self,serializer):
		serializer.save(user_profile = self.request.user)

class ProfileSettingsViewSet(viewsets.ModelViewSet):
	authentication_classes = (TokenAuthentication,)
	serializer_class = serializers.ProfileSettingsSerializer
	queryset = models.ProfileSettings.objects.all()
	permission_classes= (permissions.UpdateOwnSettings,IsAuthenticated)

	def perform_create(self,serializer):
		serializer.save(user_about = self.request.user)


class FriendViewSet(viewsets.ViewSet):
    """
    ViewSet for Friend model
    """

    permission_classes = config.permission_classes
    serializer_class = config.user_serializer

    def list(self, request):
        friends = Friend.objects.friends(request.user)
        serializer = self.serializer_class(friends, many=True)
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
            get_object_or_404(settings.AUTH_USER_MODEL, pk=request.data['id']),  # The recipient
            message=request.data.get('message', '')
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

        user_friend = get_object_or_404(settings.AUTH_USER_MODEL, pk=id)

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
    """
    ViewSet for FriendshipRequest model
    """
    permission_classes = config.permission_classes

    @action(detail=True,methods=['post'])
    def accept(self, request, pk=None):
        friendship_request = get_object_or_404(FriendshipRequest, pk=pk, to_user=request.user)
        friendship_request.accept()
        return Response(
            FriendshipRequestSerializer(friendship_request).data,
            status.HTTP_201_CREATED
        )

    @action(detail=True,methods=['post'])
    def reject(self, request, pk=None):
        friendship_request = get_object_or_404(FriendshipRequest, pk=id, to_user=request.user)
        friendship_request.reject()
        return Response(
            FriendshipRequestSerializer(friendship_request).data,
            status.HTTP_201_CREATED
        )

#class SettingsFilter(filters.FilterSet):
	#settings = filters.ModelChoiceFilter(queryset=models.ProfileSettings.objects.all())
