import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";

const hasCloudinary =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET;

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
}

export interface UploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
}

/** Upload an image buffer to Cloudinary. Throws if credentials are missing. */
export function uploadToCloudinary(
  buffer: Buffer,
  filename: string,
  folder = "sts-sofitrans",
): Promise<UploadResult> {
  if (!hasCloudinary) {
    throw new Error(
      "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET, or use local upload.",
    );
  }
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, public_id: filename, resource_type: "image" },
      (err, result: UploadApiResponse | undefined) => {
        if (err) return reject(err);
        if (!result) return reject(new Error("Cloudinary returned no result"));
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
        });
      },
    );
    stream.end(buffer);
  });
}

/** Delete an image from Cloudinary by publicId. */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  if (!hasCloudinary) return;
  await cloudinary.uploader.destroy(publicId);
}

export const cloudinaryEnabled = hasCloudinary;
