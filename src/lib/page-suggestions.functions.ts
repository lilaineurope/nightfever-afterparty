import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { looksLikeBot, tooBusy } from "@/lib/form-guard";

// "Got a suggestion for this page?" at the bottom of every page (Lisa, 24 Nov 2026: "every page should have a suggestion
// box in the bottom - the request then will know from which page exactly this suggestion comes from - do that to all pages
// and from there onwards"). The box lives in the shared SiteFooter (and the 404 page), so every page - old and new - has it.
// Each suggestion is stored in the Lovable Cloud table page_suggestions with the exact page it came from (path + title);
// RLS is on with no anon/authenticated grants, so only these validated server functions (service role) touch it.
// Nothing from this box is ever shown on the site; Lisa reads them on /guestbook/admin (moderation key).

export type PageSuggestion = {
  id: string;
  page_path: string;
  page_title: string | null;
  message: string;
  from_name: string | null;
  email: string | null;
  status: "pending" | "done";
  created_at: string;
};

// More than two links = spam; one or two (a picture, a source) are welcome.
const LINKS = /(https?:\/\/|www\.)/gi;

const suggestSchema = z.object({
  // The page: path + #anchor, no query string (utm tags, ?me) - set by the box from the address bar.
  path: z
    .string()
    .trim()
    .min(1)
    .max(300)
    .transform((p) => (p.startsWith("/") ? p : `/${p}`)),
  title: z.string().trim().max(200).optional().transform((v) => v || null),
  message: z.string().trim().min(3, "Please write your suggestion.").max(1000),
  from: z.string().trim().max(60).optional().transform((v) => v || null),
  email: z
    .string()
    .trim()
    .max(200)
    .optional()
    .transform((v) => v || null)
    .refine((v) => v === null || z.string().email().safeParse(v).success, "That email address doesn't look right."),
  website: z.string().max(0).optional(), // spam trap - people never see this field
  elapsed: z.number(),
});

/** Public: store a suggestion with the page it came from. Returns its id so the heads-up email can link straight to it. */
export const suggestForPage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const parsed = suggestSchema.safeParse(input);
    if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Please check the form.");
    return parsed.data;
  })
  .handler(async ({ data }): Promise<{ ok: boolean; id?: string; message: string }> => {
    if (looksLikeBot(data.website, data.elapsed, 2500)) return { ok: true, message: "Thank you!" };
    if ((data.message.match(LINKS)?.length ?? 0) > 2 || (data.from && /(https?:\/\/|www\.)/i.test(data.from))) {
      return { ok: false, message: "Just one or two links, please!" };
    }
    if (await tooBusy("page_suggestions")) return { ok: false, message: "Lots of suggestions right now - please try again in a little while!" };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("page_suggestions")
      .insert({ page_path: data.path, page_title: data.title, message: data.message, from_name: data.from, email: data.email })
      .select("id")
      .single();
    if (error) {
      console.error("Page suggestion failed:", error.message);
      return { ok: false, message: "That didn't go through - please try again." };
    }
    return { ok: true, id: row.id, message: "Thank you - your suggestion is on its way to me!" };
  });

// --- Lisa only (moderation key) -----------------------------------------------------------------------------------

const keySchema = z.object({ key: z.string().min(16).max(200) });

/** Every page suggestion, newest first. */
export const adminListPageSuggestions = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => keySchema.parse(input))
  .handler(async ({ data }): Promise<PageSuggestion[]> => {
    const { checkKey } = await import("@/lib/moderation-key.server");
    const db = await checkKey(data.key);
    const { data: rows, error } = await db
      .from("page_suggestions")
      .select("id,page_path,page_title,message,from_name,email,status,created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw new Error(error.message);
    return rows as PageSuggestion[];
  });

/** Done (kept, moved to the Done list), Back to waiting, or Delete (gone for good). */
export const handlePageSuggestion = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    keySchema.extend({ id: z.string().uuid(), action: z.enum(["done", "pending", "delete"]) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { checkKey } = await import("@/lib/moderation-key.server");
    const db = await checkKey(data.key);
    const table = db.from("page_suggestions");
    const { error } =
      data.action === "delete"
        ? await table.delete().eq("id", data.id)
        : await table.update({ status: data.action, done_at: data.action === "done" ? new Date().toISOString() : null }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
