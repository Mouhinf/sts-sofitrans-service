import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

const messageSchema = z.object({
  customerName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().default(""),
  message: z.string().min(1),
});

const statusSchema = z.object({
  status: z.enum(["unread", "read", "archived"]),
});

router.post("/", async (req, res) => {
  const data = messageSchema.parse(req.body);
  const created = await prisma.message.create({ data });
  res.status(201).json(created);
});

router.get("/admin/list", requireAdmin, async (_req, res) => {
  const items = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
  res.json(items);
});

router.put("/admin/:id/status", requireAdmin, async (req, res) => {
  const { status } = statusSchema.parse(req.body);
  const updated = await prisma.message.update({
    where: { id: String(req.params.id) },
    data: { status },
  });
  res.json(updated);
});

export default router;
