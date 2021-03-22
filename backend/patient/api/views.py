from rest_framework.decorators import action
from rest_framework import permissions

from url_filter.integrations.drf import DjangoFilterBackend

from patient.models import Patient
from .service import PFListCreateViewSet, PatientPagination
from .serializers import PatientSerializer

from backend.core import FastResponseMixin
from exam.api.serializers import ExamSerializer


class PatientViewSet(PFListCreateViewSet):
    '''Все про пациента'''
    serializer_class = PatientSerializer
    serializer_class_by_action = {
        'exam': ExamSerializer 
    }
    permission_classes = [permissions.IsAuthenticated]
    permission_classes_by_action = {

    }
    pagination_class = PatientPagination

    filter_backends = [DjangoFilterBackend]
    filter_fields = '__all__'

    def get_queryset(self):
        return Patient.objects.all()

    @action(detail=True, methods=['get'])
    def exam(self, request, *args, **kwargs):
        '''Исследования пользователя'''
        return self.fast_response('exams')