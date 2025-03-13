"use client";
import { useCreatePostForm } from "@/hooks/form/useCreatePostForm";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { useActionState } from "react";
import { createPost } from "@/lib/actions/posts";
import { Button } from "@all-blue/ui/components/button";
import { InputWrapper } from "@/components/ui";

export function CreatePostForm() {
  const [state, action] = useActionState(createPost, initialFormState);
  const form = useCreatePostForm(state ?? initialFormState);
  // const formErrors = useStore(form.store, (formState) => formState.errors);

  // تابع کمکی برای استخراج پیام خطا از آبجکت خطا
  const extractErrorMessage = (err: any): string => {
    if (typeof err === "string") return err;
    if (typeof err === "object" && err !== null) {
      // اگر آبجکت خطا دارای فیلد message باشد، آن را برمی‌گردانیم
      if (err.message) return err.message;
    }
    // در غیر این صورت، آبجکت را به رشته تبدیل می‌کنیم
    return JSON.stringify(err);
  };

  // تابع کمکی برای پردازش و حذف پیام‌های خطای تکراری
  const formatErrors = (errors: any): string | undefined => {
    if (!errors) return undefined;

    if (Array.isArray(errors)) {
      // استخراج تمام پیام‌های خطا
      const messages = errors.map(extractErrorMessage);
      // حذف پیام‌های تکراری با استفاده از Set
      const uniqueMessages = [...new Set(messages)];
      return uniqueMessages.join(", ");
    }

    return extractErrorMessage(errors);
  };

  return (
    <form action={action as never} onSubmit={() => form.handleSubmit()}>
      <form.Field name="title">
        {(field) => (
          <InputWrapper
            label="Title"
            error={formatErrors(field.state.meta.errors)}
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
            error={formatErrors(field.state.meta.errors)}
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            type="text"
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
