# Project Guidance

## User Preferences

[No preferences yet]

## Architecture

- **Frontend**: Vite + React 19 + TanStack Router/Query + Tailwind + Radix shadcn/ui. Lives in `src/frontend/`.
- **Backend (REST)**: Node 22 + Express + Prisma + **PostgreSQL** + JWT + optional Cloudinary uploads. Lives in `server/`. Communicates with the frontend over the routes mounted under `/api/*`.
- **Legacy backend**: `src/backend/` (Motoko / DFX) is kept for reference but no longer used by the frontend.
- **Serverless bridge**: `api/[...path].ts` at the project root is a single Vercel serverless function that imports the compiled Express app and exposes every `/api/*` route. This stays well under the 12-function Hobby limit.

## Verified Commands

**Frontend** (run from `src/frontend/`):

- **install**: `pnpm install --prefer-offline`
- **typecheck**: `pnpm typecheck`
- **lint fix**: `pnpm fix`
- **build**: `pnpm build`
- **dev**: `pnpm dev` (Vite proxies `/api/*` to `http://localhost:3001` via `vite.config.js`)

**Backend** (run from `server/`):

- **install**: `npm install`
- **typecheck**: `npx tsc --noEmit`
- **dev**: `npm run dev` (tsx watch on port 3001)
- **build**: `npm run build` (outputs to `server/dist/`)
- **db:generate**: `npm run db:generate`
- **db:migrate**: `npm run db:migrate`
- **db:deploy**: `npm run db:deploy` (production migrations)
- **db:studio**: `npm run db:studio` (Prisma Studio at http://localhost:5555)
- **seed**: `npm run seed` (creates admin user, sample properties/vehicles/trainings)

**Local Postgres** (run from `server/`):

- **up**: `docker compose up -d`
- **down**: `docker compose down`
- **reset**: `docker compose down -v && docker compose up -d && npm run db:migrate && npm run seed`

## Environment variables

- Frontend: `VITE_API_URL` (default `/api` — Vercel routes `/api/*` to the serverless function; locally the Vite proxy handles it)
- Backend (`server/.env`): `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGINS`, `CLOUDINARY_*` (optional)

## Deployment

- **Frontend + API**: same Vercel project `sts-sofitrans`. Auto-deploy on push to `main`. URL: https://sts-sofitrans.vercel.app
- **Build pipeline**: `vercel.json` builds the server (`npm install && npm run db:generate && npm run build`), then the frontend (`pnpm install --prefer-offline && pnpm build`). The output directory is `src/frontend/dist`. The single `api/[...path].ts` serverless function is auto-detected.
- **Database**: any managed Postgres (Vercel Postgres / Neon / Supabase / Railway all work). Set `DATABASE_URL` in Vercel env vars.
- **Required env vars in Vercel project**: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGINS` (include `https://sts-sofitrans.vercel.app`).

## Learnings

- The `api/` directory at the project root is auto-detected by Vercel as Serverless Functions (12-function Hobby limit). Putting a single catch-all `api/[...path].ts` that wraps the Express app from `server/dist/` keeps the count at 1.
- The SPA rewrite must exclude `/api/` to let requests reach the serverless function. The current regex in `vercel.json` is `"/((?!api/|assets/).*)"` → `/index.html`.
- Vercel serves cached responses for the production alias until the cache TTL expires or a new deployment's content overrides it.
- Local dev uses docker-compose postgres (Postgres 16-alpine) on `localhost:5432`; the schema is `provider = "postgresql"` so the same Prisma client works locally and in production.
