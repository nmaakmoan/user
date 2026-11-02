from django.contrib.auth.models import User
from django.http import JsonResponse


def get_users(request):
    search = request.GET.get("search", "").strip()
    email = request.GET.get("email", "").strip()

    users = User.objects.all()

    if search:
        users = users.filter(username__icontains=search)

    if email:
        users = users.filter(email__icontains=email)

    data = list(users.values("id", "username", "email"))
    return JsonResponse(data, safe=False)
