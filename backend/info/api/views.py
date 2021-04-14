from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework import permissions

from .serializers import ChoiceItemSeralizer, EyeInfoSerializer
from ..models import (
    MakulaChoice, PereferyChoice, ColorChoice, 
    BorderChoice, EyeInfo
)
from .service import CreateUpdateDestroyViewSet

class MakulaChoiceView(ListAPIView, CreateAPIView):
    '''Список возможных вариантов макулы'''
    serializer_class = ChoiceItemSeralizer
    permissions = [permissions.IsAuthenticated]
    queryset = MakulaChoice.objects.all()


class PereferyChoiceView(ListAPIView, CreateAPIView):
    '''Список возможных вариантов макулы'''
    serializer_class = ChoiceItemSeralizer
    permissions = [permissions.IsAuthenticated]
    queryset = PereferyChoice.objects.all()


class ColorChoiceView(ListAPIView, CreateAPIView):
    '''Список возможных вариантов цвета'''
    serializer_class = ChoiceItemSeralizer
    permissions = [permissions.IsAuthenticated]
    queryset = ColorChoice.objects.all()


class BorderChoiceView(ListAPIView, CreateAPIView):
    '''Список возможных вариантов границы'''
    serializer_class = ChoiceItemSeralizer
    permissions = [permissions.IsAuthenticated]
    queryset = BorderChoice.objects.all()


class EyeInfoViewSet(CreateUpdateDestroyViewSet):
    '''Все об информации о глазах'''
    serializer_class = EyeInfoSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = EyeInfo.objects.all()