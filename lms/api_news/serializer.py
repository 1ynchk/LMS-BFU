from rest_framework import serializers

from .models import News, NewsCategories

class NewsSerializer(serializers.ModelSerializer):

    class Meta: 
        model = News 
        fields = ['title', 'cats', 'rates']

class NewsCategoriesSerializer(serializers.ModelSerializer):

    class Meta: 
        model = NewsCategories
        fields = '__all__'