from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from .views import PointViewSet

urlpatterns = [
    
]

r = DefaultRouter()
r.register('point', PointViewSet, basename='point')
urlpatterns += r.urls