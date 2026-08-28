import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";
import { HttpError } from "../middleware/error.js";
import { parseJsonArray, stringifyJsonArray } from "../lib/json.js";
import type { ImageRef } from "../lib/json.js";

const router = Router();

const VEHICLE_TYPES = ["car", "bus", "truck", "minibus"] as const;

const vehicleInputSchema = z.object({
  title: z.string().min(1),
  model: z.string().min(1),
  description: z.string().min(1),
  vehicleType: z.enum(VEHICLE_TYPES),
  capacity: z.number().int().min(1).default(1),
  pricePerDay: z.number().int().nonnegative(),
  featured: z.boolean().default(false),
  images: z
    .array(z.object({ url: z.string(), publicId: z.string().default("") }))
    .default([]),
});

const vehicleUpdateSchema = vehicleInputSchema.partial();

type VehicleInput = z.infer<typeof vehicleInputSchema>;
type VehicleRow = Awaited<ReturnType<typeof prisma.vehicle.findFirstOrThrow>>;

function serializeVehicle(row: VehicleRow) {
  return {
    id: row.id,
    title: row.title,
    model: row.model,
    description: row.description,
    vehicleType: row.vehicleType,
    capacity: row.capacity,
    pricePerDay: row.pricePerDay,
    featured: row.featured,
    images: parseJsonArray<ImageRef>(row.images),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

router.get("/", async (req, res) => {
  const { vehicleType, maxPrice } = req.query;
  const where: Record<string, unknown> = {};
  if (vehicleType && typeof vehicleType === "string") {
    where.vehicleType = vehicleType;
  }
  if (maxPrice) {
    where.pricePerDay = { lte: Number(maxPrice) };
  }
  const items = await prisma.vehicle.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  res.json(items.map(serializeVehicle));
});

router.get("/:id", async (req, res) => {
  const vehicle = await prisma.vehicle.findUnique({ where: { id: String(req.params.id) } });
  if (!vehicle) throw new HttpError(404, "Véhicule introuvable");
  res.json(serializeVehicle(vehicle));
});

router.get("/admin/list", requireAdmin, async (_req, res) => {
  const items = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
  res.json(items.map(serializeVehicle));
});

router.post("/admin", requireAdmin, async (req, res) => {
  const data = vehicleInputSchema.parse(req.body) as VehicleInput;
  const created = await prisma.vehicle.create({
    data: {
      title: data.title,
      model: data.model,
      description: data.description,
      vehicleType: data.vehicleType,
      capacity: data.capacity,
      pricePerDay: data.pricePerDay,
      featured: data.featured,
      images: stringifyJsonArray(data.images),
    },
  });
  res.status(201).json(serializeVehicle(created));
});

router.put("/admin/:id", requireAdmin, async (req, res) => {
  const data = vehicleUpdateSchema.parse(req.body) as Partial<VehicleInput>;
  const updated = await prisma.vehicle.update({
    where: { id: String(req.params.id) },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.model !== undefined ? { model: data.model } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.vehicleType !== undefined ? { vehicleType: data.vehicleType } : {}),
      ...(data.capacity !== undefined ? { capacity: data.capacity } : {}),
      ...(data.pricePerDay !== undefined ? { pricePerDay: data.pricePerDay } : {}),
      ...(data.featured !== undefined ? { featured: data.featured } : {}),
      ...(data.images !== undefined ? { images: stringifyJsonArray(data.images) } : {}),
    },
  });
  res.json(serializeVehicle(updated));
});

router.delete("/admin/:id", requireAdmin, async (req, res) => {
  await prisma.vehicle.delete({ where: { id: String(req.params.id) } });
  res.status(204).end();
});

export default router;
