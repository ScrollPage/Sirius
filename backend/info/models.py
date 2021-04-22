from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

from patient.models import Patient
from exam.models import Examination
from backend.core import ChoiceItem


class Recomendation(models.Model):
    '''Рекоменндации и прочие заметки врача'''

    exam = models.OneToOneField(
        Examination, verbose_name='Исследование', 
        on_delete=models.CASCADE, related_name='recomends'
    )
    content = models.TextField('Рекомендации', max_length=1000)

    class Meta:
        verbose_name = 'Рекомендация'
        verbose_name_plural = 'Рекомендации'


class MakulaChoice(ChoiceItem):
    '''Выбор макулы'''
    
    class Meta:
        verbose_name = 'Выбор макулы'
        verbose_name_plural = 'Выбор макулы'

class PeripheryChoice(ChoiceItem):
    '''Выбор периферии'''

    class Meta:
        verbose_name = 'Выбор периферии'
        verbose_name_plural = 'Выбор периферии'


class EyeInfo(models.Model):
    '''Информация, заполняемая врачом'''

    EYE_CHOICES = (
        (1, 'Левый'),
        (2, 'Правый'),
    )

    side = models.CharField('Тип глаза', max_length=6)
    exam = models.ForeignKey(
        Examination, verbose_name='Исследование', 
        on_delete=models.CASCADE, related_name='eyes_info'
    )
    sight_sharpness = models.DecimalField(
        'Острота зрения', default=0.00,
        max_digits=4, decimal_places=2
    )
    makula = models.CharField('Макула', max_length=100, default='')
    periphery = models.CharField('Периферия', max_length=100, default='')
    sight_area = models.CharField(
        'Поле зрения', max_length=100, 
        default='default'
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Информация о глазе'
        verbose_name_plural = 'Информация о глазах'
        unique_together = ('side', 'exam')


class ColorChoice(ChoiceItem):
    '''Цвет дзн'''
    class Meta:
        verbose_name = 'Выбор цвета дзн'
        verbose_name_plural = 'Выбор цвета дзн'


class BorderChoice(ChoiceItem):
    '''Границы дзн'''
    class Meta:
        verbose_name = 'Выбор границы дзн'
        verbose_name_plural = 'Выбор границы дзн'


class DZN(models.Model):
    '''Диск зрительного нерва'''

    info = models.OneToOneField(
        EyeInfo, verbose_name='Информация о глазе', 
        on_delete=models.CASCADE, related_name='dzn'
    )
    color = models.CharField('Цвет', max_length=100, default='')
    border = models.CharField('Границы', max_length=100, default='')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Диск зрительного нерва'
        verbose_name_plural = 'Диски зрительных нервов'

class DiagnosisChoice(ChoiceItem):
    '''Выбор диагноза'''
    
    class Meta:
        verbose_name = 'Выбор диагноза'
        verbose_name_plural = 'Выбор диагноза'


class Diagnosis(models.Model):
    '''Модель диагноза'''
    EYE_CHOICES = (
        (1, 'Левый'),
        (2, 'Правый'),
    )

    side = models.CharField('Тип глаза', max_length=6, default=1)
    name = models.TextField('Название диагноза', default='', max_length=100)
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

@receiver(post_save, sender=Examination)
def create_instances_for_exam(sender, instance=None, created=False, **kwargs):
    '''Создает доп. модели'''
    if created:
        EyeInfo.objects.create(exam=instance, side=1)
        EyeInfo.objects.create(exam=instance, side=2)
        Recomendation.objects.create(id=instance.id, exam=instance)

@receiver(post_save, sender=EyeInfo)
def create_instances_for_info(sender, instance=None, created=False, **kwargs):
    '''Создает доп. модели'''
    if created:
        DZN.objects.create(id=instance.id, info=instance)