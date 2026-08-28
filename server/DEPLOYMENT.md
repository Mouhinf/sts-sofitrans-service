# Deploying the STS SOFITRANS backend (Node + Prisma + Cloudinary)

The frontend is hosted on Vercel at https://sts-sofitrans.vercel.app and points
at this API over `VITE_API_URL`. The Hobby Vercel plan only allows 12
Serverless Functions, so the backend is deployed separately to a long-running
Node 22 host (Render / Railway / Fly.io recommended).

## 1. Provision a managed Postgres database

- Render: https://dashboard.render.com → New → PostgreSQL (Free plan OK for dev).
- Copy the `External Database URL` (looks like `postgresql://user:pass@host:5432/db`).

## 2. Provision a Cloudinary account (optional but recommended)

- https://cloudinary.com → copy `Cloud name`, `API Key`, `API Secret`.
- Cloudinary is optional: if the three `CLOUDINARY_*` env vars are missing,
  uploads are written to the local `server/uploads/` directory instead.

## 3. Deploy the `server/` folder

### Option A — Render Blueprint (recommended)

1. Render → New → Blueprint.
2. Point at this GitHub repo, root directory: `server/`.
3. Render auto-detects `render.yaml` (already committed).
4. Fill in the `DATABASE_URL`, `JWT_SECRET` (any 32-char random string), and
   the `CLOUDINARY_*` env vars if you have them.
5. Render runs `npm install && npm run db:deploy && npm run build` then starts
   the server with `npm start`.

### Option B — Manual

1. Create a Web Service on Render / Railway / Fly.io pointing at this repo.
2. Build command: `npm install && npm run db:deploy && npm run build`.
3. Start command: `npm start`.
4. Add the env vars below.
5. Open the service Shell once and run `npm run seed` to create the admin user
   and the seed content (3 properties, 3 vehicles, 3 trainings).

## 4. Required environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | yes | Postgres connection string |
| `JWT_SECRET` | yes | 32-byte random string (`openssl rand -hex 32`) |
| `JWT_EXPIRES_IN` | no | default `7d` |
| `ADMIN_EMAIL` | yes | admin login email (default `admin@sts-sofitrans.sn`) |
| `ADMIN_PASSWORD` | yes | admin login password (default `admin123`, **change in prod**) |
| `ADMIN_NAME` | no | admin display name |
| `CORS_ORIGINS` | yes | comma-separated list, **must include** `https://sts-sofitrans.vercel.app` |
| `PORT` | no | default `3001` |
| `NODE_ENV` | no | `production` |
| `CLOUDINARY_CLOUD_NAME` | optional | enables Cloudinary uploads |
| `CLOUDINARY_API_KEY` | optional | — |
| `CLOUDINARY_API_SECRET` | optional | — |

## 5. Point the frontend at the new API

The Vercel project needs a single env var to point at the production API:

- Vercel dashboard → sts-sofitrans → Settings → Environment Variables.
- Add `VITE_API_URL` = `https://<your-api-host>` for Production.
- Redeploy.

## 6. Smoke-test once deployed

```bash
curl https://<your-api-host>/health
# → {"status":"ok","time":"..."}

curl -X POST https://<your-api-host>/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sts-sofitrans.sn","password":"admin123"}'
# → {"token":"...","user":{...}}
```
