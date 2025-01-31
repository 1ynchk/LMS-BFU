from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import NewsCategories
from .serializer import NewsCategoriesSerializer

@api_view(http_method_names=['GET'])
def get_cats(request):
    queryset = NewsCategories.objects.all()
    return Response({'status': 'ok', 'data': NewsCategoriesSerializer(queryset, many=True).data}) 
    

@api_view(http_method_names=['POST'])
def post_scratch(request):
    pass