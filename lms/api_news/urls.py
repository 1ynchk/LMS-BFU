from django.urls import path 

from .views import get_news, get_categories

urlpatterns = [
    path('get-news/', get_news),
    path('get-cats/', get_categories)
]