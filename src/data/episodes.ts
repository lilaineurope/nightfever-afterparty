import jamesRefs from "./s06e01.json";
import brillRefs from "./s01e01.json";
import mustoRefs from "./s01e02.json";
import fieldRefs from "./s03e01.json";
import bartschRefs from "./s02e03.json";
import edelsteinRefs from "./s01e03.json";
import richieRefs from "./s04e08.json";
import makosRefs from "./s05e06.json";
import goodeRefs from "./s03e06.json";
import piperRefs from "./s01e07.json";
import valentiDynellRefs from "./s06e03.json";
import eganRefs from "./s05e04.json";
import magnusonRefs from "./s04e10.json";
import signorileRefs from "./s02e08.json";
import leporeRefs from "./s05e03.json";
import norwichRefs from "./s06e08.json";
import schmidtRefs from "./s02e06.json";
import gatienRefs from "./s01e04.json";
import haskellRefs from "./s02e04.json";
import randallRefs from "./s06e07.json";
import ariasRefs from "./s01e10.json";
import teeRefs from "./s03e08.json";
import zaldyRefs from "./s04e04.json";

export type Episode = {
  /** Route file id, also used for the URL-friendly path */
  id: string;
  season: number;
  episode: number;
  /** Guest of the episode */
  guest: string;
  /** Release date (ISO) as listed on Spotify / WOW Presents Plus */
  released: string;
  /** WOW Presents Plus page where the episode can be watched */
  watchUrl: string;
  /** Spotify address where the episode can be heard */
  listenUrl: string;
  /** Lisa's public YouTube playlist for this Afterparty (only once it is public) */
  youtubePlaylistUrl?: string;
  /** The show's own public podcast audio (RSS enclosure) - feeds the site's episode player and every timestamp */
  audioUrl: string;
  /** Approximate runtime as listed on Spotify */
  runtime: string;
  /** Date this afterparty connection was published on this site (ISO) */
  afterpartyPublished: string;
  /** Short summary written from the public episode description */
  blurb: string;
  /** How many names, places and works are tagged on the episode page */
  references: number;
  /** Total mentions across all tagged references */
  mentions: number;
  /** The most-mentioned names in the episode */
  top: { name: string; mentions: number }[];
};

