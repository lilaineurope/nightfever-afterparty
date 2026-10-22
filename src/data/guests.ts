export type Guest = {
  slug: string;
  name: string;
  tagline: string;
  episode: string;
  episodeUrl: string;
  timeline: { year: string; text: string }[];
  now: string;
  scenes: string[];
  linkedTo: string[];
};

/** Every "Night Fever" name link on the site goes straight to the show on WOW Presents Plus (Lisa, 23 Oct 2026). */
export const NIGHT_FEVER_URL = "https://www.wowpresentsplus.com/night-fever";
export const SHOW_URL = "https://creators.spotify.com/pod/profile/night-fever/";
export const WOW_URL = "https://www.worldofwonder.com/";

export const coreGuests: Guest[] = [
  {
    slug: "dianne-brill",
    name: "Dianne Brill",
    tagline: "The \"Queen of the Night\" - crowned by Andy Warhol himself!",
    episode: "Season 1, Episode 1",
    episodeUrl: SHOW_URL,
    timeline: [
      { year: "1958", text: "Born in Tampa, Florida." },
      {
        year: "Early 1980s",
        text: "Becomes the reigning icon of the New York club scene; Andy Warhol dubs her \"Queen of the Night\".",
      },
      {
        year: "1980s–90s",
        text: "Runs her own fashion, swimwear and jewellery lines while holding court at Studio 54, Danceteria and Area.",
      },
      { year: "1992", text: "Publishes her book Boobs, Boys, and High Heels." },
      {
        year: "2024–25",
        text: "Subject of new retrospective profiles on her life in and beyond the night.",
      },
    ],
    now: "Still designing and writing! She splits her time between the US and Germany and revisits her nightlife years in interviews and essays.",
    scenes: ["Studio 54", "Danceteria", "Area", "The Factory"],
    linkedTo: ["michael-musto", "susanne-bartsch", "peter-gatien"],
  },
  {
    slug: "michael-musto",
    name: "Michael Musto",
    tagline: "The gossip columnist who wrote the nightlife down as it happened - every single night.",
    episode: "Season 1, Episode 2",
    episodeUrl: SHOW_URL,
    timeline: [
      { year: "1955", text: "Born in Brooklyn, New York." },
      {
        year: "1984",
        text: "Launches his \"La Dolce Musto\" column in the Village Voice.",
      },
      {
        year: "1980s–90s",
        text: "Chronicles Studio 54, the Warhol circle, a young RuPaul and the Club Kid years - including the Michael Alig case.",
      },
      {
        year: "2023",
        text: "W Magazine runs \"Michael Musto Shares His Life in Parties\".",
      },
      {
        year: "2025",
        text: "Interviewed about the scene's legacy and announces a cabaret singing turn in New York.",
      },
    ],
    now: "Still writing and commentating on nightlife, drag and pop culture - and now performing a little himself, love it!",
    scenes: ["Studio 54", "Limelight", "Village Voice"],
    linkedTo: ["dianne-brill", "peter-gatien", "susanne-bartsch", "joey-arias"],
  },
  {
    slug: "lisa-edelstein",
    name: "Lisa Edelstein",
    tagline: "\"Lisa E.\", the 1980s downtown It girl who became a TV lead.",
    episode: "Season 1, Episode 3",
    episodeUrl: SHOW_URL,
    timeline: [
      { year: "1966", text: "Born in Boston; later studies at NYU." },
      {
        year: "Mid-1980s",
        text: "Becomes \"Lisa E.\", one of downtown New York's most photographed club celebutantes.",
      },
      { year: "1990s", text: "Shifts from the clubs into an acting career." },
      {
        year: "2004–2012",
        text: "Plays Dr. Lisa Cuddy across eight seasons of House, M.D.",
      },
      {
        year: "2014–2015",
        text: "Leads Bravo's Girlfriends' Guide to Divorce.",
      },
    ],
    now: "Still acting - and working as a painter, writer and director too. Super!",
    scenes: ["Downtown celebutante scene", "Danceteria"],
    linkedTo: ["dianne-brill", "michael-musto"],
  },
  {
    slug: "peter-gatien",
    name: "Peter Gatien",
    tagline: "The club king behind Limelight, Tunnel, Palladium and Club USA.",
    episode: "Season 1, Episode 4",
    episodeUrl: SHOW_URL,
    timeline: [
      { year: "1952", text: "Born in Cornwall, Ontario, Canada." },
      {
        year: "1980s–90s",
        text: "Builds a New York club empire: Limelight, Tunnel, Palladium and Club USA.",
      },
      {
        year: "1990s",
        text: "His rooms become the home of the Club Kids - and are pulled into the fallout of the Michael Alig case.",
      },
      {
        year: "Late 1990s",
        text: "Acquitted on federal drug charges, then pleads guilty in a tax evasion case and is eventually deported to Canada.",
      },
      { year: "2020", text: "Publishes his memoir, Club King." },
    ],
    now: "Speaks as an elder statesman of New York nightlife, aka the man on every panel about the city's club history.",
    scenes: ["Limelight", "Tunnel", "Palladium", "Club USA"],
    linkedTo: ["michael-musto", "dianne-brill", "christina-visca"],
  },
  {
    slug: "moby",
    name: "Moby",
    tagline: "The club DJ who turned electronica into a global hit record.",
    episode: "Season 1, Episode 9",
    episodeUrl: SHOW_URL,
    timeline: [
      {
        year: "1980s",
        text: "Starts out DJing at Rudolf Piper's New York club, Mars.",
      },
      { year: "1991", text: "\"Go\" breaks him out of the club circuit." },
      {
        year: "1999",
        text: "Play becomes a multi-platinum worldwide phenomenon.",
      },
      {
        year: "2016–2019",
        text: "Publishes the memoirs Porcelain and Then It Fell Apart.",
      },
    ],
    now: "Still making and producing music - and campaigning loudly for veganism and animal rights.",
    scenes: ["Mars", "Tunnel", "NYC dance floors"],
    linkedTo: ["peter-gatien", "christina-visca"],
  },
  {
    slug: "joey-arias",
    name: "Joey Arias",
    tagline: "The cabaret shapeshifter who channels Billie Holiday.",
    episode: "Season 1, Episode 10",
    episodeUrl: SHOW_URL,
    timeline: [
      {
        year: "Late 1970s",
        text: "Emerges in New York's punk and downtown performance scene.",
      },
      {
        year: "1979–83",
        text: "Performs alongside Klaus Nomi, with David Bowie and the Basquiat circle close by.",
      },
      {
        year: "1990s–2000s",
        text: "Builds a decades-long cabaret career channelling Billie Holiday, from New York to Las Vegas.",
      },
      {
        year: "2025",
        text: "Profiled by NPR - \"I want to live to be at least 200 years old\" - while still touring summer cabaret shows.",
      },
    ],
    now: "Performing regularly, including Provincetown summer seasons. The current drag generation treats him like royalty!",
    scenes: ["Pyramid Club", "Wigstock", "East Village performance"],
    linkedTo: ["michael-musto", "michelle-visage", "jayne-county"],
  },
  {
    slug: "tish-and-snooky",
    name: "Tish & Snooky",
    tagline: "Blondie's backing singers - and the sisters who invented Manic Panic!",
    episode: "Episode aired 20 August 2025",
    episodeUrl: SHOW_URL,
    timeline: [
      {
        year: "Mid-1970s",
        text: "Sing backing vocals for early Blondie at Max's Kansas City and CBGB.",
      },
      {
        year: "7 July 1977",
        text: "Open the Manic Panic shop on St Marks Place - America's first punk boutique.",
      },
      { year: "1977–1989", text: "Run the St Marks Place store." },
      {
        year: "1990s–2020s",
        text: "Grow Manic Panic into a global vegan, cruelty-free hair colour brand.",
      },
      {
        year: "2025",
        text: "Featured in the New York Times as East Village punk institutions.",
      },
    ],
    now: "Still running Manic Panic together - and celebrating its punk anniversaries loudly.",
    scenes: ["CBGB", "Max's Kansas City", "St Marks Place"],
    linkedTo: ["nick-egan", "jayne-county"],
  },
  {
    slug: "nick-egan",
    name: "Nick Egan",
    tagline: "The punk graphic designer turned music-video director.",
    episode: "Season 5, Episode 4 - 9 July 2025",
    episodeUrl:
      "https://creators.spotify.com/pod/profile/night-fever/episodes/Nick-Egan-e3580ja",
    timeline: [
      { year: "1957", text: "Born in London." },
      {
        year: "Late 1970s",
        text: "Works with Malcolm McLaren and Vivienne Westwood at the birth of punk.",
      },
      {
        year: "1980s",
        text: "Designs album art for The Clash, Bow Wow Wow, Culture Club and Deee-Lite.",
      },
      {
        year: "1990s",
        text: "Directs videos for Duran Duran, Oasis, INXS and Alanis Morissette.",
      },
      {
        year: "2020s",
        text: "Subject of the documentary Creative Vandal; developing a feature film.",
      },
    ],
    now: "Based in Los Angeles, directing and developing film work.",
    scenes: ["London punk", "Music video era", "Deee-Lite"],
    linkedTo: ["tish-and-snooky", "moby"],
  },
  {
    slug: "christina-visca",
    name: "Christina Visca",
    tagline: "The promoter who ran the city's biggest rooms with Junior Vasquez.",
    episode: "Season 6, Episode 2",
    episodeUrl: "https://www.wowpresentsplus.com/videos/nf-602",
    timeline: [
      {
        year: "Late 1980s",
        text: "Starts running some of New York's biggest clubs.",
      },
      {
        year: "1989",
        text: "Behind landmark club nights, including a now-legendary Halloween party.",
      },
      {
        year: "Early 1990s",
        text: "Works in close partnership with DJ Junior Vasquez.",
      },
      {
        year: "2026",
        text: "Tells her side of the story on Night Fever's sixth season.",
      },
    ],
    now: "Still part of the New York nightlife gang - and one of the scene's great storytellers.",
    scenes: ["Junior Vasquez nights", "Sound Factory"],
    linkedTo: ["peter-gatien", "susanne-bartsch", "moby"],
  },
  {
    slug: "jayne-county",
    name: "Jayne County",
    tagline: "Punk and glam pioneer - and a trans trailblazer.",
    episode: "Season 2, Episode 2 - 15 August 2022",
    episodeUrl: "https://www.wowpresentsplus.com/night-fever/season:2/videos/nf-202",
    timeline: [
      { year: "1947", text: "Born in Georgia; heads north to New York." },
      {
        year: "1970s",
        text: "Lives and works among Andy Warhol's Superstars.",
      },
      {
        year: "1977–79",
        text: "Fronts a pioneering punk and glam-rock career that influences generations after her.",
      },
      {
        year: "2020s",
        text: "Devotes herself to making visual art.",
      },
    ],
    now: "Painting and making art. Punk and trans artists still name her as an influence!",
    scenes: ["The Factory", "CBGB", "Max's Kansas City"],
    linkedTo: ["tish-and-snooky", "joey-arias"],
  },
  {
    slug: "michelle-visage",
    name: "Michelle Visage",
    tagline: "The club-scene singer turned Drag Race's sharpest judge.",
    episode: "Season 2, Episode 1",
    episodeUrl: "https://www.wowpresentsplus.com/night-fever/season:2/videos/nf-201",
    timeline: [
      {
        year: "Late 1980s",
        text: "Comes up through New York's club and dance-music world with the group Seduction.",
      },
      { year: "1990s", text: "Becomes a radio personality." },
      {
        year: "2011–present",
        text: "Judges RuPaul's Drag Race, the World of Wonder flagship.",
      },
      {
        year: "2020s",
        text: "Tours, hosts and takes on West End and Broadway stage work.",
      },
    ],
    now: "Still judging Drag Race across its many franchises - and performing worldwide.",
    scenes: ["RuPaul's Drag Race", "World of Wonder", "NYC dance music"],
    linkedTo: ["joey-arias", "michael-musto"],
  },
  {
    slug: "susanne-bartsch",
    name: "Susanne Bartsch",
    tagline: "The party impresario who never stopped throwing the ball!",
    episode: "Season 2, Episode 3",
    episodeUrl: SHOW_URL,
    timeline: [
      {
        year: "Late 1970s",
        text: "Moves from Switzerland to New York.",
      },
      {
        year: "1980s",
        text: "Becomes the city's most extravagant party promoter, filling the Copacabana and the Roxy with costume balls.",
      },
      {
        year: "1990s–2000s",
        text: "Her nights become the crossroads of fashion, drag and club culture.",
      },
      {
        year: "2010s–2020s",
        text: "Subject of documentaries and museum-level fashion attention; keeps hosting Bartschland nights.",
      },
    ],
    now: "Still throwing parties in New York - and mentoring the performers who fill them.",
    scenes: ["Copacabana", "Roxy", "Bartschland", "Club Kids"],
    linkedTo: ["michael-musto", "christina-visca", "dianne-brill"],
  },
];

