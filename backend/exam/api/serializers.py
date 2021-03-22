from rest_framework import serializers

from exam.models import Examination, SubExam

class ExamSerializer(serializers.ModelSerializer):
    '''Сериализатор исследования'''

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

