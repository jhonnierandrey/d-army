# Generated by Django 3.2.5 on 2021-08-20 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0002_bid_category_comment_listing_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='listing',
            name='image',
            field=models.CharField(max_length=60, null=True),
        ),
        migrations.DeleteModel(
            name='Picture',
        ),
    ]