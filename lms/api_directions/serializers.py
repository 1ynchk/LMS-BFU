from rest_framework import serializers

from .models import (
    Directions,
    Subjects,
    DirectionsSubjectsThroughBudgetPaid,
    )

class DirectionsSerializer(serializers.ModelSerializer):

    subjects_budget_paid = serializers.SerializerMethodField()
    school = serializers.SerializerMethodField()
    
    class Meta: 
        model = Directions
        fields = '__all__'
        
    def get_subjects_budget_paid(self, obj):
        subjects_data = []
        subjects = DirectionsSubjectsThroughBudgetPaid.objects.filter(direction=obj)
        
        for sub in subjects:
            subjects_data.append({
                "id": sub.subject.id,
                "name": sub.subject.name,
                "points": sub.points, 
                'type': sub.type_points
            })

        return subjects_data 
    
    def get_school(self, obj): 
        return obj.school.name if obj.school else None