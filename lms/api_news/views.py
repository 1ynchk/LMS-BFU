from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import News, NewsCategories
from .serializer import NewsSerializer, NewsCategoriesSerializer
from .decorators import only_admin

@api_view(http_method_names=['GET'])
def get_news(request):
    '''Возвращает все новости'''
    queryset = News.objects.prefetch_related('cats', 'rates').all()

    return Response({'status': 'ok', 'data': NewsSerializer(queryset, many=True).data}) 

# Categories

@api_view(http_method_names=['GET'])
@only_admin
def get_categories(request): 
    '''Возвращает все категории новостей'''

    queryset =  NewsCategories.objects.all()

    return Response({'status': 'ok', 
        'data': NewsCategoriesSerializer(queryset, many=True).data})
    
# POST

@api_view(http_method_names=['POST'])
def post_scratch(request):
    pass