# Project Guidance

## User Preferences

- French copy only.
- Preserve `data-ocid` attributes (they back the test harness).
- camelCase filenames, PascalCase components.
- Path aliases: `@/components/...`, `@/hooks/...`, `@/lib/...`, `@/types`, `@/backend`.

## Architecture

- **Frontend**: Vite + React 19 + TanStack Router/Query + Tailwind + Radix shadcn/ui. Lives in `src/frontend/`.
- **Backend (REST)**: Node 22 + Express + Prisma + PostgreSQL (Docker locally / hosted in prod) + JWT + optional Cloudinary uploads. Lives in `server/`. Communicates with the frontend over the routes mounted under `/api/*`.
- **Legacy backend**: `src/backend/` (Motoko / DFX) is kept on disk for reference but no longer used by the frontend.
- **Serverless bridge** (currently inactive in production): `api/[...path].ts` wraps `server/dist/index.js` for Vercel. Single-segment paths (`/api/health`, `/api/properties`) route correctly; nested paths return CDN 404 (Vercel routing quirk). Until a hosted Postgres is configured, the deployed frontend keeps using an ngrok tunnel pointed at the local API.

## Verified Commands

**Frontend** (run from `src/frontend/`):
- `pnpm install --prefer-offline`
- `pnpm typecheck`
- `pnpm fix`
- `pnpm build`
- `pnpm dev` (proxies `/api/*` to `http://localhost:3001` via `vite.config.js`)

**Backend** (run from `server/`):
- `npm install`
- `npx tsc --noEmit`
- `npm run dev` (tsx watch on port 3001)
- `npm run build` (outputs `dist/`)
- `npm run db:generate`
- `npm run db:migrate`
- `npm run db:deploy` (production migrations)
- `npm run db:studio` (Prisma Studio at http://localhost:5555)
- `npm run seed` (creates admin user, sample properties/vehicles/trainings)
- `pm2 start ecosystem.config.cjs` (starts API + ngrok with auto-restart)
- `pm2 save && pm2 resurrect` (snapshot / restore process list)

**Postgres** (run from `server/`):
- `docker compose up -d` (start container)
- `docker compose down` (stop, keep data)
- `docker compose down -v && docker compose up -d && npm run db:migrate && npm run seed` (reset)

## Environment variables

- Frontend: `VITE_API_URL` — defaults to `/api`. In the Vercel project this is
  set to `https://semidramatic-subobtusely-bernadine.ngrok-free.dev` until a
  hosted Postgres is in place.
- Backend: `server/.env` — `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGINS`, `CLOUDINARY_*` (optional).

## Deployment

- **Frontend**: Vercel, auto-deploys on push to `main`. Vercel project name `sts-sofitrans` (note: NOT `sts-sofitrans-service`, which is the repo name). Set `VITE_API_URL` env var in Vercel dashboard to point at the production API.
- **Backend (today)**: local Docker + Express, exposed via `ngrok`. Managed by `pm2`; survives reboots via cron `@reboot` (`~/.local/bin/pm2-resurrect.sh`).
- **Backend (future)**: any Node 22 host (Render / Railway / Fly.io) or Vercel Postgres + the existing serverless bridge once `DATABASE_URL` is set.

See `server/DEPLOYMENT.md` for the step-by-step.

## API route conventions

- Auth endpoints live under `/api/account/*` (not `/api/auth/*` — Vercel reserves that prefix for NextAuth).
- Admin dashboard endpoints live under `/api/manage/*` (not `/api/admin/*`).
- All other resources use `/api/<resource>/admin` for write operations and `/api/<resource>` for reads.

## Learnings

- The `api/` directory at the project root is auto-detected by Vercel as Serverless Functions and will hit the 12-function Hobby limit. The REST backend therefore lives in `server/`, exposed through a single catch-all in `api/[...path].ts`. The frontend still calls the API over `/api/*` HTTP paths (configured by `VITE_API_URL`).
- Vercel's catch-all `[...path].ts` matches single-segment paths under `/api/` but currently returns CDN 404 for nested paths. The `server/DEPLOYMENT.md` "Going fully hosted" section documents how to flip the deploy to a hosted Postgres + serverless bridge once a DB is provisioned.
