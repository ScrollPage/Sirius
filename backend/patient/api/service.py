from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, ListModelMixin

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