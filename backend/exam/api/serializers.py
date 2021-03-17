from rest_framework import serializers

from exam.models import Examination, SubExam

class ExamSerializer(serializers.ModelSerializer):
    '''Сериализатор исследования'''

    class Meta:
        model = Examination
        read_only_fields = ['created', 'updated']

class SubExamSerializer(serializers.ModelSerializer):
    '''Сериализатор исследования'''

    class Meta:
        model = SubExam
        exclude = ['global_name']
        read_only_fields = ['created', 'updated']
        extra_kwargs = {
            'exam': {'write_only': True}
        }

