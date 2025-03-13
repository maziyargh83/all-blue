import { PostModel, type Post } from "@all-blue/lib";
import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { formOptions, ServerFormState } from "@tanstack/react-form/nextjs";
export const createPostFormOpts = formOptions({
  defaultValues: {
    title: "",
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    id: "",
  } satisfies Post,
  validators: {
    onSubmit: PostModel,
  },
});
export function useCreatePostForm(state: ServerFormState<any, undefined>) {
  return useForm({
    ...createPostFormOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, state ?? {}),
      [state]
    ),
  });
}
