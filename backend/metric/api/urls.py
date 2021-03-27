from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from .views import SequenceViewSet

urlpatterns = [
    
]

sequence_point = SequenceViewSet.as_view({
    'get': 'get_point',
    'post': 'create_point'
})

urlpatterns += format_suffix_patterns([
    path('sequence/<int:pk>/point/', sequence_point, name='point')
])

