from django.contrib.auth.models import User

examples = [
    ("magamet", "test@gmail.com"),
    ("magomed", "magomed@gmail.com"),
    ("ali", "ali@mail.com"),
    ("arslan", "arslan@yahoo.com"),
]

for username, email in examples:
    User.objects.get_or_create(
        username=username,
        defaults={"email": email},
    )

print("Тестовые пользователи добавлены.")
