from django.db import models

from patient.models import Patient

class Examination(models.Model):
    '''Исследование'''

    patient = models.ForeignKey(
        Patient, verbose_name='Исследуемый', 
        related_name='exams', on_delete=models.CASCADE
    )
    name = models.CharField(max_length=100, default='')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    diagnosis = models.TextField(max_length=500, default='')
    check_type = models.CharField(max_length=50, default='')
    clinic = models.CharField(max_length=100, default='')

    def __str__(self):
        return f"{self.patient}'s examination"

    class Meta:
        verbose_name = 'Исследование'
        verbose_name_plural = 'Исследования'
        db_table = 'examination'

class SubExam(models.Model):
    '''Промежуточное исследование'''
    exam = models.ForeignKey(
        Examination, verbose_name='Исследование', 
        related_name='sub_exams', on_delete=models.CASCADE
    )
    global_name = models.CharField(max_length=100, default='')
    check_type = models.CharField(max_length=50, default='')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'sub exam in {self.exam}'

    class Meta:
        verbose_name = 'Подъисследование'
        verbose_name_plural = 'Подъисследование'
        db_table = 'port'