const s06e01: Episode = {
    id: "s06e01",
    season: 6,
    episode: 1,
    guest: "James St. James",
    released: "2026-08-21",
    watchUrl: "https://www.wowpresentsplus.com/night-fever/season:6/videos/nf-601",
    listenUrl: "https://open.spotify.com/episode/2WEQu8LV4uIufb9Wb6Fye4",
    youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLRIJuRxg5A6w",
    audioUrl:
      "https://anchor.fm/s/68428444/podcast/play/124554015/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-7-21%2Fc7dcf7aa-4b58-5bb2-8cc1-c4189e449912.mp3",
    runtime: "54 min",
    afterpartyPublished: "2026-10-10",
    blurb:
      "The host finally takes the guest chair! James on growing up, moving to New York and the club years he has been documenting ever since - with Warhol and Michael Alig never far away.",
    references: jamesRefs.length,
    mentions: jamesRefs.reduce((sum, ref) => sum + ref.mentions, 0),
    top: [...jamesRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s01e01: Episode = {
    id: "s01e01",
    season: 1,
    episode: 1,
    guest: "Dianne Brill",
    released: "2021-08-30",
    watchUrl:
      "https://www.wowpresentsplus.com/night-fever/season:1/videos/night-fever-dianne-brill",
    listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
    youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLTgZt5aNlNVg",
    audioUrl:
      "https://traffic.megaphone.fm/APO6963798592.mp3",
    runtime: "51 min",
    afterpartyPublished: "2026-10-11",
    blurb:
      "Where it all started - the very first episode! Dianne Brill, the Queen of the Night, on Warhol, Mugler, Danceteria and inventing her very own silhouette. Pure glamour.",
    references: brillRefs.length,
    mentions: brillRefs.reduce((sum, ref) => sum + ref.mentions, 0),
    top: [...brillRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s01e02: Episode = {
  id: "s01e02",
  season: 1,
  episode: 2,
  guest: "Michael Musto",
  released: "2021-09-06",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:1/videos/night-fever-michael-musto",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLY2BLNzi5Qvs",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl:
    "https://traffic.megaphone.fm/APO5000936966.mp3",
  runtime: "1:04:35",
  afterpartyPublished: "2026-10-11",
  blurb:
    "The oldest club kid in the world! Village Voice legend Michael Musto on Studio 54, outlaw parties, ACT UP, the Club Kids - and, as he tells it, the vodka cranberry waiting for him at the Limelight.",
  references: mustoRefs.length,
  mentions: mustoRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...mustoRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s01e03: Episode = {
  id: "s01e03",
  season: 1,
  episode: 3,
  guest: "Lisa Edelstein",
  released: "2021-09-13",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:1/videos/night-fever-lisa-edelstein",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl:
    "https://traffic.megaphone.fm/APO6468224536.mp3",
  runtime: "1:08:34",
  afterpartyPublished: "2026-10-15",
  blurb:
    "Lisa E., the it girl! James's NYU partner-in-crime on their plan to conquer the clubs, lunchboxes and drooping hats, Warhol's memorial - and the New York Times story that changed her life.",
  references: edelsteinRefs.length,
  mentions: edelsteinRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...edelsteinRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s02e03: Episode = {
  id: "s02e03",
  season: 2,
  episode: 3,
  guest: "Susanne Bartsch",
  released: "2022-08-22",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:2/videos/nf-203",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl:
    "https://traffic.megaphone.fm/APO2258730998.mp3",
  runtime: "1:01:34",
  afterpartyPublished: "2026-10-14",
  blurb:
    "The Empress of the Night! Susanne Bartsch on running away to London, the Blitz, her SoHo stores, Savage, Bentley's and the Copa - and throwing the Love Balls that raised millions for AIDS.",
  references: bartschRefs.length,
  mentions: bartschRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...bartschRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s03e01: Episode = {
  id: "s03e01",
  season: 3,
  episode: 1,
  guest: "Patricia Field",
  released: "2023-06-15",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:3/videos/nf-301",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLVq7L7qbcImo",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl:
    "https://traffic.megaphone.fm/APO8384165495.mp3",
  runtime: "52 min",
  afterpartyPublished: "2026-10-13",
  blurb:
    "The fashion legend herself! Patricia Field on her 8th Street store, the House of Field balls, dressing Carrie Bradshaw and Miranda Priestly - and why the world needs way more personal style.",
  references: fieldRefs.length,
  mentions: fieldRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...fieldRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s04e08: Episode = {
  id: "s04e08",
  season: 4,
  episode: 8,
  guest: "Richie Rich",
  released: "2024-08-21",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:4/videos/nf-408",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLDUUVQfLMfVU",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl:
    "https://traffic.megaphone.fm/APO8522098604.mp3",
  runtime: "1:03:03",
  afterpartyPublished: "2026-10-16",
  blurb:
    "Boom! Richie Rich skates from the Ice Capades to the Style Summit, Hotel 17 and Susanne Bartsch's side - then Heatherette, with Miss Piggy front row and Paris in a studded bodysuit.",
  references: richieRefs.length,
  mentions: richieRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...richieRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s05e06: Episode = {
  id: "s05e06",
  season: 5,
  episode: 6,
  guest: "Christopher Makos",
  released: "2025-07-23",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:5/videos/nf-506",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLc8E52NB-5cQ",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl:
    "https://anchor.fm/s/68428444/podcast/play/105847809/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-6-22%2F176ceac0-a5de-b68f-2a93-568eb4cf8014.mp3",
  runtime: "47:17",
  afterpartyPublished: "2026-10-17",
  blurb:
    "Christopher Makos, Warhol's perfect companion! From a Catholic boy in El Monte to Tennessee Williams's typewriter, Tony Perkins on the Riviera, a weekend with Man Ray and Andy in drag.",
  references: makosRefs.length,
  mentions: makosRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...makosRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

/** Season and episode order, earliest first. */
const s03e06: Episode = {
  id: "s03e06",
  season: 3,
  episode: 6,
  guest: "Eric Goode",
  released: "2023-07-20",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:3/videos/nf-306",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLCQaXGq5Dwlw",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://traffic.megaphone.fm/APO4562653957.mp3",
  runtime: "57:09",
  afterpartyPublished: "2026-10-18",
  blurb:
    "Eric Goode, the mind behind Area! From Etch A Sketch drawings at the Mudd Club and a pig carcass at the Club With No Name to Area's ever-changing themes, MK's Dobermans, the Maritime Hotel, Tiger King and a lifelong love of tortoises.",
  references: goodeRefs.length,
  mentions: goodeRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...goodeRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s01e07: Episode = {
  id: "s01e07",
  season: 1,
  episode: 7,
  guest: "Rudolf Piper",
  released: "2021-10-11",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:1/videos/night-fever-rudolf-piper",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://traffic.megaphone.fm/APO1329477005.mp3",
  runtime: "1:10:35",
  afterpartyPublished: "2026-10-18T13:40", // same day as S03E06 but published later, so it lists first
  blurb:
    "Rudolf Piper, the club man behind Pravda, Danceteria, the Tunnel and Mars! From a 24-hour bunker club in Berlin and Keith Haring's black-and-white floor to Madonna's first shows, the Club Kids' basement, a Liberace party with white pianos everywhere and the clubs that followed in Paris, Miami and São Paulo.",
  references: piperRefs.length,
  mentions: piperRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...piperRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s06e03: Episode = {
  id: "s06e03",
  season: 6,
  episode: 3,
  guest: "Chi Chi Valenti & Johnny Dynell",
  released: "2026-09-02",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:6/videos/nf-603",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLSdrSXtMjyhU",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl:
    "https://anchor.fm/s/68428444/podcast/play/125064645/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-8-1%2F3e95126c-03ee-0799-ab78-ddf0993405f1.mp3",
  runtime: "1:02:00",
  afterpartyPublished: "2026-10-19",
  blurb:
    "Chi Chi Valenti & Johnny Dynell, the couple who met at the Mudd Club! From Chi Chi on its door and Johnny's first DJ night there - without owning a single record - to Jackie 60's wild theme nights and Night of a Thousand Stevies, the House of Xtravaganza, Elements of Vogue and the balls coming downtown, and Click + Drag at Mother, the tightest door Chi Chi ever ran.",
  references: valentiDynellRefs.length,
  mentions: valentiDynellRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...valentiDynellRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s05e04: Episode = {
  id: "s05e04",
  season: 5,
  episode: 4,
  guest: "Nick Egan",
  released: "2025-07-09",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:5/videos/nf-504",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLW3ht1p_0qXM",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl:
    "https://anchor.fm/s/68428444/podcast/play/105168938/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-6-7%2F14f43340-2f90-2573-508f-f0b3b161d1a2.mp3",
  runtime: "1:02:49",
  afterpartyPublished: "2026-10-20",
  blurb:
    "Nick Egan, the art-school punk who sang in The Tea Set! From modelling for Vivienne Westwood and steering Bow Wow Wow for Malcolm McLaren - the See Jungle cover included - to Duck Rock and Buffalo Gals, the Stray Cats making tattoos mainstream and his first videos as MTV took off, then Marc Jacobs' grunge show and Sonic Youth's Sugar Kane, Duran Duran's Ordinary World and INXS's Kick.",
  references: eganRefs.length,
  mentions: eganRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...eganRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s04e10: Episode = {
  id: "s04e10",
  season: 4,
  episode: 10,
  guest: "Ann Magnuson",
  released: "2024-09-04",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:4/videos/nf-410",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLNK7yhHO29r0",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://traffic.megaphone.fm/APO2610883704.mp3",
  runtime: "1:07:52",
  afterpartyPublished: "2026-10-21",
  blurb:
    "Ann Magnuson, the West Virginia girl who managed Club 57! From childhood shows in Charleston and London punk watched from a safe distance to New York, New Wave Vaudeville and a year running Club 57 for Stanley Strychacki - the Monster Movie Club, Ladies Auxiliary proms and Klaus Nomi singing opera on a snow mound - then the Pyramid and Danceteria, Pulsallama, Bongwater and Vulcan Death Grip, The Hunger with Bowie, Desperately Seeking Susan, Making Mr. Right, Anything But Love, Ghost Cat and her own suRURALism.",
  references: magnusonRefs.length,
  mentions: magnusonRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...magnusonRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s02e08: Episode = {
  id: "s02e08",
  season: 2,
  episode: 8,
  guest: "Michelangelo Signorile",
  released: "2022-09-26",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:2/videos/nf-208",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://traffic.megaphone.fm/APO9383473018.mp3",
  runtime: "1:02:35",
  afterpartyPublished: "2026-10-22",
  blurb:
    "Michelangelo Signorile, from gossip-column planter to ACT UP and OutWeek! Mike Hall Associates and the columns of Liz Smith and Suzy, the Gaultier lookalike contest at the Palladium, being turned away from The World by James, Suzygate, a first protest at Cardinal Ratzinger's speech, the Malcolm Forbes cover and the birth of outing.",
  references: signorileRefs.length,
  mentions: signorileRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...signorileRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s05e03: Episode = {
  id: "s05e03",
  season: 5,
  episode: 3,
  guest: "Amanda Lepore",
  released: "2025-07-02",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:5/videos/nf-503",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLBfWtICoYFY4",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://anchor.fm/s/68428444/podcast/play/104950113/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-6-2%2F7ef0eb79-bcc9-93de-3ac3-393c8f20b595.mp3",
  runtime: "1:06:45",
  afterpartyPublished: "2026-10-22T13:00",
  blurb:
    "Amanda Lepore, original Club Kid, LaChapelle muse and Doll Parts author! A fall on the stairs at The Building, the glitter-rock crowd in New Jersey, the Cave Canem opening, go-go dancing in the cage at Disco 2000, the Club Kids on The Joan Rivers Show, a Beverly Hillbillies barn party for Donna Douglas and diamonds glued under her nose.",
  references: leporeRefs.length,
  mentions: leporeRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...leporeRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s06e08: Episode = {
  id: "s06e08",
  season: 6,
  episode: 8,
  guest: "William Norwich",
  released: "2026-10-07",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:6/videos/nf-608",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLAneKCdsFCiA",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://anchor.fm/s/68428444/podcast/play/127047586/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-7%2Fbe2eabc1-b2bd-ef95-c501-74590c2e28b6.mp3",
  runtime: "1:01:07",
  afterpartyPublished: "2026-10-23",
  blurb:
    "William Norwich, the Daily News uptown society columnist of the go-go 80s! Uptown versus Downtown with Dinah Prince, Suzy and the Cholly Knickerbockers, Brooke Astor's emeralds, Jayne Wrightsman's last interview, Blaine Trump's AIDS fundraising, Anna Wintour during the newspaper strike - and James escorted out of an East Hampton party.",
  references: norwichRefs.length,
  mentions: norwichRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...norwichRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s02e06: Episode = {
  id: "s02e06",
  season: 2,
  episode: 6,
  guest: "Michael Schmidt",
  released: "2022-09-12",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:2/videos/nf-206",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://traffic.megaphone.fm/APO3849520172.mp3",
  runtime: "1:07:09",
  afterpartyPublished: "2026-10-24",
  blurb:
    "Michael Schmidt, the chain-mail man! Meeting James at the Gaiety, Annie Flanders walking him into Area, a dress in a SoHo window that brought Cher calling, Tina Turner's crystal dress, Debbie Harry's razor-blade gown, a Palladium room with Iggy Pop in Braille, Squeezebox at Don Hill's - and Dita Von Teese in 3D print.",
  references: schmidtRefs.length,
  mentions: schmidtRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...schmidtRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s01e04: Episode = {
  id: "s01e04",
  season: 1,
  episode: 4,
  guest: "Peter Gatien",
  released: "2021-09-20",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:1/videos/night-fever-peter-gatien",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://traffic.megaphone.fm/APO4213256955.mp3",
  runtime: "58:57",
  afterpartyPublished: "2026-10-25",
  blurb:
    "Peter Gatien, the Club King! Rush in Cornwall, sharks under the dance floor in Atlanta, an old church that became the Limelight, Whitney Houston singing, Disco 2000, Club USA's slide and the Tunnel's hip-hop Sundays - and, as Peter tells it, Giuliani's war on his clubs.",
  references: gatienRefs.length,
  mentions: gatienRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...gatienRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s02e04: Episode = {
  id: "s02e04",
  season: 2,
  episode: 4,
  guest: "Nikki Haskell",
  released: "2022-08-29",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:2/videos/nf-204",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://traffic.megaphone.fm/APO1681659641.mp3",
  runtime: "1:07:02",
  afterpartyPublished: "2026-10-26",
  blurb:
    "Nikki Haskell, the queen of the disco nap! The Daisy on Rodeo Drive, Le Club, a broker by day and dancing every night, Studio 54's opening night, The Nikki Haskell Show, Imelda Marcos in Manila - and the tapes nobody else has.",
  references: haskellRefs.length,
  mentions: haskellRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...haskellRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s06e07: Episode = {
  id: "s06e07",
  season: 6,
  episode: 7,
  guest: "Sally Randall",
  released: "2026-09-30",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:6/videos/nf-607",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLN9m8QasblsA",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://anchor.fm/s/68428444/podcast/play/126574237/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-8-30%2F97e3c042-582e-f931-d087-898fab1ec538.mp3",
  runtime: "1:05:05",
  afterpartyPublished: "2026-10-27",
  blurb:
    "Sally Randall, the face at the Palladium door! Opening night as the crowd rolled under the gates, Napoleon hats and long wigs, SVA with Keith and Kenny, a lip-sync Jesus Christ Superstar at Danceteria, the club crowd on Oprah - and why she turned down Letterman.",
  references: randallRefs.length,
  mentions: randallRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...randallRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s01e10: Episode = {
  id: "s01e10",
  season: 1,
  episode: 10,
  guest: "Joey Arias",
  released: "2021-11-01",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:1/videos/night-fever-joey-arias",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://traffic.megaphone.fm/APO6186863452.mp3",
  runtime: "1:10:36",
  afterpartyPublished: "2026-10-28",
  blurb:
    "Joey Arias, not a queen but a goddess! Fiorucci's star stylist, Klaus Nomi's soul brother, Bowie on Saturday Night Live, Club 57, the Andy and Edie show at Danceteria, a movie date with Warhol, Billie Holiday at the Limelight and Bar d'O.",
  references: ariasRefs.length,
  mentions: ariasRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...ariasRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s03e08: Episode = {
  id: "s03e08",
  season: 3,
  episode: 8,
  guest: "Larry Tee",
  released: "2023-08-03",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:3/videos/nf-308",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLSJ4E3nyc7fQ",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://traffic.megaphone.fm/APO8489230682.mp3",
  runtime: "1:06:53",
  afterpartyPublished: "2026-10-29",
  blurb:
    "Larry Tee, superstar DJ! Up from Atlanta with RuPaul and Lahoma van Zandt, Celebrity Club in the Tunnel basement, Nelson Sullivan's townhouse, co-writing 'Supermodel', Liza dancing in his booth at Love Machine, naming Electroclash in Williamsburg - and Zuzii in London and Berlin.",
  references: teeRefs.length,
  mentions: teeRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...teeRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

const s04e04: Episode = {
  id: "s04e04",
  season: 4,
  episode: 4,
  guest: "Zaldy",
  released: "2024-07-24",
  watchUrl: "https://www.wowpresentsplus.com/night-fever/season:4/videos/nf-404",
  youtubePlaylistUrl: "https://www.youtube.com/playlist?list=PLXXJT4Orn3dU",
  listenUrl: "https://open.spotify.com/show/0PYicagOrt96BZSMK1dcaW",
  audioUrl: "https://traffic.megaphone.fm/APO2836341979.mp3",
  runtime: "1:04:50",
  afterpartyPublished: "2026-10-30",
  blurb:
    "Zaldy, from the Tunnel basement to three Emmys! Dressing Ru for decades, Miss Boy Bar, twin looks with Mathu Andersen, the alien reveal that won the Love Ball, walking for Mugler, the Levi's taxi ad - and Michael Jackson's loafers in a Ziploc.",
  references: zaldyRefs.length,
  mentions: zaldyRefs.reduce((sum, ref) => sum + ref.mentions, 0),
  top: [...zaldyRefs].sort((a, b) => b.mentions - a.mentions).slice(0, 3).map(({ name, mentions }) => ({ name, mentions })),
};

export const episodes: Episode[] = [s01e01, s01e02, s01e03, s01e07, s02e03, s02e08, s03e01, s03e06, s04e08, s04e10, s05e03, s05e04, s05e06, s06e01, s06e03, s06e08, s02e06, s01e04, s02e04, s06e07, s01e10, s03e08, s04e04].sort((a, b) =>
  a.season - b.season || a.episode - b.episode,
);

export const latestEpisode: Episode = s06e01;

/** Look an episode up by its route id, for the episode pages themselves. */
/** Afterparty number (Lisa, 23 Oct 2026): the order the Afterparties went up on the fan page - S06E01 James St. James is
 *  number 1, then counting up by afterpartyPublished (same date -> season/episode order). A new episode simply gets the next
 *  number once its afterpartyPublished date is set. Shown in the top-right corner of every polaroid. */
const afterpartyOrder = [...episodes]
  .sort((a, b) => a.afterpartyPublished.localeCompare(b.afterpartyPublished) || a.season - b.season || a.episode - b.episode)
  .map((ep) => ep.id);
export const afterpartyNumber = (id: string): number => afterpartyOrder.indexOf(id) + 1;

export const episodeById = (id: string): Episode =>
  episodes.find((e) => e.id === id) ?? latestEpisode;

export function episodePath(
  id: Episode["id"],
): "/episodes/s06e01" | "/episodes/s01e01" | "/episodes/s01e02" | "/episodes/s01e03" | "/episodes/s02e03" | "/episodes/s03e01" | "/episodes/s03e06" | "/episodes/s04e08" | "/episodes/s05e06" | "/episodes/s01e07" | "/episodes/s06e03" | "/episodes/s05e04" | "/episodes/s04e10" | "/episodes/s02e08" | "/episodes/s05e03" | "/episodes/s06e08" | "/episodes/s02e06" | "/episodes/s01e04" | "/episodes/s02e04" | "/episodes/s06e07" | "/episodes/s01e10" | "/episodes/s03e08" | "/episodes/s04e04" {
  switch (id) {
    case "s01e01":
      return "/episodes/s01e01";
    case "s01e02":
      return "/episodes/s01e02";
    case "s01e03":
      return "/episodes/s01e03";
    case "s02e03":
      return "/episodes/s02e03";
    case "s03e01":
      return "/episodes/s03e01";
    case "s03e06":
      return "/episodes/s03e06";
    case "s04e08":
      return "/episodes/s04e08";
    case "s05e06":
      return "/episodes/s05e06";
    case "s01e07":
      return "/episodes/s01e07";
    case "s06e03":
      return "/episodes/s06e03";
    case "s05e04":
      return "/episodes/s05e04";
    case "s04e10":
      return "/episodes/s04e10";
    case "s02e08":
      return "/episodes/s02e08";
    case "s05e03":
      return "/episodes/s05e03";
    case "s06e08":
      return "/episodes/s06e08";
    case "s02e06":
      return "/episodes/s02e06";
    case "s01e04":
      return "/episodes/s01e04";
    case "s02e04":
      return "/episodes/s02e04";
    case "s06e07":
      return "/episodes/s06e07";
    case "s01e10":
      return "/episodes/s01e10";
    case "s03e08":
      return "/episodes/s03e08";
    case "s04e04":
      return "/episodes/s04e04";
    default:
      return "/episodes/s06e01";
  }
}
