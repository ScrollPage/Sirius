from django.core.management.base import BaseCommand
from django.conf import settings

from ...models import MakulaChoice, PereferyChoice, ColorChoice, BorderChoice

class Command(BaseCommand):
    '''Fills up the choices'''

    def handle(self, *args, **options):

        makula_list = [
            'Без очажковых изменений', 'Рефлекс смазан', 
            'Отек', 'Дистрофические изменения'
        ]
        for name in makula_list:
            MakulaChoice.objects.create(name=name)

        perefery_list = [
            'Без оссобенностей', 'Дистрофические изменения', 
            'Отложения пигмента'
        ]
        for name in perefery_list:
            PereferyChoice.objects.create(name=name)

        color_list = [
            'Бледно-розовый', 'Бледный', 'Желтовато-белый', 
            'Побледнения с темпоральной стороны'
        ]
        for name in color_list:
            ColorChoice.objects.create(name=name)

        border_list = ['Четкие', 'Нечеткие']
        for name in border_list:
            BorderChoice.objects.create(name=name)