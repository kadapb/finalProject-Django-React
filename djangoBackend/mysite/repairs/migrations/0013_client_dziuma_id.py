# Generated by Django 4.2.7 on 2023-12-12 20:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('repairs', '0012_alter_repair_date_returned'),
    ]

    operations = [
        migrations.AddField(
            model_name='client',
            name='dziuma_id',
            field=models.CharField(default=0, max_length=255, unique=True),
            preserve_default=False,
        ),
    ]
