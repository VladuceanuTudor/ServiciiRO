# Generated by Django 3.1.3 on 2021-04-21 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('servicii', '0003_auto_20210420_1413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='category',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='post',
            name='judet',
            field=models.CharField(max_length=40),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.DeleteModel(
            name='Judet',
        ),
    ]
