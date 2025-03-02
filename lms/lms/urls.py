from django.contrib import admin
from django.urls import path, include

from api_users.urls import urlpatterns as users_patterns
from api_news.urls import urlpatterns as news_patterns 
from api_directions.urls import urlpatterns as directions_patterns
from api_students.urls import urlpatterns as students_patterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_users/', include(users_patterns)),
    path('api_news/', include(news_patterns)),
    path('api_directions/', include(directions_patterns)),
    path('api_students/', include(students_patterns))
]
