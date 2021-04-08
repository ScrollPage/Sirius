from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, DestroyModelMixin

from backend.core import PermissionMixin

class PCreateDestroyViewSet(
    CreateModelMixin, DestroyModelMixin,
    PermissionMixin, GenericViewSet
):
    '''
    Создание, удаление
    Переопределенный сериализатор
    '''