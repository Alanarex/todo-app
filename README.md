# Todo App

> A containerised task manager: React front end, Express REST API and MySQL, started with a single `docker compose up`.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

**Résumé (FR)** : application de gestion de tâches full-stack conteneurisée (React, Express, MySQL, Docker Compose). On peut créer, modifier, supprimer et marquer des tâches comme terminées, avec description et échéance. Projet réalisé dans le cadre d'une évaluation de développement full-stack conteneurisé.

## Features

- Create, edit, delete tasks (title, description, due date/time).
- Toggle a task as done / not done.
- Bootstrap modal for add/edit, SweetAlert2 confirmations and error toasts in the UI.
- REST API under `/tasks` (`GET`, `GET /:id`, `POST`, `PUT /:id`, `PATCH /:id/toggle`, `DELETE /:id`); the `tasks` table is created at startup.

## Architecture

```
frontend/   React (Create React App) + React Bootstrap, calls the API with axios
backend/    Express + mysql2 connection pool (server.js)
docker-compose.yml   db (MySQL) + backend (:5000) + frontend (:3000)
```

The backend reads `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` and `CORS_ORIGIN`; the frontend reads `REACT_APP_BACKEND_URL`.

## Getting started (Docker)

```sh
git clone https://github.com/Alanarex/todo-app.git
cd todo-app
cp .env.example .env        # set MYSQL_ROOT_PASSWORD
docker compose up -d --build
```

- Frontend: http://localhost:3000
- API: http://localhost:5000/tasks

MySQL is published on `127.0.0.1:3306` only.

## Local development (without Docker)

```sh
cd backend  && cp .env.example .env && npm install && node server.js
cd frontend && cp .env.example .env && npm install && npm start
```

A MySQL server must be reachable with the credentials from `backend/.env`.

## Tests

No automated tests yet (see the open issues).

## What it demonstrates

- A three-tier app orchestrated with Docker Compose, with a database health check.
- A REST API with parameterised SQL queries and input validation.
- A React UI with modals, confirmations and Bootstrap components.

## License

MIT, see [LICENSE](LICENSE).
