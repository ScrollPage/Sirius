from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import (
    MakulaChoiceView, PereferyChoiceView, 
    ColorChoiceView, BorderChoiceView,
    EyeInfoViewSet
)

urlpatterns = [
    path('makula/', MakulaChoiceView.as_view(), name='makula-list'),
    path('perefery/', PereferyChoiceView.as_view(), name='perefery-list'),
    path('color/', ColorChoiceView.as_view(), name='color-list'),
    path('border/', BorderChoiceView.as_view(), name='border-list'),
]

r = DefaultRouter()
r.register('info', EyeInfoViewSet, basename='info')
urlpatterns += r.urls