from django.urls import path
from bookingApp import views

urlpatterns = [
    path("", views.home, name="home"),
]
