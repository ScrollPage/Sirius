from django.db import models
from django.contrib.postgres.fields import ArrayField

from exam.models import SubExam

class Sequence(models.Model):
    '''Последовательность измерений'''
    sub_exam = models.ForeignKey(
        SubExam, verbose_name='Подъисследование', 
        related_name='sequences', on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    length = models.PositiveIntegerField(default=0)
    values = ArrayField(models.DecimalField(max_digits=10, decimal_places=9))
    eye = models.CharField('Глаз', max_length=1)
    name = models.CharField('Название', max_length=100, null=True)

    def __str__(self):
        return f'sequence of sub exam {self.sub_exam}'

    class Meta:
        verbose_name = 'Последовательность'
        verbose_name_plural = 'Последовательности'
        db_table = 'sequence'

class Point(models.Model):
    '''Точка в последовательности измерений'''
    sequence = models.ForeignKey(
        Sequence, verbose_name='Последовательность', 
        related_name='points', on_delete=models.CASCADE
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    index = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'point in {self.sequence}'

    class Meta:
        verbose_name = 'Точка'
        verbose_name_plural = 'Точки'
        db_table = 'point'
