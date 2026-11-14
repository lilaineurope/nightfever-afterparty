// Club pages (Lisa, 13 Nov 2026: "make cbgb its own page on afterparty, like we do with people"): a club the guests keep
// coming back to gets a fuller A–Z page - the person-page header (photo + taped polaroid with its credit), dates, a short
// story, "What the guests say" (quote notes with play-from timestamps, max 2 per person, like In memoriam), its story
// timeline, the people and bands of its stage, the rooms around it, and links to the map and the Timeline.
// Quotes are cleaned-up lines from the episode transcripts; show Lisa new quotes before they go live.
// Facts: Wikipedia "CBGB" (checked 13 Nov 2026). Photos: Wikimedia Commons, Category:CBGB (sources sheet in Lisa's folder).
import cbgbPhoto from "@/assets/clubs/cbgb-photo.webp";
import cbgbPolaroid from "@/assets/clubs/cbgb-polaroid.webp";
import maxsPhoto from "@/assets/clubs/max-s-kansas-city-photo.webp";
import maxsPolaroid from "@/assets/clubs/max-s-kansas-city-polaroid.webp";
import soundFactoryPhoto from "@/assets/clubs/sound-factory-photo.webp";
import soundFactoryPolaroid from "@/assets/clubs/sound-factory-polaroid.webp";
import type { MemoriamQuote } from "./memoriam";
import type { PersonPortrait } from "./person-portraits";

export type ClubProfile = {
  opened: string;
  closed: string;
  address: string;
  aka?: string;
  story: string;
  timeline: [string, string][];
  stage: string[]; // bands and people of its stage (A–Z names)
  rooms: string[]; // the clubs around it (A–Z names)
  said: MemoriamQuote[];
  portrait?: PersonPortrait; // header photo + taped polaroid, same shape as the person pages
  timelineEvent?: string; // scene.ts event id for "On the Timeline"
  // A documentary or podcast about the club. Shown only once its maker has said yes (approved: true).
  listen?: { title: string; by: string; href: string; note: string; approved: boolean };
};

const CBGB_CREDIT =
  "Photo: Adam Di Carlo, 2005, via Wikimedia Commons, CC BY-SA 3.0 (our version is CC BY-SA 3.0 too). Polaroid: The Erasers at CBGB flyer, May 1977 - Gallery 98";

const MAXS_CREDIT =
  "Photos: Eden, Janine and Jim, 2008 (header, CC BY 2.0) and Don Rubbo with his sculpture at Max's, 1971 (polaroid, Rubbo, CC BY-SA 3.0), via Wikimedia Commons; our polaroid is CC BY-SA 3.0 too";
const SOUND_FACTORY_CREDIT = "Photos: Leest3, the same room in its Twilo years (c. 2000), via Wikimedia Commons, public domain";

