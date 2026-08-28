// api/[...path].ts
//
// Single Vercel serverless function that wraps the Express app built
// from `server/`. Every `/api/*` request from the frontend hits this
// handler, keeping the function count at 1 (well under Vercel Hobby's
// 12-function limit) while preserving the existing Express routing.

// @ts-expect-error - resolved at build time by Vercel from server/dist
import createApp from "../server/dist/index.js";

const app = createApp();

export const config = {
  api: {
    bodyParser: false,
    sizeLimit: "12mb",
  },
};

export default function handler(req: unknown, res: unknown): void {
  app(req as never, res as never, () => {
    // Express handled the response (or invoked next() into the 404
    // middleware). Nothing else to do here.
  });
}
