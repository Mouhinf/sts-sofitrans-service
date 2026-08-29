import { Router } from "express";
import { prisma } from "../lib/prisma.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    db: process.env.DATABASE_URL ? "configured" : "missing",
  });
});

router.get("/db", async (_req, res) => {
  if (!process.env.DATABASE_URL) {
    return res.status(503).json({
      status: "down",
      reason: "DATABASE_URL not set",
    });
  }
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "up" });
  } catch (err) {
    res.status(503).json({
      status: "down",
      reason: err instanceof Error ? err.message : "unknown",
    });
  }
});

export default router;
