from .service import SFRetrieveUpdateDestroyCreateViewSet
from rest_framework import permissions, status
from rest_framework.decorators import action

from .serializers import ExamSerializer, SubExamSerializer
from exam.models import Examination

class ExamViewSet(SFRetrieveUpdateDestroyCreateViewSet):
    '''
    Создание, удаление, обновление, обзор одного исследования
    '''

    serializer_class =  ExamSerializer
    serializer_class_by_action = {
        'sub': SubExamSerializer
    }
    permissions_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Examination.objects.all()

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)

    @action(detail=True, methods=['get'])
    def sub(self, request, *args, **kwargs):
        '''Подъисследования в исследовании'''
        return self.fast_response('sub_exams')

class SubExamViewSet(SFRetrieveUpdateDestroyCreateViewSet):
    serializer_class =  ExamSerializer
    serializer_class_by_action = {

    }
    permissions_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SubExam.objects.all()

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)
