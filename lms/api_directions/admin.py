from django.contrib import admin
from .models import (
    DirectionsSubjectsThroughPaid,
    DirectionsSubjectsThroughBudget,
    Subjects, 
    Directions,
    School
    )

# Register your models here.
@admin.register(Subjects)
class SubjectsAdmin(admin.ModelAdmin):
    pass

class DirectionsSubjectsThroughBudgetInline(admin.TabularInline):
    model = DirectionsSubjectsThroughBudget
    extra = 1

class DirectionsSubjectsThroughPaidInline(admin.TabularInline):
    model = DirectionsSubjectsThroughPaid
    extra = 1

@admin.register(Directions)
class DirectionsAdmin(admin.ModelAdmin):
    inlines = [
        DirectionsSubjectsThroughPaidInline,
        DirectionsSubjectsThroughBudgetInline
    ]
    
@admin.register(School)
class SchoolDirections(admin.ModelAdmin): 
    pass