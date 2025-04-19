# WhyDoToday - To-Do List App

WhyDoToday is a productivity app built to help users manage tasks. 
This project uses React.js (Vite) for the frontend and Django REST Framework for the backend.

## Tech Stack

### Frontend
- React.js (Vite)
- Axios (API calls)
- React Router (Navigation)
- Tailwind CSS / CSS Modules (customizable styling)

### Backend
- Django
- Django REST Framework
- SQLite / PostgreSQL (Database)

## Screenshot

### Main Page
![image](https://github.com/user-attachments/assets/7332f3db-46c2-4722-9f20-ad6e6f1fa294)

![image](https://github.com/user-attachments/assets/ab293ea8-1e72-4516-a2d9-02edd40f1931)

### Authentication

![image](https://github.com/user-attachments/assets/6449b347-bbed-4290-bc83-78539a5e60c5)

## Project Structure

```
whydo-today/
├── backend/
│   ├── manage.py
│   ├── backend/
│   ├── .env
│   └── api/
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── sections/
│       ├── hooks/
│       ├── services/
│       ├── api.js
│       ├── .env
│       └── App.jsx
└── README.md
```

## Getting Started

### Prerequisites

- Django
- Python (v3.8+)
- pip or pipenv
- PostgreSQL

## Backend Setup (Django)

```bash
cd backend
python -m venv env
source env/bin/activate  # or env\Scripts\activate on Windows
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver
```

API available at: `http://127.0.0.1:8000/api/`

## Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

App runs on: `http://localhost:5173/`

## Connecting Frontend with Backend

Update your base API URL in `backend/.env` like in sample_env.txt

## Features

- User authentication (login, register)
- Create / edit / delete tasks
- Set due dates and priorities
- Mark tasks as completed
- Group tasks by lists

<!-- ## Testing

Backend:
```bash
python manage.py test
```

Frontend:
```bash
npm run test
``` -->

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Vite
- Django REST Framework
- React
