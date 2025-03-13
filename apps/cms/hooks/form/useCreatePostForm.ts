import { PostCreateModel, type PostCreate } from "@all-blue/lib";
import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { formOptions, ServerFormState } from "@tanstack/react-form/nextjs";
export const createPostFormOpts = formOptions({
  defaultValues: {
    title: "",
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies PostCreate,
  validators: {
    onSubmit: PostCreateModel,
    onChange: PostCreateModel,
  },
});
export function useCreatePostForm(
  state: ServerFormState<PostCreate, undefined>
) {
  return useForm({
    ...createPostFormOpts,
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, state ?? {}),
      [state]
    ),
  });
}
