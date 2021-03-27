from rest_framework.permissions import BasePermission

class LessOrEqThanLen(BasePermission):
    '''Меньше, чем длина массива'''
    def has_object_permission(self, request, view, obj):
        try: 
            ind = request.data['index']
        except KeyError:
            return True
        print(type(obj))
        return int(ind) <= obj.length

class NoSuchPoint(BasePermission):
    '''Точка с определенным индексом может быть только одна'''
    def has_object_permission(self, request, view, obj):
        try: 
            ind = request.data['index']
        except KeyError:
            return True
        return not obj.points.filter(index=int(ind)).exists()