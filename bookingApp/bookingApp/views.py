from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login
#from django.contrib.auth.models import User

def home(request):
    return render(
        request, 'bookingApp/devCreate.html'
)

'''
### Fix links 
def login(request):
    if (request.method == 'GET'):
        return render(request, "devLogin.html", {})
    else:
        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']

            developer = User.objects.filter(username=username).first()
            
            if request.POST.get("action") == "login":
                developer = authenticate(username=username,password=password)
                if developer is not None:
                    login(request, developer)
                    return redirect('devHome')
                else:
                    return render(request, "devLogin.html", {"error": "Invalid Credentials"})
            elif request.POST.get("action") == "signup":
                if developer is None:
                    # Add developer signup logic here
                    user = User.objects.create_user(username=username, password=password)
                    login(request, user)
                    return redirect('devHome')
                else:
                    return render(request, "devLogin.html", {"error": "Invalid Credentials"})
    
   
def dev(request, name):
    return render()

'''