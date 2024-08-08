# Generated by Django 5.0.4 on 2024-08-07 23:58

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('compras', '0003_itenscompra_nomeproduto'),
        ('vendas', '0007_alter_venda_parcelas'),
    ]

    operations = [
        migrations.CreateModel(
            name='Conta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Valor', models.DecimalField(decimal_places=2, max_digits=10)),
                ('DataVencimento', models.DateField()),
                ('DataEntrada', models.DateField(blank=True, null=True)),
                ('Status', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='ContaPagar',
            fields=[
                ('conta_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, to='contas.conta')),
                ('IdContaPagar', models.AutoField(primary_key=True, serialize=False)),
                ('IdCompra', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='compras.compra')),
            ],
            options={
                'verbose_name': 'ContaPagar',
                'verbose_name_plural': 'ContasPagar',
                'ordering': ['IdContaPagar'],
            },
            bases=('contas.conta',),
        ),
        migrations.CreateModel(
            name='ContaReceber',
            fields=[
                ('conta_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, to='contas.conta')),
                ('IdContaReceber', models.AutoField(primary_key=True, serialize=False)),
                ('IdVenda', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vendas.venda')),
            ],
            options={
                'verbose_name': 'ContaReceber',
                'verbose_name_plural': 'ContasReceber',
                'ordering': ['IdContaReceber'],
            },
            bases=('contas.conta',),
        ),
    ]
