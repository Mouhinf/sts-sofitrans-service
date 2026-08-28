import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";
import { HttpError } from "../middleware/error.js";
import { parseJsonArray, stringifyJsonArray } from "../lib/json.js";
import type { ImageRef } from "../lib/json.js";

const router = Router();

const PROPERTY_TYPES = ["house", "apartment", "land", "office"] as const;

const propertyInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().int().nonnegative(),
  location: z.string().min(1),
  bedrooms: z.number().int().nonnegative().default(0),
  bathrooms: z.number().int().nonnegative().default(0),
  areaSqm: z.number().int().nonnegative().default(0),
  propertyType: z.enum(PROPERTY_TYPES),
  featured: z.boolean().default(false),
  images: z
    .array(z.object({ url: z.string(), publicId: z.string().default("") }))
    .default([]),
});

const propertyUpdateSchema = propertyInputSchema.partial();

type PropertyInput = z.infer<typeof propertyInputSchema>;

type PropertyRow = Awaited<ReturnType<typeof prisma.property.findFirstOrThrow>>;

function serializeProperty(row: PropertyRow) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: row.price,
    location: row.location,
    bedrooms: row.bedrooms,
    bathrooms: row.bathrooms,
    areaSqm: row.areaSqm,
    propertyType: row.propertyType,
    featured: row.featured,
    images: parseJsonArray<ImageRef>(row.images),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

// ── Public ─────────────────────────────────────────────────────

router.get("/", async (req, res) => {
  const { propertyType, minPrice, maxPrice } = req.query;
  const where: Record<string, unknown> = {};
  if (propertyType && typeof propertyType === "string") {
    where.propertyType = propertyType;
  }
  if (minPrice || maxPrice) {
    where.price = {} as Record<string, number>;
    if (minPrice) (where.price as Record<string, number>).gte = Number(minPrice);
    if (maxPrice) (where.price as Record<string, number>).lte = Number(maxPrice);
  }
  const items = await prisma.property.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  res.json(items.map(serializeProperty));
});

router.get("/:id", async (req, res) => {
  const property = await prisma.property.findUnique({ where: { id: String(req.params.id) } });
  if (!property) throw new HttpError(404, "Propriété introuvable");
  res.json(serializeProperty(property));
});

// ── Admin ──────────────────────────────────────────────────────

router.get("/admin/list", requireAdmin, async (_req, res) => {
  const items = await prisma.property.findMany({ orderBy: { createdAt: "desc" } });
  res.json(items.map(serializeProperty));
});

router.post("/admin", requireAdmin, async (req, res) => {
  const data = propertyInputSchema.parse(req.body) as PropertyInput;
  const created = await prisma.property.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      location: data.location,
      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      areaSqm: data.areaSqm,
      propertyType: data.propertyType,
      featured: data.featured,
      images: stringifyJsonArray(data.images),
    },
  });
  res.status(201).json(serializeProperty(created));
});

router.put("/admin/:id", requireAdmin, async (req, res) => {
  const data = propertyUpdateSchema.parse(req.body) as Partial<PropertyInput>;
  const updated = await prisma.property.update({
    where: { id: String(req.params.id) },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.price !== undefined ? { price: data.price } : {}),
      ...(data.location !== undefined ? { location: data.location } : {}),
      ...(data.bedrooms !== undefined ? { bedrooms: data.bedrooms } : {}),
      ...(data.bathrooms !== undefined ? { bathrooms: data.bathrooms } : {}),
      ...(data.areaSqm !== undefined ? { areaSqm: data.areaSqm } : {}),
      ...(data.propertyType !== undefined ? { propertyType: data.propertyType } : {}),
      ...(data.featured !== undefined ? { featured: data.featured } : {}),
      ...(data.images !== undefined ? { images: stringifyJsonArray(data.images) } : {}),
    },
  });
  res.json(serializeProperty(updated));
});

router.delete("/admin/:id", requireAdmin, async (req, res) => {
  await prisma.property.delete({ where: { id: String(req.params.id) } });
  res.status(204).end();
});

export default router;
