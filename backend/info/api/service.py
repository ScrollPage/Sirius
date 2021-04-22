from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import (
    CreateModelMixin, UpdateModelMixin, 
    DestroyModelMixin
)


class CreateUpdateDestroyViewSet(
    CreateModelMixin, UpdateModelMixin, 
    DestroyModelMixin, GenericViewSet
):
    '''Создание, изменение, удаление'''