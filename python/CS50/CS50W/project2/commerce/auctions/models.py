from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    pass

class Category(models.Model):
    category = models.CharField(max_length=30)

    def __str__(self):
        return f'{self.category}'

class Listing(models.Model):
    title = models.CharField(max_length=60)
    image = models.CharField(max_length=500, null=True)
    flActive = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)
    description = models.CharField(null=True, max_length=300)
    startingBid = models.FloatField()
    currentBid = models.FloatField(blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='similar_listings')
    creator = models.ForeignKey(User, on_delete=models.PROTECT, related_name='all_creators_listings')
    watchers = models.ManyToManyField(User, blank=True, related_name='watched_listings')
    buyer = models.ForeignKey(User, null=True, on_delete=models.PROTECT)

    def __str__(self):
        return f'{self.title} - {self.startingBid}'

class Bid(models.Model):
    auction = models.ForeignKey(Listing, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    offer = models.FloatField()
    date = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    comment = models.CharField(max_length=100)
    createdDate = models.DateTimeField(default=timezone.now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='get_comments')

    def get_creation_date(self):
        return self.createdDate.strftime('%B %d %Y')
