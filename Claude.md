# NexusAI App

**Author:** Hafiz Faisal

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
- **Uploads:** Multer → `backend/public/uploads`, served at `/uploads` (ignored by git)
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

Run **both** during development (API on port 4000, Next.js default 3000).

---

## Project structure (high level)

### Frontend (`frontend/src/`)

```
app/              # Routes: page, chat, marketplace, agents, research, login, signup, …
components/
  landing/        # Hero, Navbar, FeaturedModels, Footer (newsletter + bottom bar), …
  app/            # AppNav, ChatHub, AgentsHub, AgentsAuthGate, MarketplaceView, ResearchView, …
  auth/           # AuthShell, AuthForm, …
  shared/         # ModelModal, Toast, LanguageSwitcher, …
hooks/            # useSessionFromApi, useChatPersistence, …
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
| `/agents` | Agents (signed-in only; see below) |
| `/research`, `/research/[id]` | Research feed + detail |
| `/login`, `/signup` | Auth (`?next=` safe app-relative path) |

---

## Authentication

### Session contract (`GET /api/auth/session`)

- **Response shape:** `{ authenticated: boolean, user: SessionUser | null }`
- **`authenticated`** means a **registered** account session (`session.user` exists **and** `user.guestMode` is not `true`).
- **Guest** sessions still return **`user`** with `guestMode: true`, but **`authenticated: false`**. The frontend must not treat “has user” as “logged in” without checking `guestMode`.

### Frontend

- **Persistence:** `localStorage` key `nexusai:user` (hydrated in `StoreProvider`; cleared on logout).
- **`authSlice`:** `setSession` sets **`isAuthenticated`** only when `user` exists **and** `guestMode` is not `true` (guests are not “signed in”).
- **`useSessionFromApi`:** Calls `GET /api/auth/session`, then **preserves `user.guestMode` from the API**. If there is no session, calls `POST /api/auth/guest`. Guest users must be dispatched with `guestMode: true` so Redux stays correct.
- **`StoreProvider`:** On load, rehydrates from `localStorage` and **infers guest** (`guestMode`, or `id` starting with `guest_`, or `@guest.local` email) so stale keys do not mark guests as signed-in.

### Backend

| Method | Path |
|--------|------|
| POST | `/api/auth/signup` |
| POST | `/api/auth/login` |
| POST | `/api/auth/guest` |
| GET | `/api/auth/session` |
| POST | `/api/auth/logout` |

Session payload uses `session.user.guestMode` for guests vs registered users (`createGuestSession` sets `guestMode: true`).

### Agents page (UI guard)

- **`AgentsAuthGate`** (`components/app/agents/AgentsAuthGate.tsx`) wraps **`AgentsHub`** in `AppWorkspace` and in the home app shell (`page.tsx`).
- Only **`isAuthenticated`** users see the Agents UI; guests and logged-out users are redirected to **`/login?next=/agents`** (with loading/redirect copy from i18n `agents.auth_*`).
- **Server-side:** protect `/api/agents/*` for production if agents must not be callable without a real account (see Future improvements).

### Auth screens

- **`AuthShell`** redirects away from login/signup only when **`user.guestMode !== true`** (real account), so guests are not bounced back into the app with `?next=` in a loop.

---

## Data & APIs

### Catalog (`/api/catalog/...`)

Static/catalog data from backend modules; frontend uses `apiModels`, `apiLabs`, `apiAgents`, `apiResearch`, `apiResearchDetail`, `apiAgentExplore`, `apiHeroOnboarding`, `apiFlagshipComparison`, etc.

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
- Chat persistence uses session/message APIs + `chatSlice` / local storage keys as implemented.

---

## Internationalization

- **Locales:** `en`, `ur`, `ar` — keep keys in sync across `en.json`, `ur.json`, `ar.json`.
- **RTL:** Urdu and Arabic set `dir="rtl"` on `<html>`.

---

## Environment variables

### Backend (`backend/.env`)

Copy from `backend/.env.example`.

```env
PORT=4000
MONGO_URI=your_mongo_uri
SESSION_SECRET=your_secret
CORS_ORIGIN=http://localhost:3000
```

- `MONGODB_URI` supported as fallback for Mongo.

### Frontend

Copy from `frontend/.env.example`, or set:

- **`NEXT_PUBLIC_API_URL`** — API base (e.g. `http://localhost:4000/api`). Must match backend URL and `/api` prefix.

---

## Security notes

- Secrets via env; never commit real `.env` files.
- Cookies: `httpOnly`; `secure` in production.
- Password hashing: current implementation may use SHA-256 — **prefer bcrypt or argon2** for production.
- Add **server-side guards** on sensitive routes when going to production.

---

## Validation checklist

**Frontend:** `npm run lint`; routes; nav; login/signup + `next`; chat; attachments; language switch; agents only for signed-in users.

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
- Server-side authorization on `/api/agents` for registered users only

---

## Summary

NexusAI is a modular full-stack app: **frontend** (UI, i18n, Redux, `lib/api`) and **backend** (NestJS, Mongo, sessions, catalog + chat + agents). **Catalog and app data** load from the **backend API** when `NEXT_PUBLIC_API_URL` points at a running server; translations stay in locale JSON files.

Build incrementally and avoid breaking existing API shapes or auth semantics (especially **`session`** and **`guestMode`**).

---
