# Generated by Django 3.1.7 on 2021-04-14 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0006_auto_20210414_2020'),
    ]

    operations = [
        migrations.AlterField(
            model_name='diagnosis',
            name='name',
            field=models.TextField(choices=[(1, 'Глаукома'), (2, 'Оптическая нейропатия'), (3, 'Оптическая нейропатия2')], default='', max_length=100, verbose_name='Название диагноза'),
        ),
    ]