from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.views import TokenViewBase, TokenVerifyView

from .serializers import (
    ProtectedTokenObtainPairSerializer, 
    ProtectedTokenRefreshSerializer
)

class ProtectedTokenObtainPairView(TokenViewBase):
    """
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    Also protects data from third parties.
    """
    serializer_class = ProtectedTokenObtainPairSerializer


class ProtectedTokenRefreshView(TokenViewBase):
    """
    Takes a sliding JSON web token and returns a new, refreshed version if the
    token's refresh period has not expired.
    Also protects data from third parties.
    """
    serializer_class = ProtectedTokenRefreshSerializer