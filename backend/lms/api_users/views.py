from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response

from .models import Users

api_view(http_method_names=['POST'])
def user_login(request):
    '''Авторизация пользователя'''
    
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request=request, email=email, password=password)
    if user is not None: 
        login(request, user)
        return Response({'status': 'ok', 'comment': 'success'}) 
    else:
        return Response({'status': 'error', 'comment': 'there is not such a user'}, status=401)
    
api_view(http_method_names=['POST'])
def user_logout(request):
    '''Выход пользователя из аккаунты'''
    
    logout(request)
    return Response({'status': 'ok', 'comment': 'success'})
    