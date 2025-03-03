from rest_framework.response import Response
from django.db import connection

# DATA BASE 

def my_decorator(func):

    def inner(request, *args, **kwargs):
        connection.queries.clear()
        response = func(request, *args, **kwargs)
        print(func.__name__, len(connection.queries))

        return response
    
    return inner

# PERMISSIONS

def only_admin(func):

    def inner(request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response(
            {'status': 'error', 'comment': 'unauthorized'},
            status=403
            )
        
        if user.role != 'admin': 
            return Response(
            {'status': 'error', 'comment': 'endpoint is not allowed'},
            status=403
            )
        else: 
            return func(request, *args, **kwargs)
       
    return inner 

def only_admin_moderators(func): 
    
    def inner(request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response(
            {'status': 'error', 'comment': 'unauthorized'},
            status=403
            )
        
        if user.role != 'admin' or user.role != 'moderator': 
            return Response(
            {'status': 'error', 'comment': 'endpoint is not allowed'},
            status=403
            )
        else: 
            return func(request, *args, **kwargs)
    
    return inner
    
