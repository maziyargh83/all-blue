"use client";
import { useCreatePostForm } from "@/hooks/form/useCreatePostForm";
import { Input } from "@all-blue/ui/components/input";
import { useStore } from "@tanstack/react-form";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { useActionState, useEffect } from "react";
import { createPost } from "@/lib/actions/posts";
import { Button } from "@all-blue/ui/components/button";
import { toast } from "@all-blue/ui/components/sonner";

export function CreatePostForm() {
  const [state, action] = useActionState(createPost, initialFormState);
  const form = useCreatePostForm(state ?? initialFormState);
  const formErrors = useStore(form.store, (formState) => formState.errors);

  useEffect(() => {
    if (formErrors) {
      toast.error("Error creating post");
    }
  }, [formErrors]);
  return (
    <form action={action as never} onSubmit={() => form.handleSubmit()}>
      <form.Field name="title">
        {(field) => (
          <Input
            name="title"
            type="text"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>
      <form.Field name="content">
        {(field) => (
          <Input
            name="content"
            type="text"
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
      </form.Field>
      <Button type="submit">Submit</Button>
    </form>
  );
}
