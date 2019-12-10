from django.urls import path,include
from rest_framework.routers import DefaultRouter

from explorerestaurants import views

routers = DefaultRouter()
routers.register('restaurant',views.RestaurantInfoViewSet)
# routers.register('menu',views.MenuInfoViewSet)



urlpatterns = [
    path('',include(routers.urls)),
    # path('restaurants/(?P<id>[0-9]+)/menu/', views.MenuInfoViewSet)
    path('restaurants/<int:pk>/menu/', views.RestaurantMenuView.as_view()),


] + routers.urls