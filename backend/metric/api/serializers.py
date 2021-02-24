from rest_framework import serializers

from metric.models import Sequence

class SequenceSerializer(serializers.ModelSerializer):
    '''Сериализация временного ряда'''

    class Meta:
        model = Sequence
        fields = ['name']
        read_only_fields = ['created', 'updated']
        extra_kwargs = {
            'sub_exam': {'write_only': True}
        }