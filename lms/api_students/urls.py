from django.urls import path 
from .views import enrollment_student

urlpatterns = [
    path('post-enrollment-student/', enrollment_student)
]