from django.urls import path, include
from rest_framework.routers import DefaultRouter

from profiles import views
from django.views.decorators.csrf import csrf_exempt



from rest_framework_simplejwt import views as jwt_view

routers = DefaultRouter()
routers.register('profile', views.UserProfileViewSet)
routers.register('profilesettings', views.ProfileSettingsViewSet)
routers.register('profileaboutitem', views.ProfileAboutItemViewSet)
routers.register('image', views.ImageViewSet)
# routers.register('bio', views.BioViewSet)


routers.register('friends', views.FriendViewSet, basename='friends')
routers.register('friendrequests', views.FriendshipRequestViewSet,
                 basename='friendrequests')


urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain'),
    path('token/refresh/', jwt_view.TokenRefreshView.as_view(), name='token_refresh'),
    path('profilecard/', views.ProfileAboutItemView.as_view()),
    # path('profilecreate/', views.ProfileAboutItemPostView.as_view()),
    # path('profilecard/<int:pk>/', views.ProfileAboutItemDetailView.as_view()),
    # path('api-token-auth/',obtain_jwt_token),
    # path('login/', views.UserLoginApiView.as_view()),
    #path('authenticate/',csrf_exempt(CustomObtainAuthToken.as_view())),
] + routers.urls


