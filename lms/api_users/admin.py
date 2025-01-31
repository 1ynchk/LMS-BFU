from django.contrib import admin
from .models import Users, UsersInfo 

class UsersInfoTabular(admin.StackedInline):
    model = UsersInfo
    min_num = 1
    max_num = 1
    can_delete = False

@admin.register(Users)
class AdminUsers(admin.ModelAdmin):
    list_display = ['email', 'role']
    inlines =  [UsersInfoTabular]
    exclude = ['groups', 'user_permissions', 'date_joined', 'last_login'] 
    
    def __save__(self, request, obj, form, change): 
        print('hello')
        super().save_model(request, obj, form, change)
        
         