from django.contrib import admin
from .models import (
    DirectionsSubjectsThroughBudgetPaid,
    Subjects, 
    Directions,
    School
    )

# Register your models here.
@admin.register(Subjects)
class SubjectsAdmin(admin.ModelAdmin):
    pass

class DirectionsSubjectsThroughBudgetPaidInline(admin.TabularInline):
    model = DirectionsSubjectsThroughBudgetPaid
    extra = 1

@admin.register(Directions)
class DirectionsAdmin(admin.ModelAdmin):
    inlines = [
        DirectionsSubjectsThroughBudgetPaidInline
    ]
    
@admin.register(School)
class SchoolDirections(admin.ModelAdmin): 
    pass