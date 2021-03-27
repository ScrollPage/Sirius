from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, 
    BaseUserManager, 
    PermissionsMixin
)
from django.conf import settings

from djoser.signals import user_registered
from cacheops import invalidate_obj
from random import randint

from backend.core import RedisExecutor


class Patient(models.Model):
    '''Кастомная модель пользователя'''
    birth_date = models.DateField('Дата рождения', null=True)
    name = models.CharField('Полное имя', max_length=100, null=True)
    created = models.DateTimeField('Создан', auto_now_add=True)
    updated = models.DateTimeField('Обновлен', auto_now=True)
    sex = models.BooleanField('Пол', default=True)

    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name = 'Пациент'
        verbose_name_plural = 'Пациенты'
        db_table = 'patient'

@receiver(post_save, sender=Patient)
def invalidate_patient(sender, instance=None, created=False, **kwargs):
    '''Создает необходимые сущности'''
    if not created:
        invalidate_obj(instance)

@receiver(user_registered)
def save_ip_addr(sender, user, request, **kwargs):
    '''Добавляет айпи в пользователя в базу redis'''
    conn = RedisExecutor(user, request)
    conn.add_data_to_sets()
