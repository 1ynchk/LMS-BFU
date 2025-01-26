from django.contrib import admin
from .models import NewsCategories

# Register your models here.
@admin.register(NewsCategories)
class AdminNewsCategories(admin.ModelAdmin):
    pass