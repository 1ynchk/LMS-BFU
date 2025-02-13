from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination

from .models import Directions
from .serializers import DirectionsSerializer 
from .filters import DirectionsFilter
from .pagination import DirectionsPagination

class DirectionsPagination(generics.ListAPIView):
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
    
class DirectionsSearch(generics.ListAPIView): 
    pass