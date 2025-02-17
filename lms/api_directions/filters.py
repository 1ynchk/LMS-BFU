import django_filters
from django.db.models import Q 

from .models import Subjects, Directions

class DirectionsFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_search') 
    schools = django_filters.CharFilter(method='filter_by_schools')
    subjects = django_filters.CharFilter(method='filter_by_subjects')

    def filter_by_subjects(self, queryset, name, value): 
        if value: 
            subjects_id = value.split(',')
            response = queryset.filter(subjects_budget_paid__id__in=subjects_id, )\
                .distinct()
            return response
        return queryset
        
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