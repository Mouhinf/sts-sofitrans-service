import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";
import { HttpError } from "../middleware/error.js";

const router = Router();

const trainingInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  durationDays: z.number().int().min(1).default(1),
  price: z.number().int().nonnegative(),
  maxCapacity: z.number().int().min(1).default(20),
  imageUrl: z.string().default(""),
  imagePublicId: z.string().default(""),
});

const trainingUpdateSchema = trainingInputSchema.partial();

type TrainingInput = z.infer<typeof trainingInputSchema>;

router.get("/", async (_req, res) => {
  const items = await prisma.training.findMany({
    orderBy: { createdAt: "desc" },
    include: { enrollments: true },
  });
  res.json(items);
});

router.get("/:id", async (req, res) => {
  const training = await prisma.training.findUnique({
    where: { id: String(req.params.id) },
    include: { enrollments: true },
  });
  if (!training) throw new HttpError(404, "Formation introuvable");
  res.json(training);
});

router.get("/admin/list", requireAdmin, async (_req, res) => {
  const items = await prisma.training.findMany({
    orderBy: { createdAt: "desc" },
    include: { enrollments: true },
  });
  res.json(items);
});

router.post("/admin", requireAdmin, async (req, res) => {
  const data = trainingInputSchema.parse(req.body) as TrainingInput;
  const created = await prisma.training.create({
    data: {
      title: data.title,
      description: data.description,
      durationDays: data.durationDays,
      price: data.price,
      maxCapacity: data.maxCapacity,
      imageUrl: data.imageUrl,
      imagePublicId: data.imagePublicId,
    },
  });
  res.status(201).json(created);
});

router.put("/admin/:id", requireAdmin, async (req, res) => {
  const data = trainingUpdateSchema.parse(req.body) as Partial<TrainingInput>;
  const updated = await prisma.training.update({
    where: { id: String(req.params.id) },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.durationDays !== undefined ? { durationDays: data.durationDays } : {}),
      ...(data.price !== undefined ? { price: data.price } : {}),
      ...(data.maxCapacity !== undefined ? { maxCapacity: data.maxCapacity } : {}),
      ...(data.imageUrl !== undefined ? { imageUrl: data.imageUrl } : {}),
      ...(data.imagePublicId !== undefined ? { imagePublicId: data.imagePublicId } : {}),
    },
  });
  res.json(updated);
});

router.delete("/admin/:id", requireAdmin, async (req, res) => {
  await prisma.training.delete({ where: { id: String(req.params.id) } });
  res.status(204).end();
});

export default router;
