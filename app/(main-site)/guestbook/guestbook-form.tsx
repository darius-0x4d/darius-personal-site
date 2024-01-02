"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DOMPurify from "dompurify";

export default function GuestbookForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const FormSchema = z.object({
    guestbookMessage: z.string().min(1, {
      message: "Your message must not be empty.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      guestbookMessage: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsFetching(true);

    const cleanedMessage = DOMPurify.sanitize(data.guestbookMessage);

    if (!cleanedMessage.length) {
      form.setError("guestbookMessage", {
        message: "Message contains invalid text.",
      });
    } else {
      const res = await fetch("/api/guestbook", {
        body: JSON.stringify({
          body: cleanedMessage,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.error(error);
        // Handle API errors
      }

      form.resetField("guestbookMessage");
    }

    setIsFetching(false);
    startTransition(() => {
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 py-8"
        style={{ opacity: !isMutating ? 1 : 0.7 }}
      >
        <FormField
          control={form.control}
          name="guestbookMessage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sign the Guestbook</FormLabel>
              <FormControl>
                <Input placeholder="Hello!" disabled={isPending} {...field} />
              </FormControl>
              <FormDescription>
                This is where you can leave a message for everyone that views
                the guestbook to see.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row-reverse">
          <Button type="submit" disabled={isMutating}>
            Submit Message
          </Button>
        </div>
      </form>
    </Form>
  );
}
