import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// The guestbook. Visitors' notes wait as "pending" until Lisa approves them on /guestbook/admin.
// Neither table has grants for anon/authenticated: only these validated server functions (service role) reach them,
// and the moderation ones check the signed-in user against guestbook_admins.

export type GuestbookNote = {
  id: string;
  name: string;
  place: string | null;
  episode: string | null;
  message: string;
  reply: string | null;
  created_at: string;
};
export type ModeratedNote = GuestbookNote & { status: "pending" | "approved" | "hidden" };

const PUBLIC_COLUMNS = "id,name,place,episode,message,reply,created_at";

/** Public: approved notes, newest first. */
export const listGuestbook = createServerFn({ method: "GET" }).handler(async (): Promise<GuestbookNote[]> => {
  // Never let the page fail: if the database can't be reached, show the form with no notes.
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("guestbook_entries")
      .select(PUBLIC_COLUMNS)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) throw new Error(error.message);
    return data as GuestbookNote[];
  } catch (e) {
    console.error("Guestbook list failed:", e instanceof Error ? e.message : e);
    return [];
  }
});

const LINK = /(https?:\/\/|www\.|\.(com|net|org|ru|xyz|top|info|biz)\b)/i;

const signSchema = z.object({
  name: z.string().trim().min(1, "Please add your name or nickname.").max(60),
  place: z.string().trim().max(60).optional().transform((v) => v || null),
  episode: z
    .string()
    .optional()
    .transform((v) => (v && /^s\d\de\d\d$/.test(v) ? v : null)),
  message: z.string().trim().min(2, "Your note is a little short!").max(1000, "Please keep your note under 1000 characters."),
  consent: z.literal(true, { message: "Please tick the box so I can show your note." }),
  website: z.string().max(0).optional(), // spam trap - people never see this field
  elapsed: z.number(),
});

type SignResult = { ok: boolean; message: string };

/** Public: leave a note. It is stored as pending and only shows once approved. */
export const signGuestbook = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const parsed = signSchema.safeParse(input);
    if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Please check the form.");
    return parsed.data;
  })
  .handler(async ({ data }): Promise<SignResult> => {
    // Bots fill hidden fields and submit within a second or two: accept quietly, store nothing.
    if (data.website || data.elapsed < 3000) return { ok: true, message: "Thank you!" };
    if (LINK.test(data.message) || LINK.test(data.name) || LINK.test(data.place ?? "")) {
      return { ok: false, message: "Links can't go in the guestbook - just words, please!" };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("guestbook_entries")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending")
      .gte("created_at", since);
    if ((count ?? 0) >= 25) {
      return { ok: false, message: "The guestbook is very busy right now - please try again in a little while!" };
    }
    const { error } = await supabaseAdmin.from("guestbook_entries").insert({
      name: data.name,
      place: data.place,
      episode: data.episode,
      message: data.message,
    });
    if (error) {
      console.error("Guestbook sign failed:", error.message);
      return { ok: false, message: "Oops - something went wrong on my side. Please try again in a moment!" };
    }
    return { ok: true, message: "Thank you! Your note will appear here as soon as I've read it." };
  });

async function isAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("guestbook_admins").select("user_id").eq("user_id", userId).maybeSingle();
  return !!data;
}

/** Moderators only: every note, pending first. */
export const adminListGuestbook = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ admin: boolean; notes: ModeratedNote[] }> => {
    if (!(await isAdmin(context.userId))) return { admin: false, notes: [] };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("guestbook_entries")
      .select(`${PUBLIC_COLUMNS},status`)
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw new Error(error.message);
    return { admin: true, notes: data as ModeratedNote[] };
  });

const moderateSchema = z.object({
  id: z.string().uuid(),
  action: z.enum(["approve", "hide", "pending", "delete", "reply"]),
  reply: z.string().trim().max(600).optional(),
});

/** Moderators only: approve, hide, delete or reply to a note. */
export const moderateGuestbook = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => moderateSchema.parse(input))
  .handler(async ({ data, context }) => {
    if (!(await isAdmin(context.userId))) throw new Error("Only the site's moderator can do that.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const table = supabaseAdmin.from("guestbook_entries");
    const { error } =
      data.action === "delete"
        ? await table.delete().eq("id", data.id)
        : data.action === "reply"
          ? await table.update({ reply: data.reply || null }).eq("id", data.id)
          : await table
              .update({
                status: data.action === "approve" ? "approved" : data.action === "hide" ? "hidden" : "pending",
                approved_at: data.action === "approve" ? new Date().toISOString() : null,
              })
              .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
