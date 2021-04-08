from rest_framework.routers import DefaultRouter
from django.urls import path

from .views import ExamViewSet, SubExamViewSet, DiagnosisViewSet

urlpatterns = [

]

r = DefaultRouter()
r.register('exam', ExamViewSet, basename='exam')
r.register('sub', SubExamViewSet, basename='sub-exam')
r.register('diagnosis', DiagnosisViewSet, basename='diagnosis')
urlpatterns += r.urls 