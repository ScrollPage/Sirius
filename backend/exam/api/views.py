from .service import SRetrieveUpdateDestroyCreateViewSet
from rest_framework import permissions

from .serializers import ExamSerializer
from exam.models import Examination

class ExamViewSet(SRetrieveUpdateDestroyCreateViewSet):
    '''
    Создание, удаление, обновление, обзор одного исследования
    '''

    serializer_class =  ExamSerializer
    serializer_class_by_action = {
        
    }
    permissions_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Exam.objects.all()

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)
