import django_filters
from django.db.models import Q 

from .models import Subjects, Directions

class DirectionsFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_search') 

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(name__icontains=value) | 
            Q(school__name__icontains=value)
        )
    
    class Meta: 
        model = Directions
        fields =  ['search']