from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import (
    MakulaChoiceView, PeripheryChoiceView, 
    ColorChoiceView, BorderChoiceView,
    EyeInfoView, DZNView, DiagnosisViewSet,
    DiagnosisChoiceView
)

urlpatterns = [
    path('makula/', MakulaChoiceView.as_view(), name='makula-list'),
    path('periphery/', PeripheryChoiceView.as_view(), name='perefery-list'),
    path('color/', ColorChoiceView.as_view(), name='color-list'),
    path('border/', BorderChoiceView.as_view(), name='border-list'),
    path('diagnostic/', DiagnosisChoiceView.as_view(), name='diagnostic-list'),
    path('info/<int:pk>/', EyeInfoView.as_view(), name='eye-info'),
    path('dzn/<int:pk>/', DZNView.as_view(), name='dzn'),
]

r = DefaultRouter()
r.register('diagnosis', DiagnosisViewSet, basename='diagnosis')
urlpatterns += r.urls