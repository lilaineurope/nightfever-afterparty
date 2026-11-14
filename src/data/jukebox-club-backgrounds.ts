// Jukebox page background per club night (Lisa, 2 Nov 2026): when a club is picked, the disco-ball header is swapped for a
// picture from inside that club, in the same pink/black photocopy halftone with the pixel fade (scripts/page-headers/fade.py).
// Free inside photos from the time barely exist, so most are Gemini pictures drawn for the AFTERPARTY; Palladium is
// Bernard Gotfryd's 1985 photo of Keith Haring painting the Palladium backdrop (Library of Congress, public domain).
// Sources and prompts: Clubs/Tickets and posters archive/jukebox-backgrounds + the sources sheet.
const files = import.meta.glob("../assets/jukebox-clubs/*.webp", { eager: true, import: "default" }) as Record<string, string>;

const pick = (name: string) => files[`../assets/jukebox-clubs/${name}.webp`];

// Real photos need their credit under the jukebox (the Gemini pictures don't).
const CREDITS: Record<string, string> = {
  palladium: "Keith Haring painting the Palladium backdrop, 1985. Photo: Bernard Gotfryd, Library of Congress (public domain)",
  // CBGB (Lisa, 14 Nov 2026): a real 1975 photo from inside - Pat Ivers of Metropolis Video filming Orchestra Luna on the CBGB stage.
  cbgb: "Pat Ivers of Metropolis Video filming Orchestra Luna at CBGB, 1975. Photo: MichaelDOwen, via Wikimedia Commons, CC BY-SA 3.0; our version is CC BY-SA 3.0 too",
};

export type ClubBackground = { sky: string; phone: string; credit?: string };

export const JUKEBOX_CLUB_BACKGROUNDS: Record<string, ClubBackground> = Object.fromEntries(
  Object.keys(files)
    .map((p) => p.split("/").pop()!.replace(/\.webp$/, ""))
    .filter((n) => !n.endsWith("-phone"))
    .map((slug) => [
      slug,
      {
        sky: pick(slug)!,
        phone: pick(`${slug}-phone`) ?? pick(slug)!,
        ...(CREDITS[slug] ? { credit: CREDITS[slug] } : {}),
      },
    ]),
);
