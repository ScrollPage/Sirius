# Generated by Django 3.1.7 on 2021-04-14 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('birth_date', models.DateField(null=True, verbose_name='Дата рождения')),
                ('name', models.CharField(max_length=100, null=True, verbose_name='Полное имя')),
                ('created', models.DateTimeField(auto_now_add=True, verbose_name='Создан')),
                ('updated', models.DateTimeField(auto_now=True, verbose_name='Обновлен')),
                ('sex', models.BooleanField(default=True, verbose_name='Пол')),
            ],
            options={
                'verbose_name': 'Пациент',
                'verbose_name_plural': 'Пациенты',
                'db_table': 'patient',
            },
        ),
    ]
