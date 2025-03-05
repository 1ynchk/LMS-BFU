from django.urls import path 
from .views import (
    enrollment_student,
    StudentPaginationList
    )

urlpatterns = [
    path('post-enrollment-student/', enrollment_student), 
    path('get-students/', StudentPaginationList.as_view()) 
]