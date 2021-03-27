from rest_framework import serializers, exceptions
from django.contrib.auth.models import User
from django.conf import settings

from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer, TokenRefreshSerializer, TokenObtainSerializer
)
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
from djoser.serializers import UserCreateSerializer
from psycopg2 import OperationalError

from backend.core import RedisExecutor, got_protected

class ProtectedTokenObtainSerializer(TokenObtainSerializer):
    '''Переопределена валидация, чтобы можно было отловить злоумыленника!'''

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if settings.ENABLE_AUTH_PROTECTION:
            self.fields["fingerprint"] = serializers.CharField(max_length=32, min_length=32)

    def validate(self, attrs):
        authenticate_kwargs = {
            self.username_field: attrs[self.username_field],
            'password': attrs['password'],
        }
        try:
            authenticate_kwargs['request'] = self.context['request']
        except KeyError:
            pass

        self.user = authenticate(**authenticate_kwargs)

        if not getattr(login_rule, user_eligible_for_login)(self.user):
            raise exceptions.AuthenticationFailed(
                self.error_messages['no_active_account'],
                'no_active_account',
            )
        else:
            conn = RedisExecutor(user, self.context['request'])
            conn.validate()

        return {}

class ProtectedTokenObtainPairSerializer(
    ProtectedTokenObtainSerializer,
    TokenObtainPairSerializer
):
    '''Защищенный сериализатор получения пары токенов'''
    pass

class ProtectedTokenRefreshSerializer(
    ProtectedTokenObtainSerializer, 
    TokenRefreshSerializer
):
    '''Переопределена валидация, чтобы можно было отловить злоумыленника!'''

    def validate(self, attrs):
        refresh = attrs['refresh']
        try:
            token = OutstandingToken.objects.get(token=refresh)
        except OperationalError:
            pass
        else:
            conn = RedisExecutor(token.user, self.context['request'])
            conn.validate()
            
        refresh = RefreshToken(refresh)

        data = {'access': str(refresh.access_token)}

        if api_settings.ROTATE_REFRESH_TOKENS:
            if api_settings.BLACKLIST_AFTER_ROTATION:
                try:
                    # Attempt to blacklist the given refresh token
                    refresh.blacklist()
                except AttributeError:
                    # If blacklist app not installed, `blacklist` method will
                    # not be present
                    pass

            refresh.set_jti()
            refresh.set_exp()

            data['refresh'] = str(refresh)

        return data

class ProtectedUserCreateSerializer(UserCreateSerializer):
    '''Добавлен фингерпринт при регистрации'''
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if settings.ENABLE_AUTH_PROTECTION:
            self.fields["fingerprint"] = serializers.CharField(
                max_length=32, min_length=32, write_only=True
            )

    def validate(self, attrs):
        if settings.ENABLE_AUTH_PROTECTION:
            attrs.pop("fingerprint")
        return super().validate(attrs)
