from rest_framework import serializers
from rest_framework.exceptions import ParseError
from django.db import IntegrityError

from ..models import (
    MakulaChoice, PereferyChoice, ColorChoice, 
    BorderChoice, EyeInfo, DZN
)


class ChoiceItemSeralizer(serializers.Serializer):
    '''Сериализация поля выбора'''
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)

    mapping_dict = {
        'makula': MakulaChoice,
        'perefery': PereferyChoice,
        'color': ColorChoice,
        'border': BorderChoice 
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
