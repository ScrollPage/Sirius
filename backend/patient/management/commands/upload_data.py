from django.core.management.base import BaseCommand
from django.conf import settings

import psycopg2

from patient.management.service import Executor 

class Command(BaseCommand):
    '''Uploads all data from postgreSQL DB'''

    HOST = settings.DATABASES['default']['HOST']
    PORT = settings.DATABASES['default']['PORT']
    USER = settings.DATABASES['default']['USER']
    PASSWORD = settings.DATABASES['default']['PASSWORD']
    NAME = settings.DATABASES['default']['NAME'] + '_sirius'

    def handle(self, *args, **options):
        conn = psycopg2.connect(
            host=self.HOST,
            database=self.NAME,
            user=self.USER,
            password=self.PASSWORD,
            port=self.PORT,
        )
        executor = Executor(conn)
        models = ['patient', 'examination', 'port', 'sequence']
        list(map(executor.manage_data, models))
        executor.close()
