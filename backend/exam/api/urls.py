from rest_framework.routers import DefaultRouter

from .views import ExamViewSet

urlpatterns = [

]

r = DefaultRouter()
r.register('exam', ExamViewSet, basename='exam')
urlpatterns += r.urls 