# Generated by Django 3.2.23 on 2024-01-11 20:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notifications', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='title',
            field=models.CharField(default='Default Title', max_length=100),
        ),
    ]