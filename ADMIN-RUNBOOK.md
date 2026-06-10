# Al Hamra — Content Studio (CMS) Runbook

This document covers the **account-side setup** that must be done by you (these
steps need GitHub account access and can't be done from code). Everything in the
codebase — the `/admin` Content Studio, the editable content, the Stats
counters, the editorial (approval) workflow config — is already in place.

Editors will work at: **https://alhamra-light.lovable.app/admin**

---

## What's already built (in the repo)

- `public/admin/index.html` + `public/admin/config.yml` — the Content Studio.
- All site text + images are editable: site menus/footer, homepage (hero, the
  animated **Stats counters** with Start / End / Step / Display / Unit), and
  every Tower and Experience page — English and Arabic side by side.
- `publish_mode: editorial_workflow` — every save becomes a **review item**;
  publishing requires approval (see roles below).
- Images: managed via the **Assets** button in the Studio toolbar
  (uploads write to `public/assets`).

---

## Step 1 — Decide how editors sign in

Two free options. **Token** works immediately with zero setup; **OAuth** is the
nicer one-click experience and is worth setting up for non-technical staff.

### Option A — Access Token (works now, simplest)
Each editor clicks **"Sign In Using Access Token"** and pastes a GitHub
Personal Access Token. The Studio links them to the token-generation page with
the right scopes pre-selected. Tokens expire (default 90 days) and must be
regenerated. Fine for 1–2 technical users; clunky for non-technical staff.

### Option B — One-click GitHub login (recommended for your 3 users)
Deploy the free Sveltia auth worker once, then editors just click
**"Sign In with GitHub"**.

1. Deploy the worker (free Cloudflare account):
   - Repo: `https://github.com/sveltia/sveltia-cms-auth`
   - Follow its README: create a Cloudflare Worker, set the GitHub OAuth
     `CLIENT_ID` / `CLIENT_SECRET` environment variables.
2. Register a GitHub OAuth App (github.com → Settings → Developer settings →
   OAuth Apps → New). Set the callback URL to the worker URL the README gives.
3. In `public/admin/config.yml`, uncomment and set:
   ```yaml
   backend:
     name: github
     repo: rkilani-hm/alhamra-tower-launchpad
     branch: main
     base_url: https://YOUR-AUTH-WORKER.workers.dev
   ```
4. Commit + let Lovable redeploy. Editors now get one-click GitHub login.

> Note: Sign-in is via GitHub accounts (free). Email/password without GitHub
> would require a paid third-party identity service, which was ruled out.

---

## Step 2 — Create the 3 users and the approval gate

The "editor edits → manager approves → live" gate is enforced by **GitHub
repository permissions + branch protection**, at no cost.

1. **Give each of the 3 people a GitHub account** (free) and note their usernames.

2. **Invite them to the repo** (github.com → repo → Settings → Collaborators):
   - **2 Editors** → role **Write**. They can edit content and create review
     requests, but branch protection (below) stops them publishing to `main`.
   - **1 Manager** → role **Maintain** (or Admin). They approve/merge to publish.

3. **Protect the `main` branch** (repo → Settings → Branches → Add rule):
   - Branch name pattern: `main`
   - ✅ Require a pull request before merging
   - ✅ Require approval (1 approval)
   - ✅ Restrict who can push/merge → add only the **Manager**
   - This is what makes "only the manager can publish" real and enforced.

With editorial workflow on, an Editor's save opens a pull request. The Manager
reviews it in the Studio (or on GitHub), approves/merges, and Lovable
auto-deploys the live site.

---

## Step 3 — Verify end to end

1. Editor logs in at `/admin`, changes a piece of text, saves → it appears as a
   review item, **not** live.
2. Manager approves/merges → Lovable redeploys → change is live within ~1 min.
3. Confirm an Editor **cannot** merge to `main` (branch protection blocks it).

---

## Editing the Stats counters (the animated numbers)

Studio → **Homepage → Statistics Counters**. Each counter has:
- **Start** — number it counts up from (usually 0)
- **End** — number it counts up to
- **Step** — increment size as it rolls
- **Display value** — the exact final text shown (e.g. `412.6`, or Arabic `٤١٢٫٦`)
- **Unit** — suffix such as `m` or `m²`
- plus **Label / Sub** captions under "Counter captions"

> The "floors" counter currently shows **77**. Set the verified office-floor
> figure here whenever you have it — no code change needed.

---

## Notes & limitations (honest)

- **Login is GitHub-based**, not email/password (the free path; email/password
  needs a paid service).
- **Per-field permissions** (e.g. "this user edits Arabic only") are not
  possible for free — GitHub permissions are repo-wide. The approval gate
  (edit vs. publish) *is* enforced.
- All content lives in `src/locales/en.json` and `src/locales/ar.json`. Because
  every section is in these two files, if two editors edit *different* sections
  at the same time, the second merge may hit a conflict the Manager resolves on
  GitHub. For a 3-person team editing occasionally this is rare.
- `src/pages/ExperiencePages.tsx` and a few smaller sections still hold some
  inline content not yet exposed in the Studio; these can be migrated into the
  locale files the same way if you want them editable too.
