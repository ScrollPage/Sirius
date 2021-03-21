from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, ListModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from backend.core import FastResponseMixin, PermissionMixin, SerializerMixin

class PFListCreateViewSet(
    FastResponseMixin, PermissionMixin,
    SerializerMixin,CreateModelMixin,
    ListModelMixin, GenericViewSet
    
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
        return Response(data)