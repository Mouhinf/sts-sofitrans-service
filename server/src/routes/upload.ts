import { Router } from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";
import { requireAdmin } from "../middleware/auth.js";
import { cloudinaryEnabled, uploadToCloudinary } from "../lib/cloudinary.js";
import { HttpError } from "../middleware/error.js";

const router = Router();

const UPLOAD_DIR = path.resolve("uploads");
const memoryStorage = multer.memoryStorage();
const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"));
      return;
    }
    cb(null, true);
  },
});

router.post("/", requireAdmin, upload.single("file"), async (req, res) => {
  if (!req.file) throw new HttpError(400, "Missing 'file' field");
  const ext = path.extname(req.file.originalname) || ".jpg";
  const filename = `${crypto.randomBytes(8).toString("hex")}${ext}`;

  if (cloudinaryEnabled) {
    const result = await uploadToCloudinary(req.file.buffer, filename);
    res.json(result);
    return;
  }

  // Local fallback: write to ./uploads/ and serve as /uploads/<name>
  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const fullPath = path.join(UPLOAD_DIR, filename);
  await fs.writeFile(fullPath, req.file.buffer);
  const publicUrl = `/uploads/${filename}`;
  res.json({ url: publicUrl, publicId: filename });
});

export default router;
