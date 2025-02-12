from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

from .models import Directions
from .serializers import DirectionsSerializer 
from .filters import DirectionsFilter
from .pagination import DirectionsPagination

class DirectionsList(generics.ListAPIView):
    queryset = Directions \
        .objects \
        .select_related('school') \
        .prefetch_related('subjects_budget_paid') \
        .all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DirectionsFilter
    serializer_class = DirectionsSerializer
    pagination_class = DirectionsPagination