export const CLUB_PROFILES: Record<string, ClubProfile> = {
  cbgb: {
    opened: "1973",
    closed: "2006",
    address: "315 Bowery",
    aka: "CBGB & OMFUG",
    story:
      "Hilly Kristal opened it on the Bowery for country, bluegrass and blues - hence the letters on the awning, CBGB & OMFUG, \"Other Music For Uplifting Gourmandizers\". Within months it was the stage of the first punk wave. For the guests it was the rock club of downtown: the place to see a band before the night moved on to the Mudd Club.",
    timeline: [
      ["Dec 1973", "Hilly Kristal opens CBGB & OMFUG at 315 Bowery"],
      ["1974", "Television starts playing in the spring; the Ramones and Blondie (still called Angel and the Snake) arrive in August"],
      ["1975", "The Patti Smith Group plays its first CBGB shows"],
      ["1976", "Live at CBGB's, the first record of the scene, comes out"],
      ["1977", "The Damned play, the first British punk band in America"],
      ["1980s", "Sunday hardcore matinees take over the afternoons"],
      ["15 Oct 2006", "CBGB closes with a Patti Smith set"],
    ],
    stage: ["Television", "Patti Smith", "Ramones", "Blondie", "Talking Heads", "Debbie Harry", "Richard Hell", "James Chance and the Contortions", "The Sic F*cks", "Jayne County", "Tish & Snooky", "Lance Loud"],
    rooms: ["Max's Kansas City", "Club 82", "Mudd Club"],
    said: [
      { episode: "s02e11", who: "Richard Boch", time: "00:07:42", quote: "I had been coming into the city to go to shows at CBGB, to see Television and Talking Heads and Ramones and Patti Smith." },
      { episode: "s05e10", who: "Tish & Snooky", time: "00:35:04", quote: "We were hanging out at Max's first... then CBGB. CBGB became the real haunt of almost everyone." },
      { episode: "s02e11", who: "Richard Boch", time: "00:12:26", quote: "CBGB's really was a place to go to see a band, as Max's was." },
    ],
    portrait: { photo: cbgbPhoto, polaroid: cbgbPolaroid, focus: "4%", credit: CBGB_CREDIT },
    timelineEvent: "cbgb-opens",
    // Jillian Jonas's audio documentary (Lisa, 13 Nov 2026: "already add jilian's box") - shown from the start.
    listen: {
      title: "This Ain't No Disco, This IS CBGB",
      by: "Jillian Jonas",
      href: "https://www.youtube.com/@thisaintnodiscoauddoc",
      note: "CBGB's first wave, 1973-78, told by about a hundred people who were there. Made for WBAI by Jillian Jonas, who worked in the CBGB Record Canteen.",
      approved: true,
    },
  },
  // Max's Kansas City (Lisa, 14 Nov 2026: "two more club boxes" - the most-mentioned clubs not yet on the page). Facts: Wikipedia
  // "Max's Kansas City" (checked 14 Nov 2026). Photos: Wikimedia Commons (sources sheet, Round 6).
  "max-s-kansas-city": {
    opened: "1965",
    closed: "1981",
    address: "213 Park Avenue South",
    story:
      "Mickey Ruskin opened it near Union Square as a steakhouse for artists, who paid their tabs with art. Andy Warhol's crowd took over the back room under Dan Flavin's red light, and upstairs became a stage for the Velvet Underground, Iggy, Springsteen and the New York Dolls. From 1975 Tommy Dean Mills ran it as a punk club. For the guests it was where the night started - Bebe Buell calls it a rock and roll gallery.",
    timeline: [
      ["Dec 1965", "Mickey Ruskin opens Max's Kansas City at 213 Park Avenue South"],
      ["Summer 1970", "The Velvet Underground play their last shows with Lou Reed upstairs - taped as Live at Max's Kansas City"],
      ["1972-73", "Bruce Springsteen plays, Bob Marley & the Wailers open for him; Iggy and the Stooges play a run in July and August 1973"],
      ["Dec 1974", "Ruskin goes bankrupt and the power is cut off"],
      ["1975", "Tommy Dean Mills reopens it; Jayne County DJs in both eras"],
      ["1976", "Max's Kansas City 1976, an album of the bands of its stage, comes out"],
      ["1977", "David Bowie introduces Devo on its stage"],
      ["1978", "Sid Vicious plays his New York solo shows there"],
      ["12 Dec 1981", "Max's closes"],
    ],
    stage: ["Andy Warhol", "Lou Reed", "Iggy Pop", "David Bowie", "Bruce Springsteen", "Patti Smith", "New York Dolls", "Debbie Harry", "Jayne County", "Cherry Vanilla", "Candy Darling", "Holly Woodlawn", "Jackie Curtis", "Aerosmith", "Devo", "Sid Vicious", "Johnny Thunders", "Mumps (band)"],
    rooms: ["The Underground", "The Factory", "CBGB", "Club 82", "Mudd Club", "Union Square"],
    said: [
      { episode: "s04e03", who: "Bebe Buell", time: "00:04:47", quote: "Max's sort of became, to me, a gallery, a rock and roll gallery. It just was so chic. It had everything." },
      { episode: "s02e02", who: "Jayne County", time: "00:34:41", quote: "I was the DJ there during the first run of Max's and the second run of Max's. It was a rock disco kind of atmosphere. And I played Bowie and Mott the Hoople." },
      { episode: "s03e05", who: "Cherry Vanilla", time: "00:33:56", quote: "Once you got in, you wanted to go there like every night... It was the kind of place you could go alone. Even as a woman you felt fine stopping in by yourself." },
      { episode: "s04e03", who: "Bebe Buell", time: "00:05:47", quote: "The first time Way Bandy ever did my makeup was in the bathroom of Max's. He told me I needed more of a cat eye." },
      { episode: "s04e10", who: "Ann Magnuson", time: "00:20:36", quote: "We went to Max's Kansas City and CBGB all the time." },
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:04:39", quote: "They all converge at the Mudd Club... So Max's was a place that certainly fed in." },
    ],
    portrait: { photo: maxsPhoto, polaroid: maxsPolaroid, focus: "30%", credit: MAXS_CREDIT },
    timelineEvent: "maxs-upstairs",
  },
  // Sound Factory (Lisa, 14 Nov 2026). Facts: Wikipedia "The Sound Factory (nightclub)" and "Junior Vasquez", DJhistory's
  // "The life and death of the Sound Factory" (checked 14 Nov 2026). Christina Visca's quotes join once S06E02 is on the site.
  "sound-factory": {
    opened: "1989",
    closed: "1995",
    address: "530 West 27th Street",
    story:
      "An after-hours house club in a Chelsea warehouse, opened by Christina Visca and Junior Vasquez with two partners: members only, no alcohol, a dance hall licence, midnight to noon. Junior played songs that lasted forever under one mirror ball and four stacks of speakers, and the ballroom houses - the Xtravaganzas first - walked its runway in the morning. Luis Xtravaganza Camacho calls it home.",
    timeline: [
      ["31 Oct 1988", "Keith Haring and the Sound Factory throw a Halloween costume party at 116 Crosby Street, Junior Vasquez on the decks"],
      ["1989", "Sound Factory opens at 530 West 27th Street, Junior Vasquez in the booth"],
      ["31 Oct 1989", "Grace Jones plays a two-hour Halloween concert"],
      ["Late 1993", "Junior plays So Get Up and its a cappella again and again - it becomes the club's theme"],
      ["1994", "Junior's own Get Your Hands Off My Man and X come out in Sound Factory mixes"],
      ["Early 1995", "After police and fire department raids, the Sound Factory closes"],
      ["1995", "The room reopens as Twilo"],
    ],
    stage: ["Junior Vasquez", "Christina Visca", "Kevin Aviance", 'Luis "Xtravaganza" Camacho', "Angie Xtravaganza", "David Ian Xtravaganza", "House of Xtravaganza", "Willi Ninja", "Grace Jones", "Keith Haring", "Larry Tee"],
    rooms: ["Paradise Garage", "Twilo", "Funhouse", "Robots", "Red Zone", "The Tunnel", "Club USA"],
    said: [
      { episode: "s03e03", who: "Kevin Aviance", time: "00:16:27", quote: "So Sound Factory, you walked in, you paid $20 to get in. There was no guest list." },
      { episode: "s03e03", who: "Kevin Aviance", time: "00:17:16", quote: "Sound Factory had the most incredible music... The songs would last forever and ever, and people would lose their mind." },
      { episode: "s01e08", who: 'Luis "Xtravaganza" Camacho', time: "00:54:36", quote: "Our home was, of course, Sound Factory. We were there before Junior even opened it up." },
    ],
    portrait: { photo: soundFactoryPhoto, polaroid: soundFactoryPolaroid, focus: "50%", credit: SOUND_FACTORY_CREDIT },
    timelineEvent: "sound-factory",
  },
};

// Same guard as In memoriam (Lisa, 5 Nov 2026): never more than 2 quotes from the same person on one page.
for (const [slug, c] of Object.entries(CLUB_PROFILES)) {
  const n: Record<string, number> = {};
  for (const s of c.said) if ((n[s.who] = (n[s.who] ?? 0) + 1) > 2) throw new Error(`club-profiles: more than 2 quotes from ${s.who} on ${slug}`);
}
