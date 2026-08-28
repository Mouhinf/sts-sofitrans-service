import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

const quoteSchema = z.object({
  customerName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  serviceType: z.string().min(1),
  requirements: z.string().default(""),
  budgetRange: z.string().default(""),
});

const statusSchema = z.object({
  status: z.enum(["pending", "sent", "accepted", "declined"]),
});

router.post("/", async (req, res) => {
  const data = quoteSchema.parse(req.body);
  const created = await prisma.quote.create({ data });
  res.status(201).json(created);
});

router.get("/admin/list", requireAdmin, async (_req, res) => {
  const items = await prisma.quote.findMany({ orderBy: { createdAt: "desc" } });
  res.json(items);
});

router.put("/admin/:id/status", requireAdmin, async (req, res) => {
  const { status } = statusSchema.parse(req.body);
  const updated = await prisma.quote.update({
    where: { id: String(req.params.id) },
    data: { status },
  });
  res.json(updated);
});

export default router;
