from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

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

    @property
    def last_diagnosis(self):
        return self.diagnosis.last()

class Diagnosis(models.Model):
    '''Модель диагноза'''
    
    description = models.TextField('Описание', max_length=500)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    confirmed = models.BooleanField(default=False)
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


@receiver(post_save, sender=Examination)
def invalidate_exam(sender, instance=None, created=False, **kwargs):
    '''Инвалидирует сущность'''
    if not created:
        invalidate_obj(instance)
