# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('booking_engine', '0053_auto_20150802_0026'),
    ]

    operations = [
        migrations.AlterField(
            model_name='booking_engine_buyers',
            name='pincode',
            field=models.CharField(max_length=200),
        ),
    ]
