import { z } from "zod";

export const PostModel = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
  slug: z.string().min(1),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Post = z.infer<typeof PostModel>;

export const PostCreateModel = PostModel.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type PostCreate = z.infer<typeof PostCreateModel>;
