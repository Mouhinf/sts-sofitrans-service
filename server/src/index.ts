import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "node:path";
import { errorHandler, notFound } from "./middleware/error.js";
import authRouter from "./routes/auth.js";
import propertiesRouter from "./routes/properties.js";
import vehiclesRouter from "./routes/vehicles.js";
import trainingsRouter from "./routes/trainings.js";
import enrollmentsRouter from "./routes/enrollments.js";
import blogRouter from "./routes/blog.js";
import messagesRouter from "./routes/messages.js";
import quotesRouter from "./routes/quotes.js";
import bookingsRouter from "./routes/bookings.js";
import newsletterRouter from "./routes/newsletter.js";
import settingsRouter from "./routes/settings.js";
import uploadRouter from "./routes/upload.js";
import adminRouter from "./routes/admin.js";

const CORS_ORIGINS = (process.env.CORS_ORIGINS ?? "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

export function createApp(): express.Express {
  const app = express();

  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: "cross-origin" },
      contentSecurityPolicy: false,
    }),
  );
  app.use(
    cors({
      origin: (origin, cb) => {
        if (!origin || CORS_ORIGINS.includes(origin)) {
          cb(null, true);
          return;
        }
        cb(new Error(`Origin ${origin} not allowed by CORS`));
      },
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

  // Local-uploaded images (only meaningful when Cloudinary is disabled
  // — on serverless hosts like Vercel, /uploads is not persisted, so
  // uploads should always go through Cloudinary in production).
  app.use("/uploads", express.static(path.resolve("uploads")));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Public
  app.use("/api/auth", authRouter);
  app.use("/api/properties", propertiesRouter);
  app.use("/api/vehicles", vehiclesRouter);
  app.use("/api/trainings", trainingsRouter);
  app.use("/api/enrollments", enrollmentsRouter);
  app.use("/api/blog", blogRouter);
  app.use("/api/messages", messagesRouter);
  app.use("/api/quotes", quotesRouter);
  app.use("/api/bookings", bookingsRouter);
  app.use("/api/newsletter", newsletterRouter);
  app.use("/api/settings", settingsRouter);
  app.use("/api/upload", uploadRouter);
  app.use("/api/admin", adminRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

// Direct execution starts a long-running HTTP server (dev / standalone
// hosting). When the module is imported (e.g. by a serverless handler),
// `createApp` is called by the host instead and `app.listen` is skipped.
const isMainModule =
  typeof process !== "undefined" &&
  process.argv[1] &&
  process.argv[1].endsWith("index.ts");

if (isMainModule) {
  const PORT = Number(process.env.PORT ?? 3001);
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`[api] listening on http://localhost:${PORT}`);
    console.log(`[api] CORS: ${CORS_ORIGINS.join(", ")}`);
  });
}

export default createApp;
