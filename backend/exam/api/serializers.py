from rest_framework import serializers

from exam.models import Examination

class ExamSerializer(serializers.ModelSerializer):
    '''Сериализатор исследования'''

    class Meta:
        model = Examination
        exclude = ['patient']
        read_only_fields = ['created', 'updated']
