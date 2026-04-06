# NexusAI

Full-stack AI model marketplace and hub: **Next.js** frontend + **NestJS** backend.

**Author:** Hafiz Faisal

## Quick start

1. **MongoDB** running locally (or set `MONGO_URI` in `backend/.env`).
2. **Backend** (`backend/`):

   ```bash
   npm install
   cp .env.example .env
   npm run start:dev
   ```

3. **Frontend** (`frontend/`):

   ```bash
   npm install
   cp .env.example .env.local
   npm run dev
   ```

- API: `http://localhost:4000/api` (default)  
- App: `http://localhost:3000`

## Documentation

- **[Claude.md](./Claude.md)** — project structure, auth, APIs, env, conventions (main reference).

## Repository layout

| Path | Role |
|------|------|
| `frontend/` | Next.js App Router, Redux, i18n (`en` / `ur` / `ar`) |
| `backend/` | NestJS, MongoDB, sessions, Swagger |

---

For NestJS CLI boilerplate notes, see `backend/README.md`.
