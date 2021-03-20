from rest_framework.decorators import action
from rest_framework import permissions

from patient.models import Patient
from .service import PFListCreateViewSet
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

    def get_queryset(self):
        return Patient.objects.all()

    @action(detail=True, methods=['get'])
    def exam(self, request, *args, **kwargs):
        '''Исследования пользователя'''
        return self.fast_response('exams')