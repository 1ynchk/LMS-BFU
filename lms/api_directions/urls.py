from django.urls import path 

from .views import DirectionsPagination, DirectionsSearch

urlpatterns = [
    
    path('get-directions/', DirectionsPagination.as_view()),
]