from rest_framework.viewsets import GenericViewSet
from rest_framework.decorators import action
from rest_framework import permissions

from patient.models import Patient
from backend.core import FastResponseMixin
from exam.api.serializers import ExamSerializer

class PatientViewSet(FastResponseMixin, GenericViewSet):
    '''Все про пациента'''
    serializer_class = ExamSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Patient.objects.all()

    @action(detail=True, methods=['get'])
    def exam(self, request, *args, **kwargs):
        '''Исследования пользователя'''
        return self.fast_response('exams')