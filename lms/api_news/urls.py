from django.urls import path 


from .views import get_cats

urlpatterns = [
    path('get-cats/', get_cats)
]