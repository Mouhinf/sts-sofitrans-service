import type { NextFunction, Request, Response } from "express";

/**
 * Returns 503 with a helpful message if DATABASE_URL is not configured.
 * On Vercel serverless, missing env vars should produce actionable errors
 * rather than opaque Prisma "connection refused" stack traces.
 */
export function dbReady(req: Request, res: Response, next: NextFunction) {
  if (!process.env.DATABASE_URL) {
    return res.status(503).json({
      error: "Database not configured",
      message:
        "DATABASE_URL is not set on this deployment. Create a free Postgres database (Vercel Postgres, Neon, or Supabase) and add DATABASE_URL to the Vercel project environment variables, then redeploy.",
      docs: "https://sts-sofitrans.vercel.app/admin/login",
    });
  }
  next();
}
