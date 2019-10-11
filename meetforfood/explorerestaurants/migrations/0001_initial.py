# Generated by Django 2.2.6 on 2019-10-11 06:58

from django.db import migrations, models
import django.db.models.deletion
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='RestaurantInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('location', models.CharField(max_length=460)),
                ('email', models.EmailField(max_length=256, unique=True)),
                ('phone_no', phonenumber_field.modelfields.PhoneNumberField(max_length=128, region=None)),
                ('reservation_status', models.CharField(choices=[('A', 'Available'), ('U', 'Unavailable')], default='Unavailable', max_length=1)),
                ('has_offer', models.CharField(choices=[('Y', 'Yes'), ('N', 'No')], default='No', max_length=1)),
            ],
        ),
        migrations.CreateModel(
            name='MenuInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('item_name', models.CharField(max_length=120)),
                ('serving', models.IntegerField()),
                ('price', models.CharField(max_length=10)),
                ('restaurant_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='explorerestaurants.RestaurantInfo')),
            ],
        ),
    ]
