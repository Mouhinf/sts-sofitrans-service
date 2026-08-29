# Deploying the STS SOFITRANS backend

The frontend is hosted on Vercel at https://sts-sofitrans.vercel.app and talks
to the backend over `VITE_API_URL=/api`. A single Vercel serverless function
(`api/[...path].ts` at the project root) wraps the Express app from `server/`,
so no separate API host is strictly required.

There are two supported approaches:

## Option A — Vercel Serverless (recommended, simplest)

The repo is already wired for this. Just set the env vars in the Vercel
project and deploy.

1. Create a managed Postgres database (any of these work, all have a free tier):
   - **Vercel Storage → Postgres** (one click in the Vercel dashboard).
   - **Neon** — https://neon.tech → sign up with GitHub → new project → copy the
     pooled connection string.
   - **Supabase** — https://supabase.com → new project → Settings → Database →
     copy the connection string.
2. Add these env vars in **Vercel → sts-sofitrans → Settings → Environment
   Variables** (Production):
   - `DATABASE_URL` — the Postgres connection string from step 1
   - `JWT_SECRET` — 32-byte random string (`openssl rand -hex 32`)
   - `ADMIN_EMAIL` — default `admin@sts-sofitrans.sn`
   - `ADMIN_PASSWORD` — pick a strong one (default `admin123`)
   - `CORS_ORIGINS` — `https://sts-sofitrans.vercel.app,http://localhost:5173`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
     *(optional — enables Cloudinary uploads; otherwise images are written to
     a non-persistent local folder)*
3. Trigger a redeploy (Settings → Deployments → click the latest → Redeploy).
4. Once the deployment is Ready, open the Vercel Shell for the deployment and
   run the migrations + seed:
   ```bash
   cd server
   npm run db:deploy
   npm run seed
   ```

## Option B — Long-running host (Render / Railway / Fly.io)

If you'd rather run the API as a traditional Node service:

1. Render Blueprint: `server/render.yaml` is committed and auto-detected when
   the repo is connected to a new Render Blueprint service.
2. Set the same env vars as Option A in the service's environment tab.
3. The start command is `npm start`; the build command is
   `npm install && npm run db:deploy && npm run build`.
4. Once the service is live, set `VITE_API_URL=https://<your-api-host>` in the
   Vercel project env vars and redeploy the frontend.
5. Run `npm run seed` from the service's shell once.

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
