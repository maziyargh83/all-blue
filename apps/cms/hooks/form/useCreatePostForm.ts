import { type Post } from "@all-blue/lib";
import { useForm } from "@tanstack/react-form";
export function useCreatePostForm() {
  return useForm({
    defaultValues: {
      title: "",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      id: "",
    } satisfies Post,
  });
}
