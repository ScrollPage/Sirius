# Generated by Django 3.1.7 on 2021-04-14 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0004_diagnosis_diagnosischoice'),
    ]

    operations = [
        migrations.AddField(
            model_name='diagnosis',
            name='name',
            field=models.TextField(choices=[], default='', max_length=100, verbose_name='Название диагноза'),
        ),
    ]
