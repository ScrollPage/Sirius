from rest_framework.routers import DefaultRouter

from .views import ExamViewSet, SubExamViewSet

urlpatterns = [

]

r = DefaultRouter()
r.register('exam', ExamViewSet, basename='exam')
urlpatterns += r.urls 
r = DefaultRouter()
r.register('sub', SubExamViewSet, basename='sub-exam')
urlpatterns += r.urls 