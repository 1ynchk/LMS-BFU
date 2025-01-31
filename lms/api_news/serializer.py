from rest_framework import serializers

from .models import NewsCategories

class NewsCategoriesSerializer(serializers.ModelSerializer):
    
    class Meta: 
        model = NewsCategories
        fields = ['title', 'slug']
