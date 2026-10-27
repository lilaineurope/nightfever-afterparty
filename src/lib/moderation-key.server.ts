// Lisa's moderation key, shared by the guestbook and the interview suggestions (server only).
// No accounts: the moderation page sends a long secret key with every request. Only a salted SHA-256 hash of it is
// stored (guestbook_settings), compared in constant time; wrong keys are logged and, after 10 in 15 minutes,
// every attempt is refused for a while.

export const sha256 = async (text: string) => {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
};
const sameText = (a: string, b: string) => {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
};

/** Checks Lisa's moderation key (guestbook and interview suggestions) and returns the service-role client. */
export async function checkKey(key: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const { count } = await supabaseAdmin
    .from("guestbook_key_failures")
    .select("id", { count: "exact", head: true })
    .gte("created_at", since);
  if ((count ?? 0) >= 10) throw new Error("Too many wrong keys - please wait 15 minutes and try again.");
  const { data } = await supabaseAdmin.from("guestbook_settings").select("key_salt,key_hash").eq("id", 1).maybeSingle();
  const ok = !!data && sameText(await sha256(data.key_salt + key), data.key_hash);
  if (!ok) {
    await supabaseAdmin.from("guestbook_key_failures").insert({});
    throw new Error("That key isn't right.");
  }
  return supabaseAdmin;
}
