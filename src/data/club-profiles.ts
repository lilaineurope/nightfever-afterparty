// Club pages (Lisa, 13 Nov 2026: "make cbgb its own page on afterparty, like we do with people"): a club the guests keep
// coming back to gets a fuller A–Z page - the person-page header (photo + taped polaroid with its credit), dates, a short
// story, "What the guests say" (quote notes with play-from timestamps, max 2 per person, like In memoriam), its story
// timeline, the people and bands of its stage, the rooms around it, and links to the map and the Timeline.
// Quotes are cleaned-up lines from the episode transcripts; show Lisa new quotes before they go live.
// Facts: Wikipedia "CBGB" (checked 13 Nov 2026). Photos: Wikimedia Commons, Category:CBGB (sources sheet in Lisa's folder).
import cbgbPhoto from "@/assets/clubs/cbgb-photo.webp";
import cbgbPhotoPhone from "@/assets/clubs/cbgb-photo-phone.webp";
import cbgbPolaroid from "@/assets/clubs/cbgb-polaroid.webp";
import maxsPhoto from "@/assets/clubs/max-s-kansas-city-photo.webp";
import maxsPhotoPhone from "@/assets/clubs/max-s-kansas-city-photo-phone.webp";
import maxsPolaroid from "@/assets/clubs/max-s-kansas-city-polaroid.webp";
import soundFactoryPhoto from "@/assets/clubs/sound-factory-photo.webp";
import soundFactoryPhotoPhone from "@/assets/clubs/sound-factory-photo-phone.webp";
import soundFactoryPolaroid from "@/assets/clubs/sound-factory-polaroid.webp";
import muddPhoto from "@/assets/clubs/mudd-club-photo.webp";
import muddPhotoPhone from "@/assets/clubs/mudd-club-photo-phone.webp";
import muddPolaroid from "@/assets/clubs/mudd-club-polaroid.webp";
import areaPhoto from "@/assets/clubs/area-photo.webp";
import areaPhotoPhone from "@/assets/clubs/area-photo-phone.webp";
import areaPolaroid from "@/assets/clubs/area-polaroid.webp";
import studio54Photo from "@/assets/clubs/studio-54-photo.webp";
import studio54PhotoPhone from "@/assets/clubs/studio-54-photo-phone.webp";
import studio54Polaroid from "@/assets/clubs/studio-54-polaroid.webp";
import limelightPhoto from "@/assets/clubs/limelight-photo.webp";
import limelightPhotoPhone from "@/assets/clubs/limelight-photo-phone.webp";
import limelightPolaroid from "@/assets/clubs/limelight-polaroid.webp";
import grapePhoto from "@/assets/clubs/gilded-grape-photo.webp";
import grapePhotoPhone from "@/assets/clubs/gilded-grape-photo-phone.webp";
import grapePolaroid from "@/assets/clubs/gilded-grape-polaroid.webp";
import quickPhoto from "@/assets/clubs/quick-photo.webp";
import quickPhotoPhone from "@/assets/clubs/quick-photo-phone.webp";
import quickPolaroid from "@/assets/clubs/quick-polaroid.webp";
import buildingPhoto from "@/assets/clubs/building-photo.webp";
import buildingPhotoPhone from "@/assets/clubs/building-photo-phone.webp";
import buildingPolaroid from "@/assets/clubs/building-polaroid.webp";
import hurrahPhoto from "@/assets/clubs/hurrah-photo.webp";
import hurrahPhotoPhone from "@/assets/clubs/hurrah-photo-phone.webp";
import hurrahPolaroid from "@/assets/clubs/hurrah-polaroid.webp";
import c82Photo from "@/assets/clubs/club-82-photo.webp";
import c82PhotoPhone from "@/assets/clubs/club-82-photo-phone.webp";
import c82Polaroid from "@/assets/clubs/club-82-polaroid.webp";
import redZonePhoto from "@/assets/clubs/red-zone-photo.webp";
import redZonePhotoPhone from "@/assets/clubs/red-zone-photo-phone.webp";
import redZonePolaroid from "@/assets/clubs/red-zone-polaroid.webp";
import squeezePhoto from "@/assets/clubs/squeezebox-photo.webp";
import squeezePhotoPhone from "@/assets/clubs/squeezebox-photo-phone.webp";
import squeezePolaroid from "@/assets/clubs/squeezebox-polaroid.webp";
import marsPhoto from "@/assets/clubs/mars-photo.webp";
import marsPhotoPhone from "@/assets/clubs/mars-photo-phone.webp";
import marsPolaroid from "@/assets/clubs/mars-polaroid.webp";
import robotsPhoto from "@/assets/clubs/robots-photo.webp";
import robotsPhotoPhone from "@/assets/clubs/robots-photo-phone.webp";
import robotsPolaroid from "@/assets/clubs/robots-polaroid.webp";
import xenonPhoto from "@/assets/clubs/xenon-photo.webp";
import xenonPhotoPhone from "@/assets/clubs/xenon-photo-phone.webp";
import xenonPolaroid from "@/assets/clubs/xenon-polaroid.webp";
import worldPhoto from "@/assets/clubs/world-photo.webp";
import worldPhotoPhone from "@/assets/clubs/world-photo-phone.webp";
import worldPolaroid from "@/assets/clubs/world-polaroid.webp";
import copaPhoto from "@/assets/clubs/copacabana-photo.webp";
import copaPhotoPhone from "@/assets/clubs/copacabana-photo-phone.webp";
import copaPolaroid from "@/assets/clubs/copacabana-polaroid.webp";
import mkPhoto from "@/assets/clubs/mk-photo.webp";
import mkPhotoPhone from "@/assets/clubs/mk-photo-phone.webp";
import mkPolaroid from "@/assets/clubs/mk-polaroid.webp";
import pepperPhoto from "@/assets/clubs/peppermint-lounge-photo.webp";
import pepperPhotoPhone from "@/assets/clubs/peppermint-lounge-photo-phone.webp";
import pepperPolaroid from "@/assets/clubs/peppermint-lounge-polaroid.webp";
import jackiePhoto from "@/assets/clubs/jackie-60-photo.webp";
import jackiePhotoPhone from "@/assets/clubs/jackie-60-photo-phone.webp";
import jackiePolaroid from "@/assets/clubs/jackie-60-polaroid.webp";
import dancePhoto from "@/assets/clubs/danceteria-photo.webp";
import dancePhotoPhone from "@/assets/clubs/danceteria-photo-phone.webp";
import dancePolaroid from "@/assets/clubs/danceteria-polaroid.webp";
import tunnelPhoto from "@/assets/clubs/tunnel-photo.webp";
import tunnelPhotoPhone from "@/assets/clubs/tunnel-photo-phone.webp";
import tunnelPolaroid from "@/assets/clubs/tunnel-polaroid.webp";
import pyramidPhoto from "@/assets/clubs/pyramid-club-photo.webp";
import pyramidPhotoPhone from "@/assets/clubs/pyramid-club-photo-phone.webp";
import pyramidPolaroid from "@/assets/clubs/pyramid-club-polaroid.webp";
import palladiumPhoto from "@/assets/clubs/palladium-photo.webp";
import palladiumPhotoPhone from "@/assets/clubs/palladium-photo-phone.webp";
import palladiumPolaroid from "@/assets/clubs/palladium-polaroid.webp";
import boyBarPhoto from "@/assets/clubs/boy-bar-photo.webp";
import boyBarPhotoPhone from "@/assets/clubs/boy-bar-photo-phone.webp";
import boyBarPolaroid from "@/assets/clubs/boy-bar-polaroid.webp";
import club57Photo from "@/assets/clubs/club-57-photo.webp";
import club57PhotoPhone from "@/assets/clubs/club-57-photo-phone.webp";
import club57Polaroid from "@/assets/clubs/club-57-polaroid.webp";
import nellsPhoto from "@/assets/clubs/nell-s-photo.webp";
import nellsPhotoPhone from "@/assets/clubs/nell-s-photo-phone.webp";
import nellsPolaroid from "@/assets/clubs/nell-s-polaroid.webp";
import pgPhoto from "@/assets/clubs/paradise-garage-photo.webp";
import pgPhotoPhone from "@/assets/clubs/paradise-garage-photo-phone.webp";
import pgPolaroid from "@/assets/clubs/paradise-garage-polaroid.webp";
import clubUsaPhoto from "@/assets/clubs/club-usa-photo.webp";
import clubUsaPhotoPhone from "@/assets/clubs/club-usa-photo-phone.webp";
import clubUsaPolaroid from "@/assets/clubs/club-usa-polaroid.webp";
import roxyPhoto from "@/assets/clubs/roxy-photo.webp";
import roxyPhotoPhone from "@/assets/clubs/roxy-photo-phone.webp";
import roxyPolaroid from "@/assets/clubs/roxy-polaroid.webp";
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
const SOUND_FACTORY_CREDIT = "Photos: Leest3, the same room in its Twilo years (c. 2000), via Wikimedia Commons, public domain; our photocopy versions too";

const MUDD_CREDIT =
  "Photo: Wickkey, 2012, via Wikimedia Commons, CC BY-SA 3.0 (our version is CC BY-SA 3.0 too). Polaroid: Just Another Asshole benefit party flyer, Mudd Club, 1979 - Gallery 98";
const AREA_CREDIT = "Header: an Area night drawn for the AFTERPARTY. Polaroid: AREA Retrospective card, pictures from past themes, January 1985 - Gallery 98";
const STUDIO_54_CREDIT =
  "Photos: Epicgenius, the room in 2026 (header, CC BY-SA 4.0, via Wikimedia Commons; our version is CC BY-SA 4.0 too) and William Armstrong's Statue of Liberty head made for Studio 54 (polaroid, public domain)";
const LIMELIGHT_CREDIT = "Photo: Gryffindor, the church in 2007, via Wikimedia Commons, public domain. Polaroid: Queer Nation presents Voguing Superstars of Paris Is Burning at Limelight, card, 1991 - Gallery 98";

const DANCETERIA_CREDIT = "Header: a Danceteria night drawn for the AFTERPARTY. Polaroid: Jim Fouratt and Rudolf's opening invitation, 252 West 37th Street, May 1980 - Gallery 98";
const TUNNEL_CREDIT =
  "Photo: Beyond My Ken, the Terminal Stores building in 2011, via Wikimedia Commons, CC BY-SA 4.0 (our version is CC BY-SA 4.0 too). Polaroid: John Sex's Disco Superfly card, Tunnel, 1988 - Gallery 98";
const PYRAMID_CREDIT = "Photo: Americasroof, 101 Avenue A in 2009, via Wikimedia Commons, CC BY 3.0. Polaroid: Girlstown every Tuesday card, Pyramid - Gallery 98";
const PALLADIUM_CREDIT =
  "Photo: Bernard Gotfryd, Keith Haring painting the Palladium backdrop, May 1985, Library of Congress via Wikimedia Commons, public domain. Polaroid: Liberace party card, Palladium, 1986 - Gallery 98";
const BOY_BAR_CREDIT = "Header: a Boy Bar night drawn for the AFTERPARTY. Polaroid: Georges Piette photograph opening party card, Boybar, 15 St. Marks, 1984 - Gallery 98";
const CLUB_57_CREDIT = "Photo: Americasroof, 57 St. Mark's Place in 2009, via Wikimedia Commons, CC BY 3.0. Polaroid: Swingin' Singles Party card with John Sex and Wendy Wild, Club 57, 1982 - Gallery 98";
const NELLS_CREDIT = "Header: a Nell's night drawn for the AFTERPARTY. Polaroid: the black key Nell's mailed to its regulars, drawn for the AFTERPARTY";
const PARADISE_GARAGE_CREDIT = "Header: a Paradise Garage night drawn for the AFTERPARTY. Polaroid: Vito and Roman's car stub invitation, Paradise Garage, 1984 - Gallery 98";
const CLUB_USA_CREDIT = "Header: a Club USA night with its slide, drawn for the AFTERPARTY. Polaroid: Ann Bennett and Roz Winter's Gender Bender card, Club USA, 1993 - Gallery 98";
const ROXY_CREDIT = "Photo: Aloughman, the Roxy on West 18th Street, via Wikimedia Commons, public domain. Polaroid: Susanne Bartsch's New Year's Eve 2000 Fake Halloween Ball flyer, Roxy - Gallery 98";

const WORLD_CREDIT = "Photo: a card for Oh Jackie Oh! at the World, with Jackie Curtis and Taylor Mead - Gallery 98. Polaroid: Haoui Montaug's No Entiendes sixth anniversary flyer, the World - Gallery 98";
const COPACABANA_CREDIT = "Header: one of Susanne Bartsch's Copa nights, drawn for the AFTERPARTY. Polaroid: Cy Walter at the piano at the Copacabana, 1949, photo by Jack Wasserman (The Cy Walter Collection), via Wikimedia Commons, CC BY-SA 4.0";
const MK_CREDIT = "Header and polaroid: MK drawn for the AFTERPARTY - no photo of MK is free to use";
const PEPPERMINT_CREDIT = "Photo: M. Azzara, Joey and the Twisters at the Peppermint Lounge, c. 1962, via Wikimedia Commons, public domain. Polaroid: the Raybeats at the Peppermint Lounge flyer, 1981 - Gallery 98";
const JACKIE_60_CREDIT = "Header: a Jackie 60 Tuesday drawn for the AFTERPARTY. Polaroid: All-Star Poetry Burlesque flyer, Jackie 60, 432 West 14th Street - Gallery 98";

