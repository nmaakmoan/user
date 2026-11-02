ПОИСК ПОЛЬЗОВАТЕЛЕЙ — Django + React + TypeScript + Axios

1. Распакуй архив.
2. Открой папку users-search в VS Code.

BACKEND:
Открой терминал:
cd backend
python -m venv venv
.\venv\Scripts\Activate
pip install -r requirements.txt
python manage.py migrate
python manage.py shell

В Django shell вставь:
exec(open("seed_users.py").read())
exit()

Запуск Django:
python manage.py runserver

FRONTEND:
Открой второй терминал в VS Code из корня проекта:
cd frontend
npm install
npm run dev

Открой http://localhost:5173

API:
GET /api/users/
GET /api/users/?search=mag
GET /api/users/?email=gmail
GET /api/users/?search=mag&email=gmail

Если команда python не работает, попробуй py вместо python.
