from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import (
    MakulaChoiceView, PereferyChoiceView, 
    ColorChoiceView, BorderChoiceView,
    EyeInfoView, DZNView
)

urlpatterns = [
    path('makula/', MakulaChoiceView.as_view(), name='makula-list'),
    path('perefery/', PereferyChoiceView.as_view(), name='perefery-list'),
    path('color/', ColorChoiceView.as_view(), name='color-list'),
    path('border/', BorderChoiceView.as_view(), name='border-list'),
    path('info/<int:pk>/', EyeInfoView.as_view(), name='eye-info'),
    path('dzn/<int:pk>/', DZNView.as_view(), name='dzn'),
]