---
name: jira-issue
description: Fetch a Jira Cloud issue via REST API, extract summary/description/labels/components, and return a normalized brief. Use when the user gives a Jira key (e.g. NEXUS-42), URL, or asks to pull ticket details before coding or triage.
argument-hint: "[ISSUE-KEY or full Jira issue URL]"
---

Fetch and normalize the following Jira issue: **$ARGUMENTS**

## When to use this skill

- User pastes **`PROJECT-123`** or a **Jira issue URL**
- You need **structured fields** before implementing or before invoking **`jira-ticket-router`**
- You must **avoid inventing** acceptance criteria—pull from Jira when possible

## Prerequisites (environment)

Set these in the shell environment (or `.env` loaded for local scripts—**never commit tokens**):

| Variable | Purpose |
|----------|---------|
| `JIRA_DOMAIN` | Cloud site subdomain only, e.g. `mycompany` for `mycompany.atlassian.net` |
| `JIRA_EMAIL` | Atlassian account email |
| `JIRA_API_TOKEN` | From Atlassian → API tokens |

Optional: `JIRA_BASE_URL` = full base `https://mycompany.atlassian.net` if you prefer one variable.

## Step 1: Resolve the issue key

- If input is a **URL**, extract the key (pattern like `[A-Z][A-Z0-9]+-\d+` in the path)
- If input is already **`KEY`**, use it as-is

## Step 2: Fetch issue JSON (Jira Cloud REST API v3)

Request fields needed for triage and implementation:

```bash
curl -sS -u "${JIRA_EMAIL}:${JIRA_API_TOKEN}" \
  -H "Accept: application/json" \
  "https://${JIRA_DOMAIN}.atlassian.net/rest/api/3/issue/${ISSUE_KEY}?fields=summary,description,labels,components,issuetype,status,priority,assignee,subtasks,parent"
```

- On failure (`401`, `404`, `403`): report clearly; do not retry with guessed credentials
- **Never** print `JIRA_API_TOKEN` or full `Authorization` headers in output or logs

## Step 3: Normalize the response

From JSON, extract at minimum:

| Field | Notes |
|-------|--------|
| `key` | Issue key |
| `fields.summary` | Title |
| `fields.description` | May be **Atlassian Document Format (ADF)** — extract plain text recursively from `content`, or use Jira UI paste if API body is opaque |
| `fields.labels` | Array of strings — drives backend/frontend hints |
| `fields.components` | Array of `{ name }` |
| `fields.issuetype.name` | Bug, Story, Task, etc. |
| `fields.status.name` | To avoid implementing closed/won’t-fix without confirmation |

If `description` is ADF and hard to parse in-shell, ask the user to paste the **Description** from Jira once, or use a tiny Node one-liner to walk ADF `text` nodes—only if appropriate for the environment.

## Step 4: Output (paste-ready)

Produce:

1. **Key** + **Summary**
2. **Status** + **Type**
3. **Labels** (comma-separated) + **Components**
4. **Description** — plain text or best-effort extraction
5. **One-line suggestion**: e.g. “Run **jira-ticket-router** with this payload to assign backend vs frontend.”

## Step 5: Pair with triage (recommended)

After fetch, if the user wants routing or implementation scope:

- Invoke or follow **`.claude/agents/jira-ticket-router`** with the normalized brief so work goes to **backend-developer** or **frontend-designer** as appropriate.

## If API is unavailable

Ask the user to paste from Jira:

- Title, Description, Labels, Components, Acceptance criteria (if in custom field or checklist)

Still produce the same **Output** structure from pasted text.

## Security checklist

- Do not commit `.env` with Jira secrets
- Do not echo tokens in Bash history in shared transcripts—prefer env vars already set in the session
