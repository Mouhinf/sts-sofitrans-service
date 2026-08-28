import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

const bookingSchema = z.object({
  customerName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  vehicleId: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  specialRequests: z.string().default(""),
});

const statusSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled"]),
});

router.post("/", async (req, res) => {
  const data = bookingSchema.parse(req.body);
  const created = await prisma.booking.create({ data });
  res.status(201).json(created);
});

router.get("/admin/list", requireAdmin, async (_req, res) => {
  const items = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  res.json(items);
});

router.put("/admin/:id/status", requireAdmin, async (req, res) => {
  const { status } = statusSchema.parse(req.body);
  const updated = await prisma.booking.update({
    where: { id: String(req.params.id) },
    data: { status },
  });
  res.json(updated);
});

export default router;
