from rest_framework.decorators import action
from rest_framework import permissions

from url_filter.integrations.drf import DjangoFilterBackend

from patient.models import Patient
from .service import PFListCreateRetrieveViewSet, PatientPagination
from .serializers import PatientSerializer

from backend.core import FastResponseMixin
from exam.api.serializers import ExamSerializer


class PatientViewSet(PFListCreateRetrieveViewSet):
    '''Все про пациента'''
    queryset = Patient.objects.all()
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


    @action(detail=True, methods=['get'])
    def exam(self, request, *args, **kwargs):
        '''Исследования пользователя'''
        return self.fast_response('exams')