from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return render(
        request, 'bookingApp/userPage.html'
    )

def login(request, name):
    return render()
    
def dev(request, name):
    return render()