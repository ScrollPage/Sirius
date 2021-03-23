from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin, ListModelMixin, RetrieveModelMixin
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

from cacheops import cached_as, cached
from url_filter.filtersets import ModelFilterSet

from patient.models import Patient
from exam.models import Examination
from backend.core import (
    FastResponseMixin, PermissionMixin, 
    SerializerMixin
)

class FSCListCreateRetrieveViewSet(
    FastResponseMixin, SerializerMixin,
    RetrieveModelMixin, CreateModelMixin,
    ListModelMixin, GenericViewSet, 
):
    '''
    Функция быстрого ответа, переопределение определения сериализатора
    Создание, список
    '''

class PatientPagination(PageNumberPagination):
    '''Пагинация пользователей'''
    page_size = 50
    max_page_size = 1000
    
    def get_page_number(self, request, paginator):
        page_number = request.query_params.get(self.page_query_param, 1)
        if page_number in self.last_page_strings:
            page_number = paginator.num_pages
        return page_number

    def paginate_queryset(self, queryset, request, view=None):
        """
        Paginate a queryset if required, either returning a
        page object, or `None` if pagination is not configured for this view.
        """
        page_size = self.get_page_size(request)
        if not page_size:
            return None

        paginator = self.django_paginator_class(queryset, page_size)
        page_number = self.get_page_number(request, paginator)

        try:
            self.page = paginator.page(page_number)
        except InvalidPage as exc:
            msg = self.invalid_page_message.format(
                page_number=page_number, message=str(exc)
            )
            raise NotFound(msg)

        if paginator.num_pages > 1 and self.template is not None:
            # The browsable API should display pagination controls.
            self.display_page_controls = True

        self.request = request
        @cached_as(queryset, extra=(request.query_params))
        def _get_result():
            return list(self.page)

        return _get_result()

    def get_paginated_response(self, data):
        col = int(self.page.paginator.count/self.page_size)
        return Response(
            {
                'page_num': col if not self.page.paginator.count%self.page_size else col + 1, 
                'data': data
            }
        )

class ExamFilterSet(ModelFilterSet):
    class Meta:
        model = Examination

def parse_query_params_to_string(request):
    params = request.query_params
    res = '&'.join(f'{key}={val}' for key, val in params.items())
    return res