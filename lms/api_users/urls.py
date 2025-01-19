from django.urls import path 
from .views import user_login, user_logout, check_login

urlpatterns = [
    path('login/', user_login),
    path('logout/', user_logout),
    path('login/check', check_login)
]