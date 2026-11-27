// A maker's own video archive (Lisa, 27 Nov 2026, on Nelson Sullivan's page: "make a moving image page for each video work
// of nelson (doesn't show up in libary though as not direclty mentioned in afterpartyes)").
// Every video from a maker's own archive channel that sits in our AFTERPARTY playlists (src/data/episode-videos) gets a
// Moving Images page (/library/moving-images/<slug>, the same page as a film) and a tile on the maker's A–Z page - but no
// place on the Library shelves, because the guests talk about what is on the tape, not the tape. A new episode playlist
// with one of the tapes adds its page by itself.
// Nelson's tapes are online on 5ninthavenueproject, the archive channel named after his house at 5 Ninth Avenue: those are
// whole tapes, put up by the people who keep them. The Kinolibrary uploads are short clips of his footage offered for
// licensing, so they play as clips, not "in full". No stills are taken from the tapes: tiles are typed.
import { slugify as cardSlug } from "@/data/entities";

type Clip = { id: string; name: string; cat: string; title: string; time?: string | null; channel?: string };
const clipFiles = import.meta.glob<Clip[]>("../data/episode-videos/*.json", { eager: true, import: "default" });

export type Archive = {
  maker: string;
  /** Is this playlist video one of theirs (its channel, or the "x Nelson Sullivan" in a licensing library's title)? */
  test: (c: Clip) => boolean;
  /** Taken off the title ("Voguing at The Love Ball, 1989 | Kinolibrary x Nelson Sullivan"). */
  tail?: RegExp;
  /** The channel as the page names it. */
  label: string;
  /** Whole tapes put up by the people who keep them (true), or clips licensed out (false). */
  whole: boolean;
};

export const ARCHIVES: Archive[] = [
  { maker: "Nelson Sullivan", test: (c) => /^5ninthavenueproject$/i.test((c.channel ?? "").trim()), label: "5ninthavenueproject, Nelson Sullivan's archive", whole: true },
  {
    maker: "Nelson Sullivan",
    test: (c) => /kinolibrary/i.test(c.channel ?? "") && /x Nelson( Sullivan)?\b/i.test(c.title),
    tail: /\s*\|\s*Kinolibrary x Nelson.*$/i,
    label: "Kinolibrary, which licenses Nelson Sullivan's footage",
    whole: false,
  },
];

export type TapePlace = { episodeId: string; time: string; name: string; cat: string };
export type Tape = {
  slug: string;
  id: string;
  title: string;
  maker: string;
  channel: string;
  whole: boolean;
  /** The year in its title ("... at Limelight in 1986"), when it says. */
  year?: string | undefined;
  /** Where it sits in our playlists: the episode, the moment and the card it was picked for. */
  places: TapePlace[];
};
/** What a maker's A–Z page shows of a tape. */
export type TapeTile = { slug: string; title: string; year?: string | undefined; whole: boolean };

const short = (title: string, maker: string) => {
  const first = maker.split(" ")[0]!;
  const s = title
    .replace(new RegExp(`^(${maker}|${first})['’]s\\s+`, "i"), "")
    .replace(/['’]/g, "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (s.length <= 64) return s;
  const cut = s.slice(0, 64);
  return cut.slice(0, cut.lastIndexOf("-") > 30 ? cut.lastIndexOf("-") : 64);
};

function build(): Tape[] {
  const byId = new Map<string, Tape>();
  const files = Object.entries(clipFiles).sort(([a], [b]) => a.localeCompare(b));
  for (const [path, clips] of files) {
    const episodeId = path.split("/").pop()!.replace(/\.json$/, "");
    for (const c of clips) {
      const a = ARCHIVES.find((x) => x.test(c));
      if (!a) continue;
      let t = byId.get(c.id);
      if (!t) {
        const title = c.title.replace(a.tail ?? /$^/, "").replace(/\s{2,}/g, " ").trim();
        t = {
          slug: `${cardSlug(a.maker)}-${short(title, a.maker)}`,
          id: c.id,
          title,
          maker: a.maker,
          channel: a.label,
          whole: a.whole,
          year: title.match(/\b(19[5-9]\d)\b/)?.[1],
          places: [],
        };
        byId.set(c.id, t);
      }
      if (!t.places.some((p) => p.episodeId === episodeId && p.name === c.name))
        t.places.push({ episodeId, time: c.time ?? "", name: c.name, cat: c.cat });
    }
  }
  const byYear = (a: Tape, b: Tape) => Number(a.year ?? 9999) - Number(b.year ?? 9999) || a.title.localeCompare(b.title);
  return [...byId.values()].sort(byYear);
}

let TAPES: Tape[] | undefined;
const all = () => (TAPES ??= build());

/** One tape by its page slug. */
export const tapeBySlug = (slug: string): Tape | undefined => all().find((t) => t.slug === slug);
/** A maker's tapes, oldest first (undated last), for their A–Z page. */
export const tapesOf = (maker: string): TapeTile[] =>
  all()
    .filter((t) => t.maker === maker)
    .map((t) => ({ slug: t.slug, title: t.title, year: t.year, whole: t.whole }));
/** Every tape (the sitemap; the "more tapes" strip). */
export const allTapes = (): Tape[] => all();
