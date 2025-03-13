"use server";

import { createPostFormOpts } from "@/hooks/form/useCreatePostForm";
import { PostModel } from "@all-blue/lib";
import {
  createServerValidate,
  ServerValidateError,
} from "@tanstack/react-form/nextjs";

const serverValidate = createServerValidate({
  ...createPostFormOpts,
  onServerValidate: PostModel,
});

export async function createPost(prev: unknown, formData: FormData) {
  try {
    console.log("formData", formData);

    return await serverValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }
}
