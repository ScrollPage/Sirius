from django.db import models
from django.dispatch import receiver
from django.conf import settings

from .service import create_code, send_warning_email

from backend.signals import got_protected


class ProtectionToken(models.Model):
    '''Защитный токен'''
    code = models.CharField(max_length=6, unique=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, verbose_name='Работник', 
        on_delete=models.CASCADE,
        related_name='tg_code'
    )
    chat_id = models.CharField(max_length=50, null=True)

    @classmethod
    def create_unique_token(cls, user) -> models.Model:
        while True:
            code, created = cls.objects.get_or_create(
                user=user, code=create_code()
            )
            if created:
                return code
            else:
                pass

    class Meta:
        verbose_name = 'Токен для защиты пользователя'
        verbose_name_plural = 'Токен для защиты поьзователя'

@receiver(got_protected)
def create_protection_token(sender, user, **kwargs):
    '''Создание токена и отправка его на почту'''
    token = ProtectionToken.create_unique_token(user)
    send_warning_email(user.email, token.token)