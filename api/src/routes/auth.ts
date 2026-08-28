import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { checkPassword, signToken } from "../lib/auth.js";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/login", async (req, res) => {
  const { email, password } = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
  if (!user) return res.status(401).json({ error: "Identifiants invalides" });
  const ok = await checkPassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Identifiants invalides" });
  const token = signToken(user);
  res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
  });
});

router.get("/me", async (req, res) => {
  const header = req.header("authorization");
  if (!header?.toLowerCase().startsWith("bearer ")) {
    return res.status(401).json({ error: "Missing bearer token" });
  }
  try {
    const { verifyToken } = await import("../lib/auth.js");
    const payload = verifyToken(header.slice(7).trim());
    const user = await prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

export default router;
