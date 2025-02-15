from django.urls import path 

from .views import DirectionsPagination, SchoolsAll

urlpatterns = [
    path('get-schools/', SchoolsAll.as_view()), 
    path('get-directions/', DirectionsPagination.as_view()),
]