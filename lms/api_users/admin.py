from django.contrib import admin
from .models import Users 

from django.utils.html import format_html

@admin.register(Users)
class AdminUsers(admin.ModelAdmin):
    list_display = ['email', 'role']
    exclude = ['groups', 'user_permissions', 'date_joined', 'last_login'] 
    
    @admin.display(description='ROLE')
    def colored_role(self, obj): 
        if obj.role == 'admin': 
            color = 'c41e3a'
        if obj.role == 'moderator': 
            color = 'ffe135'
        if obj.role == 'student': 
            color = '78866b'
        if obj.role == 'applicant':
            color = 'C1FFC1'
        if obj.role == 'teacher': 
            color = '3062a8'
        return format_html("<span style='color: #{};'>{}</span>", color, obj.role)
    