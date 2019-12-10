# Generated by Django 3.0 on 2019-12-10 15:49

from django.db import migrations
import multiselectfield.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ('explorerestaurants', '0002_auto_20191206_1821'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurantinfo',
            name='category',
            field=multiselectfield.db.fields.MultiSelectField(choices=[('Bangladeshi', 'Bangladeshi'), ('Chinese', 'Chinese'), ('Indian', 'Indian'), ('Italian', 'Italian'), ('Thai', 'Thai'), ('Japanese', 'Japanese'), ('Korean', 'Korean'), ('Fast_Food', 'Fast Food'), ('Juice_Bar', 'Juice Bar'), ('Coffee_Shop', 'Coffee Shop'), ('IceCream_Shop', 'Ice Cream Shop'), ('Buffet', 'Buffet'), ('Turkish', 'Turkish'), ('Bakery', 'Bakery'), ('Cake_Shop', 'Cake Shop')], default='Bangladeshi', max_length=100),
        ),
    ]
