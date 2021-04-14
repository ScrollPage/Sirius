from django.db import models
from django.dispatch import receiver
from django.conf import settings

from .service import create_token, send_warning_email

from backend.signals import got_protected


class ProtectionToken(models.Model):
    '''Защитный токен'''
    token = models.CharField(max_length=6, unique=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name='Работник', 
        on_delete=models.CASCADE,
        related_name='token'
    )
    chat_id = models.CharField(max_length=50, null=True)

    @classmethod
    def create_unique_token(cls, user):
        cls.objects.filter(user=user).delete()
        while True:
            token, created = cls.objects.get_or_create(
                user=user, token=create_token()
            )
            if created:
                return token
            else:
                pass

    class Meta:
        verbose_name = 'Токен для защиты пользователя'
        verbose_name_plural = 'Токены для защиты поьзователя'


@receiver(got_protected)
def create_protection_token(sender, user, **kwargs):
    '''Создание токена и отправка его на почту'''
    token = ProtectionToken.create_unique_token(user)
    # send_warning_email(user.email, token.token)