from rest_framework import serializers
from rest_framework.exceptions import ParseError
from django.db import IntegrityError

from ..models import (
    MakulaChoice, PereferyChoice, ColorChoice, DiagnosisChoice,
    BorderChoice, EyeInfo, DZN, Recomendation, Diagnosis
)


class ChoiceItemSeralizer(serializers.Serializer):
    '''Сериализация поля выбора'''
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)

    mapping_dict = {
        'makula': MakulaChoice,
        'perefery': PereferyChoice,
        'color': ColorChoice,
        'border': BorderChoice,
        'diagnostic': DiagnosisChoice
    }

    def create(self, validated_data):
        model = self.context['request'].path.split('/')[2]
        model = self.mapping_dict[model]
        try:
            model = model.objects.create(**validated_data)
        except IntegrityError:
            raise ParseError('Object already exists.')
        return model

class DZNSerializer(serializers.ModelSerializer):
    '''Сериализацяи информации о глазах'''

    class Meta:
        model = DZN
        exclude = ['info']
        read_only_fields = ['created', 'updated', 'info']

class EyeInfoSerializer(serializers.ModelSerializer):
    '''Сериализацяи информации о глазах'''
    dzn = DZNSerializer(read_only=True)

    class Meta:
        model = EyeInfo
        exclude = ['exam']
        read_only_fields = ['created', 'updated', 'eye', 'exam']


class RecomendationSerializer(serializers.ModelSerializer):
    '''Сериализация рекомендации'''

    class Meta:
        model = Recomendation
        exclude = ['exam']

class DiagnosisSerializer(serializers.ModelSerializer):
    '''Сериализация диагноза'''

    class Meta:
        model = Diagnosis
        fields = '__all__'
        read_only_fields = ['created', 'updated']
        extra_kwargs = {
            'exam': {'write_only': True}
        }
