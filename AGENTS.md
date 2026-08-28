# Project Guidance

## User Preferences

[No preferences yet]

## Architecture

- **Frontend**: Vite + React 19 + TanStack Router/Query + Tailwind + Radix shadcn/ui. Lives in `src/frontend/`.
- **Backend (REST)**: Node 22 + Express + Prisma + SQLite (dev) / Postgres (prod) + JWT + optional Cloudinary uploads. Lives in `server/`. Communicates with the frontend over the routes mounted under `/api/*`.
- **Legacy backend**: `src/backend/` (Motoko / DFX) is kept for reference but no longer used by the frontend.

## Verified Commands

**Frontend** (run from `src/frontend/`):

- **install**: `pnpm install --prefer-offline`
- **typecheck**: `pnpm typecheck`
- **lint fix**: `pnpm fix`
- **build**: `pnpm build`
- **dev**: `pnpm dev` (proxies `/api/*` is handled by `VITE_API_URL` in `.env`)

**Backend** (run from `server/`):

- **install**: `npm install`
- **typecheck**: `npx tsc --noEmit`
- **dev**: `npm run dev` (tsx watch on port 3001)
- **build**: `npm run build`
- **db:generate**: `npm run db:generate`
- **db:migrate**: `npm run db:migrate`
- **db:deploy**: `npm run db:deploy` (production migrations)
- **db:studio**: `npm run db:studio` (Prisma Studio at http://localhost:5555)
- **seed**: `npm run seed` (creates admin user, sample properties/vehicles/trainings)

**Environment variables**

- Frontend: `VITE_API_URL` (default `http://localhost:3001`)
- Backend: `server/.env` — `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CORS_ORIGINS`, `CLOUDINARY_*` (optional)

## Deployment

- **Frontend**: Vercel, auto-deploy on push to `main`. Vercel project name `sts-sofitrans-service`. Set `VITE_API_URL` env var in Vercel dashboard to point at the production API.
- **Backend**: Render / Railway / Fly.io recommended (any Node 22 host). Set all backend env vars in the host. Run `npm run db:deploy && npm run seed` once on first boot.

## Learnings

- The `api/` directory at the project root is auto-detected by Vercel as Serverless Functions and will hit the 12-function Hobby limit. The REST backend therefore lives in `server/`. The frontend still calls the API over `/api/*` HTTP paths (configured by `VITE_API_URL`).
