from django.shortcuts import render
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from .models import Directions
from .serializers import DirectionsSerializer 
from .filters import DirectionsFilter

from django.db import connection
from rest_framework.response import Response
from django.db import reset_queries

class DirectionsList(generics.ListAPIView):
    queryset = Directions \
        .objects \
        .select_related('school') \
        .prefetch_related('subjects_budget', 'subjects_paid') \
        .all()
    filter_backends = (DjangoFilterBackend,)
    filterset_class = DirectionsFilter
    serializer_class = DirectionsSerializer
    