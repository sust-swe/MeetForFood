from django.urls import path, include
from rest_framework.routers import DefaultRouter

from profiles import views
from django.views.decorators.csrf import csrf_exempt

routers = DefaultRouter()
routers.register('profile', views.UserProfileViewSet)
routers.register('profilesettings', views.ProfileSettingsViewSet)
routers.register('profileaboutitem', views.ProfileAboutItemViewSet)
routers.register('image', views.ImageViewSet)
routers.register('bio', views.BioViewSet)


routers.register('friends', views.FriendViewSet, base_name='friends')
routers.register('friendrequests', views.FriendshipRequestViewSet,
                 base_name='friendrequests')


urlpatterns = [
    path('login/', views.UserLoginApiView.as_view()),
    #path('authenticate/',csrf_exempt(CustomObtainAuthToken.as_view())),
] + routers.urls
