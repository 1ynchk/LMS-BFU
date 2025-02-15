import django_filters
from django.db.models import Q 

from .models import Subjects, Directions

class DirectionsFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_search') 
    filter_by_schools = django_filters.CharFilter(method='filter_by_schools')

    def filter_by_schools(self, queryset, name, value): 
        if value: 
            schools_ids = value.split(',')
            return queryset.filter(school_id__in=schools_ids)
        return queryset

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(name__icontains=value) | 
            Q(school__name__icontains=value)
        )
    
    class Meta: 
        model = Directions
        fields =  ['search']