import { moreGuests } from "./guests-more";
export const guests: Guest[] = [...coreGuests, ...moreGuests].sort((a, b) => {
  const n = (x: Guest) => { const m = x.episode.match(/(\d+)\D+(\d+)/); return m ? Number(m[1]) * 100 + Number(m[2]) : 0; };
  return n(a) - n(b);
});

export const guestBySlug = Object.fromEntries(
  guests.map((g) => [g.slug, g]),
) as Record<string, Guest>;

export const eras = [
  {
    label: "1970s",
    title: "Punk, glam and the Factory",
    text: "Max's Kansas City, CBGB and Andy Warhol's orbit. Jayne County and Tish & Snooky are already in the room.",
    people: ["jayne-county", "tish-and-snooky", "joey-arias"],
  },
  {
    label: "1980s",
    title: "Celebutantes and costume balls",
    text: "Studio 54 gives way to Danceteria, Area and the Roxy. Dianne Brill is crowned, Michael Musto starts writing it all down.",
    people: ["dianne-brill", "michael-musto", "lisa-edelstein", "susanne-bartsch"],
  },
  {
    label: "1990s",
    title: "The Club Kid empire",
    text: "Peter Gatien's rooms rule the city, Junior Vasquez rules the decks, and dance music breaks into the charts.",
    people: ["peter-gatien", "christina-visca", "moby", "nick-egan"],
  },
  {
    label: "2000s–now",
    title: "Legacy and the drag boom",
    text: "The scene's survivors become its historians, while World of Wonder turns drag into a global format.",
    people: ["michelle-visage", "joey-arias", "susanne-bartsch"],
  },
];
