# Generated by Django 3.1.7 on 2021-04-22 13:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0009_auto_20210415_2147'),
    ]

    operations = [
        migrations.AddField(
            model_name='diagnosis',
            name='side',
            field=models.CharField(default=1, max_length=6, verbose_name='Тип глаза'),
        ),
    ]
