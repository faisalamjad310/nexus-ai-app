const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body?.message ?? message;
    } catch {
      // ignore parse error
    }
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

// ── Auth ───────────────────────────────────────────────────────────────────

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  guestMode?: boolean;
}

export function apiSignup(name: string, email: string, password: string) {
  return request<{ ok: boolean; user: SessionUser }>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

export function apiLogin(email: string, password: string) {
  return request<{ ok: boolean; user: SessionUser }>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function apiGuest() {
  return request<{ ok: boolean; user: SessionUser }>('/auth/guest', {
    method: 'POST',
  });
}

export function apiSession() {
  return request<{ authenticated: boolean; user: SessionUser | null }>('/auth/session');
}

export function apiLogout() {
  return request<{ ok: boolean }>('/auth/logout', { method: 'POST' });
}

// ── Catalog ────────────────────────────────────────────────────────────────

export function apiModels() {
  return request<unknown[]>('/catalog/models');
}

export function apiAgents() {
  return request<unknown[]>('/catalog/agents');
}

export function apiLabs() {
  return request<unknown[]>('/catalog/labs');
}

// ── Chat ───────────────────────────────────────────────────────────────────

export interface ChatContext {
  goal?: string;
  audience?: string;
  level?: string;
  budget?: string;
}

export interface ChatReply {
  text: string;
  recs: unknown[];
}

export function apiChatMessage(message: string, context?: ChatContext) {
  return request<ChatReply>('/chat/message', {
    method: 'POST',
    body: JSON.stringify({ message, context }),
  });
}
