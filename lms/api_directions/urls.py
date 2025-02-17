from django.urls import path 

from .views import (
    DirectionsPagination, 
    SchoolsAll,
    SubjectsAll
    )

urlpatterns = [
    path('get-schools/', SchoolsAll.as_view()), 
    path('get-directions/', DirectionsPagination.as_view()),
    path('get-subjects/', SubjectsAll.as_view())
    
]