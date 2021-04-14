from rest_framework.generics import ListAPIView, CreateAPIView, UpdateAPIView
from rest_framework import permissions

from .serializers import (
    ChoiceItemSeralizer, EyeInfoSerializer, 
    DZNSerializer, RecomendationSerializer,
    DiagnosisSerializer
)
from ..models import (
    MakulaChoice, PereferyChoice, ColorChoice, DiagnosisChoice,
    BorderChoice, EyeInfo, DZN, Recomendation, Diagnosis
)
from .service import CreateUpdateDEstroyViewSet


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


class DiagnosisChoiceView(ListAPIView, CreateAPIView):
    '''Список возможных вариантов границы'''
    serializer_class = ChoiceItemSeralizer
    permissions = [permissions.IsAuthenticated]
    queryset = DiagnosisChoice.objects.all()


class EyeInfoView(UpdateAPIView):
    '''Обновление информации о глазах'''
    serializer_class = EyeInfoSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = EyeInfo.objects.all()


class DZNView(UpdateAPIView):
    '''Обноволение дзн'''
    serializer_class = DZNSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = DZN.objects.all()


class RecomedationView(UpdateAPIView):
    '''Обновление рекомендаций'''
    serializer_class = RecomendationSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Recomendation.objects.all()


class DiagnosisViewSet(CreateUpdateDEstroyViewSet):
    serializer_class = DiagnosisSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = Diagnosis.objects.all()