import { createPostFormOpts } from "@/hooks/form/useCreatePostForm";
import { PostCreateModel } from "@all-blue/lib";
import {
  createServerValidate,
  ServerValidateError,
} from "@tanstack/react-form/nextjs";

const serverValidate = createServerValidate({
  ...createPostFormOpts,
  onServerValidate: PostCreateModel,
});

export async function createPost(prev: unknown, formData: FormData) {
  try {
    await serverValidate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }

    // Some other error occurred while validating your form
    throw e;
  }
}
