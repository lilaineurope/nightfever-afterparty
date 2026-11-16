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
import muddPhoto from "@/assets/clubs/mudd-club-photo.webp";
import muddPolaroid from "@/assets/clubs/mudd-club-polaroid.webp";
import areaPhoto from "@/assets/clubs/area-photo.webp";
import areaPolaroid from "@/assets/clubs/area-polaroid.webp";
import studio54Photo from "@/assets/clubs/studio-54-photo.webp";
import studio54Polaroid from "@/assets/clubs/studio-54-polaroid.webp";
import limelightPhoto from "@/assets/clubs/limelight-photo.webp";
import limelightPolaroid from "@/assets/clubs/limelight-polaroid.webp";
import dancePhoto from "@/assets/clubs/danceteria-photo.webp";
import dancePolaroid from "@/assets/clubs/danceteria-polaroid.webp";
import tunnelPhoto from "@/assets/clubs/tunnel-photo.webp";
import tunnelPolaroid from "@/assets/clubs/tunnel-polaroid.webp";
import pyramidPhoto from "@/assets/clubs/pyramid-club-photo.webp";
import pyramidPolaroid from "@/assets/clubs/pyramid-club-polaroid.webp";
import palladiumPhoto from "@/assets/clubs/palladium-photo.webp";
import palladiumPolaroid from "@/assets/clubs/palladium-polaroid.webp";
import boyBarPhoto from "@/assets/clubs/boy-bar-photo.webp";
import boyBarPolaroid from "@/assets/clubs/boy-bar-polaroid.webp";
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
    portrait: { photo: soundFactoryPhoto, polaroid: soundFactoryPolaroid, focus: "40%", credit: SOUND_FACTORY_CREDIT },
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
    portrait: { photo: muddPhoto, polaroid: muddPolaroid, focus: "60%", credit: MUDD_CREDIT },
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
    portrait: { photo: areaPhoto, polaroid: areaPolaroid, focus: "50%", credit: AREA_CREDIT },
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
    ],
    portrait: { photo: studio54Photo, polaroid: studio54Polaroid, focus: "45%", credit: STUDIO_54_CREDIT },
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
    ],
    portrait: { photo: limelightPhoto, polaroid: limelightPolaroid, focus: "35%", credit: LIMELIGHT_CREDIT },
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
    ],
    portrait: { photo: dancePhoto, polaroid: dancePolaroid, focus: "50%", credit: DANCETERIA_CREDIT },
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
    ],
    portrait: { photo: tunnelPhoto, polaroid: tunnelPolaroid, focus: "45%", credit: TUNNEL_CREDIT },
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
    portrait: { photo: pyramidPhoto, polaroid: pyramidPolaroid, focus: "45%", credit: PYRAMID_CREDIT },
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
    ],
    portrait: { photo: palladiumPhoto, polaroid: palladiumPolaroid, focus: "40%", credit: PALLADIUM_CREDIT },
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
    portrait: { photo: boyBarPhoto, polaroid: boyBarPolaroid, focus: "50%", credit: BOY_BAR_CREDIT },
  },
};

// Same guard as In memoriam (Lisa, 5 Nov 2026): never more than 2 quotes from the same person on one page.
for (const [slug, c] of Object.entries(CLUB_PROFILES)) {
  const n: Record<string, number> = {};
  for (const s of c.said) if ((n[s.who] = (n[s.who] ?? 0) + 1) > 2) throw new Error(`club-profiles: more than 2 quotes from ${s.who} on ${slug}`);
}
