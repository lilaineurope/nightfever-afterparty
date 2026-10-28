// Spam rules shared by the public forms that store something (guestbook notes, interview suggestions).

/** Text that looks like a link - links are not allowed in public notes. */
export const HAS_LINK = /(https?:\/\/|www\.|\.(com|net|org|ru|xyz|top|info|biz)\b)/i;

/** Bots fill the hidden "website" field and submit within a second or two. */
export const looksLikeBot = (website: string | undefined, elapsedMs: number, minMs: number) => !!website || elapsedMs < minMs;

/** More than 25 pending entries in the last 10 minutes = someone is flooding the form. Server-side only. */
export async function tooBusy(table: "guestbook_entries" | "interview_suggestions") {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const since = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { count } = await supabaseAdmin
    .from(table)
    .select("id", { count: "exact", head: true })
    .eq("status", "pending")
    .gte("created_at", since);
  return (count ?? 0) >= 25;
}
