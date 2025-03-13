"use client";
import { useCreatePostForm } from "@/hooks/form/useCreatePostForm";
import { Input } from "@all-blue/ui/components/input";
import { useStore } from "@tanstack/react-form";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { useActionState, useEffect } from "react";
import { createPost } from "@/lib/actions/posts";
import { Button } from "@all-blue/ui/components/button";
import { toast } from "@all-blue/ui/components/sonner";
import { InputWrapper } from "@/components/ui";

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
          <InputWrapper
            label="Title"
            error={field.state.meta.errors}
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            type="text"
          />
        )}
      </form.Field>
      <form.Field name="content">
        {(field) => (
          <InputWrapper
            label="Content"
            error={field.state.meta.errors}
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            type="text"
          />
        )}
      </form.Field>
      <Button type="submit">Submit</Button>
    </form>
  );
}
