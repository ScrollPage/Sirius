from rest_framework import status
from rest_framework.response import Response

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