"use server";
import { createPostFormOpts } from "@/hooks/form/useCreatePostForm";
import { Post, PostCreateModel } from "@all-blue/lib";
import {
  createServerValidate,
  ServerValidateError,
} from "@tanstack/react-form/nextjs";
import { slugify } from "../string";
import grayMatter from "gray-matter";
import path from "node:path";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { redirect } from "next/navigation";
const serverValidate = createServerValidate({
  ...createPostFormOpts,
  onServerValidate: PostCreateModel,
});
const docsPath = path.join(process.cwd(), "..", "..", ".docs", "posts");

export async function createPost(prev: unknown, formData: FormData) {
  try {
    await serverValidate(formData);
    const title = formData.get("title");
    const content = formData.get("content");
    const slug = slugify(title as string);
    const data = grayMatter.stringify(content as string, {
      title: title as string,
      slug: slug,
    });
    const filePath = path.join(docsPath, `${slug}.mdx`);
    await writeFile(filePath, data);
    redirect("/dashboard");
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }
}
export const getPosts = async (): Promise<Post[]> => {
  const posts = await readdir(docsPath);
  const data = await Promise.all(
    posts.map(async (post) => {
      const filePath = path.join(docsPath, post);
      const file = await readFile(filePath, "utf-8");
      const { content, data } = grayMatter(file);
      return {
        id: post,
        title: data.title,
        slug: data.slug,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        content: content,
      } satisfies Post;
    })
  );
  return data;
};
