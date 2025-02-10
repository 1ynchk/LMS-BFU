import django_filters

from .models import Subjects, Directions

class DirectionsFilter(django_filters.FilterSet):

    subjects_budget = django_filters.ModelMultipleChoiceFilter(
        queryset = Subjects.objects.all(),
        field_name = 'directionssubjectsthroughbudget__subject',
        to_field_name = 'id'
    )
    
    subjects_paid = django_filters.ModelMultipleChoiceFilter(
        queryset = Subjects.objects.all(),
        field_name = 'directionssubjectsthroughpaid__subject',
        to_field_name = 'id'
    )
    
    class Meta: 
        model = Directions
        fields =  [
            'name',
            'slug',
            'description',
            'budget_places',
            'paid_places',
            'learning_time',
            'subjects_paid',
            'subjects_budget'
        ]