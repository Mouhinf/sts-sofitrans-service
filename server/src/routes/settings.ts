import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

const settingsSchema = z.object({
  phone: z.string().default(""),
  whatsapp: z.string().default(""),
  email: z.string().default(""),
  address: z.string().default(""),
  logoUrl: z.string().default(""),
  facebookUrl: z.string().default(""),
  instagramUrl: z.string().default(""),
  linkedinUrl: z.string().default(""),
  youtubeUrl: z.string().default(""),
});

const SETTINGS_ID = 1;

router.get("/", async (_req, res) => {
  let settings = await prisma.companySettings.findUnique({ where: { id: SETTINGS_ID } });
  if (!settings) {
    settings = await prisma.companySettings.create({ data: { id: SETTINGS_ID } });
  }
  res.json(settings);
});

router.put("/", requireAdmin, async (req, res) => {
  const data = settingsSchema.parse(req.body);
  const settings = await prisma.companySettings.upsert({
    where: { id: SETTINGS_ID },
    update: data,
    create: { id: SETTINGS_ID, ...data },
  });
  res.json(settings);
});

export default router;
