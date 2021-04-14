from rest_framework import serializers

from exam.models import Examination, SubExam, Diagnosis
from metric.api.serializers import PointSerializer
from info.api.serializers import EyeInfoSerializer

class DiagnosisSerializer(serializers.ModelSerializer):
    '''Сериализация диагноза'''

    class Meta:
        model = Diagnosis
        fields = '__all__'
        read_only_fields = ['created', 'updated']
        extra_kwargs = {
            'exam': {'write_only': True}
        }

class ExamSerializer(serializers.ModelSerializer):
    '''Сериализатор исследования'''
    last_diagnosis = DiagnosisSerializer(read_only=True)
    eyes_info = EyeInfoSerializer(read_only=True, many=True)

    class Meta:
        model = Examination
        fields = '__all__'
        read_only_fields = ['created', 'updated']

class SubExamSerializer(serializers.ModelSerializer):
    '''Сериализатор исследования'''

    class Meta:
        model = SubExam
        fields = '__all__'
        read_only_fields = ['created', 'updated']
        extra_kwargs = {
            'exam': {'write_only': True}
        }

