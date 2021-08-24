from django.urls import path

from .views import *

urlpatterns = [
    path("", index, name="index"),
    path("login", login_view, name="login"),
    path("logout", logout_view, name="logout"),
    path("register", register, name="register"),
    path('new-listing', new_listing, name='new-listing'),
    path('categories/<int:category_id>', categories, name='categories'),
    path('active-listings', active_listings, name='active-listings'),
    path('close-listing/<int:listing_id>', close_listing, name='close-listing'),
    path('listing/<int:listing_id>', listing, name='listing'),
    path('comment/<int:listing_id>', comment, name='comment'),
    path('place-bid/<int:listing_id>', take_bid, name='place-bid'),
    path('watchlist', watchlist, name='watchlist'),
    path('watchlist/<int:listing_id>/<str:reverse_method>', change_watchlist, name='watchlist-toggler'),
]
