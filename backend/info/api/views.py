from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework import permissions

from .serializers import ChoiceItemSeralizer, EyeInfoSerializer
from ..models import (
    MakulaChoice, PereferyChoice, ColorChoice, 
    BorderChoice, EyeInfo, DZN
)


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


class EyeInfoView(UpdateAPIView):
    '''Все об информации о глазах'''
    serializer_class = EyeInfoSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = EyeInfo.objects.all()

class DZNView(UpdateAPIView):
    serializer_class = EyeInfoSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = DZN.objects.all()