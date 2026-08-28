import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAdmin } from "../middleware/auth.js";
import { HttpError } from "../middleware/error.js";

const router = Router();

const POST_STATUSES = ["draft", "published"] as const;

const postInputSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  author: z.string().min(1),
  postStatus: z.enum(POST_STATUSES).default("draft"),
  categoryTags: z.array(z.string()).default([]),
  featuredImageUrl: z.string().default(""),
  featuredImagePublicId: z.string().default(""),
  publishDate: z.string().datetime().optional().nullable(),
});

const postUpdateSchema = postInputSchema.partial();

type PostInput = z.infer<typeof postInputSchema>;

function serializePost(post: {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  author: string;
  postStatus: string;
  categoryTags: string;
  featuredImageUrl: string;
  featuredImagePublicId: string;
  publishDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    ...post,
    categoryTags: JSON.parse(post.categoryTags) as string[],
  };
}

router.get("/", async (req, res) => {
  const { status, page, pageSize } = req.query;
  const where: Record<string, unknown> = {};
  if (status === "published") where.postStatus = "published";
  const pageNum = page ? Number(page) : 1;
  const size = pageSize ? Number(pageSize) : 100;
  const [items, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: [{ publishDate: "desc" }, { createdAt: "desc" }],
      skip: (pageNum - 1) * size,
      take: size,
    }),
    prisma.blogPost.count({ where }),
  ]);
  res.json({
    posts: items.map(serializePost),
    total,
    page: pageNum,
    pageSize: size,
  });
});

router.get("/by-slug/:slug", async (req, res) => {
  const post = await prisma.blogPost.findUnique({ where: { slug: String(req.params.slug) } });
  if (!post) return res.status(404).json({ error: "Article introuvable" });
  res.json(serializePost(post));
});

router.get("/admin/list", requireAdmin, async (_req, res) => {
  const items = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  res.json(items.map(serializePost));
});

router.post("/admin", requireAdmin, async (req, res) => {
  const data = postInputSchema.parse(req.body) as PostInput;
  const created = await prisma.blogPost.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      content: data.content,
      author: data.author,
      postStatus: data.postStatus,
      categoryTags: JSON.stringify(data.categoryTags),
      featuredImageUrl: data.featuredImageUrl,
      featuredImagePublicId: data.featuredImagePublicId,
      publishDate: data.publishDate ? new Date(data.publishDate) : null,
    },
  });
  res.status(201).json(serializePost(created));
});

router.put("/admin/:id", requireAdmin, async (req, res) => {
  const data = postUpdateSchema.parse(req.body) as Partial<PostInput>;
  const updated = await prisma.blogPost.update({
    where: { id: String(req.params.id) },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.slug !== undefined ? { slug: data.slug } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.content !== undefined ? { content: data.content } : {}),
      ...(data.author !== undefined ? { author: data.author } : {}),
      ...(data.postStatus !== undefined ? { postStatus: data.postStatus } : {}),
      ...(data.categoryTags !== undefined ? { categoryTags: JSON.stringify(data.categoryTags) } : {}),
      ...(data.featuredImageUrl !== undefined ? { featuredImageUrl: data.featuredImageUrl } : {}),
      ...(data.featuredImagePublicId !== undefined
        ? { featuredImagePublicId: data.featuredImagePublicId }
        : {}),
      ...(data.publishDate !== undefined
        ? { publishDate: data.publishDate ? new Date(data.publishDate) : null }
        : {}),
    },
  });
  res.json(serializePost(updated));
});

router.delete("/admin/:id", requireAdmin, async (req, res) => {
  await prisma.blogPost.delete({ where: { id: String(req.params.id) } });
  res.status(204).end();
});

export default router;
