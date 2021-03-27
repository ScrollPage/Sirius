from django.conf import settings
from django.core.mail import send_mail

# from backend.celery import app as celery_app

# @celery_app.task
def send_warning_email(user_email: str, key: str):
    send_mail(
        'Это были вы?',
        f'Перейдите по ссылке, чтобы подствердить действие: {settings.REACT_DOMAIN}/account-confirmation?token={key}',
        settings.EMAIL_HOST_USER,
        [user_email],
        fail_silently=False
    )

def create_code():
    return ''.join(
        random.choice(string.ascii_letters.split('z')[1] + string.digits) \
            for _ in range(6)
    )