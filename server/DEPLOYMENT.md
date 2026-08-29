# Deploying the STS SOFITRANS backend

The frontend is hosted on Vercel at https://sts-sofitrans.vercel.app and talks
to the backend over `VITE_API_URL`. The current production deployment uses an
ngrok tunnel that points at a locally-run Express server.

## Current state (as of Aug 29, 2026)

- **Frontend**: deployed on Vercel (`sts-sofitrans` project).
- **API**: Express + Prisma + PostgreSQL, managed by `pm2` (auto-restart on
  crash, exponential backoff, 512 MB memory cap).
- **Tunnel**: `ngrok http 3001` exposes the local API at
  `https://semidramatic-subobtusely-bernadine.ngrok-free.dev`. The free
  ngrok domain is persistent as long as the authtoken is configured.
- **Postgres**: Docker container `sts-sofitrans-postgres`, restart policy
  `unless-stopped` (Docker auto-starts it on boot).
- **Crash recovery**: `pm2 resurrect` is wired into the user crontab via
  `~/.local/bin/pm2-resurrect.sh` (`@reboot`).

## Verifying the admin works

```bash
# Health
curl https://semidramatic-subobtusely-bernadine.ngrok-free.dev/api/health

# Login (returns a JWT)
curl -X POST https://semidramatic-subobtusely-bernadine.ngrok-free.dev/api/account/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sts-sofitrans.sn","password":"admin123"}'

# Authenticated request
TOKEN="…from login…"
curl https://semidramatic-subobtusely-bernadine.ngrok-free.dev/api/manage/stats \
  -H "Authorization: Bearer $TOKEN"
```

Then open https://sts-sofitrans.vercel.app/admin/login in a browser and use
the same credentials.

## Restarting everything from scratch

```bash
# Start postgres
docker start sts-sofitrans-postgres

# Start API + ngrok (already wired in ecosystem.config.cjs)
pm2 start /home/mouhammad/sts-sofitrans-service/server/ecosystem.config.cjs
pm2 save

# Verify
pm2 list
curl http://localhost:3001/api/health
curl http://localhost:4040/api/tunnels
```

If the cron `@reboot` is in place, a machine reboot will run
`~/.local/bin/pm2-resurrect.sh` automatically.

## Going fully hosted (future)

To remove the local-machine dependency entirely:

1. Create a free Postgres database on any of these providers:
   - **Vercel Storage → Postgres** (Neon under the hood)
   - **Neon** directly — https://neon.tech
   - **Supabase** — https://supabase.com
2. Add these env vars to the Vercel project (`sts-sofitrans` →
   Settings → Environment Variables → Production):
   - `DATABASE_URL` — pooled connection string from step 1
   - `JWT_SECRET` — 32-byte random (`openssl rand -hex 32`)
   - `ADMIN_EMAIL` — `admin@sts-sofitrans.sn`
   - `ADMIN_PASSWORD` — pick a strong one
   - `CORS_ORIGINS` — `https://sts-sofitrans.vercel.app,http://localhost:5173`
   - `CLOUDINARY_*` (optional) — for image uploads
3. Update `VITE_API_URL` in Vercel to `/api` so the deployed frontend hits
   the in-project serverless function instead of the ngrok tunnel.
4. Run migrations + seed once:
   - From the Vercel Shell (or any host that can reach the DB):
     ```bash
     cd server
     npm install
     npm run db:deploy
     npm run seed
     ```
5. Redeploy. The `/api/health` endpoint should report `"db": "configured"`.

## Local development

```bash
cd server
docker compose up -d             # Postgres on localhost:5432
npm install
npm run db:migrate              # apply migrations
npm run seed                    # admin + sample data
npm run dev                     # API on http://localhost:3001
```

In another terminal:

```bash
cd src/frontend
pnpm install
pnpm dev                        # http://localhost:5173 (proxies /api to :3001)
```

Default credentials: `admin@sts-sofitrans.sn` / `admin123`.

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `pm2 list` shows nothing | pm2 daemon was killed | `pm2 resurrect` (loads from `~/.pm2/dump.pm2`) |
| ngrok URL is unreachable | ngrok process died | `pm2 restart sts-ngrok` or check `pm2 logs sts-ngrok` |
| Frontend says "Database not configured" | Vercel deployment missing `DATABASE_URL` | Set the env var and redeploy, or fall back to ngrok by setting `VITE_API_URL` to the ngrok URL |
| `cdg1::xxx` CDN 404 on `/api/account/me` etc. | Vercel edge doesn't route nested paths through the catch-all | Use single-segment routes or rely on the ngrok tunnel until the hosted backend is configured |
