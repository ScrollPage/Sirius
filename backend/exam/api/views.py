from rest_framework import permissions, status
from rest_framework.decorators import action
from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin, UpdateModelMixin, 
    DestroyModelMixin
)
from django.shortcuts import get_object_or_404 

from .service import SFRetrieveUpdateDestroyCreateViewSet
from .serializers import ExamSerializer, SubExamSerializer, DiagnosisSerializer
from metric.api.serializers import SequenceSerializer
from exam.models import Examination, SubExam, Diagnosis

class ExamViewSet(SFRetrieveUpdateDestroyCreateViewSet):
    '''
    Создание, удаление, обновление, обзор одного исследования
    '''

    serializer_class = ExamSerializer
    serializer_class_by_action = {
        'sub': SubExamSerializer,
        'diagnosis': DiagnosisSerializer
    }
    permissions_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Examination.objects.all()

    @action(detail=True, methods=['get'])
    def sub(self, request, *args, **kwargs):
        '''Подъисследования в исследовании'''
        return self.fast_response('sub_exams')

    @action(detail=True, methods=['get'])
    def diagnosis(self, request, *args, **kwargs):
        '''Диагнозы'''
        return self.fast_response('diagnosis')


class SubExamViewSet(SFRetrieveUpdateDestroyCreateViewSet):
    serializer_class = SubExamSerializer
    serializer_class_by_action = {
        'sequence': SequenceSerializer
    }
    permissions_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SubExam.objects.all()

    def perform_create(self, serializer):
        exam = get_object_or_404(Examination, id=self.request.data.get('exam'))
        serializer.save(global_name=exam.name)

    @action(detail=True, methods=['get'])
    def sequence(self, request, *args, **kwargs):
        '''Временные ряды исследования'''
        return self.fast_response('sequences')

class DiagnosisViewSet(
    GenericViewSet, CreateModelMixin, 
    UpdateModelMixin, DestroyModelMixin
):
    '''Создание, обновление, удаление диагноза'''
    serializer_class = DiagnosisSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Diagnosis.objects.all()