"use server";
import { createPostFormOpts } from "@/hooks/form/useCreatePostForm";
import { PostCreateModel } from "@all-blue/lib";
import {
  createServerValidate,
  ServerValidateError,
} from "@tanstack/react-form/nextjs";
import { slugify } from "../string";
import grayMatter from "gray-matter";
import path from "node:path";
import { writeFile } from "node:fs/promises";
import { redirect } from "next/navigation";
const serverValidate = createServerValidate({
  ...createPostFormOpts,
  onServerValidate: PostCreateModel,
});
const docsPath = path.join(process.cwd(), "..", "..", ".docs");

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
