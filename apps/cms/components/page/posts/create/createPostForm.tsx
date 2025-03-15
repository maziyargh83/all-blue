"use client";
import { useCreatePostForm } from "@/hooks/form/useCreatePostForm";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { useActionState } from "react";
import { createPost } from "@/lib/actions/posts";
import { Button } from "@all-blue/ui/components/button";
import { InputWrapper } from "@/components/ui";
import { TextareaWrapper } from "@/components/ui/textarea-wrapper";

export function CreatePostForm() {
  const [state, action] = useActionState(createPost, initialFormState);
  const form = useCreatePostForm(state ?? initialFormState);

  return (
    <form
      action={action as never}
      onSubmit={() => form.handleSubmit()}
      className="flex flex-col gap-4"
    >
      <form.Field name="title">
        {(field) => (
          <InputWrapper
            label="Title"
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            inputProps={{
              type: "text",
              name: "title",
            }}
          />
        )}
      </form.Field>
      <form.Field name="content">
        {(field) => (
          <TextareaWrapper
            label="Content"
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            textareaProps={{
              rows: 10,
              name: "content",
            }}
          />
        )}
      </form.Field>
      <form.Subscribe
        selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button type="submit" disabled={!canSubmit}>
            {isSubmitting ? "..." : "Submit"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
