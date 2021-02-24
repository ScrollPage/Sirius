from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    ListModelMixin, UpdateModelMixin, 
    DestroyModelMixin, CreateModelMixin, 
    RetrieveModelMixin
)

from backend.core import (
    SerializerMixin, PermissionMixin, 
    PermissionSerializerMixin
) 

class SRetrieveUpdateDestroyCreateViewSet(
    SerializerMixin, UpdateModelMixin, 
    RetrieveModelMixin, CreateModelMixin, 
    DestroyModelMixin, GenericViewSet
):
    '''
    Создание, обновление, удаление, просмотр одной записи
    Переопределен метод выббора сериализатора
    '''
    pass