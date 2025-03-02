from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(http_method_names=['POST'])
def enrollment_student(request): 
    '''Зачисление студента''' 
    print(request.data)
    return Response({'status': 'ok'}) 