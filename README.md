# FoundIt

FoundIt is a lost-and-found portal. People who lose something post a **lost** listing, people who find something post a **found** listing, and both sides browse, filter and reach each other over WhatsApp. Owners track and resolve their listings from a personal dashboard.

---

## Table of contents

1. [Architecture](#architecture)
2. [Tech stack](#tech-stack)
3. [Repository layout](#repository-layout)
4. [Local setup](#local-setup)
5. [Environment variables](#environment-variables)
6. [API reference](#api-reference)
7. [Caching strategy](#caching-strategy)
8. [Deployment (Vercel)](#deployment-vercel)
9. [Security notes](#security-notes)

---

## Architecture

```
┌──────────────────────────┐        HTTPS (JSON, httpOnly cookie)       ┌──────────────────────────────┐
│  client/  React SPA      │ ─────────────────────────────────────────▶ │  server/  Express REST API   │
│  Vite · TanStack Query   │ ◀───────────────────────────────────────── │  routes → controllers →      │
│  (browser cache layer)   │        Cache-Control / X-Cache headers      │  services → models           │
└──────────────────────────┘                                             └──────┬─────────┬─────────┬───┘
                                                                                │         │         │
                                                                     ┌──────────▼──┐ ┌────▼────┐ ┌──▼─────────┐
                                                                     │  MongoDB    │ │  Redis  │ │ Cloudinary │
                                                                     │  (Atlas)    │ │ (cache) │ │  (images)  │
                                                                     └─────────────┘ └─────────┘ └────────────┘
```

**Server** — layered clean architecture:

| Layer         | Responsibility                                                                     |
| ------------- | ---------------------------------------------------------------------------------- |
| `routes/`     | URL → middleware chain → controller. No logic.                                     |
| `middlewares/`| Authentication, Zod validation, uploads, rate limiting, cache headers, errors.     |
| `controllers/`| Translate HTTP ⇄ service calls; set cookies and response envelopes.               |
| `services/`   | Business rules (auth, items, email, storage) and cache reads/invalidation.         |
| `models/`     | Mongoose schemas and indexes.                                                      |
| `validators/` | Zod request schemas (body, query, params).                                         |
| `lib/`        | Infrastructure: cache abstraction (Redis or in-memory), logger.                    |
| `config/`     | Validated environment, database connection (serverless-safe), mailer, Cloudinary.  |

All responses share one envelope: `{ success, message?, data?, meta?, code?, details? }`.

**Client** — feature-sliced React:

| Folder                  | Responsibility                                                    |
| ----------------------- | ----------------------------------------------------------------- |
| `app/`                  | App shell: providers, router, TanStack Query client.             |
| `features/auth`         | Session context, route guards, sign-in/up, email verify, reset.  |
| `features/items`        | Listing API + query hooks, filters, cards, create & detail pages.|
| `features/dashboard`    | Owner dashboard: resolve / reactivate / delete own listings.     |
| `features/home`         | Landing page sections with live statistics.                      |
| `components/ui, layout` | Reusable, presentation-only building blocks.                     |
| `lib/`, `config/`, `constants/`, `hooks/` | API client, formatting, env, shared constants. |

---

## Tech stack

| Area        | Technology                                                                       |
| ----------- | -------------------------------------------------------------------------------- |
| Frontend    | React 19, Vite 7, React Router 7 (data router, lazy routes), TanStack Query 5, Tailwind CSS 4, lucide-react |
| Backend     | Node.js ≥ 20, Express 5, Mongoose 8, Zod 4                                       |
| Auth        | JWT in an httpOnly cookie, bcrypt password hashing, SHA-256-hashed one-time codes |
| Caching     | Redis (ioredis — works with Upstash) or in-process LRU fallback; HTTP `Cache-Control`; TanStack Query |
| Media       | Cloudinary (production) or local disk (development)                              |
| Email       | Nodemailer over SMTP                                                             |
| Hardening   | helmet, CORS allow-list, express-rate-limit, compression, request size limits   |

---

## Repository layout

```
FoundIt/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── app/                 # App.jsx, router.jsx, queryClient.js
│   │   ├── components/{layout,ui}/
│   │   ├── config/ constants/ hooks/ lib/
│   │   ├── features/{auth,items,dashboard,home}/
│   │   ├── pages/               # NotFoundPage
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── vercel.json              # SPA fallback + immutable asset caching
│   └── vite.config.js           # dev proxy for /api and /uploads
├── server/
│   ├── api/index.js             # Vercel serverless entry (exports the Express app)
│   ├── src/
│   │   ├── config/ constants/ controllers/ lib/ middlewares/
│   │   ├── models/ routes/ services/ utils/ validators/
│   │   ├── app.js               # Express app (no listen)
│   │   └── server.js            # Local/long-running entry (listen + graceful shutdown)
│   ├── .env.example
│   └── vercel.json
└── README.md
```

The client and server are independent npm projects — install and run each from its own folder.

---

## Local setup

### Prerequisites

- Node.js **20+** and npm
- MongoDB — local (`mongod`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- *(optional)* Redis — `docker run -p 6379:6379 redis:7` or a free [Upstash](https://upstash.com) database
- *(optional)* SMTP credentials (e.g. a Gmail App Password) — without them, verification and reset codes are **logged as warnings** and not delivered
- *(optional)* Cloudinary account — without it, uploads are stored in `server/uploads/`

### 1. Backend

```bash
cd server
cp .env.example .env        # then fill in MONGODB_URI and JWT_SECRET at minimum
npm install
npm run dev                 # http://localhost:5000  (auto-restarts on change)
```

Check it is up: `curl http://localhost:5000/api/health`.

### 2. Frontend

```bash
cd client
cp .env.example .env        # defaults work for local development
npm install
npm run dev                 # http://localhost:5173
```

In development the Vite dev server proxies `/api` and `/uploads` to the backend, so the browser talks to one origin and the auth cookie works without any CORS configuration.

### Useful scripts

| Location | Command          | Purpose                          |
| -------- | ---------------- | -------------------------------- |
| server   | `npm run dev`    | Start API with file watching     |
| server   | `npm start`      | Start API (production mode)      |
| server   | `npm run lint`   | ESLint                           |
| client   | `npm run dev`    | Vite dev server                  |
| client   | `npm run build`  | Production build to `dist/`      |
| client   | `npm run preview`| Serve the production build       |
| client   | `npm run lint`   | ESLint                           |

---

## Environment variables

### `server/.env`

| Variable                 | Required | Default                  | Description |
| ------------------------ | :------: | ------------------------ | ----------- |
| `NODE_ENV`               |          | `development`            | `development`, `production` or `test`. Production enables secure cookies and hides stack traces. |
| `PORT`                   |          | `5000`                   | Port for `npm run dev` / `npm start` (ignored on Vercel). |
| `CLIENT_ORIGINS`         |          | value of `CLIENT_URL`    | Comma-separated origins allowed by CORS with credentials. |
| `CLIENT_URL`             |          | `http://localhost:5173`  | Public frontend URL (used in emails and as the default CORS origin). |
| `COOKIE_SAME_SITE`       |          | `lax`                    | `lax`, `strict` or `none`. Use `none` when the client and API are on different sites (two `*.vercel.app` domains); this forces `Secure`. |
| `MONGODB_URI`            |    ✅    | —                        | MongoDB connection string (without database name). |
| `MONGODB_DB_NAME`        |          | `foundit`                | Database name. |
| `JWT_SECRET`             |    ✅    | —                        | ≥ 16 characters; generate with `openssl rand -base64 48`. |
| `JWT_EXPIRES_IN`         |          | `7d`                     | Session lifetime. |
| `REDIS_URL`              |          | *(empty → memory cache)* | Redis/Upstash URL, e.g. `rediss://default:<token>@<host>:6379`. |
| `CACHE_TTL_SECONDS`      |          | `60`                     | TTL for cached public listing pages. |
| `SMTP_HOST`              |          | `smtp.gmail.com`         | SMTP server. |
| `SMTP_PORT`              |          | `587`                    | `465` switches to implicit TLS. |
| `SMTP_USER` / `SMTP_PASS`|  prod ✅ | —                        | SMTP credentials. Email is skipped (with a warning) when unset. |
| `SENDER_EMAIL`           |          | `SMTP_USER`              | From address, e.g. `FoundIt <no-reply@yourdomain.com>`. |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Vercel ✅ | — | Image storage. Required on serverless hosts (their filesystem is read-only/ephemeral). |
| `CLOUDINARY_FOLDER`      |          | `foundit/items`          | Upload folder in Cloudinary. |

The server validates its environment at startup and exits with a readable list of problems if anything required is missing.

### `client/.env`

| Variable                | Default                 | Description |
| ----------------------- | ----------------------- | ----------- |
| `VITE_API_URL`          | `/api`                  | API base URL **including** `/api`. Keep `/api` locally (dev proxy) or when a Vercel rewrite proxies the API; otherwise the full URL, e.g. `https://foundit-api.vercel.app/api`. |
| `VITE_DEV_PROXY_TARGET` | `http://localhost:5000` | Where the Vite dev server forwards `/api` and `/uploads`. Development only. |

> `VITE_*` variables are embedded into the bundle at build time — never put secrets in them.

---

## API reference

Base path: `/api`. 🔒 = requires the session cookie (or `Authorization: Bearer <jwt>`).

| Method | Path                              | Description |
| ------ | --------------------------------- | ----------- |
| GET    | `/health`                         | Liveness + database status. |
| POST   | `/auth/register`                  | `{ name, email, password, phone }` → sends a 6-digit verification code. |
| POST   | `/auth/verify-email`              | `{ email, otp }` |
| POST   | `/auth/verify-email/resend`       | `{ email }` |
| POST   | `/auth/login`                     | `{ email, password }` → sets the `token` cookie. `403 EMAIL_NOT_VERIFIED` if unverified. |
| POST   | `/auth/logout`                    | Clears the cookie. |
| GET    | `/auth/me` 🔒                     | Current user. |
| POST   | `/auth/password/forgot`           | `{ email }` — always 200 (no account enumeration). |
| POST   | `/auth/password/verify-otp`       | `{ email, otp }` |
| POST   | `/auth/password/reset`            | `{ email, otp, newPassword }` |
| GET    | `/items`                          | Active listings. Query: `type` (`lost`/`found`), `q`, `category`, `province`, `date` (`YYYY-MM-DD`), `page`, `limit` (≤ 50). |
| GET    | `/items/stats`                    | Totals and per-category counts. |
| GET    | `/items/:id`                      | Single listing. |
| GET    | `/items/mine` 🔒                  | Your listings. Query: `status`, `type`. |
| POST   | `/items` 🔒                       | `multipart/form-data`: `title, description, category, province, phone, type, image` (≤ 5 MB). |
| PATCH  | `/items/:id/status` 🔒            | `{ status: "active" \| "resolved" }` — owner only. |
| DELETE | `/items/:id` 🔒                   | Owner only; also removes the stored image. |

---

## Caching strategy

Caching is applied at three layers:

1. **Server data cache** (`server/src/lib/cache.js`)
   - Backed by **Redis** when `REDIS_URL` is set (shared across instances/serverless invocations), otherwise an in-process LRU (1 000 entries).
   - Public listing pages, item details (120 s) and stats (300 s) are cached; user profiles (`/auth/me`) for 300 s.
   - **Namespace versioning** for invalidation: every key embeds a version number (`foundit:items:v42:…`). Any create / status change / delete increments the version with a single atomic `INCR`, instantly orphaning all stale listing keys (they then expire via TTL) — no `KEYS`/`SCAN` sweeps.
   - Cache failures never fail a request: on Redis errors the service transparently falls through to MongoDB.
   - Responses carry `X-Cache: HIT|MISS` for observability.
2. **HTTP caching** — public reads send `Cache-Control: public, max-age=30, stale-while-revalidate=60` (stats: 120/300), so browsers and Vercel's CDN can serve them; authenticated and auth routes send `private, no-store`. Express ETags enable cheap `304` revalidation, and responses are gzip-compressed. Built frontend assets are content-hashed and served with `max-age=31536000, immutable`.
3. **Client cache** — TanStack Query deduplicates requests, keeps data fresh for 30 s–5 min depending on the resource, paginates with `useInfiniteQuery`, and invalidates item queries after every mutation.

Supporting MongoDB indexes: `{ type, status, createdAt }` for public listings and `{ userId, status, createdAt }` for the dashboard.

---

## Deployment (Vercel)

Recommended topology: **two Vercel projects from this one repository** — `client/` as a static site and `server/` as a serverless function — plus managed services that work well with serverless:

| Concern  | Service (free tiers available)                   |
| -------- | ------------------------------------------------ |
| Database | MongoDB Atlas                                     |
| Cache    | Upstash Redis                                     |
| Images   | Cloudinary (**required** on Vercel — its filesystem is not persistent) |
| Email    | Any SMTP provider (Gmail App Password, Resend, SendGrid, Brevo…) |

### Step 1 — Provision services

1. **MongoDB Atlas**: create a cluster and a database user. Under *Network Access* allow `0.0.0.0/0` (Vercel functions have no fixed IPs). Copy the `mongodb+srv://…` URI.
2. **Upstash Redis**: create a database and copy the `rediss://…` connection URL.
3. **Cloudinary**: copy the cloud name, API key and API secret from the dashboard.
4. **SMTP**: create credentials (for Gmail: enable 2FA, then create an App Password).

### Step 2 — Deploy the API (`server/`)

1. Vercel → **Add New… → Project** → import the GitHub repository.
2. **Root Directory**: `server`. Framework preset: **Other**. Leave build/output settings empty.
3. Add environment variables (Production):
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://…
   MONGODB_DB_NAME=foundit
   JWT_SECRET=<openssl rand -base64 48>
   REDIS_URL=rediss://…
   SMTP_HOST=… SMTP_PORT=587 SMTP_USER=… SMTP_PASS=… SENDER_EMAIL=…
   CLOUDINARY_CLOUD_NAME=… CLOUDINARY_API_KEY=… CLOUDINARY_API_SECRET=…
   CLIENT_URL=https://<your-client>.vercel.app
   CLIENT_ORIGINS=https://<your-client>.vercel.app
   COOKIE_SAME_SITE=none
   ```
4. Deploy, then verify: `https://<your-api>.vercel.app/api/health` should return `"database": "connected"` after the first API call.

`server/api/index.js` exports the Express app as a single function and `server/vercel.json` routes every path to it. The Mongo connection and cache client are memoised on `globalThis`, so warm invocations reuse them.

### Step 3 — Deploy the frontend (`client/`)

1. Import the same repository again as a second project.
2. **Root Directory**: `client`. Framework preset: **Vite** (build `npm run build`, output `dist`).
3. Environment variable: `VITE_API_URL=https://<your-api>.vercel.app/api`
4. Deploy. `client/vercel.json` provides the SPA fallback so deep links such as `/items/123` work on refresh.

### Step 4 — Wire them together

- Make sure the API's `CLIENT_URL`/`CLIENT_ORIGINS` exactly match the client URL (no trailing slash), then redeploy the API.
- With two `*.vercel.app` domains the browser treats the API as **cross-site**, which is why `COOKIE_SAME_SITE=none` (and therefore `Secure`) is required.

**Optional — same-origin setup (recommended with a custom domain or to avoid third-party-cookie restrictions):** proxy the API through the client project so cookies become first-party. In `client/vercel.json`, add this rule *before* the SPA fallback:

```json
{ "source": "/api/:path*", "destination": "https://<your-api>.vercel.app/api/:path*" }
```

then set `VITE_API_URL=/api` on the client and `COOKIE_SAME_SITE=lax` on the API. Alternatively, put both on one domain (`foundit.com` and `api.foundit.com`) — subdomains of the same site work with `lax`.

### Alternative: long-running Node host for the API

If you prefer a persistent server (no cold starts, in-memory cache shared across requests, WebSockets later), deploy `server/` to **Render**, **Railway** or **Fly.io** instead:

- Root directory `server`, build `npm install`, start `npm start`.
- Same environment variables as above (set `PORT` if the host requires it).
- Keep the frontend on Vercel and point `VITE_API_URL` at the new API URL.

### Release checklist

- [ ] `JWT_SECRET` is long, random and unique per environment
- [ ] `NODE_ENV=production` on the API
- [ ] Cloudinary configured (uploads return `503` on Vercel otherwise)
- [ ] SMTP configured and a test registration email received
- [ ] `CLIENT_ORIGINS` matches the deployed client URL exactly
- [ ] `/api/health` reports `connected`

---

## Security notes

- Passwords are hashed with bcrypt; verification/reset codes are generated with `crypto.randomInt`, stored as SHA-256 hashes, compared in constant time and expire (30 min / 15 min).
- Sessions use an `httpOnly` cookie (`Secure` in production) — the token is never exposed to JavaScript.
- Password-reset and resend endpoints respond identically whether or not an account exists.
- Auth endpoints are rate-limited (20 requests / 15 min / IP); the whole API is limited to 300 requests / 15 min / IP. The default limiter store is per-instance; use a Redis store for strict global limits across many instances.
- Uploads are restricted to JPEG/PNG/WEBP/GIF up to 5 MB and processed in memory before storage.
- Never commit `.env` files — only the `.env.example` templates belong in git.
