# CLAUDE.md

## Stack
- Frontend: React 19, React Bootstrap, axios, SweetAlert2, Create React App (`react-scripts` 5).
- Backend: Node.js, Express 4, `mysql2`, dotenv (Dockerfile uses `node:18`).
- Database: MySQL (`mysql:latest` image). Orchestration: Docker Compose.
- No CI, no automated tests.

## Structure
- `backend/server.js`: whole API (`/tasks` routes) and startup DB/table creation.
- `frontend/src/`: `pages/TaskList.js`, `components/` (Navbar, TaskCard, TaskModal).
- `docker-compose.yml` + root `.env.example` (`MYSQL_ROOT_PASSWORD`, `DB_NAME`).

## Commands
- Run everything: `cp .env.example .env && docker compose up -d --build`
- Backend: `cd backend && npm install && node server.js`
- Frontend: `cd frontend && npm install && npm start` ; build: `npm run build`
- Tests/lint: none yet (`react-scripts test` exists but there are no tests)

## Conventions
- Default branch is `main`. Work on `refresh/<topic>` branches and open a PR; never commit directly to `main`.
- Parameterised SQL only (`?` placeholders). Never return raw DB errors to clients.
- Never use browser-only libraries (e.g. SweetAlert2) in the backend.
- No secrets in git: `.env` is ignored, `.env.example` documents the variables. No history rewrite or force push without explicit approval. Do not alter commit dates or authors.

## Known issues
- Frontend dependencies (CRA / react-scripts) carry many npm audit findings; migration to Vite is tracked.
- `server.js` creates two pools and the first connects to the database before it is created.
- Dockerfiles use end-of-life Node 18 and run `npm install` instead of `npm ci`.
