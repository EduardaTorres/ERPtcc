# Generated by Django 5.0.4 on 2024-08-07 23:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vendas', '0006_venda_parcelas'),
    ]

    operations = [
        migrations.AlterField(
            model_name='venda',
            name='Parcelas',
            field=models.IntegerField(default=1),
        ),
    ]
