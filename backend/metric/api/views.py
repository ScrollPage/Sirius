from rest_framework.decorators import action
from rest_framework import permissions, status
from rest_framework.response import Response

from .serializers import PointSerializer
from ..models import Sequence
from .service import FSequenceViewSet
from .permissions import LessOrEqThanLen, NoSuchPoint

class SequenceViewSet(FSequenceViewSet):
    '''Создание точки на графике'''
    serializer_class = PointSerializer
    permission_classes = [
        permissions.IsAuthenticated, 
        LessOrEqThanLen, NoSuchPoint
    ]

    queryset = Sequence.objects.all()

    def perform_create(self, serializer):
        sequence = self.get_object()
        serializer.save(sequence=sequence)

    @action(detail=True, methods=['post'])
    def create_point(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['get'])
    def get_point(self, request, *args, **kwargs):
        return self.fast_response('points')
