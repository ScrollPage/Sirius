from django.urls import path

from .views import ProtectedTokenObtainPairView, ProtectedTokenRefreshView, TokenVerifyView

urlpatterns = [
    path('jwt/create/', ProtectedTokenObtainPairView.as_view(), name='jwt-create'),
    path('jwt/refresh/', ProtectedTokenRefreshView.as_view(), name='jwt-refresh'),
    path('jwt/verify/', TokenVerifyView.as_view(), name='jwt-verify')
]