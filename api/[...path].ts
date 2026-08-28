// api/[...path].ts
//
// Single Vercel serverless function that wraps the Express app built
// from `server/`. Every `/api/*` request from the frontend hits this
// handler, keeping the function count at 1 (well under Vercel Hobby's
// 12-function limit) while preserving the existing Express routing.

import type { VercelRequest, VercelResponse } from "@vercel/node";
import createApp from "../server/dist/index.js";

const app = createApp();

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "12mb",
  },
};

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
): void {
  app(req as never, res as never, () => {
    // Express already wrote the response (or called next() into the
    // not-found handler). Vercel will see the finished response.
  });
}
