from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from patient.models import Patient
from backend.core import FastResponseMixin, PermissionMixin, SerializerMixin

class PFListCreateViewSet(
    FastResponseMixin, PermissionMixin,
    SerializerMixin,CreateModelMixin,
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
        col = int(Patient.objects.all().count()/self.page_size)
        return Response(
            {
                'page_num': col if not Patient.objects.all().count()%self.page_size else col + 1, 
                'data': data
            }
        )