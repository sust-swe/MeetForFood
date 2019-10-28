from django.urls import path, include
from rest_framework.routers import DefaultRouter

from profiles import views

routers = DefaultRouter()
routers.register('profile', views.UserProfileViewSet)
routers.register('profileaboutitem', views.ProfileAboutItemViewSet)
routers.register('profilesettings', views.ProfileSettingsViewSet)

routers.register('friends', views.FriendViewSet, base_name='friends')
routers.register('friendrequests', views.FriendshipRequestViewSet,
                 base_name='friendrequests')


urlpatterns = [
    # path('api-view/',views.HellooApiView.as_view()),
    # path('login/',views.UserLoginApiView.as_view()),
    path('login/', views.UserLoginApiView.as_view()),


] + routers.urls
