import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { HAS_LINK, looksLikeBot, tooBusy } from "@/lib/form-guard";
import { FAN_BOXES, FAN_BOX, type FanBox } from "@/lib/fan-suggestions";

// The fan suggestion boxes (src/lib/fan-suggestions.ts). The fan_suggestions table has RLS on and no anon/authenticated
// grants - only these validated server functions (service role) touch it; moderation needs Lisa's key.

export type FanIdea = { what: string; kind: string | null; why: string | null; count: number };
export type ModeratedFanIdea = {
  id: string;
  box: FanBox;
  kind: string | null;
  what: string;
  why: string | null;
  from_name: string | null;
  status: "pending" | "approved";
  created_at: string;
};

const boxSchema = z.enum(FAN_BOXES);
// The same title typed twice ("Paris is Burning", "paris is burning!") counts as one idea, suggested by two fans.
const ideaKey = (kind: string | null, what: string) => `${kind ?? ""}|${what.toLowerCase().replace(/[^a-z0-9]+/g, "")}`;

/** Public: one box's approved ideas, one entry per idea (most suggested first), never the visitor's name. */
export const listFanIdeas = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => boxSchema.parse(input))
  .handler(async ({ data: box }): Promise<FanIdea[]> => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data, error } = await supabaseAdmin
        .from("fan_suggestions")
        .select("kind,what,why")
        .eq("box", box)
        .eq("status", "approved")
        .order("approved_at", { ascending: true })
        .limit(500);
      if (error) throw new Error(error.message);
      const byIdea = new Map<string, FanIdea & { order: number }>();
      data.forEach((r, i) => {
        const k = ideaKey(r.kind, r.what);
        const hit = byIdea.get(k);
        if (hit) {
          hit.count++;
          if (!hit.why && r.why) hit.why = r.why;
        } else byIdea.set(k, { what: r.what.trim(), kind: r.kind, why: r.why, count: 1, order: i });
      });
      return [...byIdea.values()].sort((a, b) => b.count - a.count || a.order - b.order).map(({ order: _o, ...idea }) => idea);
    } catch (e) {
      console.error("Fan ideas failed:", e instanceof Error ? e.message : e);
      return [];
    }
  });

const suggestSchema = z.object({
  box: boxSchema,
  kind: z.string().trim().max(20).optional().transform((v) => v || null),
  what: z.string().trim().min(2, "Please tell me what you'd like to see.").max(120),
  why: z.string().trim().max(300).optional().transform((v) => v || null),
  from: z.string().trim().max(60).optional().transform((v) => v || null),
  website: z.string().max(0).optional(), // spam trap - people never see this field
  elapsed: z.number(),
});

/** Public: store an idea as pending. Returns its id so the heads-up email can link straight to it. */
export const suggestFanIdea = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => {
    const parsed = suggestSchema.safeParse(input);
    if (!parsed.success) throw new Error(parsed.error.issues[0]?.message ?? "Please check the form.");
    return parsed.data;
  })
  .handler(async ({ data }): Promise<{ ok: boolean; id?: string; message: string }> => {
    // Bots fill hidden fields and submit within a second or two: accept quietly, store nothing.
    if (looksLikeBot(data.website, data.elapsed, 2000)) return { ok: true, message: "Thank you!" };
    if ([data.what, data.why, data.from].some((t) => t && HAS_LINK.test(t))) {
      return { ok: false, message: "Just a few words, please - no links!" };
    }
    // Only the kinds this box offers (Book / Film on the Library); anything else is dropped.
    const kinds = FAN_BOX[data.box].kinds?.map((k) => k.value);
    const kind = kinds?.includes(data.kind ?? "") ? data.kind : null;
    if (await tooBusy("fan_suggestions")) return { ok: false, message: "Lots of suggestions right now - please try again in a little while!" };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("fan_suggestions")
      .insert({ box: data.box, kind, what: data.what, why: data.why, from_name: data.from })
      .select("id")
      .single();
    if (error) {
      console.error("Fan suggestion failed:", error.message);
      return { ok: false, message: "That didn't go through - please try again." };
    }
    return { ok: true, id: row.id, message: FAN_BOX[data.box].thanks };
  });

// --- Moderation (Lisa only) -------------------------------------------------------------------------------------

const keySchema = z.object({ key: z.string().min(16).max(200) });

/** Moderator only: every fan idea, newest first. */
export const adminListFanIdeas = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => keySchema.parse(input))
  .handler(async ({ data }): Promise<ModeratedFanIdea[]> => {
    const { checkKey } = await import("@/lib/moderation-key.server");
    const db = await checkKey(data.key);
    const { data: rows, error } = await db
      .from("fan_suggestions")
      .select("id,box,kind,what,why,from_name,status,created_at")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw new Error(error.message);
    return rows as ModeratedFanIdea[];
  });

/** Moderator only: approve (shows on its page) or reject (deleted for good). */
export const moderateFanIdea = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => keySchema.extend({ id: z.string().uuid(), action: z.enum(["approve", "reject"]) }).parse(input))
  .handler(async ({ data }) => {
    const { checkKey } = await import("@/lib/moderation-key.server");
    const db = await checkKey(data.key);
    const table = db.from("fan_suggestions");
    const { error } =
      data.action === "reject"
        ? await table.delete().eq("id", data.id)
        : await table.update({ status: "approved", approved_at: new Date().toISOString() }).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
