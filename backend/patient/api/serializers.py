from rest_framework import serializers

from patient.models import Patient

class PatientSerializer(serializers.ModelSerializer):
    '''Сериализация пациента'''

    class Meta:
        model = Patient
        fields = '__all__'
        read_only_fields = ['created', 'updated']