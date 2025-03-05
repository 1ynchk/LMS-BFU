from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination

from .models import (
    Directions,
    School,
    Subjects
    )
from .serializers import (
    DirectionsSerializer,
    SchoolSerializer,
    SubjectsSerializer
    ) 
from .filters import DirectionsFilter

class DirectionsPagination(generics.ListAPIView):
    '''Получение списка направлений'''
    
    queryset = Directions \
        .objects \
        .select_related('school') \
        .prefetch_related('subjects_budget_paid') \
        .order_by('id') \
        .all()
    pagination_class = PageNumberPagination 
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DirectionsFilter 
    serializer_class = DirectionsSerializer

class SchoolsAll(generics.ListAPIView): 
    '''Получение списка высших школ'''
    
    queryset = School.objects.all()
    pagination_class = None
    serializer_class = SchoolSerializer 
    
class SubjectsAll(generics.ListAPIView):
    '''Получение списка всех предметов'''
    
    queryset = Subjects.objects.all()
    pagination_class = None
    serializer_class = SubjectsSerializer