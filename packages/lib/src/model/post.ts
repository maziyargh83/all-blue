import { z } from "zod";

export const PostModel = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type Post = z.infer<typeof PostModel>;
