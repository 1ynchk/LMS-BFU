from django.urls import path 

from .views import DirectionsList

urlpatterns = [
    path('get-directions/', DirectionsList.as_view())
]