# NexusAI App

This document provides unified guidance for working on the **NexusAI** full-stack application, covering both frontend and backend systems.

---

# 🧩 Project Overview

## Frontend

* Framework: Next.js (App Router)
* Language: TypeScript + React
* State Management: Redux Toolkit
* Styling: Tailwind CSS + `globals.css`
* UI/Motion: framer-motion, react-icons

## Backend

* Framework: NestJS
* Language: TypeScript
* Database: MongoDB (Mongoose)
* Sessions: express-session + connect-mongo
* API Docs: Swagger (`/api/docs`)

---

# ⚙️ Run Commands

## Frontend

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Backend

```bash
npm install
npm run start:dev
npm run build
npm run lint
npm run test
```

---

# 📁 Project Structure

## Frontend (`src/`)

```
src/
├── app/
│   ├── page.tsx
│   ├── chat/
│   ├── marketplace/
│   ├── agents/
│   ├── research/
│   ├── login/
│   └── signup/
│
├── components/
│   ├── landing/
│   ├── app/
│   ├── auth/
│   └── shared/
│
├── store/
│   ├── appSlice.ts
│   ├── chatSlice.ts
│   ├── authSlice.ts
│   └── modalSlice.ts
```

---

## Backend (`src/`)

```
src/
├── main.ts
├── app.module.ts
│
├── auth/
│   ├── controllers/
│   ├── services/
│   └── schemas/
│
├── catalog/
├── chat-hub/
│
└── data/
    └── static-data.ts
```

---

# 🌐 Routing Conventions (Frontend)

Use URL-based navigation:

* `/`
* `/chat`
* `/marketplace`
* `/agents`
* `/research`
* `/login`
* `/signup`

### Navigation Rule

* Always prefer `router.push(...)`
* Avoid relying only on Redux for navigation

---

# 🔐 Authentication Flow

## Frontend

* Stored in `localStorage`:

  ```
  nexusai:user
  ```
* Hydrated via:

  ```
  StoreProvider.tsx
  ```
* Supports `next` redirect query
* Must validate redirect paths (app-relative only)

## Backend

### Endpoints

```
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/guest
GET    /api/auth/session
POST   /api/auth/logout
```

### Session Rules

* Stored in `session.user`
* Guest mode:

  ```
  guestMode: true
  ```
* Auth user:

  ```
  guestMode: false
  ```

---

# 💬 Chat Hub System

## Frontend Features

* Text input
* Voice input (Speech Recognition API)
* File attachments
* Image uploads

## Message Schema

```ts
{
  text: string;
  attachments?: {
    name: string;
    type: string;
    size: number;
  }[];
}
```

## UX Rules

* Show file chips before sending
* Allow removing individual files
* Display attachments in chat bubbles

## Backend Endpoint

```
GET /api/chat-hub
```

---

# 📦 Catalog APIs

```
GET /api/catalog/labs
GET /api/catalog/models
GET /api/catalog/agents
```

### Rules

* Response shape must match frontend expectations
* Do not rename existing keys

---

# 🧠 State Management (Frontend)

## Redux Slices

### appSlice

* Global UI state
* Toasts

### chatSlice

* Messages
* Onboarding
* Attachments

### authSlice

* User session
* Loading/error states

### modalSlice

* Modal visibility

---

# 🔌 API Conventions

* Base prefix: `/api`
* Return JSON responses only
* Keep response shapes stable
* Use `class-validator` for DTO validation
* Add Swagger decorators for new endpoints

---

# 🌍 Environment Variables (Backend)

```env
PORT=4000
MONGO_URI=your_mongo_uri
SESSION_SECRET=your_secret
CORS_ORIGIN=http://localhost:3000
```

### Notes

* `MONGODB_URI` is supported as fallback
* Never hardcode secrets

---

# 🔒 Security Rules

* Use environment variables for sensitive data
* Cookies must be:

  * `httpOnly`
  * `secure` in production
* Password hashing:

  * Current: SHA-256
  * Recommended upgrade: bcrypt or argon2

---

# 🧪 Validation Checklist

## Frontend

* [ ] `npm run lint` passes
* [ ] Routes load correctly
* [ ] Navbar navigation works
* [ ] Login/signup redirect works
* [ ] Chat send flow works
* [ ] Attachment UX works

## Backend

* [ ] `npm run build` passes
* [ ] Swagger shows all endpoints
* [ ] MongoDB connection works
* [ ] Sessions persist correctly
* [ ] Auth flows (guest/login/logout) work

---

# 🧱 Development Rules

## General

* Keep changes minimal and scoped
* Avoid unnecessary refactors
* Reuse existing patterns/components
* Maintain UI consistency

## Frontend

* Use strict TypeScript
* Avoid `any` unless necessary
* Follow existing UI patterns

## Backend

* Maintain API contract stability
* Use DTO validation
* Keep modules clean and modular

---

# 🤖 Agent Workflow

## Frontend

1. frontend-architect → define approach
2. frontend-implementer → implement changes
3. frontend-qa → validate UX and flows

## Backend

1. backend-architect → design changes
2. backend-implementer → implement APIs
3. backend-qa → verify build, routes, sessions

---

# 🔗 Notes

* Frontend currently uses mock/local data
* Backend provides static catalog + session APIs
* Keep API logic separate from UI components
* Avoid tight coupling between frontend and backend

---

# 🚀 Future Improvements

* Integrate real AI chat backend
* Upgrade password hashing to bcrypt/argon2
* Add role-based access control (RBAC)
* Introduce frontend API service layer
* Add end-to-end testing (E2E)

---

# ✅ Summary

NexusAI App is a modular full-stack system:

* **Frontend** handles UI, routing, and user experience
* **Backend** handles APIs, data, and authentication
* Both are connected through stable API contracts

Build incrementally, maintain consistency, and avoid breaking existing functionality.

---
