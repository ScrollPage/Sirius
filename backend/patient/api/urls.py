from rest_framework.routers import DefaultRouter

from .views import PatientViewSet

urlpatterns = [
    
]

r = DefaultRouter()
r.register('patient', PatientViewSet, basename='patient')
urlpatterns += r.urls