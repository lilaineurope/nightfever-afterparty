import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email()
    .max(255),
  consent: z.literal(true),
});

/**
 * Public endpoint: stores the address with the consent timestamp.
 * The table holds no grants for anon/authenticated — only the server's
 * admin client may write, and only this validated function reaches it.
 */
export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const parsed = subscribeSchema.safeParse(input);
    if (!parsed.success) {
      throw new Error("Please enter a valid email address and tick the consent box.");
    }
    return parsed.data;
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .upsert(
        {
          email: data.email,
          consented_at: new Date().toISOString(),
          unsubscribed_at: null,
        },
        { onConflict: "email" },
      );
    if (error) {
      console.error("Newsletter subscribe failed:", error.message);
      return {
        ok: false as const,
        message: "Oops - something went wrong on my side. Please try again in a moment!",
      };
    }
    return {
      ok: true as const,
      message: "You're on the list - welcome to the afterparty! So exciting!",
    };
  });

const tokenSchema = z.string().uuid();

/** Public endpoint: unsubscribe by the per-subscriber token from the email link. */
export const unsubscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const parsed = tokenSchema.safeParse(input);
    if (!parsed.success) throw new Error("That unsubscribe link is not valid.");
    return parsed.data;
  })
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq("unsubscribe_token", data);
    if (error) {
      console.error("Newsletter unsubscribe failed:", error.message);
      return {
        ok: false as const,
        message: "Oops - something went wrong. Please try again in a moment!",
      };
    }
    return {
      ok: true as const,
      message: "You're off the list. No hard feelings - the disco ball keeps spinning!",
    };
  });
