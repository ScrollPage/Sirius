import django
from django.shortcuts import get_object_or_404

import psycopg2
import time

from patient.models import Patient
from exam.models import Examination, SubExam
from metric.models import Sequence

class Creator:
    '''Create all of the required data'''

    def create_patient(self, rows):
        print('creating patients')
        if len(rows) != Patient.objects.all().count():
            for user in rows:
                try:
                    sex = 0 if user[4] == 'ж' else 1
                    user = Patient.objects.create(
                        id=user[0],
                        first_name=user[1],
                        last_name=user[2],
                        birth_date=user[3],
                        sex=bool(sex),
                        created=user[6],
                        updated=user[7]
                    )
                except django.db.utils.IntegrityError:
                    print(f'Patient with id={user[0]} already exists!')
                    pass
    
    def create_port(self, rows):
        print('creating subexams')
        if len(rows) != SubExam.objects.all().count():
            for subexam in rows:
                try:
                    SubExam.objects.create(
                        id=subexam[0],
                        exam=get_object_or_404(Examination, id=subexam[1]),
                        check_type=subexam[3],
                        check_version=subexam[4],
                        created=subexam[5],
                        updated=subexam[6],
                    )
                except django.db.utils.IntegrityError:
                    print(f'SubExam with id={subexam[0]} already exists!')
    
    def create_sequence(self, rows):
        print('creating sequences')
        begin_id = 128356
        if len(rows) != Sequence.objects.all().count():
            for seq in rows:
                try:
                    Sequence.objects.create(
                        id=seq[0]-begin_id,
                        length=seq[1],
                        created=seq[2],
                        updated=seq[3],
                        sub_exam=get_object_or_404(SubExam, id=seq[5]),
                        values=seq[8]
                    )
                except django.db.utils.IntegrityError:
                    print(f'Sequence with id={seq[0]} already exists!')

    def create_examination(self, rows):
        print('creating exams')
        if len(rows) != Examination.objects.all().count():
            for exam in rows:
                try:
                    Examination.objects.create(
                        id=exam[0],
                        patient=get_object_or_404(Patient, id=exam[1]),
                        created=exam[2],
                        updated=exam[3],
                        check_type=exam[4],
                        diagnosis=exam[5],
                        clinic=exam[6],
                    )
                except django.db.utils.IntegrityError:
                    print(f'Exam with id={exam[0]} already exists!')

class Executor:
    '''Executes SQL commands and grabs all of the data'''

    def __init__(self, conn):
        self.conn = conn
        self.cursor = conn.cursor()
        self.creator = Creator()

    def close(self):
        self.cursor.close()
        self.conn.close()

    def get_data(self, db_table):
        self.cursor.execute(f'SELECT * FROM {db_table};')
        # print(f'getting data from {db_table}')
        return self.cursor.fetchall()

    def manage_data(self, db_table):
        rows = self.get_data(db_table)
        getattr(self.creator, f'create_{db_table}')(rows)
