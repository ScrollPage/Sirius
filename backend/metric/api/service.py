from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin
from backend.core import FastResponseMixin

class FSequenceViewSet(FastResponseMixin, CreateModelMixin, GenericViewSet):
    '''
    Функция быстрого ответа
    Вью-сет
    '''
    pass