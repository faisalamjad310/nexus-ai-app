# NexusAI App

Unified guidance for the **NexusAI** full-stack app (Next.js frontend + NestJS backend).

---

## Project overview

### Frontend

- **Framework:** Next.js (App Router)
- **Language:** TypeScript + React
- **State:** Redux Toolkit (`app`, `chat`, `auth`, `models`, `modal`, `agent` slices)
- **API client:** `frontend/src/lib/api.ts` → `NEXT_PUBLIC_API_URL` (default `http://localhost:4000/api`), `credentials: "include"`
- **i18n:** `react-i18next` — locales `en`, `ur`, `ar` in `frontend/src/lib/translations/`; `LanguageSwitcher` + `LocalizationProvider`; **RTL** for Urdu and Arabic (`document.documentElement.dir`)
- **Styling:** Tailwind CSS + `globals.css` (CSS variables: `--bg`, `--text`, `--accent`, etc.)
- **UI:** framer-motion, react-icons

### Backend

- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose)
- **Sessions:** express-session + connect-mongo (cookie)
- **Uploads:** Multer → `backend/public/uploads`, served at `/uploads` (paths in `.gitignore`)
- **API docs:** Swagger at `/api/docs` (when enabled)

---

## Run commands

### Frontend (`frontend/`)

```bash
npm install
npm run dev
npm run lint
npm run build
```

### Backend (`backend/`)

```bash
npm install
npm run start:dev
npm run build
npm run lint
npm run test
```

---

## Project structure (high level)

### Frontend (`frontend/src/`)

```
app/              # Routes: page, chat, marketplace, agents, research, login, signup, …
components/
  landing/        # Hero, Navbar, FeaturedModels, Footer (newsletter + bottom bar), …
  app/            # AppNav, ChatHub, AgentsHub, MarketplaceView, ResearchView, …
  auth/           # AuthShell, AuthForm, …
  shared/         # ModelModal, Toast, LanguageSwitcher, …
hooks/            # e.g. useSessionFromApi, useChatPersistence
lib/              # api.ts, i18n.ts, translations/*.json
providers/        # StoreProvider, LocalizationProvider
store/            # appSlice, chatSlice, authSlice, modelsSlice, modalSlice, agentSlice
```

### Backend (`backend/src/`)

```
main.ts
app.module.ts
auth/             # signup, login, guest, session, logout
catalog/          # labs, models, catalog agents, agent-explore, hero-onboarding, flagship-comparison, research, research/:id
chat/             # chat message, sessions, messages (persistence + uploads)
chat-hub/         # legacy/simple hub GET
agents/           # user agents CRUD + run
common/           # shared helpers/filters if present
data/             # static-data, research-data, agent-explore-data, hero-onboarding-data, …
```

---

## Routing (frontend)

Prefer **`router.push(...)`** for navigation; URL is source of truth.

| Path | Purpose |
|------|--------|
| `/` | Landing + in-app shell (`?open=chat` etc.) |
| `/chat`, `/chathub` | Chat Hub |
| `/marketplace` | Marketplace |
| `/agents` | Agents (see auth gate below) |
| `/research`, `/research/[id]` | Research feed + detail |
| `/login`, `/signup` | Auth (`?next=` safe app-relative path) |

---

## Authentication

### Frontend

- **Persistence:** `localStorage` key `nexusai:user` (hydrated in `StoreProvider`; cleared on logout).
- **`authSlice`:** `user` + `isAuthenticated`. **`setSession`:** `isAuthenticated` is **true** only when `user` exists **and** `guestMode` is not `true` — guests have a `user` but are **not** “signed in” (nav, login redirect, Agents gate).
- **Session sync:** `useSessionFromApi` (and similar) calls `GET /api/auth/session` then `POST /api/auth/guest` when unauthenticated.

### Backend

| Method | Path |
|--------|------|
| POST | `/api/auth/signup` |
| POST | `/api/auth/login` |
| POST | `/api/auth/guest` |
| GET | `/api/auth/session` |
| POST | `/api/auth/logout` |

Session payload uses `session.user.guestMode` for guests vs registered users.

### Guest vs signed-in

- Redux `isAuthenticated` is **false** for guest sessions (`guestMode: true`) so nav and auth screens can treat guests differently from registered users. Restrict sensitive routes (e.g. Agents) to signed-in users in the UI if required (`/login?next=...`).

---

## Data & APIs

### Catalog (`/api/catalog/...`)

Static/catalog data served from backend modules; frontend loads via `apiModels`, `apiLabs`, `apiAgents`, `apiResearch`, `apiResearchDetail`, `apiAgentExplore`, `apiHeroOnboarding`, `apiFlagshipComparison`, etc.

- `GET models`, `labs`, `agents` (templates)
- `GET agent-explore`, `hero-onboarding`, `flagship-comparison`
- `GET research`, `research/:id`

### User agents (`/api/agents`)

- CRUD + `POST /api/agents/:id/run` for agent runs.

### Chat (`/api/chat/...`)

- `POST message` (JSON or multipart for files)
- Session CRUD: create/get/update/delete sessions; list by user; save/get/delete messages; etc.

### Chat Hub (legacy)

- `GET /api/chat-hub` — still present; main app chat uses **`/api/chat`** routes.

### Conventions

- JSON responses; stable shapes for the frontend.
- Backend DTOs with `class-validator` where used; Swagger on new endpoints.

---

## Chat Hub (UX)

- Text, voice, attachments; file chips before send; attachments in bubbles.
- Chat persistence hooks use session/message APIs + `chatSlice` / local storage keys as implemented.

---

## Internationalization

- **Locales:** `en`, `ur`, `ar` — keep keys in sync across `en.json`, `ur.json`, `ar.json`.
- **RTL:** Urdu and Arabic set `dir="rtl"` on `<html>`.

---

## Environment variables

### Backend (`backend/.env`)

```env
PORT=4000
MONGO_URI=your_mongo_uri
SESSION_SECRET=your_secret
CORS_ORIGIN=http://localhost:3000
```

- `MONGODB_URI` supported as fallback for Mongo.

### Frontend

- `NEXT_PUBLIC_API_URL` — API base (e.g. `http://localhost:4000/api`).

---

## Security notes

- Secrets via env; no hardcoded passwords in repo.
- Cookies: `httpOnly`; `secure` in production.
- Password hashing: current implementation may use SHA-256 — **prefer bcrypt or argon2** for production.

---

## Validation checklist

**Frontend:** `npm run lint`; routes; nav; login/signup + `next`; chat; attachments; language switch; agents gate for guests.

**Backend:** `npm run build`; Swagger; MongoDB; sessions; auth + catalog + chat + agents.

---

## Development rules

- Small, scoped changes; match existing patterns and naming.
- Strict TypeScript; avoid unnecessary `any`.
- Keep API contracts stable for the frontend.

---

## Future improvements

- Stronger password hashing (bcrypt/argon2)
- RBAC if multi-tenant
- E2E tests
- Newsletter backend for landing footer if productized

---

## Summary

NexusAI is a modular full-stack app: **frontend** (UI, i18n, Redux, `lib/api`) and **backend** (NestJS, Mongo, sessions, catalog + chat + agents). **Catalog and app data** are loaded from the **backend API** when `NEXT_PUBLIC_API_URL` points at a running server; translations stay in locale JSON files.

Build incrementally and avoid breaking existing API shapes or auth semantics.

---
