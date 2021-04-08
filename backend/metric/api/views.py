from rest_framework.decorators import action
from rest_framework import permissions, status
from rest_framework.response import Response

from .serializers import PointSerializer
from ..models import Sequence, Point
from .permissions import LessOrEqThanLen, NoSuchPoint
from .service import PCreateDestroyViewSet


class PointViewSet(PCreateDestroyViewSet):
    serializer_class = PointSerializer
    permission_classes = [
        permissions.IsAuthenticated, 
        LessOrEqThanLen, NoSuchPoint
    ]
    permission_classes_by_action = {
        'destroy': [permissions.IsAuthenticated]
    }
    queryset = Point.objects.all()
