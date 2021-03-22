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
    name = models.CharField(max_length=50)
    value = models.DecimalField('Значение', max_digits=12, decimal_places=6)
    valueT = models.DecimalField('Значение T', max_digits=12, decimal_places=6)
    normal = models.CharField(max_length=50)
    show = models.IntegerField(default=0)
    active = models.IntegerField(default=0)

    def __str__(self):
        return f'point in {self.sequence}'

    class Meta:
        verbose_name = 'Точка'
        verbose_name_plural = 'Точки'
        db_table = 'point'

class Value(models.Model):
    '''Значение в последовательности измерений'''
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length=50)
    value = models.DecimalField('Значение', max_digits=12, decimal_places=6)
    unit = models.CharField(max_length=20)
    normal = models.CharField(max_length=50)

    def __str__(self):
        return f'value in {self.sequence}'

    class Meta:
        verbose_name = 'Значение'
        verbose_name_plural = 'Значения'
        db_table = 'value'