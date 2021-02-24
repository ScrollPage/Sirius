from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    ListModelMixin, UpdateModelMixin, 
    DestroyModelMixin, CreateModelMixin, 
    RetrieveModelMixin
)

from backend.core import (
    SerializerMixin, PermissionMixin, 
    PermissionSerializerMixin, FastResponseMixin
) 

class SFRetrieveUpdateDestroyCreateViewSet(
    SerializerMixin, UpdateModelMixin, FastResponseMixin, 
    RetrieveModelMixin, DestroyModelMixin, CreateModelMixin, 
    GenericViewSet
):
    '''
    Создание, обновление, удаление, просмотр одной записи
    Переопределен метод выббора сериализатора
    '''
    pass