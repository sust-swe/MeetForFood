from django.urls import path,include
from rest_framework.routers import DefaultRouter

from profiles import views

routers = DefaultRouter()
routers.register('profile',views.UserProfileViewSet)
routers.register('profileaboutitem',views.ProfileAboutItemViewSet)



urlpatterns = [
    # path('api-view/',views.HellooApiView.as_view()),
    # path('login/',views.UserLoginApiView.as_view()),
    path('login/',views.UserLoginApiView.as_view()),
    path('',include(routers.urls))


]