import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";
import { HttpError } from "../middleware/error.js";

const router = Router();

const enrollmentSchema = z.object({
  trainingId: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
});

// Public — used by the formation page enrollment modal
router.post("/", async (req, res) => {
  const data = enrollmentSchema.parse(req.body);
  const training = await prisma.training.findUnique({ where: { id: data.trainingId } });
  if (!training) throw new HttpError(404, "Formation introuvable");
  const created = await prisma.trainingEnrollment.create({ data });
  res.status(201).json(created);
});

// Admin — list enrollments for a training
router.get("/admin/by-training/:trainingId", requireAdmin, async (req, res) => {
  const items = await prisma.trainingEnrollment.findMany({
    where: { trainingId: String(req.params.trainingId) },
    orderBy: { createdAt: "desc" },
  });
  res.json(items);
});

export default router;
