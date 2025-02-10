from rest_framework import serializers
import django_filters

from .models import (
    Directions,
    Subjects,
    DirectionsSubjectsThroughBudget,
    DirectionsSubjectsThroughPaid
    )

class DirectionsSerializer(serializers.ModelSerializer):

    subjects_budget = serializers.SerializerMethodField()
    subjects_paid = serializers.SerializerMethodField()
    
    class Meta: 
        model = Directions
        fields = '__all__'
        
    def get_subjects_budget(self, obj):
        return [{"id": sub.id, "name": sub.name} for sub in obj.subjects_budget.all()]

    def get_subjects_paid(self, obj):
        return [{"id": sub.id, "name": sub.name} for sub in obj.subjects_paid.all()] 