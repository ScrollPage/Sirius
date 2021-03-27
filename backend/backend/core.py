from rest_framework import status, exceptions
from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from django.conf import settings

import redis

from .signals import got_protected

class PermissionMixin:
    '''Mixin permission для action'''
    def get_permissions(self):
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]] 
        except KeyError:
            return [permission() for permission in self.permission_classes]


class SerializerMixin:
    '''Класс сериализатора в зависимости от action'''
    def get_serializer_class(self):
        try:
            return self.serializer_class_by_action[self.action]
        except KeyError:
            return self.serializer_class


class PermissionSerializerMixin(PermissionMixin, SerializerMixin):
    '''Доп классы'''
    pass


class FastResponseMixin:
    '''Функция быстрого ответа'''

    def fast_response(
        self, field, status=status.HTTP_200_OK,
        many=True, filtering='all'
    ):
        instance = self.get_object()
        instances = getattr(getattr(instance, field), filtering)()
        serializer = self.get_serializer(instances, many=True)
        return Response(serializer.data, status=status)



def get_user_ip(request):
    '''Получение ip пользователя'''
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    
    return ip

class RedisExecutor:
    '''Для работы с редисом'''

    def is_prot_enabled(func):

        def wrapper(self, user=None, request=None):
            if settings.ENABLE_AUTH_PROTECTION:
                func(self, user, request)
            else:
                pass
        
        return wrapper

    @is_prot_enabled
    def __init__(self, user, request):
        pool = redis.ConnectionPool(
            host=settings.REDIS_HOST, 
            port=settings.REDIS_PORT, 
            db=settings.DEFAULT_APP_REDIS_DB,
            decode_responses=True
        )
        self.conn = redis.Redis(connection_pool=pool)
        self.user = user
        self.request = request

    @is_prot_enabled
    def validate(self, *args):
        ips = self.conn.smembers(f'user_{self.user.id}_ip')
        fingers = self.conn.smembers(f'user_{self.user.id}_fingerprint')

        if get_user_ip(self.request) not in ips or \
            self.request.get['fingerprint'] not in finger:
            got_protected.send(sender=self.user.__class__, user=user)
            raise exceptions.NotAcceptable(f'The given data is not valid for this user.')

    @is_prot_enabled
    def add_data_to_sets(self, *args):
        self.conn.sadd(f'user_{self.user.id}_ip', get_user_ip(self.request))
        self.conn.sadd(
            f'user_{self.user.id}_fingerprint', 
            self.request.data['fingerprint']
        )