from django.urls import path 
from .views import user_login, user_logout, check_login, csrf_token_view

urlpatterns = [
    path('csrf/', csrf_token_view),
    path('login/', user_login),
    path('logout/', user_logout),
    path('login/check', check_login)
]