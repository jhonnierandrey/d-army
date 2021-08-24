from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.db.models import fields
from django.forms.models import modelformset_factory
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.forms import ModelForm
from django.contrib.auth.decorators import login_required

from .models import *

# MODELS
class newListingForm(ModelForm):
    class Meta:
        model = Listing
        fields = ['title', 'image', 'description', 'startingBid', 'category']


class newBidForm(ModelForm):
    class Meta:
        model = Bid
        fields = ['offer']


class newCommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = ['comment']


# VIEWS
def index(request):
    listings = Listing.objects.all()
    categories = Category.objects.all()

    return render(request, "auctions/index.html", {
        'listings' : listings,
        'page_title' : 'Home',
        'categories' : categories
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")

@login_required
def new_listing(request):
    if request.method == 'POST':
        form = newListingForm(request.POST)

        if form.is_valid():
            newListing = form.save(commit=False)
            newListing.creator = request.user
            newListing.save()
            
            return render(request, 'auctions/newListing.html', {
                'form' : newListingForm(),
                'success' : True,
                'categories' : Category.objects.all()
            })
        else:
            return render(request, 'auctions/newListing.html', {
                'form' : newListingForm(),
                'message' : 'error',
                'categories' : Category.objects.all()
            })
    else:
        return render(request, 'auctions/newListing.html', {
            'form' : newListingForm(),
            'categories' : Category.objects.all()
        })

def active_listings(request):
    category_id = request.GET.get('category', None)
    
    if category_id is None:
        listings = Listing.objects.filter(flActive=True)
    else:
        listings = Listing.objects.filter(flActive=True, category=category_id)
    
    categories = Category.objects.all()

    for listing in listings:
        if request.user in listing.watchers.all():
            listing.is_watched = True
        else:
            listing.is_watched = False
    
    return render(request, 'auctions/index.html', {
        'listings' : listings,
        'categories' : categories,
        'page_title' : 'Active Listings'
    })


def categories(request, category_id):
    
    if category_id is None:
        listings = Listing.objects.filter(flActive=True)
    else:
        listings = Listing.objects.filter(flActive=True, category=category_id)
    
    categories = Category.objects.all()
    
    return render(request, 'auctions/index.html', {
        'listings' : listings,
        'categories' : categories,
        'category' : Category.objects.filter(pk = category_id).first(),
        'page_title' : 'Categories'
    })

@login_required
def watchlist(request):
    listings = request.user.watched_listings.all()
    categories = Category.objects.all()
    for listing in listings:
        if request.user in listing.watchers.all():
            listing.is_watched = True
        else:
            listing.is_watched = False
    return render(request, 'auctions/index.html', {
        'listings' : listings,
        'page_title' : 'My watchlist',
        'categories' : categories
    })

@login_required
def change_watchlist(request, listing_id, reverse_method):
    listing_object = Listing.objects.get(id=listing_id)
    if request.user in listing_object.watchers.all():
        listing_object.watchers.remove(request.user)
    else:
        listing_object.watchers.add(request.user)
    
    if reverse_method == 'listing':
        return listing(request, listing_id)
    else:
        return HttpResponseRedirect(reverse('login'))

def listing(request, listing_id):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse('login'))
    
    listing = Listing.objects.get(id=listing_id)

    if request.user in listing.watchers.all():
        listing.is_watched = True
    else:
        listing.is_watched = False
    
    return render(request, 'auctions/listing.html', {
        'listing' : listing,
        'form' : newBidForm(),
        'comments' : listing.get_comments.all(),
        'comment_form' : newCommentForm()
    })

@login_required
def take_bid(request, listing_id):
    listing = Listing.objects.get(id=listing_id)
    
    offer = float(request.POST['offer'])

    if is_valid(offer, listing):
        listing.currentBid = offer
        form = newBidForm(request.POST)
        newBid = form.save(commit=False)
        newBid.auction = listing
        newBid.user = request.user
        newBid.save()
        listing.save()
        return HttpResponseRedirect(reverse('listing', args=[listing_id]))
    else:
        return render(request, 'auctions/listing.html', {
            'listing' : listing,
            'form' : newBidForm(),
            'error_min_value' : True
        })

def is_valid(offer, listing):
    if offer >= listing.startingBid and (listing.currentBid is None or offer > listing.currentBid):
        return True
    else:
        return False

def close_listing(request, listing_id):
    listing = Listing.objects.get(id=listing_id)
    if request.user == listing.creator:
        listing.flActive = False
        
        try:
            listing.buyer = Bid.objects.filter(auction=listing).last().user
        except:
            listing.buyer = listing.creator
        
        listing.save()
        
        return HttpResponseRedirect(reverse('listing', args=[listing_id]))
    else:
        listing.watchers.add(request.user)
    return HttpResponseRedirect(reverse('watchlist'))

@login_required
def comment(request, listing_id):
    listing = Listing.objects.get(id=listing_id)
    form = newCommentForm(request.POST)
    newComment = form.save(commit=False)
    newComment.user = request.user
    newComment.listing = listing
    newComment.save()
    return HttpResponseRedirect(reverse('listing', args=[listing_id]))


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")
