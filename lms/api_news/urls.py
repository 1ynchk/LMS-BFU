from django.urls import path 

from .views import (
    get_news, 
    get_categories,
    post_scratch
    )

urlpatterns = [
    path('get-news/', get_news),
    path('get-cats/', get_categories),
    path('post-scratch/', post_scratch)
]