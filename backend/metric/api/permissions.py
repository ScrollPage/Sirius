from rest_framework.permissions import BasePermission
from django.shortcuts import get_object_or_404

from ..models import Sequence


class LessOrEqThanLen(BasePermission):
    '''Меньше, чем длина массива'''
    def has_permission(self, request, view):
        ind = request.data['index']
        seq = get_object_or_404(Sequence, id=request.data['sequence'])
        return int(ind) <= seq.length

class NoSuchPoint(BasePermission):
    '''Точка с определенным индексом может быть только одна'''
    def has_permission(self, request, view):
        ind = request.data['index']
        seq = get_object_or_404(Sequence, id=request.data['sequence'])
        return not seq.points.filter(index=int(ind)).exists()