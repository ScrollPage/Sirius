from django.db import models

from patient.models import Patient

class Examination(models.Model):
    '''Исследование'''

    patient = models.ForeignKey(
        Patient, verbose_name='Исследуемый', 
        related_name='exams', on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    clinic = models.CharField(max_length=200, default='', null=True)

    def __str__(self):
        return f"{self.patient}'s examination"

    class Meta:
        verbose_name = 'Исследование'
        verbose_name_plural = 'Исследования'
        db_table = 'examination'

class Diagnosis(models.Model):
    '''Модель диагноза'''

    description = models.CharField('Описание', max_length=500)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    exam = models.ForeignKey(
        Examination, verbose_name='Исследование', 
        related_name='diagnosis', on_delete=models.CASCADE
    )

    class Meta:
        verbose_name = 'Диагноз'
        verbose_name_plural = 'Диагнозы'

class SubExam(models.Model):
    '''Промежуточное исследование'''
    exam = models.ForeignKey(
        Examination, verbose_name='Исследование', 
        related_name='sub_exams', on_delete=models.CASCADE
    )
    check_version = models.CharField(max_length=15, null=True)
    check_type = models.CharField(max_length=50, null=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'sub exam in {self.exam}'

    class Meta:
        verbose_name = 'Подъисследование'
        verbose_name_plural = 'Подъисследование'
        db_table = 'port'
