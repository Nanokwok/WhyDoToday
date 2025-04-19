
# Installation Guide for WhyDoToday - To-Do List App

Follow these steps to set up and run the **WhyDoToday** project on your local machine. This guide includes the steps for both the backend (Django) and frontend (React with Vite).

## Prerequisites

Before you start, make sure you have the following installed:

- **Python (v3.8+)**
- **pip** or **pipenv** (for managing Python dependencies)
- **Node.js (v16.x or higher)** (for the frontend)
- **PostgreSQL** (for the database)

### Install Python and pip

1. Download and install Python from [python.org](https://www.python.org/downloads/).
2. Once installed, you can check the version by running:

    ```bash
    python --version
    ```

3. **pip** should come installed with Python, but you can install it separately using:

    ```bash
    python -m ensurepip --upgrade
    ```

### Install Node.js

1. Download and install Node.js from [nodejs.org](https://nodejs.org/).
2. Check the version by running:

    ```bash
    node --version
    ```

### Install PostgreSQL

1. Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/).
2. After installation, set up a PostgreSQL database. You can do this from the terminal or by using a GUI like [pgAdmin](https://www.pgadmin.org/).

---

## Backend Setup (Django)

1. Navigate to the **backend** directory:

    ```bash
    cd backend
    ```

2. Create a Python virtual environment:

    ```bash
    python -m venv env
    ```

3. Activate the virtual environment:
    - On Windows:

        ```bash
        env\Scripts\activate
        ```

    - On macOS/Linux:

        ```bash
        source env/bin/activate
        ```

4. Install the backend dependencies:

    ```bash
    pip install -r requirements.txt
    ```

5. Configure the environment variables by copying the sample configuration file:

    ```bash
    cp .env.sample .env
    ```

6. Set up the database by running the migrations:

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

7. Create a superuser account for accessing the admin panel:

    ```bash
    python manage.py createsuperuser
    ```

8. Run the Django server:

    ```bash
    python manage.py runserver
    ```

Your backend server should now be running at `http://127.0.0.1:8000/`.

---

## Frontend Setup (React + Vite)

1. Navigate to the **frontend** directory:

    ```bash
    cd frontend
    ```

2. Install the frontend dependencies:

    ```bash
    npm install
    ```

3. Run the frontend server:

    ```bash
    npm run dev
    ```

Your frontend app should now be running at `http://localhost:5173/`.

---

## Connecting Frontend with Backend

1. In the `frontend/.env` file, update the API URL to match your backend server:

    Example:

    ```
    VITE_API_URL=http://127.0.0.1:8000/
    ```

---

## Troubleshooting

- If you encounter issues with database migrations, check your PostgreSQL database connection settings in the `backend/.env` file.
- If the frontend cannot connect to the backend, make sure the `VITE_API_URL` in the `frontend/.env` file is correct.
- Ensure that you are using compatible versions of Python and Node.js as mentioned in the prerequisites.

