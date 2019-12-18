from rest_framework import viewsets, filters
from explorerestaurants import serializers, models
from .serializers import RestaurantInfoSerializer, MenuInfoSerializer
from .models import RestaurantInfo, MenuInfo
from rest_framework.parsers import FileUploadParser
from rest_framework.views import APIView
from rest_framework.response import Response

from django.shortcuts import get_object_or_404
from rest_framework import status

# from django_filters import rest_framework as filters


# from django_filters import rest_framework as filterss


class RestaurantInfoViewSet(viewsets.ModelViewSet):
    queryset = RestaurantInfo.objects.all().order_by('name')
    serializer_class = RestaurantInfoSerializer
    parser_class = (FileUploadParser,)
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name','address','menuinfo__category_name','menuinfo__item_name')
    http_method_names = ['get']
    
class RestaurantMenuView(APIView):
    # def get_object(self, id):
    #     try:
    #         return RestaurantInfo.objects.get(id=1)
    #     except RestaurantInfo.DoesNotExist:
    #         raise Http404

    def get(self, request,pk, format=None):
        rest_id = get_object_or_404(RestaurantInfo,
                              pk=pk)
        # rest_id = self.request.get('restaurant_id')
        # restaurant_id = MenuInfo.objects.get(rest_id)
        queryset= MenuInfo.objects.filter(restaurant_id=rest_id)
        serializer = serializers.MenuInfoSerializer(queryset, many=True)
        return Response(serializer.data)
    
        

    
# class MenuInfoViewSet(viewsets.ModelViewSet):
#     queryset = MenuInfo.objects.all()
#     # .order_by('category_name','item_name','-price')
#     serializer_class = MenuInfoSerializer
#     # parser_class = (FileUploadParser,)
#     # search_fields = ('item_name','category_name', 'price',) 
    
#     # filter_backends = (filters.DjangoFilterBackend,)
#     # filterset_fields = ('restaurantinfo__id',)
#     search_fields = ('category_name','item_name', 'price') 
#     http_method_names = ['get']   
    
#     # filter_backends = [filterss.DjangoFilterBackend,]
#     # filterset_fields = ('restaurantinfo__id',)
    
#     def get_queryset(self):
        
#         if self.kwargs['id']:
#             return MenuInfo.objects.filter(restaurant_id=self.kwargs['id'])
#         else:
#             return status.HTTP_404_NOT_FOUND
#         # restaurant_id = self.kwargs['restaurantid']
#         # restaurant_id = self.kwargs.get('restaurant_id',None)
#         # return MenuInfo.objects.filter(restaurant_id=restaurant_id)