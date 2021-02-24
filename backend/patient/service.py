from django.conf import settings
from django.core.mail import send_mail

# from backend.celery import app as celery_app

def send_activation_email(user_email, key):
    send_mail(
        'Подтверждение регистрации',
        f'Перейдите по ссылке, чтобы завершить регистрацию: {settings.REACT_DOMAIN}/account-activation?token={key}',
        settings.EMAIL_HOST_USER,
        [user_email],
        fail_silently=False
    )