from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from url_filter.filtersets import ModelFilterSet

from patient.models import Patient
from exam.models import Examination
from backend.core import FastResponseMixin, PermissionMixin, SerializerMixin

class PFListCreateRetrieveViewSet(
    FastResponseMixin, PermissionMixin,
    SerializerMixin, CreateModelMixin,
    ListModelMixin, RetrieveModelMixin, 
    GenericViewSet
    
):
    '''
    Функция быстрого ответа, переопределение определения прав доступа
    Создание, список
    '''
    pass

class PatientPagination(PageNumberPagination):
    '''Пагинация пользователей'''
    page_size = 50
    max_page_size = 1000

    def get_paginated_response(self, data):
        col = int(self.page.paginator.count/self.page_size)
        return Response(
            {
                'page_num': col if not self.page.paginator.count%self.page_size else col + 1, 
                'data': data
            }
        )

class ExamFilterSet(ModelFilterSet):
    class Meta:
        model = Examination

def parse_query_params_to_string(request):
    params = request.query_params
    res = '&'.join(f'{key}={val}' for key, val in params.items())
    return res