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

const PORT = Number(process.env.PORT ?? 3001);
const CORS_ORIGINS = (process.env.CORS_ORIGINS ?? "http://localhost:5173")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false, // we don't serve HTML
  }),
);
app.use(
  cors({
    origin: (origin, cb) => {
      // Allow same-origin (no origin) and configured origins
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

// Static files for local-uploaded images
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

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
  console.log(`[api] CORS: ${CORS_ORIGINS.join(", ")}`);
});
