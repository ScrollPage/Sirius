from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions, status
from django.http import QueryDict

from url_filter.integrations.drf import DjangoFilterBackend

# from rest_framework_simplejwt.views
# from djoser.views 

from patient.models import Patient
from .service import (
    FSCListCreateRetrieveViewSet, PatientPagination, 
    ExamFilterSet, parse_query_params_to_string
)
from .serializers import PatientSerializer

from backend.core import FastResponseMixin
from exam.api.serializers import ExamSerializer


class PatientViewSet(FSCListCreateRetrieveViewSet):
    '''Все про пациента'''
    queryset = Patient.objects.all().order_by('id')
    serializer_class = PatientSerializer
    serializer_class_by_action = {
        'exam': ExamSerializer 
    }
    permission_classes = [permissions.IsAuthenticated]

    pagination_class = PatientPagination

    filter_backends = [DjangoFilterBackend]
    filter_fields = '__all__'

    @action(detail=True, methods=['get'])
    def exam(self, request, *args, **kwargs):
        '''Исследования пользователя'''
        patient = self.get_object()
        exams = patient.exams.all()

        query_params = parse_query_params_to_string(request)
        query = QueryDict(query_params)
        fs = ExamFilterSet(data=query, queryset=exams)
        filtered_exams = fs.filter()

        serializer = self.get_serializer(filtered_exams, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
