import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();

router.get("/stats", requireAdmin, async (_req, res) => {
  const [
    totalProperties,
    totalVehicles,
    totalTrainings,
    totalBlogPosts,
    totalMessages,
    unreadMessages,
    totalBookings,
    pendingBookings,
    totalQuotes,
    pendingQuotes,
    totalSubscribers,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.vehicle.count(),
    prisma.training.count(),
    prisma.blogPost.count(),
    prisma.message.count(),
    prisma.message.count({ where: { status: "unread" } }),
    prisma.booking.count(),
    prisma.booking.count({ where: { status: "pending" } }),
    prisma.quote.count(),
    prisma.quote.count({ where: { status: "pending" } }),
    prisma.newsletterSubscriber.count({ where: { unsubscribedAt: null } }),
  ]);

  res.json({
    totalProperties,
    totalVehicles,
    totalTrainings,
    totalBlogPosts,
    totalMessages,
    unreadMessages,
    totalBookings,
    pendingBookings,
    totalQuotes,
    pendingQuotes,
    totalSubscribers,
  });
});

export default router;
