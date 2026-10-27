import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// "Who to interview next" - visitors' suggestions (Lisa, 27 Oct 2026).
// A suggestion is stored as "pending" in interview_suggestions; the visitor's browser emails Lisa a heads-up with a
// link to /guestbook/admin?suggestion=<id>, where she presses Approve (shows on the home page straight away) or
// Don't approve (deleted for good). Visitors' names are never shown. The table has RLS on and no anon/authenticated
// grants - only these validated server functions (service role) touch it; moderation needs Lisa's key.

export type FanPick = { who: string; why: string | null; count: number };
export type PendingSuggestion = { id: string; who: string; why: string | null; from_name: string | null; status: "pending" | "approved"; created_at: string };

const norm = (s: string) => s.normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();

/** Public: approved suggestions, one entry per person (most suggested first), never the visitor's name. */
export const listFanPicks = createServerFn({ method: "GET" }).handler(async (): Promise<FanPick[]> => {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("interview_suggestions")
      .select("who,why,approved_at")
      .eq("status", "approved")
      .order("approved_at", { ascending: true })
      .limit(500);
    if (error) throw new Error(error.message);
    const byName = new Map<string, FanPick & { order: number }>();
    data.forEach((r, i) => {
      const k = norm(r.who);
      const hit = byName.get(k);
      if (hit) {
        hit.count++;
        if (!hit.why && r.why) hit.why = r.why;
      } else byName.set(k, { who: r.who.trim(), why: r.why, count: 1, order: i });
    });
    return [...byName.values()]
      .sort((a, b) => b.count - a.count || a.order - b.order)
      .map(({ who, why, count }) => ({ who, why, count }));
  } catch (e) {
    console.error("Fan picks failed:", e instanceof Error ? e.message : e);
    return [];
  }
});

const LINK = /(https?:\/\/|www\.|\.(com|net|org|ru|xyz|top|info|biz)\b)/i;

const suggestSchema = z.object({
  who: z.string().trim().min(2, "Who should they interview?").max(80),
  why: z.string().trim().max(200).optional().transform((v) => v || null),
  from: z.string().trim().max(60).optional().transform((v) => v || null),
  website: z.string().max(0).optional(), // spam trap - people never see this field
  elapsed: z.number(),
});

/** Public: store a suggestion as pending. Returns its id so the heads-up email can link straight to it. */
export const suggestGuest = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const parsed = suggestSchema.safeParse(input);
    if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Please check the form.");
    return parsed.data;
  })
  .handler(async ({ data }): Promise<{ ok: boolean; id?: string; message: string }> => {
    // Bots fill hidden fields and submit within a second or two: accept quietly, store nothing.
    if (data.website || data.elapsed < 2000) return { ok: true, message: "Thank you!" };
    if (LINK.test(data.who) || LINK.test(data.why ?? "") || LINK.test(data.from ?? "")) {
      return { ok: false, message: "Just a name and a few words, please - no links!" };
    }
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const { count } = await supabaseAdmin
      .from("interview_suggestions")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending")
      .gte("created_at", since);
    if ((count ?? 0) >= 25) return { ok: false, message: "Lots of suggestions right now - please try again in a little while!" };
    const { data: row, error } = await supabaseAdmin
      .from("interview_suggestions")
      .insert({ who: data.who, why: data.why, from_name: data.from })
      .select("id")
      .single();
    if (error) {
      console.error("Suggestion failed:", error.message);
      return { ok: false, message: "That didn't go through - please try again." };
    }
    return { ok: true, id: row.id, message: "Thank you - your suggestion is on its way to me!" };
  });

// --- Moderation (Lisa only) -------------------------------------------------------------------------------------

const keySchema = z.object({ key: z.string().min(16).max(200) });

/** Moderator only: every suggestion, newest first. */
export const adminListSuggestions = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => keySchema.parse(input))
  .handler(async ({ data }): Promise<PendingSuggestion[]> => {
    const { checkKey } = await import("@/lib/moderation-key.server");
    const db = await checkKey(data.key);
    const { data: rows, error } = await db
      .from("interview_suggestions")
      .select("id,who,why,from_name,status,created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw new Error(error.message);
    return rows as PendingSuggestion[];
  });

/** Moderator only: approve (shows on the home page) or reject (deleted for good). */
export const moderateSuggestion = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => keySchema.extend({ id: z.string().uuid(), action: z.enum(["approve", "reject"]) }).parse(input))
  .handler(async ({ data }) => {
    const { checkKey } = await import("@/lib/moderation-key.server");
    const db = await checkKey(data.key);
    const table = db.from("interview_suggestions");
    const { error } =
      data.action === "reject"
        ? await table.delete().eq("id", data.id)
        : await table.update({ status: "approved", approved_at: new Date().toISOString() }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
