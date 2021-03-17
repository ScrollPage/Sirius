from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, 
    BaseUserManager, 
    PermissionsMixin
)

from random import randint

from .service import send_activation_email

class Patient(models.Model):
    '''Кастомная модель пользователя'''
    email = models.EmailField('Почта', max_length=60, unique=True)
    birth_date = models.DateField('Дата рождения')
    first_name = models.CharField('Имя', max_length=30)
    last_name = models.CharField('Фамилия', max_length=30)
    created = models.DateTimeField('Создан', auto_now_add=True)
    updated = models.DateTimeField('Обновлен', auto_now=True)
    sex = models.BooleanField('Пол', default=True)
    is_staff = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name
        
    class Meta:
        verbose_name = 'Пациент'
        verbose_name_plural = 'Пациенты'
        db_table = 'patient_v2'

    @property
    def full_name(self):
        return f'{self.last_name} {self.first_name}'
