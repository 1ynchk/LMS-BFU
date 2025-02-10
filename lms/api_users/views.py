from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response
from django.http import JsonResponse
from django.middleware.csrf import get_token

from .models import Users

@api_view(http_method_names=['GET'])
def csrf(request): 
    '''Отправка csrf токена'''

    token = get_token(request)
    response = JsonResponse({'csrftoken': token}) 
    response.set_cookie(
        'csrftoken',
        token,
        httponly=True,
        secure=True,
        path='/',
        samesite='None'
    )
    return response

@api_view(http_method_names=['POST'])
def user_login(request):
    '''Авторизация пользователя'''

    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)
    if user is not None: 
        
        login(request, user)
        response = Response({'status': 'ok', 'comment': 'success'}) 
        response.set_cookie('sessionid', request.session.session_key) 
        return response 
    else:
        return Response({'status': 'error', 'comment': 'there is not such a user'}, status=401)
    
@api_view(http_method_names=['POST'])
def user_logout(request):
    '''Выход пользователя из аккаунта'''
    
    logout(request)
    request.session.flush()
    response = Response({'status': 'ok', 'comment': 'success'})
    response.delete_cookie('sessionid') 
    return response

@api_view(http_method_names=['GET'])
def check_login(request):
    '''Проверка авторизирован пользователь или нет'''

    print(request.user)
    if request.user.is_authenticated:
        user = Users.objects.get(id=request.user.id)
        response = Response({
            'auth': True, 
            'role': user.role,
            'avatar': user.avatar.url,
            'name': user.name 
            })
        return response
    else:
        return Response({'auth': False}) 