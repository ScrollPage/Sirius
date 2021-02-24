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

class PatientManager(BaseUserManager):
    '''Мeнeджер кастомного пользователя'''

    def create_user(self, email, birth_date, sex,
        first_name, last_name, password=None):
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            sex=sex, 
            birth_date=birth_date,
        )
        user.set_password(password)
 
        user.save(using=self._db)

        return user

    def create_superuser(self, email, birth_date, sex,
        first_name, last_name, password=None):
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            sex=sex, 
            birth_date=birth_date,
        )
        user.set_password(password)

        user.is_superuser = True
        user.is_active = True
        user.is_staff = True

        user.save(using=self._db)
        return user

class Patient(AbstractBaseUser, PermissionsMixin):
    '''Кастомная модель пользователя'''
    email = models.EmailField('Почта', max_length=60, unique=True)
    birth_date = models.DateField('Дата рождения')
    first_name = models.CharField('Имя', max_length=30)
    last_name = models.CharField('Фамилия', max_length=30)
    created = models.DateTimeField('Создан', auto_now_add=True)
    updated = models.DateTimeField('Обновлен', auto_now=True)
    sex = models.BooleanField('Пол', default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'sex', 'birth_date']

    objects = PatientManager()

    def __str__(self):
        return self.full_name
        
    class Meta:
        verbose_name = 'Пациент'
        verbose_name_plural = 'Пациенты'
        db_table = 'patient'

    @property
    def full_name(self):
        return f'{self.last_name} {self.first_name}'