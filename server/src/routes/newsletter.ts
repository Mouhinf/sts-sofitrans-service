import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

const subscribeSchema = z.object({
  email: z.string().email(),
});

router.post("/subscribe", async (req, res) => {
  const { email } = subscribeSchema.parse(req.body);
  // Upsert: if email already exists and is unsubscribed, re-subscribe
  const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
  if (existing) {
    if (existing.unsubscribedAt) {
      const updated = await prisma.newsletterSubscriber.update({
        where: { email },
        data: { unsubscribedAt: null, verified: true, subscribedAt: new Date() },
      });
      return res.json(updated);
    }
    return res.json(existing);
  }
  const created = await prisma.newsletterSubscriber.create({
    data: { email, verified: true },
  });
  res.status(201).json(created);
});

router.get("/admin/list", requireAdmin, async (_req, res) => {
  const items = await prisma.newsletterSubscriber.findMany({
    orderBy: { subscribedAt: "desc" },
  });
  res.json(items);
});

router.get("/admin/count", requireAdmin, async (_req, res) => {
  const count = await prisma.newsletterSubscriber.count({
    where: { unsubscribedAt: null },
  });
  res.json({ count });
});

export default router;
