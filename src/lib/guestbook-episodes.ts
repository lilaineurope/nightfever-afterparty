import { guests } from "@/data/guests";
import { episodes, episodeIdOf } from "@/data/episodes";

// Every Night Fever episode with a guest, for the guestbook's "favourite episode" picker.
export type ShowEpisode = { code: string; label: string; guestSlug: string; afterparty: boolean };

export const SHOW_EPISODES: ShowEpisode[] = (() => {
  const byCode = new Map<string, ShowEpisode>();
  for (const g of guests) {
    const code = episodeIdOf(g.episode);
    if (!code) continue;
    const prev = byCode.get(code);
    if (prev) {
      if (!prev.label.includes(g.name)) prev.label = `${prev.label} & ${g.name}`;
      continue;
    }
    byCode.set(code, {
      code,
      label: g.name,
      guestSlug: g.slug,
      afterparty: episodes.some((e) => e.id === code),
    });
  }
  return [...byCode.values()].sort((a, b) => a.code.localeCompare(b.code));
})();

export const showEpisode = (code: string | null) => (code ? SHOW_EPISODES.find((e) => e.code === code) : undefined);
export const episodeLabel = (e: ShowEpisode) => `${e.code.toUpperCase()} · ${e.label}`;