const RED_ZONE_CREDIT = "Header and polaroid: a Red Zone night drawn for the AFTERPARTY - no photo of Red Zone is free to use";
const SQUEEZEBOX_CREDIT = "Header: a Squeezebox night drawn for the AFTERPARTY. Polaroid: the stage at Don Hill's in 2010, photo by kimm613, via Wikimedia Commons, CC BY-SA 2.0";
const MARS_CREDIT = "Header and polaroid: a night at Mars drawn for the AFTERPARTY - no photo of Mars is free to use";
const ROBOTS_CREDIT = "Header: a Save the Robots morning drawn for the AFTERPARTY. Polaroid: Save the Robots after-hours Saturdays card - Gallery 98";
const XENON_CREDIT = "Header: a night at Xenon drawn for the AFTERPARTY. Polaroid: Everybody Hates Punk poster, Xenon, 1978 - Gallery 98";

const GILDED_GRAPE_CREDIT = "Header and polaroid: a night at the Gilded Grape drawn for the AFTERPARTY - no photo of the Gilded Grape is free to use";
const QUICK_CREDIT = "Header and polaroid: a night at Quick drawn for the AFTERPARTY - no photo of Quick is free to use";
const BUILDING_CREDIT = "Header and polaroid: a night at the Building drawn for the AFTERPARTY - no photo of the Building is free to use";
const HURRAH_CREDIT = "Header: a night at Hurrah drawn for the AFTERPARTY. Polaroid: Hurrah complimentary entry card - Gallery 98";
const CLUB_82_CREDIT = "Header and polaroid: a night at the 82 Club drawn for the AFTERPARTY - no photo of the 82 Club is free to use";

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
    portrait: { photo: cbgbPhoto, phone: cbgbPhotoPhone, polaroid: cbgbPolaroid, focus: "4%", credit: CBGB_CREDIT },
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
      { episode: "s04e05", who: "Dustin Pittman", time: "00:03:46", quote: "Mickey Ruskin, who was the owner, was at the door. In the beginning you had to really be accepted by Mickey. And especially the back room in the days of the Warhol crowd... People just didn't get into that back room." },
      { episode: "s04e05", who: "Dustin Pittman", time: "00:31:34", quote: "Lou did a residency upstairs at Max's in August of '70 and it was amazing because it was so intimate. There was like 30 people there... You didn't sit there. You danced next to Lou Reed and the Velvet Underground." },
      { episode: "s03e05", who: "Cherry Vanilla", time: "00:31:49", quote: "As soon as anybody walked into the back, everybody in there looked up at them... with that look of, if you don't belong here, don't come in. It was like a velvet rope before the velvet rope." },
    ],
    portrait: { photo: maxsPhoto, phone: maxsPhotoPhone, polaroid: maxsPolaroid, focus: "30%", credit: MAXS_CREDIT },
    timelineEvent: "maxs-upstairs",
  },
  // Sound Factory (Lisa, 14 Nov 2026). Facts: Wikipedia "The Sound Factory (nightclub)" and "Junior Vasquez", DJhistory's
  // "The life and death of the Sound Factory" (checked 14 Nov 2026), and co-founder Christina Visca's episode (S06E02).
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
      { episode: "s06e02", who: "Christina Visca", time: "00:04:21", quote: "Sound Factory was home, you know, and it was a home away from home for so many of those kids." },
      { episode: "s01e08", who: 'Luis "Xtravaganza" Camacho', time: "00:54:36", quote: "Our home was, of course, Sound Factory. We were there before Junior even opened it up." },
      { episode: "s06e02", who: "Christina Visca", time: "00:13:03", quote: "Sound Factory was like, you know, going to church. And what's wrong with being social?" },
    ],
    portrait: { photo: soundFactoryPhoto, phone: soundFactoryPhotoPhone, polaroid: soundFactoryPolaroid, focus: "40%", credit: SOUND_FACTORY_CREDIT },
    timelineEvent: "sound-factory",
  },
  // Batch 1 of the club pages for every Jukebox club (Lisa, 14 Nov 2026: "rebuild every club page like CBGB"), most-mentioned
  // first. Facts: Wikipedia "Mudd Club", "Area (nightclub)", "Studio 54", "The Limelight" and "Peter Gatien" (checked 14 Nov 2026)
  // and the guests' episodes. Pictures: sources sheet, Round 7.
  "mudd-club": {
    opened: "1978",
    closed: "1983",
    address: "77 White Street",
    story:
      "Steve Mass opened it in a Tribeca loft with Diego Cortez and Anya Phillips, and named it after Dr Samuel Mudd, who set John Wilkes Booth's broken leg. It was downtown's answer to Studio 54 - a door, a disco ball and a DJ, but punk: bands, readings, theme nights and Keith Haring's gallery on the fourth floor. Richard Boch and Chi Chi Valenti worked the door, Anita Sarko and Johnny Dynell the decks - and, as Johnny says, everyone came out of the Mudd.",
    timeline: [
      ["1978", "Steve Mass, Diego Cortez and Anya Phillips open the Mudd Club at 77 White Street; the B-52's play its opening night"],
      ["1979", "Richard Boch starts on the door; Talking Heads play songs from Fear of Music, and People magazine compares it to 1920s Berlin"],
      ["1980", "Johnny Dynell joins Anita Sarko and David Azarch in the DJ booth; Chi Chi Valenti works the rope to the second floor"],
      ["1981", "Keith Haring's shows fill the fourth-floor gallery - Beyond Words brings in Basquiat, Futura and Fab Five Freddy"],
      ["1983", "The Mudd Club closes in the spring"],
      ["2007", "Creative Time puts a plaque on the building"],
    ],
    stage: ["Steve Mass", "Anya Phillips", "Diego Cortez", "Richard Boch", "Chi Chi Valenti & Johnny Dynell", "Anita Sarko", "Keith Haring", "Jean-Michel Basquiat", "Debbie Harry", "Lauren Hutton", "Klaus Nomi", "John Sex", "Cookie Mueller", "Lydia Lunch", "Nico", "James Chance and the Contortions", "DNA", "Talking Heads", "The B-52's", "William S. Burroughs", "Allen Ginsberg", "Madonna"],
    rooms: ["CBGB", "Max's Kansas City", "Club 57", "Studio 54", "Hurrah", "Danceteria", "Area"],
    said: [
      { episode: "s06e03", who: "Johnny Dynell", time: "00:05:56", quote: "The Mudd Club was just such a genius concept... We were sort of making fun of Studio 54 and disco and the whole idea of a door person and a disco ball and a DJ, but with a punk sensibility." },
      { episode: "s02e11", who: "Richard Boch", time: "01:02:46", quote: "Undeniably, even if it was in a subconscious kind of way, the Mudd Club definitely influenced everybody who went through those doors, who had anything to do with nightlife moving forward." },
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:22:07", quote: "You would sometimes get people that really weren't going to mix well with the people inside at all. And Richard and I famously, we were shot at, we had a dead frozen bird thrown at us." },
      { episode: "s04e10", who: "Ann Magnuson", time: "00:45:11", quote: "A lot of us from Club 57 would do things at the Mudd Club. And then people from the Mudd Club would do things at Club 57. These were like primal caves that we could all go into." },
      { episode: "s03e06", who: "Eric Goode", time: "00:01:45", quote: "I shopped at Canal Rubber and Canal Plastics and spent all day long trying to make outrageous outfits to get into Studio 54 and then the Mudd Club." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:28:50", quote: "The guys that did Area, they started at the Mudd. Pretty much New York clubs, the downtown clubs, everyone came out of the Mudd." },
    ],
    portrait: { photo: muddPhoto, phone: muddPhotoPhone, polaroid: muddPolaroid, focus: "60%", credit: MUDD_CREDIT },
    timelineEvent: "mudd-club",
  },
  area: {
    opened: "1983",
    closed: "1987",
    address: "157 Hudson Street",
    story:
      "Eric and Christopher Goode, Shawn Hausman, Darius Azari and Zwi Wasserstein opened it in an old American Express stable in Tribeca. Every six weeks the whole club changed theme - Art, Suburbia, Confinement, Natural History, Night - with live people posed in the vitrines along the entrance corridor. The invitations came in capsules, eggs and bandanas, and Steve Rubell brought uptown down every night. For the guests it was everything they loved about the 70s in one building.",
    timeline: [
      ["Sep 1983", "Area opens at 157 Hudson Street; 5,000 invitations go out in capsules"],
      ["1983-87", "A new theme every six weeks, about 25 in all, each built by the art department and thrown away after"],
      ["Feb 1985", "Jonathan Larson dreams up his musical Superbia in Area's projection booth"],
      ["May 1985", "The Art theme: Warhol stands in a vitrine, David Hockney paints the pool"],
      ["1985", "Steve Rubell and Ian Schrager open the Palladium - in Eric Goode's words, a bigger, better Area"],
      ["1987", "Area closes"],
    ],
    stage: ["Eric Goode", "Shawn Hausman", "Serge Becker", "Michael Clancy", "Andy Warhol", "Jean-Michel Basquiat", "Keith Haring", "David Hockney", "Grace Jones", "Steve Rubell", "Boy George", "Bernard Zette", "Christina Downing", "Lady Bunny", "Michael Musto", "Chi Chi Valenti & Johnny Dynell"],
    rooms: ["Mudd Club", "Palladium", "Danceteria", "Limelight", "Nell's", "MK", "Club USA"],
    said: [
      { episode: "s03e06", who: "Eric Goode", time: "00:14:41", quote: "I know that I did over 20 themes in the course of three years, 25 themes. And we always tried to make the themes very different than one another." },
      { episode: "s04e03", who: "Bebe Buell", time: "00:48:57", quote: "Area was as close as you could get to everything that we loved about everything else in the 70s. It was like everything in one building." },
      { episode: "s02e06", who: "Michael Schmidt", time: "00:09:13", quote: "Area was a club that had all of these windows, like a store window lining the halls. Each one was a different scenario, and they were highly theatrical and wonderful and changed every month." },
      { episode: "s03e06", who: "Eric Goode", time: "00:22:05", quote: "I felt like Steve Rubell was my head of PR, because he brought everyone down to Area: Farrah Fawcett and Andy Warhol and Ryan O'Neal and Liza Minnelli." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:37:42", quote: "Bunny and Zette performing at Area as a suburban housewife with an ironing board, or with a ball gag in S&M gear." },
      { episode: "s01e05", who: "Ernie Glam", time: "00:02:52", quote: "Some of the first clubs that I went to when I came to New York were Crisco Disco, Pyramid Club, and Area." },
    ],
    portrait: { photo: areaPhoto, phone: areaPhotoPhone, polaroid: areaPolaroid, focus: "50%", credit: AREA_CREDIT },
    timelineEvent: "area-opens",
  },
  "studio-54": {
    opened: "1977",
    closed: "1986",
    address: "254 West 54th Street",
    story:
      "Steve Rubell and Ian Schrager turned an old opera house and CBS television studio into the disco of the age: the velvet rope, the man in the moon with his spoon, a bridge that moved out over the dance floor. Getting in was the story - the guests tried every trick, from homemade outfits to ducking behind other people's limousines. Rubell and Schrager went to prison for tax evasion in 1980; Mark Fleischman ran it from 1981. Downtown, the Mudd Club was built as its punk answer.",
    timeline: [
      ["26 Apr 1977", "Steve Rubell and Ian Schrager open Studio 54; Nikki Haskell arrives so early the painters are still up their ladders"],
      ["May 1977", "Bianca Jagger rides a white horse onto the dance floor"],
      ["Oct 1978", "Closed nine days for a $500,000 makeover that adds the moving bridge"],
      ["Dec 1978", "IRS agents raid the club"],
      ["2-3 Feb 1980", "The last party before prison: Diana Ross and Liza Minnelli sing"],
      ["15 Sep 1981", "Mark Fleischman reopens it, with Rudolf Piper and Jim Fouratt as managers"],
      ["Apr 1986", "The nightclub closes; since 1998 the room is a Broadway theatre"],
    ],
    stage: ["Steve Rubell", "Ian Schrager", "Carmen D'Alessio", "Bianca Jagger", "Andy Warhol", "Halston", "Liza Minnelli", "Grace Jones", "Antonio Lopez", "Fiorucci", "Nikki Haskell", "Martha Wash", "Mark Benecke", "Michael Overington", "Mark Fleischman", "Rudolf Piper", "Jim Fouratt"],
    rooms: ["Xenon", "Régine's", "Copacabana", "Peppermint Lounge", "Mudd Club", "Paradise Garage", "Palladium"],
    said: [
      { episode: "s02e04", who: "Nikki Haskell", time: "00:13:49", quote: "So I dragged them to the opening of Studio 54. I said, oh, this is going to be the greatest club. You're going to just love it. So we get there. It was very early. It was like 10:30." },
      { episode: "s03e02", who: "Martha Wash", time: "00:10:08", quote: "I remember being afraid to perform on that bridge because the bridge moved. Sometimes the bridge would move forward out over the audience while we were performing." },
      { episode: "s03e04", who: "Man Parrish", time: "00:12:07", quote: "We would go to Studio 54 like three times a week, but we couldn't get in. So we would park our Gremlin next door. And when a limousine came to unload, we would duck down, run along..." },
      { episode: "s02e04", who: "Nikki Haskell", time: "00:15:47", quote: "A lot of people didn't get in, a lot of celebrities, and that was like the front page of the paper, couldn't get into Studio 54, and that's how it became famous." },
      { episode: "s01e10", who: "Joey Arias", time: "00:57:56", quote: "I remember Antonio Lopez was one of the art directors for the opening. And we were part of the opening." },
      { episode: "s05e01", who: "Nell Campbell", time: "00:30:18", quote: "That of course was a giant discotheque in an old theater. Tons of people could fit into Studio 54. Whereas we were much smaller." },
      { episode: "s04e06", who: "Lauren Ezersky", time: "00:12:48", quote: "I went to Studio 54. I was there opening night... Then the doors open and we all just ran in, and the music was great. It was just like, this place is amazing." },
      { episode: "s06e05", who: "Nora Burns", time: "00:17:11", quote: "This limousine pulled up and the driver was like, do you guys want to go to Studio 54? ... He opened our door, held up his fingers, two, and everyone sort of parted. And we walked in." },
    ],
    portrait: { photo: studio54Photo, phone: studio54PhotoPhone, polaroid: studio54Polaroid, focus: "45%", credit: STUDIO_54_CREDIT },
    timelineEvent: "studio-54",
  },
  // Disco 2000 (Lisa via the coordinator, 14 Nov 2026) belongs on the Limelight page: it was the Club Kids' Wednesday there.
  limelight: {
    opened: "1983",
    closed: "2001",
    address: "Sixth Avenue at 20th Street",
    aka: "home of Disco 2000",
    story:
      "Peter Gatien opened his New York Limelight in the deconsecrated Church of the Holy Communion, with five staircases climbing from the nave to lounges, chapels and VIP rooms. It ran for eighteen years and had a different crowd every night - Rock and Roll Church, industrial, gay nights, fashion shows - and on Wednesdays Disco 2000, the Club Kids' wildest party, where the guests worked fourteen-hour days to look that effortless. Raids and closures came in the 90s; Gatien sold the church in 2001.",
    timeline: [
      ["1845", "Richard Upjohn's Church of the Holy Communion is finished on Sixth Avenue"],
      ["Nov 1983", "Peter Gatien opens the New York Limelight in the old church"],
      ["1984", "Willi Smith shows his Fashionable Fast-Food Uniforms there"],
      ["1986", "Joey Arias first sings as Billie Holiday at the Limelight"],
      ["1990", "Disco 2000 takes over Wednesdays; Ernie Glam, Waltpaper, Jenny Talia and Amanda Lepore are its stars"],
      ["Oct 1995", "Police raid the club; it is closed from 1996 to 1998"],
      ["2001", "Gatien sells the church; in 2003 it reopens as Avalon"],
    ],
    stage: ["Peter Gatien", "Disco 2000", "Club Kids", "Ernie Glam", "Waltpaper", "Amanda Lepore", "Larry Tee", "Richie Rich", "Kenny Kenny", "James St. James", "Marc Berkley", "Joey Arias", "Jayne County", "Susanne Bartsch", "Lady Bunny", "Trey Speegle", "Linda Simpson"],
    rooms: ["Disco 2000", "The Tunnel", "Club USA", "Palladium", "Pyramid Club", "Roxy", "Webster Hall", "Area"],
    said: [
      { episode: "s01e04", who: "Peter Gatien", time: "00:30:55", quote: "We developed a night like Rock and Roll Church that lasted literally nine, ten years. To those people, Disco 2000 didn't exist." },
      { episode: "s01e05", who: "Ernie Glam", time: "00:17:45", quote: "People think that we were just partying all the time, but in the early years of Disco 2000 when we arrived at the Limelight... we were literally working 14-hour days." },
      { episode: "s01e06", who: "Waltpaper", time: "00:28:41", quote: "I was on the stage at Limelight and I used to roll my eyes in the back of my head and pretend I was a dragonfly. And so I was always fluttering my wings." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:15:07", quote: "I have so many incredible memories. Disco 2000, all of us just kind of merrily running through the club and running through the streets in the main room." },
      { episode: "s02e09", who: "Linda Simpson", time: "00:26:02", quote: "Because I think Disco 2000 went later than we did, people would hop over from the Pyramid to the Limelight." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:26:23", quote: "This guy had his bag, and out of the bag, a gun fell on the ground, like at my feet. And I looked up at him and he said, You didn't see that. And I said, I didn't see that." },
      { episode: "s05e07a", who: "Christopher Comp", time: "00:02:50", quote: "I have always been a behind-the-scenes kind of guy. I think that's why I fell into the role at Limelight with Michael Alig that I did - a lot of the planning and a lot of the office grunt work. But I got to be really creative in doing that." },
      { episode: "s01e09", who: "Moby", time: "00:07:02", quote: "I had just DJ'd for the first time at Limelight. And Michael took me to Peter Gatien's office... Michael said, Moby, this is Peter. Peter, this is Moby. He's a new DJ. And Peter just looked at me and went back to what he was doing." },
    ],
    portrait: { photo: limelightPhoto, phone: limelightPhotoPhone, polaroid: limelightPolaroid, focus: "35%", credit: LIMELIGHT_CREDIT },
    timelineEvent: "limelight",
  },
  // Batch 2 (Lisa, 16 Nov 2026). Facts: Wikipedia "Danceteria", "Tunnel (New York nightclub)", "Pyramid Club (New York City)",
  // "Palladium (New York City)" (checked 16 Nov 2026), Gallery 98 cards, Village Preservation (Jillian Jonas) and the guests'
  // episodes. Pictures: sources sheet, Round 8.
  danceteria: {
    opened: "1980",
    closed: "1986",
    address: "30 West 21st Street",
    story:
      "Rudolf Piper and Jim Fouratt opened it as an after-hours club on West 37th Street - named, Rudolf says, when they walked past a cafeteria and someone wanted a dancing area instead. After a liquor raid it came back on four floors of a 21st Street loft building: a dance floor, a video lounge, the Congo Bill room and a bar on the roof. Ruth Polsky booked the new bands, Haoui Montaug ran No Entiendes, Madonna sang her first song on its stage, and Keith Haring cleared the tables.",
    timeline: [
      ["May 1980", "Rudolf Piper and Jim Fouratt open the first Danceteria at 252 West 37th Street, with a video lounge"],
      ["Oct 1980", "A liquor raid: 35 staff arrested, and the club is shut down"],
      ["1982", "It reopens on four floors of 30 West 21st Street - Congo Bill on the fourth, Wuthering Heights on the roof"],
      ["1982", "Madonna's first show, Everybody, at Haoui Montaug's No Entiendes night"],
      ["1983-84", "Ruth Polsky books the new wave - New Order, the Smiths, the Beastie Boys, Sade"],
      ["1985", "Desperately Seeking Susan films its disco scene there; Sally Randall stages a lip-sync Jesus Christ Superstar"],
      ["1986", "The 21st Street Danceteria closes"],
    ],
    stage: ["Rudolf Piper", "Jim Fouratt", "Haoui Montaug", "Madonna", "Keith Haring", "Jean-Michel Basquiat", "Ann Magnuson", "Joey Arias", "Pulsallama", "Sally Randall", "Trey Speegle", "Mark Kamins", "Sean Cassette", "Karen Finley", "Beastie Boys", "LL Cool J", "RuPaul", "Martin Burgoyne"],
    rooms: ["Mudd Club", "Studio 54", "Club 57", "Pyramid Club", "Area", "Palladium", "Peppermint Lounge", "The Ritz"],
    said: [
      { episode: "s01e07", who: "Rudolf Piper", time: "00:53:39", quote: "We passed in front of a cafeteria and somebody said, Oh, I don't want a cafeteria, I want a dancing area. And I said, This is the name, this is the name." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:11:17", quote: "The second Danceteria was on 21st Street, but the first one was on 37th Street. It was illegal. Keith Haring was a busboy. You couldn't buy drinks directly. You had to buy a drink ticket." },
      { episode: "s01e10", who: "Joey Arias", time: "00:40:39", quote: "We did the Andy Edie Show at Danceteria, the Congo Bill room. We put up all tinfoil and silver balloons and television monitors. And we came out singing I Got You Babe." },
      { episode: "s01e07", who: "Rudolf Piper", time: "01:01:57", quote: "Ann Magnuson came and said, I want to make an accordion show inside the elevator. I said, Great... It was the first elevator in the world that had live music in it." },
      { episode: "s06e02", who: "Christina Visca", time: "00:50:32", quote: "Oh, I went to Danceteria all the time. I lived in Chelsea almost my whole life. I loved it... I think we all saw Madonna perform there." },
      { episode: "s06e07", who: "Sally Randall", time: "00:26:24", quote: "My absolutely favorite memory of you was when I did Jesus Christ Superstar, the lip sync drag queen opera." },
      { episode: "s01e09", who: "Moby", time: "00:49:11", quote: "In 1983, I went to Danceteria to see Mission of Burma and Bad Brains... then I walked upstairs and there was the hip-hop DJ, and then the gay DJ. It was the first time I'd been exposed to celebratory dance culture." },
    ],
    portrait: { photo: dancePhoto, phone: dancePhotoPhone, polaroid: dancePolaroid, focus: "50%", credit: DANCETERIA_CREDIT },
    timelineEvent: "danceteria",
  },
  tunnel: {
    opened: "1986",
    closed: "2001",
    address: "220 Twelfth Avenue",
    story:
      "A long, narrow club in an old freight warehouse by the Hudson, named for its main room - railroad tracks still ran through a sunken part of the dance floor. Rudolf Piper ran it in the early years, and in its basement the Club Kids were born: Larry Tee, Lady Bunny and friends throwing parties in what Larry calls a dump room. Peter Gatien took it over in 1992; Sunday nights belonged to hip-hop, the weekend to house, with Junior Vasquez in the booth after the Sound Factory closed.",
    timeline: [
      ["1986", "Tunnel opens in the Terminal Stores warehouse at 220 Twelfth Avenue, train tracks still in the floor"],
      ["1987", "Rudolf Piper's years: the Club Kids start in the basement, Larry Tee's Celebrity Club among the first parties"],
      ["1992", "Peter Gatien takes over the club"],
      ["1990s", "Sunday nights become New York's hip-hop showcase - Peter Gatien remembers Nas and Lil' Kim on its stage"],
      ["1995", "Junior Vasquez plays there after the Sound Factory closes"],
      ["2001", "Tunnel closes"],
    ],
    stage: ["Rudolf Piper", "Peter Gatien", "Club Kids", "Larry Tee", "Lady Bunny", "Amanda Lepore", "RuPaul", "John Sex", "Kenny Scharf", "Chi Chi Valenti & Johnny Dynell", "Junior Vasquez", "Danny Tenaglia", "Funkmaster Flex", "Christina Visca", "Really Denise", "Nina Hagen"],
    rooms: ["Limelight", "Club USA", "Palladium", "Sound Factory", "Roxy", "The World", "Twilo", "Nell's"],
    said: [
      { episode: "s01e04", who: "Peter Gatien", time: "00:53:20", quote: "If you got to be on stage at Tunnel Sunday nights, you had bragging rights. You were big dog in the neighborhood." },
      { episode: "s03e08", who: "Larry Tee", time: "00:17:54", quote: "In the basement. And it was a dump room. It really wasn't a place where you would put a big party. But they liked the energy that we had." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:12:46", quote: "In the back of Tunnel, Lady Bunny did a game show. And my mother was one of the contestants, and my mother won." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:16:57", quote: "It was a New Year show at Tunnel, and she signed my head in Arabic... I was just like, wow, Nina Hagen is signing my head in Arabic." },
      { episode: "s05e07b", who: "Really Denise", time: "00:46:59", quote: "Do you remember the softball parties we used to have? Like, Tunnel would have a team. World would have a team." },
      { episode: "s06e02", who: "Christina Visca", time: "00:15:43", quote: "I also worked for Peter later on. I managed USA and the Tunnel in the big 90s." },
      { episode: "s05e07b", who: "Really Denise", time: "00:40:07", quote: "It was so hard to get into clubs. So I got a job at Tunnel as a cocktail waitress. That's how I figured I'm going to get in... I was cocktail waitressing on the platform where the upstairs DJ was." },
    ],
    portrait: { photo: tunnelPhoto, phone: tunnelPhotoPhone, polaroid: tunnelPolaroid, focus: "45%", credit: TUNNEL_CREDIT },
    timelineEvent: "tunnel-reopens",
  },
  "pyramid-club": {
    opened: "1979",
    closed: "2020",
    address: "101 Avenue A",
    story:
      "A small bar on Avenue A with a pyramid over the door that became the home of East Village drag: not pageant drag but punk, witty, pop-culture drag, as Linda Simpson puts it. RuPaul played his first New York show there, Lady Bunny started Wigstock from it, and the stage belonged to Hattie Hathaway, John Sex, Wendy Wild, Ann Magnuson and later Linda's own parties. You had to make an effort to get there - which was the point.",
    timeline: [
      ["1979", "The Pyramid Cocktail Lounge opens at 101 Avenue A"],
      ["1982", "RuPaul plays his first New York show there; John Jesurun starts his serial play Chang in a Void Moon"],
      ["1985", "Pyramid performer Lady Bunny hosts the first Wigstock in Tompkins Square Park"],
      ["Mid-80s", "Whispers, the Sunday gay party, is the night to be at the Pyramid"],
      ["1990", "Linda Simpson and DJ Danny Johnson start their Wednesday party, Bunny hosting"],
      ["1992-95", "ANOHNI's Blacklips Performance Cult plays every Monday at midnight"],
      ["2020", "The Pyramid closes during the pandemic"],
    ],
    stage: ["Linda Simpson", "Lady Bunny", "RuPaul", "Lypsinka", "Brian Butterick", "John Sex", "Wendy Wild", "Ann Magnuson", "Tina L'Hotsky", "Taylor Mead", "John Kelly", "Trey Speegle", "Waltpaper", "Miss Guy", "Chi Chi Valenti & Johnny Dynell", "Keith Haring", "Jean-Michel Basquiat"],
    rooms: ["Boy Bar", "Club 57", "Danceteria", "Mudd Club", "Limelight", "Disco 2000", "Roxy", "Wigstock"],
    said: [
      { episode: "s02e09", who: "Linda Simpson", time: "00:11:29", quote: "It had like a punkish quality in that it was taking a genre that was stale and shaking it up... There wasn't anything like that happening anywhere else in the world." },
      { episode: "s02e09", who: "Linda Simpson", time: "00:16:51", quote: "It seemed very insider-y. You either got the humor or you didn't. And first of all, you had to make an effort to get there, because it was way the hell over on Avenue A." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:04:28", quote: "When I did Straight to Hell at the Pyramid, John Waters was one of the first people to do the show." },
      { episode: "s01e06", who: "Waltpaper", time: "00:18:32", quote: "We were like, oh my God, Diahann Carroll's here. And it took me a while... after I met Linda Simpson and saw Rube perform at Pyramid. I was like, oh, it's not Diahann Carroll." },
      { episode: "s04e09", who: "Susan Seidelman", time: "00:02:24", quote: "There was a great wall on St. Mark's Place that was fly-posted with posters for bands, for the Pyramid Club, for anyone who wanted to put a Xerox of themselves up." },
      { episode: "s03e10", who: "Miss Guy", time: "00:32:45", quote: "There was a journal entry from March of 89, at like 5:45 in the morning. And I wrote, Me and Bunny went to Pyramid, the Building and the Roxy tonight." },
    ],
    portrait: { photo: pyramidPhoto, phone: pyramidPhotoPhone, polaroid: pyramidPolaroid, focus: "45%", credit: PYRAMID_CREDIT },
    timelineEvent: "pyramid",
  },
  palladium: {
    opened: "1985",
    closed: "1997",
    address: "126 East 14th Street",
    story:
      "After prison and Studio 54, Steve Rubell and Ian Schrager took over a 1927 movie palace on 14th Street and had Arata Isozaki build a club inside it. Keith Haring painted the backdrop, Basquiat and Francesco Clemente made art for the Mike Todd Room, Andy Warhol designed the drink tickets - Eric Goode calls it a bigger, better Area. Sally Randall and Christina Visca worked its door, and for the teenagers who got in it was Babylon. Peter Gatien ran it from 1992 until NYU bought it.",
    timeline: [
      ["1927", "Thomas Lamb's Academy of Music opens as a movie palace"],
      ["1976", "Renamed the Palladium, it becomes a rock concert hall"],
      ["May 1985", "Steve Rubell and Ian Schrager open the club, with Arata Isozaki's interior and Keith Haring's backdrop"],
      ["Sep 1985", "Azzedine Alaïa shows his collection there"],
      ["Oct 1986", "Rudolf Piper's party for Liberace, white pianos all over the club"],
      ["1992", "Peter Gatien takes over"],
      ["Aug 1997", "The Palladium closes; NYU tears it down for a dormitory"],
    ],
    stage: ["Steve Rubell", "Ian Schrager", "Arata Isozaki", "Keith Haring", "Jean-Michel Basquiat", "Francesco Clemente", "Kenny Scharf", "Andy Warhol", "Rudolf Piper", "Sally Randall", "Christina Visca", "Lincoln Palsgrove IV", "Jennifer Rubell", "Martha Plimpton", "Liberace", "Michael Musto", "Dianne Brill", "Madonna", "Boy George", "Peter Gatien"],
    rooms: ["Area", "Studio 54", "Danceteria", "Limelight", "The Tunnel", "Club USA", "Nell's"],
    said: [
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:09:57", quote: "I can remember the Mike Todd Room like it was yesterday because it was just like Babylon, seeing all of the people in this huge space. I've never experienced anything like it." },
      { episode: "s03e06", who: "Eric Goode", time: "00:22:49", quote: "He did the Mike Todd Room with Jean-Michel Basquiat, and the Keith Haring on the dance floor, and the Kenny Scharf, and the Francesco Clemente. He set a bigger, better mousetrap." },
      { episode: "s06e07", who: "Sally Randall", time: "00:40:24", quote: "Especially at Palladium, you did have to have your social graces, because you weren't just letting in downtown kids." },
      { episode: "s01e07", who: "Rudolf Piper", time: "01:05:14", quote: "We rented eight or ten white pianos, with the pianists dressed in white tuxedos, playing all over the club. And only two thousand people came. Would you not go to a Liberace party?" },
      { episode: "s06e02", who: "Christina Visca", time: "00:44:36", quote: "I met most of the club kids when I was doing the door at Palladium. I would say 85, 86 is when you guys started coming around." },
      { episode: "s06e05", who: "Nora Burns", time: "00:13:46", quote: "He did this giant thing called Drag Aid, a drag queen AIDS benefit at Palladium... You had 50 drag queens who were supposed to go on between two and four." },
      { episode: "s06e02", who: "Christina Visca", time: "00:37:58", quote: "Sometimes I would do the door for a private party at the Basquiat Room and in Palladium as well. So, you know, those were incredible years." },
    ],
    portrait: { photo: palladiumPhoto, phone: palladiumPhotoPhone, polaroid: palladiumPolaroid, focus: "40%", credit: PALLADIUM_CREDIT },
    timelineEvent: "palladium",
  },
  "boy-bar": {
    opened: "1984",
    closed: "c. 1995",
    address: "15 St. Marks Place",
    story:
      "A gay bar on St. Marks Place whose little upstairs stage became a school for drag supermodels. Matthew Kasten made the Boy Bar Beauties into a polished ensemble with house rules - no wonky shoes, no wonky hair - and shared wigs, outfits and hairdressers. Connie Fleming, Miss Guy and Zaldy all took its crown or its stage, Johnny Dynell played the records, and on Thursdays the East Village came to watch. Jillian Jonas was its house photographer in the 90s.",
    timeline: [
      ["Oct 1984", "Boybar opens at 15 St. Marks Place with a Georges Piette photograph party"],
      ["Mid-80s", "Matthew Kasten starts the Boy Bar Beauties shows; Connie Fleming is pushed onto the stage at her first one"],
      ["Late 80s", "Thursday drag shows draw the East Village - Ernie Glam and Miss Guy watch every week"],
      ["1990s", "Miss Boy Bar crowns go to Shannon, Perfidia, Zaldy and more"],
      ["15 Sep 1994", "Boy Bar reopens; Jillian Jonas photographs its shows all year"],
    ],
    stage: ["Connie Fleming", "Miss Guy", "Zaldy", "Lady Bunny", "Lypsinka", "Sherry Vine", "Raven O", "Varla Jean Merman", "Coco Peru", "International Chrysis", "Kevin Aviance", "Chi Chi Valenti & Johnny Dynell", "Ernie Glam", "Nora Burns"],
    rooms: ["Pyramid Club", "Club 57", "Wigstock", "Limelight", "The Tunnel"],
    said: [
      { episode: "s02e05", who: "Connie Fleming", time: "00:13:19", quote: "'But you're going to be in the shows.' And the train pulled off... I went to the first rehearsal. I was super, super, super nervous and ran downstairs, threw up a little bit, I think, and then ran back up." },
      { episode: "s02e05", who: "Connie Fleming", time: "00:17:00", quote: "I think shoes had to match the outfit or go with the outfit or have an element of the outfit. No wonky hair." },
      { episode: "s03e10", who: "Miss Guy", time: "00:33:55", quote: "I never hesitated to walk down to Boy Bar from the Chelsea Hotel, where I was living for a while, in high heels, and walk home at the end of the night." },
      { episode: "s04e04", who: "Zaldy", time: "00:23:46", quote: "I don't see myself as a performer... Being forced on that stage was really nerve-wracking. I just remember how nervous I was, but I did do it. And I ended up winning." },
      { episode: "s06e05", who: "Nora Burns", time: "00:46:14", quote: "Matthew Kasten from Boy Bar would always call me and tell me the latest drag queen off the bus." },
      { episode: "s01e05", who: "Ernie Glam", time: "00:28:50", quote: "I used to go to this club called Boy Bar on St. Mark's Place in the East Village, and I would go there every Thursday to watch the drag shows." },
    ],
    portrait: { photo: boyBarPhoto, phone: boyBarPhotoPhone, polaroid: boyBarPolaroid, focus: "50%", credit: BOY_BAR_CREDIT },
  },
  // Batch 3 (Lisa, 16 Nov 2026: "keep building"). Facts: Wikipedia "Club 57 (nightclub)", "Nell's", "Paradise Garage",
  // "The Roxy (New York City)" (checked 16 Nov 2026); Club USA has no Wikipedia page - Peter Gatien's, Eric Goode's and Christina
  // Visca's episodes and a 1993 Gallery 98 card. Pictures: sources sheet, Round 9.
  "club-57": {
    opened: "1978",
    closed: "1983",
    address: "57 St. Mark's Place",
    story:
      "Stanley Strychacki opened it in the basement of the Holy Cross Polish National Church - a little Polish hall under a church, as Joey Arias puts it - and Ann Magnuson ran it. The School of Visual Arts kids made it their playground: Keith Haring, Kenny Scharf and John Sex, monster movies on Tuesdays, Lady Wrestling, Putt-Putt Reggae and Model World of Glue nights, all done on five cents. Johnny Dynell calls it kooky and kinky next to the dark Mudd Club, and the guests went to both.",
    timeline: [
      ["1978", "Stanley Strychacki opens Club 57 in the church basement at 57 St. Mark's Place"],
      ["1979", "Ann Magnuson becomes its manager; Tuesday is Monster Movie Club"],
      ["1979-81", "Theme nights: Lady Wrestling, Putt-Putt Reggae, Model World of Glue, a salute to NASA"],
      ["1981", "Keith Haring curates his Black Light show there"],
      ["Early 80s", "Holly Woodlawn plays Maria in A Sound of Muzak, with Michael Musto in three roles"],
      ["1983", "Club 57 closes"],
      ["2017-18", "MoMA shows Club 57: Film, Performance, and Art in the East Village"],
    ],
    stage: ["Ann Magnuson", "Stanley Strychacki", "Keith Haring", "Kenny Scharf", "John Sex", "Wendy Wild", "Pulsallama", "Joey Arias", "Michael Musto", "Holly Woodlawn", "Marc Shaiman", "Scott Wittman", "Klaus Nomi", "Tseng Kwong Chi", "Lypsinka", "Charles Busch", "Cyndi Lauper", "Madonna", "Dany Johnson"],
    rooms: ["Mudd Club", "Pyramid Club", "Danceteria", "Area", "Max's Kansas City", "CBGB"],
    said: [
      { episode: "s04e10", who: "Ann Magnuson", time: "00:37:29", quote: "It was all done on five cents, basically. And I just liked that. I like things that are not money driven and that require ingenuity. So Club 57 was a perfect place for that." },
      { episode: "s04e10", who: "Ann Magnuson", time: "00:58:01", quote: "At Club 57, we recreated a spaceship and had a salute to NASA where we all landed on the moon." },
      { episode: "s01e10", who: "Joey Arias", time: "00:28:26", quote: "It opened up as a monster movie club, because we were all the neighborhood, so it was just the gang. It was a little shitty Polish hall underneath the church." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:29:54", quote: "57 was kooky and kinky and just like, you know, zippity doo-dah. It was really fun. Mudd was like heroin, it was black." },
      { episode: "s01e02", who: "Michael Musto", time: "00:55:54", quote: "This was when you had to be a real insider, like an outlaw party, and that's what Club 57 was all about. And then MoMA had an exhibit a couple years ago of Club 57, and like, what?" },
      { episode: "s02e11", who: "Richard Boch", time: "00:55:23", quote: "Not to take anything away from Club 57, it was like the Mudd Club in the sense that it was sort of this petri dish, this incubator for a lot of talent." },
    ],
    portrait: { photo: club57Photo, phone: club57PhotoPhone, polaroid: club57Polaroid, focus: "55%", credit: CLUB_57_CREDIT },
  },
  "nell-s": {
    opened: "1986",
    closed: "2004",
    address: "246 West 14th Street",
    story:
      "Keith McNally and Lynn Wagenknecht of the Odeon asked their friend Nell Campbell, Columbia in The Rocky Horror Show, whether she wanted to do a nightclub. They took an old store on 14th Street and made it a shabby-grand English gentleman's club: overstuffed sofas, dinner, jazz upstairs, a dance floor downstairs, a black key mailed to the regulars. It held about 400 people, so the door was hard - Cher was turned away - and after the giant clubs it changed the whole scenario, as Rudolf Piper says. Jackie 60 started there.",
    timeline: [
      ["Fall 1986", "Nell Campbell, Keith McNally and Lynn Wagenknecht open Nell's on West 14th Street"],
      ["Feb 1987", "Andy Warhol's last night out is at Nell's"],
      ["Jun 1987", "Robert Mapplethorpe and Susan Sarandon host an amfAR dinner there"],
      ["1990", "Chi Chi Valenti and Johnny Dynell's Jackie 60 starts with a few tables on Tuesdays"],
      ["1990s", "Nell's turns into a jazz, reggae and hip-hop room; Biggie films Big Poppa there in 1995"],
      ["30 May 2004", "Nell's closes"],
    ],
    stage: ["Nell Campbell", "Keith McNally", "Lynn Wagenknecht", "Andy Warhol", "Robert Mapplethorpe", "Susan Sarandon", "Jessica Rosenblum", "Chi Chi Valenti & Johnny Dynell", "Jackie 60", "Run-DMC", "Michael Musto"],
    rooms: ["MK", "Area", "Palladium", "The Tunnel", "Studio 54", "Odeon"],
    said: [
      { episode: "s05e01", who: "Nell Campbell", time: "00:34:39", quote: "The joy of Nell's was the combination of uptown, downtown, arty, bankers, you know, the whole mix: rich, poor, gay, straight, cross-dressing." },
      { episode: "s05e01", who: "Nell Campbell", time: "00:35:10", quote: "Well, famously, Cher was turned away at the door. And you know what? I bumped into her in Barney's three days later." },
      { episode: "s01e07", who: "Rudolf Piper", time: "00:35:30", quote: "A few weeks before Tunnel opened, Nell's opened. And Nell's changed the whole scenario, because the whole scenario was always big clubs like Palladium." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:29:14", quote: "It got fancier when Area opened and then later MK and Nell's. It got more sort of nightclubby and less about dancing." },
      { episode: "s02e08", who: "Michelangelo Signorile", time: "00:41:03", quote: "It started to split. And that's how we sort of saw Nell's come on the scene, and it was much more sedate." },
      { episode: "s03e06", who: "Eric Goode", time: "00:31:53", quote: "Nell's was a product of suddenly, you know, there being straight clubs. Nell's was very much that." },
    ],
    portrait: { photo: nellsPhoto, phone: nellsPhotoPhone, polaroid: nellsPolaroid, focus: "50%", credit: NELLS_CREDIT },
  },
  "paradise-garage": {
    opened: "1977",
    closed: "1987",
    address: "84 King Street",
    story:
      "Michael Brody built it in an old parking garage in SoHo around a sound system by Richard Long, and Larry Levan played there every weekend for ten years - the first club to put the DJ at the centre. Members only, mostly Black and Latino and gay, no alcohol, dancing till noon. The guests remember the garage door open on summer nights, meeting the ball kids there, and the closing weekend in September 1987, when people sat in the street afterwards.",
    timeline: [
      ["1977", "Michael Brody opens the 84 King Street Garage"],
      ["Jan 1978", "After a year of work it officially opens as the Paradise Garage, Larry Levan in the booth"],
      ["1978", "The main dance floor opens; the club holds 1,400"],
      ["1984", "A rooftop lounge in the style of Fire Island Pines is added"],
      ["Sep 1987", "The closing weekend; the lease ends on 1 October"],
      ["1992", "Larry Levan dies at 38"],
      ["2018", "The building is torn down for condominiums"],
    ],
    stage: ["Larry Levan", "Grace Jones", "Madonna", "Diana Ross", "Keith Haring", "Gwen Guthrie", "Boy George", "Christina Visca", "Luis \"Xtravaganza\" Camacho", "Patricia Field", "Chi Chi Valenti & Johnny Dynell", "Nick Egan"],
    rooms: ["The Loft", "The Saint", "Studio 54", "Sound Factory", "Funhouse", "Mudd Club"],
    said: [
      { episode: "s06e08", who: "William Norwich", time: "00:03:11", quote: "The next one was Paradise Garage, which was a gay club. It was exquisite. In the summer, particularly, you'd open the garage door. I'd never seen anything like it in my life." },
      { episode: "s01e08", who: "Luis \"Xtravaganza\" Camacho", time: "00:55:56", quote: "I went to Paradise Garage once, at the end. There was that big weekend when they were closing, and there was a big sit-in outside afterwards... So I lied to my mom that I was going somewhere else." },
      { episode: "s06e02", who: "Christina Visca", time: "00:05:00", quote: "First of all, I was a member of the Paradise Garage - you know, mostly Black and Hispanic." },
      { episode: "s05e04", who: "Nick Egan", time: "00:28:51", quote: "We had Heaven in England, but the Paradise Garage had some great music coming out of it, like Gwen Guthrie. So there was this like cultural perfect storm about to happen." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:20:01", quote: "This gorgeous, glorious French woman - she danced at Paradise Garage, she was a Paradise Garage girl, and she was also a modeling agent. She found me behind the counter and said I should model." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:37:56", quote: "I would meet the kids at the Garage years ago, the ball kids, and also on the pier." },
    ],
    portrait: { photo: pgPhoto, phone: pgPhotoPhone, polaroid: pgPolaroid, focus: "50%", credit: PARADISE_GARAGE_CREDIT },
  },
  "club-usa": {
    opened: "1992",
    closed: "c. 1995",
    address: "218 West 47th Street",
    story:
      "Peter Gatien's Times Square megaclub in an old theatre, the biggest of his empire: Eric Goode and Serge Becker built it, with a giant slide, a room by Thierry Mugler, one by Jean Paul Gaultier, furniture by H.R. Giger, Kenny Scharf - and a bar in the bathrooms. Fenton Bailey calls it the Club Kids' greatest creation. Christina Visca managed it with the Tunnel, Marc Berkley's Bump filled it with sweaty boys on Sundays, and the police came often.",
    timeline: [
      ["1992", "Peter Gatien opens Club USA in a Times Square theatre at 218 West 47th Street; 60 Minutes films the Club Kids before the opening"],
      ["1993", "Gender Bender, Ann Bennett and Roz Winter's audio-visual night in the men's and women's bathroom"],
      ["1994-95", "Christina Visca manages it alongside the Tunnel; Marc Berkley's Bump on Sundays"],
      ["c. 1995", "Club USA closes as the raids on Gatien's clubs begin"],
    ],
    stage: ["Peter Gatien", "Eric Goode", "Serge Becker", "Thierry Mugler", "Jean Paul Gaultier", "H. R. Giger", "Kenny Scharf", "Club Kids", "Christina Visca", "Marc Berkley", "Richie Rich", "Waltpaper", "Kenny Kenny", "Lady Bunny", "Junior Vasquez"],
    rooms: ["Limelight", "The Tunnel", "Palladium", "Sound Factory", "Roxy", "The World"],
    said: [
      { episode: "s01e04", who: "Peter Gatien", time: "00:42:20", quote: "When I opened Club USA, a captain from the local precinct came in and said, You know, Gatien, I'm happy you're here. Because any night I'm in a pissed-off mood, I know I can go in one of your places and torture you to death." },
      { episode: "s03e06", who: "Eric Goode", time: "00:37:10", quote: "We built USA. I put a bar in a bathroom for the first time ever - a bar in the men's and women's bathroom. We had a lot of fun with Peter Gatien's dollars." },
      { episode: "s06e02", who: "Christina Visca", time: "00:36:31", quote: "You had the Mugler room upstairs that Thierry Mugler designed. You had the Gaultier room. H.R. Giger designed some of the furniture... It was legendary, and it was gorgeous." },
      { episode: "s04e08", who: "Richie Rich", time: "00:39:37", quote: "Polly was a bartender, she had a shaved head... and she's like, to make money, I'm going to go to acting auditions. And she ended up being Pauley Perrette." },
      { episode: "s01e04", who: "Peter Gatien", time: "00:55:56", quote: "Just totally sweaty people having the best times of their life." },
      { episode: "s01e06", who: "Waltpaper", time: "00:48:52", quote: "I remember doing an interview for the pre-opening of Club USA. I think it was 60 Minutes. And we were all gathered in the stairwell." },
      { episode: "s04e02", who: "Mickey Boardman", time: "00:24:58", quote: "Jeffrey Fulvimari, remember that illustrator, who used to do these party invites for Club USA that I was obsessed with and would always save them all." },
    ],
    portrait: { photo: clubUsaPhoto, phone: clubUsaPhotoPhone, polaroid: clubUsaPolaroid, focus: "50%", credit: CLUB_USA_CREDIT },
    timelineEvent: "club-usa",
  },
  roxy: {
    opened: "1978",
    closed: "2007",
    address: "515 West 18th Street",
    story:
      "A roller disco by the West Side Highway that turned into a club: in 1982 Kool Lady Blue brought hip-hop downtown on Friday nights with Afrika Bambaataa and the Rock Steady Crew, and Susanne Bartsch staged her first New London in New York show behind a curtain in a third of the room. In the early 90s Saturdays belonged first to the club kids' Locomotion, then to John Blair's muscle boys, with Lincoln Palsgrove IV on the door and Larry Tee as its big DJ.",
    timeline: [
      ["1978", "The Roxy opens as a roller disco at 515 West 18th Street"],
      ["Jun 1982", "Kool Lady Blue turns it into a hip-hop club on Fridays - Afrika Bambaataa, the Rock Steady Crew"],
      ["1983", "Knockout Night: it's dancing, it's skating"],
      ["1985", "Gene DiNino buys the Roxy"],
      ["Early 90s", "Saturday nights: Locomotion, then John Blair's muscle-boy party; Larry Tee is the big Roxy DJ"],
      ["Mar 2007", "The Roxy closes"],
    ],
    stage: ["Afrika Bambaataa", "Rock Steady Crew", "Madonna", "Susanne Bartsch", "John Blair", "Lincoln Palsgrove IV", "Larry Tee", "Miss Guy", "Lady Bunny", "Patricia Field", "Peter Allen", "Nora Burns", "Linda Evangelista"],
    rooms: ["Sound Factory", "Pyramid Club", "Disco 2000", "Limelight", "The World", "Red Zone"],
    said: [
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:41:28", quote: "The Roxy is a very interesting spot, because it was one of the first instances where club life was starting to change en masse... It was a roller skating rink." },
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:42:45", quote: "I can remember vividly having to go down into a massive crowd and pull in Linda Evangelista... To have 400 people out front waiting to get in at midnight was no big deal." },
      { episode: "s03e08", who: "Larry Tee", time: "00:54:14", quote: "I was the big DJ at the Roxy, and then I just blew it all." },
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:12:03", quote: "The worst part of it is the Roxy is huge, as you know. I took a third of the Roxy, put up this curtain." },
      { episode: "s06e05", who: "Nora Burns", time: "00:08:35", quote: "Then we went to Roxy. Roller disco is fun! Poor Luwala, though, she kept falling and her space outfit fell off." },
      { episode: "s01e02", who: "Michael Musto", time: "00:25:59", quote: "He [Peter Allen] would be at the Roxy dancing around with his shirt off." },
    ],
    portrait: { photo: roxyPhoto, phone: roxyPhotoPhone, polaroid: roxyPolaroid, focus: "50%", credit: ROXY_CREDIT },
  },
  // Batch 4 (Lisa, 18 Nov 2026: "next batch") - the first clubs without a Jukebox night. Facts: Wikipedia "The World (nightclub)",
  // "Copacabana (nightclub)", "Peppermint Lounge", "Jackie 60"; MK from Queer Happened Here and Vanity Fair (May 1988) via search,
  // checked 18 Nov 2026. Pictures: sources sheet, Round 10.
  world: {
    opened: "Mid-80s",
    closed: "1991",
    address: "254 East 2nd Street",
    story:
      "An old catering hall and theatre on East 2nd Street, out by Avenue C, with a chandeliered ballroom - the Crystal Room - and a balcony. It opened and closed as it liked, mostly outside the law, and drew everyone: artists, Prince and Madonna, banjee boys, the voguing houses and the first Club Kids. Frankie Knuckles and David Morales played house there before house was everywhere. Michelle Visage went every weekend, Lincoln Palsgrove IV and James St. James worked its door. It ended in June 1991, when co-owner Steven Venizelos was shot in the balcony.",
    timeline: [
      ["Mid-80s", "The World opens in a former catering hall and theatre at 254 East 2nd Street"],
      ["1987", "Lincoln Palsgrove IV works the rope to the Crystal Room; Frankie Knuckles DJs in the early days"],
      ["1988", "Devo film their Disco Dancer video there"],
      ["Late 80s", "Weekends at the World, then on to Robots - the Club Kids, the It Twins and the voguing houses"],
      ["1990-91", "Christina and Junior Take Over the World, a short-lived night under new management"],
      ["27 Jun 1991", "Co-owner Steven Venizelos is found shot in the balcony; the World closes for good"],
    ],
    stage: ["Frankie Knuckles", "David Morales", "Larry Tee", "Lady Bunny", "Dean Johnson", "Kenny Kenny", "The It Twins", "Michelle Visage", "Lincoln Palsgrove IV", "James St. James", "Christina Visca", "Junior Vasquez", "Haoui Montaug", "Anita Sarko", "Jackie Curtis", "Taylor Mead", "Stephen Sprouse", "Madonna", "RuPaul", "Keith Haring"],
    rooms: ["Robots", "Red Zone", "Roxy", "Pyramid Club", "Area", "Palladium", "Webster Hall"],
    said: [
      { episode: "s02e01", who: "Michelle Visage", time: "00:28:41", quote: "I was at the World every weekend... We'd go to the World and then we'd go to Robots. Kenny Kenny and I were like buddy-buddy. I knew the It Twins, I knew Michael, all the legends." },
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:16:47", quote: "I was doing the door to the Crystal Room at the World in 87. I think Eve somehow had the concept that I wasn't quite old enough - I shouldn't put this kid out at the front door." },
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:56:18", quote: "I remember meeting Frankie Knuckles, because he DJed at the World in the early days when it opened. And I thought, my God, this house music is just going to be everything." },
      { episode: "s06e01", who: "James St. James", time: "00:26:24", quote: "And then from there I went on to do the door of the World." },
      { episode: "s01e05", who: "Ernie Glam", time: "00:22:02", quote: "There were other scenes, like the club kids scene at the Makeup Room at the World, the party that Peter A and Rain Voltaire used to do. That party wasn't dark." },
      { episode: "s06e02", who: "Christina Visca", time: "00:33:16", quote: "It was very short-lived. It was called Christina and Junior Take Over the World. It's a nightclub, it's the World, it's Avenue C, Second Street. It's me and Junior!" },
    ],
    portrait: { photo: worldPhoto, phone: worldPhotoPhone, polaroid: worldPolaroid, focus: "40%", credit: WORLD_CREDIT },
  },
  copacabana: {
    opened: "1940",
    closed: "1992",
    address: "10 East 60th Street",
    story:
      "The supper club by Central Park that Frank Costello's money opened in 1940: Brazilian palm trees, Chinese food, the Copa Girls, Martin and Lewis, Sinatra. Cherry Vanilla remembers it from the 1950s by its smell - expensive perfume and the kitchen. In the late 80s Susanne Bartsch rented its two floors once a month and filled the old mafia home with hookers, go-go boys, Brazilian samba dancers and the Club Kids, RuPaul on the mic and Sister Dimension on the decks. Leaving at six in the morning, opposite the Pierre, felt like Jackie Kennedy, move over.",
    timeline: [
      ["10 Nov 1940", "The Copacabana opens at 10 East 60th Street, Monte Proser out front, Frank Costello behind him"],
      ["1940s-50s", "Martin and Lewis make their New York debut there; the Copa Girls, Brazilian decor, Chinese food"],
      ["1978", "Barry Manilow's Copacabana makes it a song"],
      ["Late 80s", "Susanne Bartsch's monthly Copa parties - the Village People open the first night, RuPaul is the MC"],
      ["1992", "The Copacabana leaves East 60th Street; it lives on at other addresses"],
    ],
    stage: ["Susanne Bartsch", "RuPaul", "Sister Dimension (Alan Mace)", "Village People", "Andy Warhol", "Michelle Visage", "Cherry Vanilla", "Christopher Comp", "Barry Manilow"],
    rooms: ["Studio 54", "Peppermint Lounge", "Roxy", "Limelight", "Bentley's"],
    said: [
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:34:59", quote: "I went to see it and I fell in love... The Copa was so glamorous. And it was a mafia home. Upstairs by the banquettes they had all these compartments where you could put money and pass it on to the next booth." },
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:35:52", quote: "I brought in everything, from the hookers to the go-go boys to the Brazilians, all the Brazilian samba culture, and then the club kids, of course... Coming out at six in the morning by the hotel and the park - Jackie Kennedy, move over." },
      { episode: "s03e05", who: "Cherry Vanilla", time: "00:04:40", quote: "There was a mixture of expensive perfume, not cheap perfume, and the Copa food - they cooked a combination of Chinese and French food... It was the 1950s, so a lot of women were in strapless dresses." },
      { episode: "s05e07a", who: "Christopher Comp", time: "00:09:16", quote: "The first party I went to was Susanne Bartsch's Copacabana party... And RuPaul was the first club kid person that I ever met on that trip." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:29:20", quote: "She walked back into an unused dressing room at the Copa. And RuPaul had two drinks in her hand, busted into the room... I think that was the first time we exchanged words." },
      { episode: "s03e05", who: "Cherry Vanilla", time: "00:06:55", quote: "The men all had that Dean Martin kind of black shiny hair... white crisp shirts and tuxedos. It was a very sexy night out to go to the Copa. Always a big night out, always expensive." },
    ],
    portrait: { photo: copaPhoto, phone: copaPhotoPhone, polaroid: copaPolaroid, focus: "50%", credit: COPACABANA_CREDIT },
  },
  mk: {
    opened: "1988",
    closed: "1990",
    address: "204 Fifth Avenue",
    story:
      "After Area, Eric Goode and Serge Becker took over an old neoclassical bank on Fifth Avenue at 25th Street and made it a supper club - Lincoln Palsgrove IV calls it their answer to Nell's, a gentleman's club for the art and Bret Easton Ellis crowd. Andy Warhol wanted to be a partner; after he died, Fred Hughes came in instead. Keith Haring had his last birthday party there. Eric remembers it as a club that opened under the shadow of all the funerals, at the end of the 80s.",
    timeline: [
      ["1987", "Andy Warhol wants to invest in MK, and dies before it opens; Fred Hughes becomes a partner in his place"],
      ["Mar 1988", "Eric Goode and Serge Becker open MK in an old bank at 204 Fifth Avenue"],
      ["1988-89", "Dinner upstairs, dancing in the vault; Lincoln Palsgrove IV works there"],
      ["May 1989", "Keith Haring's last birthday party is at MK"],
      ["1990", "MK closes"],
    ],
    stage: ["Eric Goode", "Serge Becker", "Andy Warhol", "Fred Hughes", "Keith Haring", "Jean-Michel Basquiat", "Lincoln Palsgrove IV", "Bret Easton Ellis", "Jay McInerney", "Trey Speegle"],
    rooms: ["Area", "Nell's", "Club USA", "Palladium", "Limelight"],
    said: [
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:50:13", quote: "I did work at MK, which was on like 25th Street in an old bank, and it was an amazing space. It was really his answer to Nell's. It was like a gentleman's club. It was very art focused." },
      { episode: "s03e06", who: "Eric Goode", time: "00:34:30", quote: "Andy wanted to invest in MK and be a partner in MK. And of course, he died in 1987... I threw Keith's last birthday party at MK. It just felt like the end of the 80s." },
      { episode: "s03e06", who: "Eric Goode", time: "00:46:33", quote: "Throughout most of my career, Area, MK, we were not druggy... We were these kind of clean-cut kids from California that didn't know what we were doing." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:29:14", quote: "It got fancier when Area opened and then later MK and Nell's. It got more sort of nightclubby and less about dancing." },
    ],
    portrait: { photo: mkPhoto, phone: mkPhotoPhone, polaroid: mkPolaroid, focus: "50%", credit: MK_CREDIT },
  },
  "peppermint-lounge": {
    opened: "1958",
    closed: "1985",
    address: "128 West 45th Street",
    story:
      "A small bar off Times Square where Joey Dee and the Starliters started the Twist in 1961, and Jackie Kennedy, Garbo and Sinatra came to do it. It was run by the mob, closed in 1965, and came back in November 1980 as a new wave club - Rudolf Piper and Jim Fouratt sparked it - with the Go-Go's, the Cramps, the Raybeats and Grandmaster Flash on its stage. Richard Boch worked its door for six months and calls it a money laundry for the Midtown mob, with great music. In 1982 it moved to Fifth Avenue.",
    timeline: [
      ["1958", "The Peppermint Lounge opens at 128 West 45th Street"],
      ["1961", "Joey Dee and the Starliters' Peppermint Twist starts a craze; Jackie Kennedy brings it to the White House"],
      ["Dec 1965", "It loses its liquor licence and closes"],
      ["Nov 1980", "The name comes back for a new wave club in the same room, sparked by Rudolf Piper and Jim Fouratt"],
      ["Mar 1981", "Yoko Ono delivers Walking on Thin Ice there in person"],
      ["1982", "The Peppermint Lounge moves downtown to 100 Fifth Avenue"],
      ["1985", "It closes"],
    ],
    stage: ["Rudolf Piper", "Jim Fouratt", "Richard Boch", "The Go-Go's", "The Raybeats", "Grandmaster Flash", "Afrika Bambaataa", "Yoko Ono", "Susan Seidelman", "Trey Speegle"],
    rooms: ["Studio 54", "Danceteria", "Mudd Club", "Copacabana", "The Ritz"],
    said: [
      { episode: "s01e07", who: "Rudolf Piper", time: "00:30:42", quote: "Peppermint Lounge was at the old Knickerbocker Hotel, which then had a gay club called G.G. Barnum's. I'm sure you didn't go there, because it's before your time." },
      { episode: "s02e11", who: "Richard Boch", time: "00:57:31", quote: "The Peppermint Lounge at that point was basically a money laundering place for the Midtown mob... That's what it was when it was the G.G. Barnum's Room prior to that." },
      { episode: "s02e11", who: "Richard Boch", time: "00:57:58", quote: "There was some great music that came through the Peppermint Lounge when I was there. And I only lasted six months." },
      { episode: "s04e09", who: "Susan Seidelman", time: "00:18:58", quote: "In 1980 or 81, for a couple of months, the Peppermint Lounge got groovy. They put a trapeze above the dance floor, so there would be trapeze artists doing their trapeze stuff." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:08:17", quote: "He was going to give me a birthday party at Peppermint Lounge uptown." },
      { episode: "s02e10", who: "Brian Belovitch", time: "00:19:04", quote: "The original Gilded Grape was on 8th Avenue and 45th Street... Eventually, the Gilded Grape moved up the street to where the Peppermint Lounge was." },
    ],
    portrait: { photo: pepperPhoto, phone: pepperPhotoPhone, polaroid: pepperPolaroid, focus: "35%", credit: PEPPERMINT_CREDIT },
  },
  "jackie-60": {
    opened: "1990",
    closed: "1999",
    address: "432 West 14th Street",
    aka: "Tuesdays, later at Mother",
    story:
      "Chi Chi Valenti and Johnny Dynell's Tuesday night, made with Kitty Boots and Richard Move and later Hattie Hathaway: a few tables at Nell's when nobody went out on Tuesdays, then a room at 14th and Washington in the Meatpacking District that they bought in 1994 and called Mother. A theme every week on a thirty-dollar budget - the Stevie Nicks night became an annual - for dominant women, poets, gay men, lesbians, fetish-dressers and everyone who loved them.",
    timeline: [
      ["1990", "Jackie 60 starts with a few tables at Nell's on Tuesday nights"],
      ["1990", "It moves to 14th Street and Washington, in the Meatpacking District"],
      ["1990s", "A new theme every Tuesday; the Stevie Nicks night with Dean Johnson becomes an annual"],
      ["1994", "Chi Chi and Johnny buy Bar Room 432 and rename it Mother"],
      ["c. 1995", "Hattie Hathaway joins as the fourth producer"],
      ["28 Dec 1999", "Mother closes"],
    ],
    stage: ["Chi Chi Valenti & Johnny Dynell", "Kitty Boots", "Richard Move", "Brian Butterick", "Joey Arias", "Dean Johnson", "Miss Guy", "Richard Hell", "Stevie Nicks"],
    rooms: ["Nell's", "Squeezebox", "Pyramid Club", "Mudd Club", "Boy Bar"],
    said: [
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:50:15", quote: "Jackie 60 was weekly on Tuesdays, and there were four producers... Some of these nights we would put together for, say, $30, really. When it began, it was just a few tables at Nell's on a Tuesday night when absolutely no one was there." },
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:55:57", quote: "I ran into Dean Johnson, Joey Arias and several other people from the whole drag performance scene, and they were all Stevie fans... We should do this Stevie Nicks night. And it just really caught on and became an annual." },
      { episode: "s01e10", who: "Joey Arias", time: "00:50:30", quote: "It became, you know, that we'd go to Jackie 60 and meet people there." },
      { episode: "s03e10", who: "Miss Guy", time: "00:32:12", quote: "That was at the very beginning, when it was at Nell's. And I slipped in it and fell on the stage. I think there's photos somewhere." },
      { episode: "s05e04", who: "Nick Egan", time: "00:27:23", quote: "Johnny started Jackie 60... New York had it bigger, but it wasn't as integrated as it was in London. It was much more segregated, until people like Johnny started to bring it together." },
    ],
    portrait: { photo: jackiePhoto, phone: jackiePhotoPhone, polaroid: jackiePolaroid, focus: "50%", credit: JACKIE_60_CREDIT },
  },
  // Batch 5 (Lisa, 18 Nov 2026: "yes start"). Facts: Wikipedia "Save the Robots" and "Xenon (nightclub)"; Squeezebox from Red Bull
  // Music Academy's oral history and the Village Voice's Don Hill obituary; Red Zone and Mars have no Wikipedia page and no
  // reliable dates online, so their pages lean on the guests' own stories (checked 18 Nov 2026). Pictures: sources sheet, Round 11.
  "red-zone": {
    opened: "Late 80s",
    closed: "90s",
    address: "the West Side",
    story:
      "A big West Side club in a former garage, open on weekends, with a restaurant and VIP room up the stairs and a raised stage on the dance floor. It was where the voguers and the Club Kids met - Luis Xtravaganza Camacho remembers everyone becoming family there - and where the House of Ecstasy held a ball. James St. James worked there, Lincoln Palsgrove IV and Kenny Kenny did the door, Michael Alig hosted parties, and one midweek night Lincoln introduced RuPaul to Michelle Visage on its dance floor.",
    timeline: [
      ["Late 80s", "Red Zone opens on the West Side in a former garage, weekends only"],
      ["Late 80s", "Ernie Glam shows up in his LED smiley hat - the era of acid house"],
      ["1989", "The House of Ecstasy ball; voguers and Club Kids share the floor"],
      ["Early 90s", "A midweek night with a raised stage, the Lincoln Lounge - where Lincoln introduces RuPaul to Michelle Visage"],
    ],
    stage: ["James St. James", "Lincoln Palsgrove IV", "Kenny Kenny", "Ernie Glam", "RuPaul", "Michelle Visage", "Luis \"Xtravaganza\" Camacho", "Linda Simpson", "Really Denise", "Club Kids"],
    rooms: ["The World", "The Tunnel", "Limelight", "Roxy", "Robots", "Sound Factory"],
    said: [
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:30:55", quote: "I was doing the door first at the bottom of the stairs up to the restaurant, to the VIP room... Red Zone wasn't every night. It was like the weekends." },
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:31:30", quote: "I'll never forget, because Ru talks about it on his podcast: that was one of those nights I introduced Michelle and RuPaul on the dance floor of Red Zone. And Ru was like, who is that?" },
      { episode: "s01e05", who: "Ernie Glam", time: "00:08:41", quote: "When he was hosting a party at the Red Zone, I had started experimenting with LED lights and soldering guns... I figured out how to make a smile, because that was the era of acid house." },
      { episode: "s05e07b", who: "Really Denise", time: "00:39:10", quote: "It was Tunnel, the World, Limelight, Red Zone, the Building, Roxy." },
    ],
    portrait: { photo: redZonePhoto, phone: redZonePhotoPhone, polaroid: redZonePolaroid, focus: "50%", credit: RED_ZONE_CREDIT },
  },
  squeezebox: {
    opened: "1994",
    closed: "2000s",
    address: "Don Hill's, 511 Greenwich Street",
    story:
      "A Friday night at Don Hill's rock club on the edge of SoHo, started in April 1994 by Michael Schmidt, Miss Guy, Mistress Formika and Pat Briggs: drag queens singing live with a punk band, local rock bands opening for them, go-go dancers of every kind, gay and straight together. Nobody could get a cab there and nobody complained about the noise. Debbie Harry and John Waters came early - John Waters still calls it the greatest club in New York history - and it gave Bebe Buell her stage back.",
    timeline: [
      ["15 Apr 1994", "Squeezebox opens at Don Hill's, 511 Greenwich Street"],
      ["Summer 1994", "On fire: Debbie Harry, John Waters, Joan Jett and Jayne County come down"],
      ["Mid-90s", "The Squeezebox band backs drag queens singing live; Bebe Buell joins them on stage"],
      ["2001", "John Cameron Mitchell's Hedwig and the Angry Inch, born at Squeezebox, reaches the cinema"],
    ],
    stage: ["Michael Schmidt", "Miss Guy", "Mistress Formika", "Debbie Harry", "John Waters", "Joan Jett", "Jayne County", "Bebe Buell", "Lady Bunny"],
    rooms: ["Pyramid Club", "Boy Bar", "Jackie 60", "Cat Club", "CBGB"],
    said: [
      { episode: "s02e06", who: "Michael Schmidt", time: "00:52:54", quote: "You couldn't get a cab there. It was a no-man's land, which worked in our favor because there was nobody to complain about the noise... And Don Hill was so wonderful, he just let me do whatever the hell I wanted." },
      { episode: "s02e06", who: "Michael Schmidt", time: "00:57:20", quote: "John Waters, in his act to this day, still says Squeezebox was the greatest club in New York City history. He says that on stage." },
      { episode: "s03e10", who: "Miss Guy", time: "00:39:25", quote: "He gave us full freedom to do whatever we wanted and full support. And so we started Squeezebox in April of 94." },
      { episode: "s03e10", who: "Miss Guy", time: "00:40:20", quote: "Celebrities started coming. I think, you know, of course Debbie Harry was one of the first." },
      { episode: "s04e03", who: "Bebe Buell", time: "01:09:20", quote: "And they repaired me, put me back together again, gave me my soul back. I owe my life to those guys. I owe my life to Don Hill." },
    ],
    portrait: { photo: squeezePhoto, phone: squeezePhotoPhone, polaroid: squeezePolaroid, focus: "50%", credit: SQUEEZEBOX_CREDIT },
  },
  mars: {
    opened: "1988",
    closed: "c. 1990",
    address: "the Meatpacking District",
    story:
      "Rudolf Piper's five-floor club in a Meatpacking District warehouse by the river, just as hip-hop was taking over the city: Rudolf didn't like the music but knew the trend would go far. It banned Club Kids, hired an unknown Moby off a demo tape, had Chip Duckett's Sunday gay night and a basement where Willi Ninja would turn up. Rudolf also saw how the dealers took it over - a packet dropped onto the roof from next door - and calls it the beginning of what later happened at the Limelight.",
    timeline: [
      ["1988", "Rudolf Piper opens Mars on five floors of a Meatpacking District warehouse"],
      ["1988", "Moby drops off a demo tape and a DJ resume; the booker Yuki calls him back"],
      ["1988-89", "Willi Ninja vogues in the basement; Chip Duckett's Sunday nights"],
      ["c. 1990", "Mars closes; for Rudolf it marks the end of his New York years"],
    ],
    stage: ["Rudolf Piper", "Moby", "Willi Ninja", "Chip Duckett", "Lady Bunny", "Mark Kamins", "Jenny Talia"],
    rooms: ["Danceteria", "Palladium", "Limelight", "The Tunnel", "Quick", "Sound Factory"],
    said: [
      { episode: "s01e09", who: "Moby", time: "00:18:03", quote: "There's this new club opening called Mars and they're hiring. So I made a demo tape with house music on one side and hip-hop on the other, and I actually wrote out a resume of my DJ experience... and she laughed at me, understandably." },
      { episode: "s01e09", who: "Moby", time: "00:20:26", quote: "Chip's Sunday nights at Mars were phenomenal... Nightlife was a refuge for so many people, almost literally and figuratively." },
      { episode: "s01e07", who: "Rudolf Piper", time: "00:42:04", quote: "While I was building Mars, hip-hop came. This was a new trend. And I felt that this new trend was gonna go far. I didn't like the music... but I thought, well, it's a new trend." },
      { episode: "s01e07", who: "Rudolf Piper", time: "00:07:58", quote: "Suddenly I see a guy coming from the rooftop of the building next door, and he dropped a packet onto the rooftop of Mars... And who was picking up that packet? My manager." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:04:47", quote: "I think I snuck out and went to Mars. So that was my first club experience. I think I had a cocktail and tried to smoke a cigarette." },
    ],
    portrait: { photo: marsPhoto, phone: marsPhotoPhone, polaroid: marsPolaroid, focus: "50%", credit: MARS_CREDIT },
  },
  robots: {
    opened: "1983",
    closed: "1993",
    address: "25 Avenue B",
    aka: "Save the Robots",
    story:
      "An illegal after-hours club in a storefront and basement on Avenue B: sand on the floor, only vodka, soda and fruit juice at the bar, nobody arriving before four in the morning and the party going on until eight. Shut for fire violations in 1984, it came back as a social club in January 1986 and became where every night ended - after the World, after Red Zone - for drag queens, Club Kids, bartenders off shift and the rest of downtown.",
    timeline: [
      ["1983", "Save the Robots opens illegally in a storefront and basement at 25 Avenue B"],
      ["Mid-1984", "Closed for fire safety violations"],
      ["Jan 1986", "Reopens with a social club licence; vodka, soda and juice only, 4 to 8 a.m."],
      ["Late 80s", "The end of every night - the World, then Robots"],
      ["1993", "The last year of Robots"],
    ],
    stage: ["Dean Johnson", "Lady Bunny", "Club Kids", "Michelle Visage", "Jenny Talia", "Richie Rich", "James St. James", "Michelangelo Signorile"],
    rooms: ["The World", "Pyramid Club", "Red Zone", "Limelight", "The Tunnel"],
    said: [
      { episode: "s02e01", who: "Michelle Visage", time: "00:28:41", quote: "I was at the World every weekend... We'd go to the World and then we'd go to Robots." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:17:41", quote: "And then, until you finally made it to Save the Robots, it was like, you know." },
      { episode: "s04e08", who: "Richie Rich", time: "00:37:26", quote: "I remember going to Robots with you, and everybody would go in the sand looking for their stuff." },
    ],
    portrait: { photo: robotsPhoto, phone: robotsPhotoPhone, polaroid: robotsPolaroid, focus: "50%", credit: ROBOTS_CREDIT },
  },
  xenon: {
    opened: "1978",
    closed: "1984",
    address: "124 West 43rd Street",
    story:
      "Howard Stein and Peppo Vanini opened it in the old Henry Miller's Theatre - xenon is element 54, a wink at Studio 54. The fashion crowd's disco: silver walls, rays of light from a giant X over the dance floor, dancers in swimsuits. Nikki Haskell threw her Christmas party there, it let FIT students in free on Thursdays so the room was full of good-looking people, and Nora Burns's 1980 diary goes there night after night - New York New York, Xenon, then on to Magique.",
    timeline: [
      ["Jun 1978", "Howard Stein and Peppo Vanini open Xenon in the former Henry Miller's Theatre"],
      ["Oct 1978", "Everybody Hates Punk night - costume a must"],
      ["1980", "Nora Burns's diary: the Kennedy party, five dollars and a limo to Magique"],
      ["Early 80s", "Free for FIT students on Thursdays; Nikki Haskell's Christmas party"],
      ["1984", "Xenon closes; the building is now the Stephen Sondheim Theatre"],
    ],
    stage: ["Nikki Haskell", "Christina Visca", "Nora Burns", "Andy Warhol", "Halston", "Brooke Shields", "Fiorucci"],
    rooms: ["Studio 54", "Régine's", "Copacabana", "Danceteria", "Roxy"],
    said: [
      { episode: "s06e02", who: "Christina Visca", time: "00:10:33", quote: "Xenon was very smart. On Thursday nights, they would let FIT students in for free, which was a genius idea. We were fashioned out, we got in for free, so when the regular patrons came in, it was filled with good-looking people." },
      { episode: "s02e04", who: "Nikki Haskell", time: "00:48:10", quote: "And I gave a very famous party - I don't know if you might have been on one of the tapes - the Xenon Christmas party." },
      { episode: "s02e04", who: "Nikki Haskell", time: "00:47:38", quote: "We gave a party at Xenon. It was the first time anybody had ever given a party because of all the newspapers and everything." },
      { episode: "s06e05", who: "Nora Burns", time: "00:06:14", quote: "I took $5 and went to Xenon, and then got into a limo with some actors and we went to Magique... Wednesday night with Bonds, Xenon, Magique, Xenon and Bonds again." },
      { episode: "s06e05", who: "Nora Burns", time: "00:16:33", quote: "Our evening would start at New York, New York... And then we'd move on to Xenon." },
      { episode: "s01e07", who: "Rudolf Piper", time: "00:22:38", quote: "Howard Stein is a guy from Xenon." },
    ],
    portrait: { photo: xenonPhoto, phone: xenonPhotoPhone, polaroid: xenonPolaroid, focus: "50%", credit: XENON_CREDIT },
  },
  // Batch 6 (Lisa, 19 Nov 2026: "yes"). Facts: Wikipedia "Hurrah (nightclub)" and "Peppermint Lounge"; the Building from
  // Standard Hotels, W Magazine and Vice (opened 1989 in a former Con Ed substation); the Gilded Grape, Quick and Club 82 from
  // the guests' own stories (checked 19 Nov 2026). Pictures: sources sheet, Round 12.
  "gilded-grape": {
    opened: "Early 70s",
    closed: "1977",
    address: "Eighth Avenue at 45th Street",
    story:
      "A Midtown bar for trans women and drag queens on Eighth Avenue, under the Camelot apartment building, run - like the Peppermint Lounge - by the Midtown mob. Brian Belovitch practically lived there: girls worked the street outside, there was a free buffet if you bought a drink, drag shows and lip-syncs on the stage, pageants, fights over stolen husbands, and trans apartment buildings upstairs and around the corner. The name later moved up the street to the old Peppermint Lounge, which became G.G. Barnum's Room.",
    timeline: [
      ["Early 70s", "The Gilded Grape opens on Eighth Avenue at 45th Street, under the Camelot building"],
      ["1976", "Brian Belovitch, newly arrived, makes it home; Joey Arias tours it with every other club in town"],
      ["1977", "The Gilded Grape closes on Eighth Avenue"],
      ["Jul 1978", "Its owners reopen the old Peppermint Lounge as G.G. Barnum's Room, with trapeze artists over the dance floor"],
    ],
    stage: ["Brian Belovitch", "Joey Arias", "Tish & Snooky", "Richard Boch"],
    rooms: ["Peppermint Lounge", "Club 82", "Studio 54", "Max's Kansas City"],
    said: [
      { episode: "s02e10", who: "Brian Belovitch", time: "00:20:00", quote: "I lived at the Gilded Grape. I mean, in fact, they had a buffet - they knew the girls were gonna come and work. So they had a free buffet. You could go in and have a meal if you bought a drink." },
      { episode: "s02e10", who: "Brian Belovitch", time: "00:22:28", quote: "There was always a younger, newer, prettier girl coming up... And then there was a DJ, there were drag shows, trans women doing lip-syncs. The script just writes itself." },
      { episode: "s02e11", who: "Richard Boch", time: "00:57:31", quote: "The Peppermint Lounge at that point was basically a money laundering place for the Midtown mob... That's what it was when it was the G.G. Barnum's Room prior to that. The Gilded Grape, all of those places." },
    ],
    portrait: { photo: grapePhoto, phone: grapePhotoPhone, polaroid: grapePolaroid, focus: "50%", credit: GILDED_GRAPE_CREDIT },
  },
  quick: {
    opened: "c. 1990",
    closed: "c. 1991",
    address: "157 Hudson Street",
    story:
      "Rudolf Piper's club after Mars, in the old Area building on Hudson and Hubert Street. He picked the name because of how fast things moved - a quick moment, a quickie - and it lived up to it: it didn't succeed, and it pushed Rudolf to move on to other crowds and cities. Moby played there; Lincoln Palsgrove IV remembers it as one more short life for the Area room, which went on to other names.",
    timeline: [
      ["1987", "Area closes at 157 Hudson Street"],
      ["c. 1990", "After Mars, Rudolf Piper opens Quick in the old Area space"],
      ["c. 1990", "Moby plays there among his other clubs"],
      ["c. 1990", "Quick closes; Rudolf moves on to Tatu, Aspen and LA"],
    ],
    stage: ["Rudolf Piper", "Moby", "Lincoln Palsgrove IV", "RuPaul"],
    rooms: ["Area", "Mars", "Danceteria", "Palladium"],
    said: [
      { episode: "s01e07", who: "Rudolf Piper", time: "00:46:25", quote: "Quick was quick, right? It was just after Mars. That club did not succeed. And that was one of the things that made me basically change crowds." },
      { episode: "s01e07", who: "Rudolf Piper", time: "00:47:33", quote: "I'm sort of a name fetishist... At the time I thought this was an interesting name, considering how fast things move. A quick moment, a quickie. The club was not successful." },
      { episode: "s01e09", who: "Moby", time: "00:28:07", quote: "I always forget what to call it because it's been so many different things: Shelter, Area, B Squared, Quick. It was Quick for a while - that was Rudolf's place, basically, the club on Hubert Street." },
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:54:57", quote: "I think Quick was quick as well, because that had been the former Area." },
    ],
    portrait: { photo: quickPhoto, phone: quickPhotoPhone, polaroid: quickPolaroid, focus: "50%", credit: QUICK_CREDIT },
  },
  building: {
    opened: "1989",
    closed: "1991",
    address: "a former Con Ed substation",
    story:
      "A big club in an old Con Ed electrical substation: raw industrial space, and a glass cube above the dance floor as the VIP room, where you could look out over the crowd. It mixed hip-hop - Q-Tip, Fab 5 Freddy, Naomi Campbell came through - with the Club Kids: Keoki's Groove Thing, Kenny Kenny and Lincoln Palsgrove IV on the door, Amanda Lepore go-go dancing on the stairs. Jenny Talia was turned away at the door, came back redone, and found her tribe inside.",
    timeline: [
      ["1989", "The Building opens in a former Con Ed substation"],
      ["1989", "Keoki's Groove Thing; Waltpaper's first club job"],
      ["1989", "Jenny Talia is turned away by Kenny Kenny, comes back, and finds her tribe in the glass cube"],
      ["1991", "The Building closes after about two years"],
    ],
    stage: ["DJ Keoki", "Kenny Kenny", "Lincoln Palsgrove IV", "Jenny Talia", "Amanda Lepore", "Waltpaper", "Club Kids", "Miss Guy", "Really Denise"],
    rooms: ["The World", "Red Zone", "Roxy", "Pyramid Club", "Limelight", "The Tunnel"],
    said: [
      { episode: "s02e07", who: "Jenny Talia", time: "00:05:12", quote: "Carlin and I went to the Building and we were rejected by Kenny Kenny. And then we went to Pat Field's, redid ourselves." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:09:00", quote: "It was such an incredible space, that kind of raw industrial. And that glass cube that was basically the VIP area - you could look out amongst the crowd and then just be in this kind of womb." },
      { episode: "s05e03", who: "Amanda Lepore", time: "00:02:15", quote: "Back then I wore very spiky heels all the time, and they were pretty high, and I wouldn't hold on to the railing... and my heel got caught - the Building had metal stairs with holes in it." },
      { episode: "s05e03", who: "Amanda Lepore", time: "00:47:44", quote: "I was really shy. And actually, at the Building, when I go-go danced there, they had Topless Night." },
      { episode: "s01e06", who: "Waltpaper", time: "00:26:39", quote: "There were divisions even within the club kids - there were Keoki people and there were Michael people... My first job was at the Building, for Keoki's Groove Thing." },
    ],
    portrait: { photo: buildingPhoto, phone: buildingPhotoPhone, polaroid: buildingPolaroid, focus: "50%", credit: BUILDING_CREDIT },
  },
  hurrah: {
    opened: "1976",
    closed: "1981",
    address: "36 West 62nd Street",
    story:
      "The first rock disco in New York, uptown by Lincoln Center, opened by Arthur Weinstein months before Studio 54: punk, new wave and no wave on the dance floor, the first music videos on monitors around the room a year before MTV, and Ruth Polsky booking the British bands' first American shows. Haoui Montaug worked the door, Divine played The Neon Woman there, Michael Musto's band made its debut - and for Nikki Haskell it was a little too downtown.",
    timeline: [
      ["Nov 1976", "Arthur Weinstein and partners open Hurrah at 36 West 62nd Street"],
      ["Apr 1978", "Divine opens in Tom Eyen's The Neon Woman at Hurrah"],
      ["Dec 1978", "Sid Vicious fights Todd Smith there and lands on Rikers Island"],
      ["1980", "David Bowie films his Fashion video at Hurrah"],
      ["Early 1981", "Hurrah closes"],
    ],
    stage: ["Arthur Weinstein", "Jim Fouratt", "Ruth Polsky", "Haoui Montaug", "Anita Sarko", "Divine", "David Bowie", "Michael Musto", "Nikki Haskell", "William Norwich", "Chi Chi Valenti & Johnny Dynell", "Lauren Ezersky"],
    rooms: ["Studio 54", "Danceteria", "Mudd Club", "Peppermint Lounge", "The World"],
    said: [
      { episode: "s01e02", who: "Michael Musto", time: "00:09:56", quote: "We debuted at Hurrah, this uptown nightclub, and we were doing great." },
      { episode: "s06e08", who: "William Norwich", time: "00:04:07", quote: "And it goes on: Hurrah, seeing Divine and a pig in the crib... and the Egg Lady." },
      { episode: "s02e04", who: "Nikki Haskell", time: "00:49:08", quote: "Hurrah, it was a little bit too downtown for me." },
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:04:11", quote: "I was on a different axis, of like G.G. Barnum's and Hurrah and Flamingo - that trajectory of nightlife at the time." },
      { episode: "s04e06", who: "Lauren Ezersky", time: "00:20:37", quote: "There was Area, which I loved... I pretty much went everywhere. Hurrah - there were just a lot of fun places to go." },
    ],
    portrait: { photo: hurrahPhoto, phone: hurrahPhotoPhone, polaroid: hurrahPolaroid, focus: "50%", credit: HURRAH_CREDIT },
  },
  "club-82": {
    opened: "1950s",
    closed: "1970s",
    address: "82 East 4th Street",
    aka: "the 82 Club",
    story:
      "A basement nightclub on East 4th Street that was New York's great drag cabaret: female impersonators and early trans women on stage and behind the bar, the Jewel Box Revue, and an uptown audience in furs. Cherry Vanilla went for her seventeenth birthday and thought it was the coolest ever - you banged your knockers on the table instead of clapping. In the 70s Jayne County brought Tish & Snooky there in somebody's van, and later the room went downstairs and darker.",
    timeline: [
      ["1950s", "The 82 Club opens in a basement at 82 East 4th Street"],
      ["1950s-60s", "Female impersonators, the Jewel Box Revue, an uptown crowd at little tables"],
      ["Early 60s", "Cherry Vanilla celebrates her 17th birthday there"],
      ["70s", "Jayne County takes Tish & Snooky there; the room turns into a rock club"],
    ],
    stage: ["Cherry Vanilla", "Jayne County", "Tish & Snooky", "Brian Belovitch", "Man Parrish"],
    rooms: ["The Gilded Grape", "Max's Kansas City", "CBGB", "Le Club"],
    said: [
      { episode: "s03e05", who: "Cherry Vanilla", time: "00:13:50", quote: "I went to the 82 Club for my, I think it was my 17th birthday... And the 82 Club then was staffed by transsexuals, I think a lot of early transsexuals, not just drag queens." },
      { episode: "s03e05", who: "Cherry Vanilla", time: "00:14:36", quote: "Instead of applauding, you banged your knockers on the table... The 82 Club was like, wow, this is the coolest ever." },
      { episode: "s05e10", who: "Tish & Snooky", time: "00:35:17", quote: "Jayne County brought us all there in somebody's van and turned us on to the 82 Club." },
      { episode: "s02e10", who: "Brian Belovitch", time: "00:27:58", quote: "She also was a male impersonator and worked at the Club 82, at the Jewel Box Revue on East 4th Street." },
      { episode: "s03e04", who: "Man Parrish", time: "00:41:01", quote: "It used to be Club 82... it was the 82 Club, and it went downstairs." },
    ],
    portrait: { photo: c82Photo, phone: c82PhotoPhone, polaroid: c82Polaroid, focus: "50%", credit: CLUB_82_CREDIT },
  },
};

// Same guard as In memoriam (Lisa, 5 Nov 2026): never more than 2 quotes from the same person on one page.
for (const [slug, c] of Object.entries(CLUB_PROFILES)) {
  const n: Record<string, number> = {};
  for (const s of c.said) if ((n[s.who] = (n[s.who] ?? 0) + 1) > 2) throw new Error(`club-profiles: more than 2 quotes from ${s.who} on ${slug}`);
}
