from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from rest_framework.response import Response

from .models import Users

@api_view(http_method_names=['POST'])
def user_login(request):
    '''Авторизация пользователя'''
    
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)
    print(user)
    if user is not None: 
        login(request, user)
        response = Response({'status': 'ok', 'comment': 'success'}) 
        return response 
    else:
        return Response({'status': 'error', 'comment': 'there is not such a user'}, status=401)
    
@api_view(http_method_names=['POST'])
def user_logout(request):
    '''Выход пользователя из аккаунты'''
    
    logout(request)
    return Response({'status': 'ok', 'comment': 'success'})

@api_view(http_method_names=['GET'])
def check_login(request):
    '''Проверка авторизирован пользователь или нет'''

    print(request.user)
    if request.user.is_authenticated:
        user = Users.objects.get(id=request.user.id)
        response = Response({
            'auth': True, 
            'role': user.role,
            'name': user.last_name + user.first_name
            })
        return response
    else:
        return Response({'auth': False}) 