// Person pages (Lisa, 20 Nov 2026: "setup the page with quotes as well", Kim Hastreiter first): living people the guests talk
// about get a fuller A–Z page, built like the In memoriam pages - a short story, a wall of what the guests said about them
// (each quote with its play-from timestamp), their story, who they lifted up and their rooms. Sits above the usual card sections.
// Quotes are cleaned-up lines from the episode transcripts: max two per guest, show Lisa new quotes before they go live.
// Facts: Wikipedia (read 20 Nov 2026) and the episodes.
import type { MemoriamQuote } from "@/data/memoriam";

export type PersonProfile = {
  /** "Kim's story" - used when the first name isn't what people call them. */
  first?: string;
  /** One or two sentences, also the page description. */
  story: string;
  /** [year, line] - or [year, line, url] when Lisa asks for that line to open where it can be watched (Cornelia Guest's
   *  Nikki Haskell Show episode on Prime Video, Lisa 24 Nov 2026). Not a "Read more": the line itself is the link. */
  timeline: ([string, string] | [string, string, string])[];
  liftedUp: string[]; // people they gave a start
  rooms: string[]; // magazines, clubs, nights, places
  said: MemoriamQuote[];
  /** More links under the rooms (Lisa, 27 Nov 2026, top Google search pages): a heading and A–Z names. */
  also?: { heading: string; names: string[] };
  /** "On film" (Lisa, 27 Nov 2026, Clara: "make a playlist on youtube and put a video box on the page"): videos about them,
   *  played in the page's video jukebox; `playlist` is our AFTERPARTY YouTube playlist of the same videos, once it exists. */
  videos?: { id: string; title: string }[];
  playlist?: string;
  /** Lisa's rule is two quotes per guest; a page can go higher when she says so (Kim: Mickey x3, Lisa 21 Nov 2026). */
  maxPerGuest?: number;
};

export const PERSON_PROFILES: Record<string, PersonProfile> = {
  // Top Google search pages, round 3 (Lisa, 28 Nov 2026: "do all 1-5"). Facts: the episodes and Open Library (her books).
  // Left out under the living-people rule: the topless invitation story (S05E07b 00:45:12).
  "jenny-go-getter": {
    first: "Jenny",
    story:
      "One of the first Tunnel kids in the basement, and Really Denise's party partner: the two of them were on a million invitations together. Today she writes novels as Jennifer Banash, among them White Lines, about a teenager's nights in the clubs of 1980s New York.",
    timeline: [
      ["Late 1980s", "One of the Tunnel kids in the basement, with Really Denise, Michael Tron, Magenta and Oliver Twisted"],
      ["Late 1980s", "Throws parties at the Tunnel with Really Denise, among them a petting zoo in the basement, with bales of hay and Zaldy dancing in a cage as a zebra"],
      ["2006", "First novel as Jennifer Banash: Hollywoodland, an American fairy tale"],
      ["2008", "The Elite, the first of three books in a series for teenagers from Berkley JAM"],
      ["2013", "White Lines: seventeen-year-old Caitlin's nights in the clubs of 1980s New York"],
      ["2015", "Silent Alarm"],
      ["2023", "The Rise and Fall of Ava Arcana"],
      ["2024", "The Essential Elizabeth Stone"],
      ["Today", "Also a ghostwriter and editor; offers to edit Really Denise's book for free"],
    ],
    liftedUp: [],
    rooms: ["The Tunnel"],
    said: [
      { episode: "s06e06", who: "James St. James", time: "00:11:35", context: "The Tunnel kids in the basement, before the club kids", quote: "Back before it was the club kids, when it was the Tunnel kids, and they were all in the basement, and it was a group of young kids... Really Denise, Jenny Go-Getter, Oliver Twisted, Harley Quinn, Fuchsia Dahl, a number of those kids." },
      { episode: "s05e07b", who: "James St. James", time: "00:44:03", context: "James asks Really Denise about the parties she threw with Jenny", quote: "You were on a million invitations, you and Jenny Go-Getter, where it was always Really Denise and Jenny Go-Getter, and you were always sort of paired together." },
      { episode: "s05e07b", who: "Really Denise", time: "00:44:23", context: "Their favourite party: the petting zoo in the Tunnel basement", quote: "The favorite party I ever did with Jenny was the petting zoo. So we decided we were going to do a petting zoo party in the basement. I found this flower shop in the flower district that had hay, and I had them deliver bales of hay into the basement of the Tunnel." },
      { episode: "s05e07b", who: "Really Denise", time: "00:53:57", context: "Jenny today: Jennifer Banash, novelist, ghostwriter and editor", quote: "You mentioned Jenny Go-Getter earlier. I'm still friendly with her... Jenny got in touch with me and said, Denise, I'll edit your book for free. She's written four YA novels, which is young adult novels. Her day job is as a ghostwriter and an editor." },
    ],
    also: { heading: "The Tunnel kids", names: ["Really Denise", "Michael Tron", "Magenta", "Julie Jewels", "Oliver Twisted", "Harley Quinn (Tunnel kid)", "Fuchsia Dahl", "Zaldy", "Stephan Lupino"] },
    // Already in the S05E07b AFTERPARTY playlist.
    videos: [{ id: "j164z_j1U-U", title: "Jennifer Banash on the feminist stories in her books and her life (You, Me, and The Girls Podcast)" }],
  },

  // Lisa, 28 Nov 2026 on the House of Xtravaganza page: "love ball and voguing needs a picture and a page", and "Haoui Montaug
  // no entiendes needs picture and it's own page". Facts: Wikipedia (Susanne Bartsch, Vogue (dance), Haoui Montaug), FIT's
  // Fashion Underground, the CFDA, Gallery 98's cards and the episodes. Pictures are real: no Gemini.
  "love-ball": {
    first: "the Love Ball",
    story:
      "Susanne Bartsch's AIDS benefit at the Roseland Ballroom on 10 May 1989, with DIFFA: the Harlem ball houses walked their categories for the fashion world, and designers and stars judged. Willi Ninja and the House of Xtravaganza opened it, it raised about $400,000, and the legend goes that it was where Madonna first saw voguing.",
    timeline: [
      ["10 May 1989", "The first Love Ball at Roseland, with DIFFA: Willi Ninja and the Xtravaganzas open the night"],
      ["10 May 1989", "Marc Jacobs, André Leon Talley and Leigh Bowery among the judges; Michelle Visage walks with the House of Magnifique"],
      ["10 May 1989", "Zaldy and Mathu's House of Donna Karan wins with nude bodysuits that turn humans into aliens"],
      ["1989", "The night raises about $400,000 for DIFFA"],
      ["1991", "Love Ball II at Roseland"],
      ["2019", "Love Ball III, with the CFDA"],
    ],
    liftedUp: [],
    rooms: ["Roseland Ballroom", "DIFFA", "House of Xtravaganza", "House of Magnifique", "Voguing"],
    said: [
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:43:08", context: "Susanne on opening the first Love Ball with the ball houses", quote: "It's important to have the house ball community be part of it. And I mean, I never forget, I opened with Willi Ninja and the Xtravaganzas were opening a ball and people were crazy. They'd never seen anything like it. Because a lot of people didn't know about the house ball community." },
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:46:40", context: "Susanne on the night itself", quote: "Well, everything was... Mario Testino came in drag. Mario Testino was in drag with five supermodels just strutting around." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:32:00", context: "Michelle walked the first Love Ball with the House of Magnifique", quote: "And yeah, vogued with the Magnifiques and had my knee pads on, had my blonde ponytail on... We dressed ourselves because we weren't high profile like the other houses were." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:32:21", context: "The judges of the first Love Ball", quote: "Things were starting to blow up because of voguing starting to blow up. So the judges were like Marc Jacobs and people like that that were judging this Love Ball. And I remember André Leon Talley and Leigh Bowery." },
      { episode: "s04e04", who: "Zaldy", time: "00:31:42", context: "The House of Donna Karan's bodysuits at the first Love Ball", quote: "(James: The first Love Ball, where you did that outfit... the House of Donna Karan... those nude illusion bodysuits with the blobs.) It was early 3D printing, where I actually molded all those things on fake bodies of ours, casted them, had them car-painted. It was like armor... let's transform from human to alien." },
      { episode: "s02e01", who: "James St. James", time: "00:33:03", context: "The legend of Madonna and the Love Ball", quote: "It was at the first Love Ball that Madonna was first exposed to vogue culture, is what the legend goes." },
    ],
    also: { heading: "On the night", names: ["Susanne Bartsch", "Willi Ninja", "Marc Jacobs", "André Leon Talley", "Leigh Bowery", "Mario Testino", "Zaldy", "Michelle Visage", "Laurie Pike", "Madonna"] },
    videos: [
      { id: "L9QEi3HoEuQ", title: "The celebrities assemble for Susanne Bartsch's Love Ball, 1989 (Nelson Sullivan)" },
      { id: "6106tuI6tnY", title: "The Love Ball at Roseland (Nelson Sullivan)" },
      { id: "KR1ZZFEEg9w", title: "1989 Legends of Vogue at Susanne Bartsch's Love Ball (The Ballroom History Nerd)" },
      { id: "odnaKLU8Kag", title: "Susanne Bartsch's Love Ball, 10 May 1989: the complete tape (Nelson Sullivan)" },
    ],
  },

  voguing: {
    first: "Voguing",
    story:
      "The dance of the Harlem ballroom houses: poses like a model on the cover of Vogue that, Luis Xtravaganza says, connected faster and faster until they became a dance. In the late 1980s it came downtown, to Red Zone, Mars and the Love Ball, and in 1990 the world saw it in Paris Is Burning and in Madonna's Vogue, with Jose and Luis Xtravaganza dancing.",
    timeline: [
      ["Early 70s", "Patricia Field goes to her first ball, in a Harlem brownstone"],
      ["1980s", "Poses hit like a magazine cover start to connect, faster and faster, into a dance"],
      ["1988", "Pat Field's House of Field ball: the fashion world meets the voguers downtown; Chi Chi Valenti writes Nations for Details"],
      ["1989", "The first Love Ball; at Mars the houses take over the first floor"],
      ["1989", "The first vogue records: Johnny Dynell's Elements of Vogue and Malcolm McLaren's Deep in Vogue"],
      ["1990", "Paris Is Burning, and Madonna's Vogue with Jose and Luis Xtravaganza"],
    ],
    liftedUp: [],
    rooms: ["House of Xtravaganza", "House of Magnifique", "House of Field", "Love Ball", "Red Zone", "Mars", "Paris Is Burning"],
    said: [
      { episode: "s01e08", who: "Luis Xtravaganza Camacho", time: "00:22:55", context: "Luis on how voguing grew out of poses", quote: "Vogue came a little bit later, and who could be the best Vogue model? And then butch queens started coming in and started voguing, but it was more like poses, hit a pose like in a magazine. And then the poses started to connect. Faster and faster and faster. And by the time me and Jose hit it, it was a dance. But in the beginning, Vogue was just poses." },
      { episode: "s01e08", who: "Luis Xtravaganza Camacho", time: "00:23:55", context: "From the cover of Vogue magazine to the dance", quote: "It's just like, who can be a fashion model on the cover of Vogue magazine? And then it just turned into Vogue. And so the girls would come out in these wonderful high-fashion outfits and just stand there and pose... And then, literally, as the years have gone by, the poses started to connect faster and faster and faster. And today it's so fast." },
      { episode: "s03e01", who: "Patricia Field", time: "00:21:24", context: "Pat's first ball, in a Harlem brownstone in the early 70s", quote: "And he got into voguing and he was the one who opened up my eyes to the existence of voguing... he invited me to come and I went. And that was my first experience in voguing and the vogue balls and all of that, early seventies." },
      { episode: "s03e01", who: "Patricia Field", time: "00:35:55", context: "Pat's own downtown ball, where fashion met the voguers", quote: "I was so inspired by the voguing balls. So it led me into making a House of Field, which was kind of a fashion house. (James: And the fashion community was meeting the voguing community for the first time.)" },
      { episode: "s02e01", who: "Michelle Visage", time: "00:18:45", context: "Michelle on her first time on the floor", quote: "I never intended to compete. I became a little bit of a local legend with voguing within the circle. And Caesar, my house father, is the one who... it was Fem Queen Vogue, and he just took my back and pulled me in. And my imposter syndrome just had no choice to leave, because once you're on the floor, you can't turn around." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:40:29", context: "The first vogue records, before Madonna", quote: "Then I did the record Elements of Vogue... So Malcolm's Deep in Vogue and my Elements of Vogue were the first vogue records... a year before the other one. Mine was '89." },
    ],
    also: { heading: "On the floor", names: ["Willi Ninja", "Luis Xtravaganza Camacho", "Jose Xtravaganza", "Michelle Visage", "Patricia Field", "Johnny Dynell", "Malcolm McLaren", "Madonna"] },
    videos: [
      { id: "XJ6fqQX_e9U", title: "How the LGBTQ community created voguing (Vox)" },
      { id: "RLzP6121dlo", title: "Willi Ninja" },
      { id: "Pwu-YJqDd0s", title: "Vogue history, old way (Wolfgang Busch, Art From The Heart Films)" },
      { id: "9s31QN7nq14", title: "Willi Ninja voguing in Diane Martel's 1990 short documentary House of Tres" },
    ],
  },

  "no-entiendes": {
    first: "No Entiendes",
    story:
      "Haoui Montaug's travelling cabaret and talent night, on Wednesdays at Danceteria from 1982 and later with DJ Anita Sarko as co-host. A young Madonna sang Everybody there in 1982, and the early Beastie Boys played it. It moved with Haoui, to the Palladium and to The World for its sixth anniversary.",
    timeline: [
      ["1982", "Wednesday nights at Danceteria; a young Madonna sings Everybody on its stage"],
      ["1983", "The Endless Cocktail Party card, drawn by Serge Clerc"],
      ["1984", "The second anniversary at Danceteria; Anita Sarko co-hosts"],
      ["1985", "Haoui stages Jesus Christ Superstar, the Lip Sync Opera, at Danceteria, with Dean Johnson, Joey Arias, Anita Sarko and Michael Musto"],
      ["Late 80s", "No Entiendes at the Palladium, on Nelson Sullivan's tape"],
      ["1988", "The sixth anniversary, at The World"],
    ],
    liftedUp: ["Madonna"],
    rooms: ["Danceteria", "Palladium", "The World"],
    said: [],
    also: { heading: "On its stage", names: ["Haoui Montaug", "Anita Sarko", "Madonna", "Beastie Boys", "Dean Johnson", "Joey Arias", "Michael Musto"] },
    videos: [
      { id: "iWa-hE8KeQk", title: "Haoui Montaug and Anita Sarko's No Entiendes at the Palladium (Nelson Sullivan)" },
      { id: "ZtY2rV6yWZc", title: "Madonna sings Everybody at Haoui Montaug's No Entiendes, 1982" },
      { id: "yNcEggr_xwc", title: "No Entiendes, 14 Jan 1987, with Haoui Montaug and Anita Sarko" },
      { id: "UAubqBL1i18", title: "Haoui Montaug on Anita Sarko" },
    ],
  },

  // The Tunnel kids (Lisa, 28 Nov 2026 on Jenny Go-Getter's page: "the tunnel kids names should all get a picture box like
  // really denise and zaldy and a proper page"). Quotes from the transcripts; facts from the episodes. No photo has been found
  // of Magenta, Oliver Twisted, Harley Quinn or Fuchsia Dahl, so they have no polaroid (we never invent a face).
  "julie-jewels": {
    first: "Julie",
    story:
      "One of the original club kids and a Tunnel kid in the basement. In the summer of 1987 she went up to a ball at the Elks Lodge in Harlem, won Face, and walked into the Tunnel at four in the morning with the trophy, and the club kids followed her uptown. Years later Jackie 60's great award line was still Bring us the head of Julie Jewels.",
    timeline: [
      ["Late 1980s", "One of the Tunnel kids in the basement, and one of the first club kids"],
      ["Summer 1987", "Wins Face at a ball at the Elks Lodge in Harlem and brings the trophy down to the Tunnel at 4 am; the club kids follow her uptown as the House of Pancakes"],
      ["Late 1980s", "On the ball scene, people play her off against Michelle Visage: the same pale skin and blonde ponytail"],
      ["Late 1980s", "Stars with Michael Tron in Nelson Sullivan's tape The Club Kids Go To Boston"],
      ["1992", "Jackie 60's great award line: Bring us the head of Julie Jewels"],
    ],
    liftedUp: [],
    rooms: ["The Tunnel", "Elks Lodge", "House of Pancakes", "Jackie 60"],
    said: [
      { episode: "s01e08", who: "James St. James", time: "00:12:41", context: "Summer 1987: Julie wins Face uptown and takes the club kids to the balls", quote: "I remember in 1987, it was the summer of '87, and Julie Jewels had gone up to the Elks Lodge and she won Face and came down with the trophy at like four in the morning to the Tunnel and said, you guys, there's this thing happening up in Harlem. It is amazing... And then we all went on an expedition... all the club kids went together and we called ourselves the House of Pancakes. And we were not welcome." },
      { episode: "s01e08", who: "Luis Xtravaganza Camacho", time: "00:16:30", context: "Luis on Julie at the balls: an outsider, but nobody could deny her face", quote: "You can't deny Julie Jewels' beauty back then. I mean, she was otherworldly, right? ... Whether she was white, black, Latino, you couldn't deny that she had face. So at the very core of that idea, yes, she's not one of us, but that bitch got face... then she gets the trophy." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:16:44", context: "Michelle on being played against Julie on the ball scene", quote: "We both had our blonde ponytails, and nobody did it first, but there was a little bit of competition between me and Julie. But I was a voguer. Julie wasn't, but they wanted to put us against each other because we had similar looks: the pale skin, the blonde ponytail." },
      { episode: "s01e01", who: "Dianne Brill", time: "00:44:37", context: "Dianne on her ex dressing Julie up to look like her", quote: "There was a girl, Julie Jewels, I know she was a friend of yours, beautiful girl, right? Beautiful. And he would start dressing her up like me... I never got to know her because I didn't like that he had done that. So it wasn't her. It was him." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:47:35", context: "Johnny and Chi Chi Valenti on Jackie 60's best award line, 1992", quote: "Bring us the head of Julie Jewels. (Chi Chi: Was our great award. And that was so early on in Jackie. That was 1992. And we could never top it.)" },
    ],
    also: { heading: "The Tunnel kids", names: ["Really Denise", "Jenny Go-Getter", "Michael Tron", "Magenta", "Oliver Twisted", "Harley Quinn (Tunnel kid)", "Fuchsia Dahl", "Zaldy"] },
    videos: [
      { id: "LfMtJo4Ag5E", title: "The Club Kids Go To Boston, starring Julie Jewels and Mikel Tron (Nelson Sullivan)" },
      { id: "E0R2pZreMBA", title: "Club Kid, Julie Jewels (Retro Room)" },
    ],
  },

  "michael-tron": {
    first: "Michael",
    story:
      "A Tunnel kid from the Upper East Side, there in the basement before the club kids. Really Denise loved his crazy creativity and his pointy hair, and they are still friends. He went to high school with Lincoln Palsgrove and Jennifer Rubell, and into the Palladium with her.",
    timeline: [
      ["Mid-80s", "At high school with Lincoln Palsgrove IV and Jennifer Rubell; the three go to the Palladium together"],
      ["Late 1980s", "One of the Tunnel kids in the basement, with Really Denise, Jenny Go-Getter and Julie Jewels"],
      ["Late 1980s", "Goes to Boston with Julie Jewels in Nelson Sullivan's tape The Club Kids Go To Boston"],
      ["Today", "Still friends with Really Denise"],
    ],
    liftedUp: [],
    rooms: ["The Tunnel", "Palladium"],
    said: [
      { episode: "s05e07b", who: "Really Denise", time: "00:53:04", context: "Denise is still friends with him", quote: "Yes, love him, still friends with him. I just loved his crazy creativity and his pointy hair. And I remember his mother's apartment on the Upper East Side. I went up there, with a view over Central Park. Fabulous." },
      { episode: "s04e04", who: "Zaldy", time: "00:21:01", context: "Zaldy on the people of the Tunnel years", quote: "People like Michael Tron and James, I mean, everyone was so interesting, you know. And it was fun. It was just what we did. We saw so much of each other, and usually at nighttime, and usually just for fun and dancing and drinking and having a good time." },
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:14:20", context: "Lincoln and Michael went to high school with Jennifer Rubell", quote: "...was friends with through high school, and Michael Tron was as well, was Jennifer Rubell. So we would go together to the Palladium with Jennifer. And of course, Jennifer had carte blanche, being Steve's niece." },
    ],
    also: { heading: "The Tunnel kids", names: ["Really Denise", "Jenny Go-Getter", "Magenta", "Julie Jewels", "Oliver Twisted", "Harley Quinn (Tunnel kid)", "Fuchsia Dahl", "Zaldy"] },
    videos: [
      { id: "LfMtJo4Ag5E", title: "The Club Kids Go To Boston, starring Julie Jewels and Mikel Tron (Nelson Sullivan)" },
      { id: "dDaXu_5RmJA", title: "Club Kid, Michael Tronn (Retro Room)" },
    ],
  },

  "magenta": {
    story:
      "One of the Tunnel kids in the basement in the late 1980s, before the club kids. Really Denise lights up at the name, and James and the show tried to find her.",
    timeline: [
      ["Late 1980s", "One of the Tunnel kids in the basement of the Tunnel, with Really Denise, Jenny Go-Getter and Michael Tron, before the club kids"],
      ["Today", "No photo of Magenta from those nights has turned up yet: if you have one, the suggestion box at the foot of this page is the place"],
    ],
    liftedUp: [],
    rooms: ["The Tunnel"],
    said: [
      { episode: "s05e07b", who: "James St. James", time: "00:55:20", context: "James asks Really Denise about the Tunnel kids", quote: "Magenta? I think you wanted us to try and find Magenta, right? It makes me think of Magenta, Fuchsia Dahl and Harley Quinn." },
    ],
    also: { heading: "The Tunnel kids", names: ["Really Denise", "Jenny Go-Getter", "Michael Tron", "Julie Jewels", "Oliver Twisted", "Harley Quinn (Tunnel kid)", "Fuchsia Dahl", "Zaldy"] },
  },
  "oliver-twisted": {
    story:
      "One of the Tunnel kids in the basement in the late 1980s, before the club kids: James St. James names him with Really Denise, Jenny Go-Getter, Harley Quinn and Fuchsia Dahl.",
    timeline: [
      ["Late 1980s", "One of the Tunnel kids in the basement of the Tunnel, with Really Denise, Jenny Go-Getter and Michael Tron, before the club kids"],
      ["Today", "No photo of Oliver from those nights has turned up yet: if you have one, the suggestion box at the foot of this page is the place"],
    ],
    liftedUp: [],
    rooms: ["The Tunnel"],
    said: [
      { episode: "s06e06", who: "James St. James", time: "00:11:35", context: "The Tunnel kids in the basement, before the club kids", quote: "Back before it was the club kids, when it was the Tunnel kids, and they were all in the basement, and it was a group of young kids... Really Denise, Jenny Go-Getter, Oliver Twisted, Harley Quinn, Fuchsia Dahl, a number of those kids." },
    ],
    also: { heading: "The Tunnel kids", names: ["Really Denise", "Jenny Go-Getter", "Michael Tron", "Magenta", "Julie Jewels", "Harley Quinn (Tunnel kid)", "Fuchsia Dahl", "Zaldy"] },
  },
  "harley-quinn": {
    story:
      "One of the Tunnel kids in the basement in the late 1980s, before the club kids, and no relation to the comic-book Harley Quinn: James St. James names her with Really Denise, Jenny Go-Getter, Oliver Twisted and Fuchsia Dahl.",
    timeline: [
      ["Late 1980s", "One of the Tunnel kids in the basement of the Tunnel, with Really Denise, Jenny Go-Getter and Michael Tron, before the club kids"],
      ["Today", "No photo of Harley from those nights has turned up yet: if you have one, the suggestion box at the foot of this page is the place"],
    ],
    liftedUp: [],
    rooms: ["The Tunnel"],
    said: [
      { episode: "s06e06", who: "James St. James", time: "00:11:35", context: "The Tunnel kids in the basement, before the club kids", quote: "Back before it was the club kids, when it was the Tunnel kids, and they were all in the basement, and it was a group of young kids... Really Denise, Jenny Go-Getter, Oliver Twisted, Harley Quinn, Fuchsia Dahl, a number of those kids." },
      { episode: "s05e07b", who: "James St. James", time: "00:55:20", context: "James asks Really Denise about the Tunnel kids", quote: "Magenta? I think you wanted us to try and find Magenta, right? It makes me think of Magenta, Fuchsia Dahl and Harley Quinn." },
    ],
    also: { heading: "The Tunnel kids", names: ["Really Denise", "Jenny Go-Getter", "Michael Tron", "Magenta", "Julie Jewels", "Oliver Twisted", "Fuchsia Dahl", "Zaldy"] },
  },
  "fuchsia-dahl": {
    story:
      "One of the Tunnel kids in the basement in the late 1980s, before the club kids: James St. James names Fuchsia Dahl with Really Denise, Jenny Go-Getter, Oliver Twisted and Harley Quinn.",
    timeline: [
      ["Late 1980s", "One of the Tunnel kids in the basement of the Tunnel, with Really Denise, Jenny Go-Getter and Michael Tron, before the club kids"],
      ["Today", "No photo of Fuchsia from those nights has turned up yet: if you have one, the suggestion box at the foot of this page is the place"],
    ],
    liftedUp: [],
    rooms: ["The Tunnel"],
    said: [
      { episode: "s06e06", who: "James St. James", time: "00:11:35", context: "The Tunnel kids in the basement, before the club kids", quote: "Back before it was the club kids, when it was the Tunnel kids, and they were all in the basement, and it was a group of young kids... Really Denise, Jenny Go-Getter, Oliver Twisted, Harley Quinn, Fuchsia Dahl, a number of those kids." },
      { episode: "s05e07b", who: "James St. James", time: "00:55:20", context: "James asks Really Denise about the Tunnel kids", quote: "Magenta? I think you wanted us to try and find Magenta, right? It makes me think of Magenta, Fuchsia Dahl and Harley Quinn." },
    ],
    also: { heading: "The Tunnel kids", names: ["Really Denise", "Jenny Go-Getter", "Michael Tron", "Magenta", "Julie Jewels", "Oliver Twisted", "Harley Quinn (Tunnel kid)", "Zaldy"] },
  },

  // Facts: Galerija Fotografija (Ljubljana, "80's in NY", 2016-17), L'Oeil de la Photographie, Zoe Lund's 1988 statement on
  // his World shoot and IDEA Books' listing of his book The World (1988). Alive: no death notice; both write in the present.
  "stephan-lupino": {
    first: "Stephan",
    story:
      "The Croatian photographer of 1980s New York nights. He came to study acting, modelled, and got his first camera from Deborah Turbeville; at Area he set up a studio in the bathroom, and in 1988 he made a book of The World. He shot the petting zoo invitation for Really Denise and Jenny Go-Getter's Tunnel party. Today he paints and sculpts as much as he photographs.",
    timeline: [
      ["Early 1980s", "From Varaždin, Croatia, via Britain to New York to study acting; works as a photo model"],
      ["Early 1980s", "Deborah Turbeville lends him his first camera; self-taught from there"],
      ["1983-1987", "Area: he sets up an improvised studio in the club's bathroom, and shoots the night for Details"],
      ["Late 1980s", "Shoots Really Denise in a fur bikini for her and Jenny Go-Getter's petting zoo party at the Tunnel"],
      ["1988", "A shoot at The World, and his book The World"],
      ["1990s", "Back in Croatia, he serves as an officer in the war and is wounded"],
      ["2016", "80's in NY, his New York pictures, at Galerija Fotografija in Ljubljana"],
      ["Today", "Painter, sculptor and photographer"],
    ],
    liftedUp: [],
    rooms: ["Area", "The World", "The Tunnel"],
    said: [
      { episode: "s05e07b", who: "Really Denise", time: "00:45:12", context: "He shot Denise and Jenny Go-Getter's petting zoo invitation", quote: "I literally made a bikini out of this fur... back then I had a fur bikini and Stephan Lupino took the picture for the invite." },
      { episode: "s05e09", who: "Screamin' Rachael Cain", time: "00:23:22", context: "James mentions his photo book of The World; Rachael remembers being photographed by him", quote: "(James: Stephan Lupino has a book out about the World.) He did photograph me. I have some photos that he did. He was really very talented. He was a wonderful guy." },
    ],
    also: { heading: "In front of his camera", names: ["Really Denise", "Jenny Go-Getter", "Screamin' Rachael Cain"] },
  },

  // The Jefferson's people (Lisa, 28 Nov 2026: "make polaroid for colleen weinstein, create page"). Facts: her own account in
  // PIN-UP 27 (Whitney Mallett, 2019/20), the Daily Beast's after-hours story and the episodes. Alive: PIN-UP interviewed her
  // at home in the Chelsea Hotel, and Eric Goode says she still lives there (S03E06).
  "colleen-weinstein": {
    first: "Colleen",
    story:
      "The designer behind Arthur Weinstein's clubs: he did the lights, she made the rooms. It began in 1980 with the Jefferson, the after-hours in their own loft above an old theatre on 14th Street, and went on to the Continental, The World's Crystal Room, the Michael Todd Room at the Palladium and the Limelight's entrance of giant animal topiaries. She still lives in the Chelsea Hotel.",
    timeline: [
      ["1980", "A party Arthur throws for her in their loft above the old Jefferson Theatre turns into the Jefferson, the first club she designs"],
      ["Early 1980s", "The Continental, in an old garage on West 25th Street: big hanging sheets of plexiglass, after the film Blow-Up"],
      ["1985", "The Michael Todd Room at the Palladium, named after Michael Todd's seal, which she found in a desk drawer"],
      ["Mid-80s", "The World on East 2nd Street: the Crystal Room, with marble-effect wallpaper, a silver leather bar and the old chandelier"],
      ["1980s", "Milk Bar on Seventh Avenue, all white like A Clockwork Orange and lit like a lightbox"],
      ["c. 1988", "A new entrance for the Limelight: giant animal topiaries and walls of peacock feathers, steamed open by club kids"],
      ["2008", "Arthur Weinstein dies"],
      ["2019", "PIN-UP interviews her at home in the Chelsea Hotel"],
    ],
    liftedUp: [],
    rooms: ["The Jefferson", "The Continental", "The World", "Palladium", "Milk Bar", "Limelight", "The Ritz", "La Palace de Beauté", "Hotel Chelsea"],
    said: [
      { episode: "s03e06", who: "Eric Goode", time: "00:39:01", context: "Eric tells James who to ask for the Arthur Weinstein stories", quote: "Arthur Weinstein stories, you should definitely interview Colleen, his wife, who still lives in the Chelsea Hotel." },
    ],
    also: { heading: "With Arthur", names: ["Arthur Weinstein", "Eric Goode", "Susanne Bartsch"] },
  },

  "kim-hastreiter": {
    story:
      "Co-founded Paper with David Hershkovits in 1984, in the kitchen of her Tribeca loft, and ran it for 33 years. Downtown's den mother, who gave Mickey Boardman and Lauren Ezersky their start.",
    timeline: [
      ["1951", "Born 12 November in West Orange, New Jersey"],
      ["1974", "Meets Joey Arias in LA while studying at CalArts"],
      ["1976", "Drives cross-country to New York with Joey Arias in her truck, the 'covered wagon'"],
      ["Late 70s", "Style editor at the SoHo Weekly News, where she meets David Hershkovits"],
      ["1984", "Starts Paper with David Hershkovits; Trey Speegle is employee number one"],
      ["2014", "Paper's Kim Kardashian cover breaks the internet"],
      ["2017", "Sells Paper with David Hershkovits; starts Kim Hastreiter OG"],
    ],
    liftedUp: ["Mickey Boardman", "Lauren Ezersky", "Trey Speegle", "Drew Elliott"],
    rooms: ["Paper", "SoHo Weekly News", "CalArts"],
    said: [
      { episode: "s04e02", who: "Mickey Boardman", time: "00:44:50", quote: "I always think if Kim was the mom, I was the son, and Drew is the grandson." },
      { episode: "s01e10", who: "Joey Arias", time: "01:01:25", quote: "Kim had an intervention, about 35 people, and took me to a rehab for three months." },
      { episode: "s04e06", who: "Lauren Ezersky", time: "00:23:46", quote: "They said, go meet Kim Hastreiter, who owned Paper. She goes, go do Donna Karan. If you can do Donna Karan and I like it, I'll print it." },
      { episode: "s04e02", who: "Mickey Boardman", time: "00:23:15", quote: "I kept saying no, I'm not a writer. But finally she said, listen, you know, Kim has always said: if you can talk, you can write." },
      { episode: "s01e10", who: "Joey Arias", time: "00:09:05", quote: "My friend Bo Allen introduced me to Kim when I was in LA. He said, you're gonna meet this girl, she's going to CalArts. So I met her in '74, and we became great friends. When she was gonna graduate, I was getting ready to blow to New York, so I said, I'll drive cross-country with you. She had this big truck, and when she covered it up, it was a covered wagon. We drove to Las Vegas and went to all the casinos." },
      { episode: "s04e02", who: "Mickey Boardman", time: "00:01:51", quote: "Kim Hastreiter, the co-founder of Paper - her favorite combination was chartreuse and fuchsia. I always think of her when I see either of them, or the two of them together." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:51:31", quote: "Kim Hastreiter and David Hershkovits were the editors, and my part was the giant foldout with the ads that went all the way around. Recently there was an article in the New York Times about the oral history of Paper, and Kim posted something on Facebook. I was kind of hinting, and she was like, oh, you're one of the first people to help us. I was like, no, no, no. I was employee number one. It was the four of you and me." },
    ],
    // Lisa, 21 Nov 2026: Mickey x3 - "if you can talk, you can write" and chartreuse and fuchsia added, the rehab lunch taken out.
    maxPerGuest: 3,
  },

  // Batch 1 of the top 100 living people (Lisa, 21 Nov 2026: "top 100 most mentioned people still alive also have quotes,
  // polaroids", strictly by mentions). Facts: Wikipedia and the episodes; quotes cleaned up lightly from the transcripts.
  rupaul: {
    first: "RuPaul",
    story:
      "Came up from Atlanta with Lady Bunny, go-go danced downtown and became a star with Supermodel in 1992. With World of Wonder he made RuPaul's Drag Race.",
    timeline: [
      ["1960", "Born 17 November in San Diego"],
      ["Early 80s", "Atlanta: The American Music Show and Larry Tee's band"],
      ["Mid 80s", "Moves to New York with Lady Bunny; the Pyramid, living with Nelson Sullivan"],
      ["1992", "Supermodel (You Better Work), with Fenton Bailey and Randy Barbato managing"],
      ["1996", "The RuPaul Show on VH1, with Michelle Visage as co-host"],
      ["2009", "RuPaul's Drag Race starts, made by World of Wonder"],
    ],
    liftedUp: ["Michelle Visage", "Zaldy", "Mathu Andersen"],
    rooms: ["Pyramid Club", "Copacabana", "Red Zone", "Wigstock"],
    said: [
      { episode: "s02e01", who: "Michelle Visage", time: "00:30:06", quote: "He said, of course I remember you, because you are a motherfucking superstar. And that moment is cemented in time in my soul, because the only other person that ever told me I was a star was my mother." },
      { episode: "s01e02", who: "James St. James", time: "00:05:05", quote: "This little kid came up to us with the Mohawk and rubber waders and Mylar streamers. And he said, my name's RuPaul and I'm going to be a big star." },
      { episode: "s04e04", who: "Zaldy", time: "00:46:40", quote: "I met Ru at Palace de Beauté, and I just remember seeing Ru and being mesmerized by the hair, the makeup, everything, the height. You could feel the power of RuPaul from across [the room]." },
      { episode: "s03e08", who: "Larry Tee", time: "00:11:50", quote: "When RuPaul showed up, I just remember thinking, thank God, because there was the London music scene where it was like these beautiful big characters, and it was gay and it was fabulous." },
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:31:30", quote: "Ru talks about it on one of the episodes of his podcast, because that was one of those nights I introduced Michelle and RuPaul on the dance floor of Red Zone. And I remember Ru was like, who is that?" },
      { episode: "s06e06", who: "James St. James", time: "00:54:33", quote: "That's when I knew that Ru was not long for the club kids. He was great, and Ru was about to hit the big time. Because if he knew Suzette Charles from across the room, then there was no stopping RuPaul." },
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:30:23", quote: "I would have these incredible strippers upstairs. Downstairs I had RuPaul, go-go dance." },
    ],
  },
  madonna: {
    story:
      "Lived in the Music Building opposite Danceteria before anyone knew her name. Desperately Seeking Susan and Vogue took downtown to the whole world.",
    timeline: [
      ["1958", "Born 16 August in Bay City, Michigan"],
      ["1978", "Moves to New York to dance"],
      ["1982", "Mark Kamins plays her demo at Danceteria; first single, Everybody"],
      ["1985", "Desperately Seeking Susan, directed by Susan Seidelman"],
      ["1990", "Vogue and the Blond Ambition tour, with Luis and José Xtravaganza"],
    ],
    liftedUp: ["Luis Xtravaganza Camacho", "José Xtravaganza", "Kevin Aviance"],
    rooms: ["Danceteria", "Music Building", "Funhouse"],
    said: [
      { episode: "s04e09", who: "Susan Seidelman", time: "00:31:47", quote: "It's not easy to just be Madonna. Hit your mark, make sure your face is in the light, make sure the choreography with the camera is working. And I think the fact that she was a dancer also helped with the kind of energy of that character." },
      { episode: "s01e08", who: "Luis Xtravaganza Camacho", time: "00:28:53", quote: "Well, first of all, I thought she was Black. We were like, oh yeah, I know Madonna. Isn't that the Black girl who sings Everybody? They're like, oh no, she's not Black. I was like, oh." },
      { episode: "s01e09", who: "Moby", time: "00:52:53", quote: "It was my second ever live solo show, and we promoted it so much, and I think 30 people showed up. But two of the 30 people in the audience were OJ Simpson and Madonna." },
      { episode: "s03e04", who: "Man Parrish", time: "00:58:49", quote: "My father called me and said, the National Enquirer and Entertainment Tonight called me, they want to know about you, and who's Madonna? And I said, don't talk." },
      { episode: "s01e02", who: "Michael Musto", time: "00:11:39", quote: "But I love Madonna, and I gave her so many props for what she's accomplished and for being an ally to the queer community." },
      { episode: "s03e03", who: "Kevin Aviance", time: "00:21:38", quote: "She said, and his tits are too big. And they're like, what do you want us to do about it? She said, make them smaller. Give him a smaller bra." },
      { episode: "s02e06", who: "Michael Schmidt", time: "00:06:56", quote: "I had maybe $40 in my pocket. First night I was there, I saw Madonna for $2 at the Ritz." },
    ],
  },
  "junior-vasquez": {
    first: "Junior",
    story:
      "The Sound Factory DJ whose records you'd hear all week. With Christina Visca he built Bassline, the Space and the Sound Factory, the after-hours home of house music and the ballroom kids.",
    timeline: [
      ["Late 80s", "After the Paradise Garage and the Saint close, he and Christina Visca start the Space and Bassline"],
      ["1989", "The Sound Factory opens on West 27th Street, four partners"],
      ["1989", "Halloween at the Sound Factory: a two-hour Grace Jones concert"],
      ["90s", "Peter Gatien moves him to Palladium and builds him a huge DJ booth"],
      ["90s", "The DJs become the stars"],
    ],
    liftedUp: ["Kevin Aviance"],
    rooms: ["Sound Factory", "The Space", "Bassline", "Palladium"],
    said: [
      { episode: "s06e02", who: "Christina Visca", time: "00:27:35", quote: "We would all get together outside the club when the club closed, the Gansas, Junior, a group of us. We would go up to the park, Junior would bring his boom box and we'd listen." },
      { episode: "s06e02", who: "Christina Visca", time: "00:18:17", quote: "Junior and I had a club called Bassline and a club called Space before. After the Garage and the Saint closed, people were lighting candles the last night of the Garage and crying, and I'm like, this can't be it." },
      { episode: "s03e03", who: "Kevin Aviance", time: "00:17:43", quote: "At the end of the night, there was always the performance. And then I did my little show to The Pressure. And that's when Junior came out of the booth." },
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:56:18", quote: "You kind of had Junior Vasquez coming up, you had Danny Tenaglia coming up. Eight years later you had these DJs that were becoming iconic. And I think it changed the way people were going out." },
    ],
  },
  "boy-george": {
    first: "George",
    story:
      "Culture Club's singer and a London club kid, friends with Marilyn and Philip Sallon. His Breakfast in Bed birthday ran from Palladium to Area until he fainted.",
    timeline: [
      ["1961", "Born 14 June in London"],
      ["Early 80s", "London clubs: the Blitz kids, DJing at Planets"],
      ["1981", "Culture Club forms"],
      ["1983", "Karma Chameleon"],
      ["1985", "Culture Club tours America; meets Miss Guy and Lauren in LA"],
      ["Mid 80s", "Breakfast in Bed: his birthday party, split between Palladium and Area"],
    ],
    liftedUp: ["Marilyn"],
    rooms: ["Area", "Palladium", "Planets", "Culture Club"],
    said: [
      { episode: "s03e06", who: "Eric Goode", time: "00:22:49", quote: "I was friends with Boy George. And Boy George said, well, I promised Steve I would do my birthday. And I said, well, I've been better friends of yours for longer. So we split the party. And Boy George fainted. I remember carrying him outside under the huge aquarium." },
      { episode: "s01e02", who: "James St. James", time: "00:59:09", quote: "Breakfast in Bed with Boy George was held simultaneously at Area and Palladium, and they got that special permit where they could stay open till 7:00 in the morning, and everyone ran to sit in bed with Boy George." },
      { episode: "s05e04", who: "Nick Egan", time: "00:26:24", quote: "If you had that look, you were likely to get beaten up. So these guys really broke down a lot of barriers to make it much safer for people to have and carry that look around with them." },
      { episode: "s03e10", who: "Miss Guy", time: "00:21:35", quote: "It was 85 and Culture Club was touring. George invited us to his hotel, and we were out in front of his hotel, me, Lauren and George talking." },
      { episode: "s04e08", who: "Richie Rich", time: "00:58:22", quote: "We did a MAC line, all over the world, cosmetics. And Boy George, he actually did the packaging for us." },
    ],
  },
  "liza-minnelli": {
    story:
      "Cabaret star and Studio 54 royalty, Halston's best friend. Downtown loved her back: she danced in Larry Tee's DJ booth at Love Machine.",
    timeline: [
      ["1946", "Born 12 March in Los Angeles"],
      ["1965", "Tony Award for Flora the Red Menace"],
      ["1969", "Films The Sterile Cuckoo in upstate New York, where teenage Dustin Pittman meets her"],
      ["1972", "Oscar for Cabaret"],
      ["Late 70s", "Studio 54 with Halston, Andy Warhol and Bianca Jagger"],
      ["1989", "Losing My Mind, with the Pet Shop Boys"],
    ],
    liftedUp: ["Dustin Pittman"],
    rooms: ["Studio 54", "Love Machine (Union Square)"],
    said: [
      { episode: "s04e05", who: "Dustin Pittman", time: "00:14:25", quote: "Once in a while we'd have lunch, sit on the grass, and we'd talk and chat. Just friends. And she said, Dustin, you know what? You should really think about coming to Hollywood, or going to film school, or New York." },
      { episode: "s03e08", who: "Larry Tee", time: "00:22:09", quote: "Liza came by and she said, oh, you boys. She said, oh, Larry. It's because I worked the club, but I never would have thought that Liza would know my name." },
      { episode: "s03e08", who: "James St. James", time: "00:22:39", quote: "Liza comes running in, in full makeup and full outfit, and she says, Larry, Larry, and she sits down and she's chatting. Then she jumps up and goes on stage, does her number, and runs straight out, like, bye boys, bye boys." },
      { episode: "s04e08", who: "Richie Rich", time: "00:52:06", quote: "She sent us an original Halston to our studio in the East Village. Her publicist called and said, can you replicate this? It was burgundy, but she wanted it in black." },
      { episode: "s02e04", who: "Nikki Haskell", time: "00:44:27", quote: "Afterwards we went back to Michael Feinstein's house, and I showed Liza this clip, where she goes, it's Nikki Haskell." },
      { episode: "s02e08", who: "James St. James", time: "01:00:07", quote: "The doorbell rings, and it's Natalie Schafer, who played Lovey Howell on Gilligan's Island. And Bianca and Liza and Andy lose their shit." },
    ],
  },
  "debbie-harry": {
    first: "Debbie",
    story:
      "Max's Kansas City waitress turned Blondie singer, at CBGB before the band was signed and at the Mudd Club from the start. The guests say she always let them do what they wanted.",
    timeline: [
      ["1945", "Born 1 July in Miami"],
      ["Late 60s", "Waitress at Max's Kansas City"],
      ["1974", "Starts Blondie with Chris Stein; Tish & Snooky sing backing vocals"],
      ["1978", "Parallel Lines"],
      ["1979", "The Mudd Club crowd, back and forth to Studio 54"],
      ["2019", "Her memoir, Face It"],
    ],
    liftedUp: ["Tish & Snooky", "Miss Guy"],
    rooms: ["Max's Kansas City", "CBGB", "Mudd Club", "Squeezebox"],
    said: [
      { episode: "s05e10", who: "Tish & Snooky", time: "00:09:42", quote: "Chris and Debbie came and saw us and came backstage after and invited us to their rehearsal. And then we were in the band." },
      { episode: "s02e06", who: "Michael Schmidt", time: "00:44:00", quote: "Debbie's always kind of let me do whatever I wanted to do for her. She was very, you know, willing to go there." },
      { episode: "s03e10", who: "Miss Guy", time: "00:43:51", quote: "I didn't know Debbie that well when she asked us to play. She just seemed to really like my band. And she came to see us play one night." },
      { episode: "s01e10", who: "Joey Arias", time: "00:15:55", quote: "I lived uptown, I'd come downtown. The first week I met Debbie Harry. Blondie wasn't even signed yet." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:27:07", quote: "Lauren Hutton was always at the Mudd Club in the beginning. Her and Debbie Harry, I would say those were two people that were always at the Mudd in the very beginning." },
      { episode: "s05e10", who: "Tish & Snooky", time: "00:44:44", quote: "When we were in Argentina we saw them, and they still sounded great, and Debbie always looks great." },
    ],
  },
  "dj-keoki": {
    first: "Keoki",
    story:
      "The Club Kids' superstar DJ, who played the Tunnel and the Limelight. Still DJing, and back in touch with the old crowd.",
    timeline: [
      ["Late 80s", "Club Kid DJ; his Groove Thing at The Building"],
      ["1989", "One show as Evergreen at the Limelight, with Moby and Steve Lewis"],
      ["1990", "Ernie Glam moves in on 30th Street"],
      ["90s", "Disco 2000 at the Limelight"],
      ["1995", "Plays Perry Farrell's ENIT festival"],
    ],
    liftedUp: [],
    rooms: ["The Building", "Limelight", "The Tunnel", "Disco 2000"],
    said: [
      { episode: "s01e09", who: "Moby", time: "00:56:15", quote: "Steve put together this band with me and Keoki and Jennifer, and we were called Evergreen. It only lasted for about a day. We played one show at the Limelight, where Keoki was DJing, I was on keyboards, Jennifer sang." },
      { episode: "s01e09", who: "James St. James", time: "00:57:30", quote: "We've all been in more contact with Keoki than we've been in a long time. He still DJs. It's nice to talk to him. I've been reconnecting with him a lot lately." },
      { episode: "s01e06", who: "Waltpaper", time: "00:27:53", quote: "I'd gravitate towards Keoki, like Jojo and Guy and the House of Field people, who were much more poised and mannered." },
      { episode: "s01e05", who: "Ernie Glam", time: "00:12:10", quote: "I moved in with Michael and Keoki in the summer of 1990. That's when we really started having conversations and got to know each other." },
      { episode: "s03e01", who: "James St. James", time: "00:38:59", quote: "There was the House of Field ball at the Roxy one time, and I won the category of master and servant, where Keoki was dressed as a dog." },
    ],
  },
  "lady-bunny": {
    first: "Bunny",
    story:
      "Came up from Atlanta with RuPaul, landed at the Pyramid and started Wigstock, hosting it for hours every year. Crude, bombastic and fully formed from day one.",
    timeline: [
      ["1962", "Born in Chattanooga, Tennessee"],
      ["Early 80s", "Atlanta: announces her name at Larry Tee's birthday party"],
      ["Mid 80s", "Moves to New York with RuPaul; the Pyramid and Nelson Sullivan's house"],
      ["1984", "First Wigstock, in Tompkins Square Park"],
      ["Late 80s", "Game shows in the back of the Tunnel"],
      ["1995", "Wigstock: The Movie"],
    ],
    liftedUp: [],
    rooms: ["Pyramid Club", "Wigstock", "The Tunnel"],
    said: [
      { episode: "s03e08", who: "Larry Tee", time: "00:12:56", quote: "When she showed up at my birthday party and announced that her name was Lady Bunny, I remember we all just gagged. But as soon as she opened her mouth, we all knew that it was the beginning of something big." },
      { episode: "s02e09", who: "Linda Simpson", time: "00:30:16", quote: "Although Bunny and I are friends in real life, we have battling stage personas. She's always insulting me, and I am not reticent about coming back with a remark perhaps about her age, weight, et cetera." },
      { episode: "s02e09", who: "Linda Simpson", time: "00:29:49", quote: "Bunny went with it and kept the annual event going, and it was always a blast, because it was a huge variety show held during the day." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:12:46", quote: "In the back of the Tunnel, Lady Bunny did a game show, and my mother was one of the contestants, and my mother won. Lady Bunny said, what are you going to do with the prize money? And my mom said, give it to my daughter, Jenny Talia." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:43:20", quote: "I remember when Bunny and Ru and everybody came to the Pyramid, and they just fit right in, that whole scene." },
      { episode: "s01e10", who: "Joey Arias", time: "00:46:10", quote: "It wasn't until Bunny and all that whole crew showed up at the Pyramid that I got it. I could watch a drag show because it was hysterical." },
    ],
  },
  "mick-jagger": {
    story:
      "The Rolling Stones' singer, in the guests' stories at Nobody's, the Plaza and Andy Warhol's Montauk house. He took Bebe Buell out for her 21st birthday.",
    timeline: [
      ["1943", "Born 26 July in Dartford, Kent"],
      ["1962", "The Rolling Stones' first gig"],
      ["1971", "Marries Bianca Jagger"],
      ["1974", "Bebe Buell's belated 21st birthday: dinner, then a surprise visit to John Lennon"],
      ["Mid 70s", "With David Bowie at Cherry Vanilla's opening night at Reno Sweeney's"],
    ],
    liftedUp: [],
    rooms: ["The Rolling Stones", "Nobody's", "Max's Kansas City"],
    said: [
      { episode: "s04e03", who: "Bebe Buell", time: "00:58:32", quote: "I consider Jack Nicholson and Mick lifelong friends. I fell in love with Mick as most young girls did, but I was only nine going on ten. I'm 70 years old now. So to think that my entire life has been part of the Rolling Stones." },
      { episode: "s04e03", who: "Bebe Buell", time: "00:40:13", quote: "They were rehearsing in the big giant front room of Andy's Montauk estate. And Mick flew me in so that I could experience it and be there." },
      { episode: "s03e05", who: "Cherry Vanilla", time: "01:03:55", quote: "We took that one little shot in the dressing room. I had so much makeup on, I was on stage doing cabaret. This is the only picture I have with Mick and David next to me." },
      { episode: "s04e05", who: "Dustin Pittman", time: "00:05:07", quote: "Have a beer with Hendrix, have a beer with Al Kooper, have a beer with Jagger. That's how easy it was." },
    ],
  },
  "patrick-mcmullan": {
    first: "Patrick",
    story:
      "The party photographer who brings every crowd together, from the Ninth Circle days to his own empire. He was there before he ever had a camera.",
    timeline: [
      ["Late 70s", "The Ninth Circle days, with Nora Burns and David Burns"],
      ["Early 80s", "Meets Sally Randall before he ever has a camera; their St. Patrick's Day parties"],
      ["Mid 80s", "One of the few photographers allowed to bring a camera into Area and Palladium"],
      ["80s", "Promotes Lisa Edelstein, the club scene's It girl"],
      ["Today", "The Patrick McMullan photo agency"],
    ],
    liftedUp: ["Lisa Edelstein"],
    rooms: ["Ninth Circle", "Area", "Palladium"],
    said: [
      { episode: "s01e03", who: "James St. James", time: "00:30:41", quote: "Patrick really was someone who took care of you and always promoted you and made sure that everything was perfect for you." },
      { episode: "s01e03", who: "Lisa Edelstein", time: "00:30:51", quote: "He genuinely loved me, Patrick." },
      { episode: "s06e07", who: "Sally Randall", time: "00:41:21", quote: "40 years. And Patrick I met before he ever had a camera in his hand." },
      { episode: "s05e01", who: "Nell Campbell", time: "00:38:52", quote: "Absolutely adorable, and consequently everyone loved him. It's just fantastic what it's done for his career. He has an empire. And he deserved it." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:41:39", quote: "I was with Patrick McMullan at Nora Burns' show, and I was saying to Patrick, oh, you know, when I worked at magazines, I used to call in your contact sheets." },
      { episode: "s02e09", who: "James St. James", time: "00:43:13", quote: "In places like Area and Palladium, if you were Patrick McMullan or Wolfgang or Ben Buchanan, you had to be pre-approved in order to take the camera in." },
    ],
  },
  "jose-xtravaganza": {
    first: "José",
    story:
      "Ballet prodigy turned voguer from the House of Xtravaganza, who with his best friend Luis danced Madonna's Vogue around the world on the Blond Ambition Tour.",
    timeline: [
      ["80s", "Ballet prodigy at LaGuardia High School, where he meets Luis"],
      ["80s", "Joins the House of Xtravaganza first, and Luis follows"],
      ["1990", "Dances in Madonna's Vogue video and on the Blond Ambition Tour"],
      ["1991", "In Truth or Dare"],
      ["2016", "In Strike a Pose"],
      ["2021", "In Johnny Dynell's booth at the Pose closing party"],
    ],
    liftedUp: [],
    rooms: ["House of Xtravaganza", "The balls", "Blond Ambition Tour"],
    said: [
      { episode: "s01e08", who: "Luis Xtravaganza Camacho", time: "00:04:21", quote: "Jose was a ballet prodigy when he walked into that school. He was one of the most beautiful male ballet dancers I've ever seen in my whole entire life. Whatever he had was palpable. You saw it right away." },
      { episode: "s01e08", who: "Luis Xtravaganza Camacho", time: "00:08:04", quote: "Jose always did it first. God bless him. He always did it first. And I'm like, wait, what's going on? Oh, I'm coming, I'm coming." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:17:30", quote: "Angie, Danny, Jose, Luis, I knew all of them and none of them were ever shady or mean or awful. It was just like a house thing." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:41:40", quote: "Jose and Luis were there, and Jose was in the booth with me. And he's like, Daddy, do you believe this? And I'm like, I know, right? Because we were just kind of looking at this whole thing." },
    ],
  },
  "marc-jacobs": {
    story:
      "The designer Nick Egan met as a hard-working Parsons kid, who later brought socialites downtown, judged the Love Ball and told James to go home and write.",
    timeline: [
      ["1984", "Graduates from Parsons; Nick Egan does the invitations for his first show"],
      ["1989", "A judge at the Love Ball"],
      ["1992", "The grunge collection for Perry Ellis; Nick makes the film for his Designer of the Year award"],
      ["90s", "Brings socialites down to the club scene, and Naomi Campbell to Squeezebox"],
      ["1997", "Creative director of Louis Vuitton, until 2013"],
    ],
    liftedUp: [],
    rooms: ["Love Ball", "Squeezebox", "Disco 2000", "Candied Camera"],
    said: [
      { episode: "s05e04", who: "Nick Egan", time: "00:38:59", quote: "He must have been 17 when I met him, and I think he'd just won the Young Designer of the Year at Parsons. And he was such a great enthusiastic kid, and he was so lovely." },
      { episode: "s05e04", who: "Nick Egan", time: "00:39:41", quote: "He didn't go out and he didn't party, which is something he did much later. But when we were all going out and getting wasted, Marc was at home working really hard. I'm really proud of what he's done in his life, because he deserves it." },
      { episode: "s06e01", who: "James St. James", time: "00:32:22", quote: "Marc Jacobs came up to me and he said, James, this world is what you go into after you have accomplished something. This is the celebration of the accomplishment. You have to write, James. Go and write, and afterwards you come and you enjoy the fruits of your labor." },
      { episode: "s01e02", who: "James St. James", time: "00:18:11", quote: "I remember Marc Jacobs would bring some of the socialites downtown to meet us." },
      { episode: "s03e10", who: "Miss Guy", time: "00:41:11", quote: "Naomi Campbell would come with Marc Jacobs and Courtney Love and Marilyn Manson and the guys from Green Day. And it was really great." },
      { episode: "s06e05", who: "Nora Burns", time: "00:47:52", quote: "We came up with this whole concept that Candied Camera was a huge hit and I'm bringing it back, and did a mockumentary, and then we had all these people like Sandra Bernhard and Marc Jacobs talking about how it changed their lives." },
    ],
  },
  "jean-paul-gaultier": {
    first: "Jean Paul",
    story:
      "The Paris designer who judged the Love Ball, gave Club USA its middle room and put club kids on his runway.",
    timeline: [
      ["1976", "First collection in Paris"],
      ["80s", "His lookalike contest at the Palladium; Michelangelo Signorile wins and walks in Paris"],
      ["1989", "A judge at the Love Ball"],
      ["1990", "Designs Madonna's Blond Ambition costumes"],
      ["1992", "Designs a room at Club USA"],
      ["2020", "His last runway show"],
    ],
    liftedUp: ["Michelangelo Signorile", "Jenny Talia", "Zaldy"],
    rooms: ["Palladium", "Love Ball", "Club USA", "Régine's"],
    said: [
      { episode: "s02e08", who: "James St. James", time: "00:19:41", quote: "Gaultier was looking for a lookalike to send down the runway at his show in Paris, and there were about 40 bleached blonde twinks in a line. And it was a thundering ovation, and Gaultier fell on the floor, he was laughing so hard." },
      { episode: "s02e08", who: "Michelangelo Signorile", time: "00:20:16", quote: "You were a genius. You won me that contest, right? And then there I was in Paris." },
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:42:39", quote: "The panel of judges was all celebs, Cindy Crawford, Jean-Paul Gaultier, Iman, all these big people." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:20:49", quote: "Steven Meisel saw me in the Gaultier show. And I got a call when I got back that he wanted me for the campaign." },
      { episode: "s04e04", who: "Zaldy", time: "00:39:20", quote: "I did these amazing shows, you know, like incredible Mugler and Gaultier and Westwood." },
      { episode: "s06e07", who: "Sally Randall", time: "01:01:54", quote: "What did survive was my Jean-Paul Gaultier. And a lot of it I've sold." },
    ],
  },
  marilyn: {
    story:
      "Boy George's friend from the London Blitz scene and a pop star of 1983, so stunning that Miss Guy copied the look and James followed him everywhere.",
    timeline: [
      ["Early 80s", "Blitz Kid in London, with Boy George and Philip Sallon"],
      ["1983", "Appears in Eurythmics' Who's That Girl video; his single Calling Your Name"],
      ["1985", "In LA with Culture Club's tour, where Miss Guy first sees him"],
      ["80s", "In New York with Boy George; snatches a boy from James backstage"],
    ],
    liftedUp: [],
    rooms: ["Blitz Club"],
    said: [
      { episode: "s03e10", who: "Miss Guy", time: "00:21:35", quote: "I was also ripping off her look, and I'm sure she didn't like that one. I didn't look half as good as Marilyn. I mean, Marilyn was stunning." },
      { episode: "s03e10", who: "James St. James", time: "00:21:23", quote: "Marilyn was so nasty to me, though. Marilyn was always so mean, but I loved him. I would follow him around everywhere." },
      { episode: "s05e04", who: "Nick Egan", time: "00:26:15", quote: "They used to call me the King of the Queens, because all my friends were Philip Sallon, Marilyn. George and Marilyn had their thing going, and we'd all go out for dinner with each other." },
      { episode: "s04e07", who: "James St. James", time: "00:24:33", quote: "I went backstage and I was making out with him, thinking I was going home with him. And in swooped Boy George and Marilyn, who snatched him from my clutches." },
    ],
  },
  "david-lachapelle": {
    story:
      "The photographer who made Amanda Lepore his muse, built a house for the Love Ball and helped shape and spread the Heatherette look.",
    timeline: [
      ["80s", "Andy Warhol gives him his first job, at Interview"],
      ["90s", "His house at the Love Ball, which Zaldy calls absolutely incredible"],
      ["90s", "Makes Amanda Lepore his muse"],
      ["2000s", "Photographs Heatherette, Paris Hilton and the club crowd"],
      ["2005", "Directs Rize"],
      ["2010", "Shoots Lady Gaga for Rolling Stone, in Michael Schmidt's bubble look"],
    ],
    liftedUp: ["Amanda Lepore"],
    rooms: ["Interview", "Love Ball", "Heatherette"],
    said: [
      { episode: "s05e03", who: "Amanda Lepore", time: "00:37:49", quote: "I thought that it was just like staying, so I stayed there. And when he came back, I was in that pose. And he was like, oh my God, this is like the model for me." },
      { episode: "s05e03", who: "Amanda Lepore", time: "01:05:23", quote: "It would definitely make a good movie, too. David LaChapelle was going to do it at one time." },
      { episode: "s01e03", who: "Lisa Edelstein", time: "00:38:09", quote: "David LaChapelle is another one who really loves to be around people who at any moment are going to teeter over the edge. That kind of high wire act is a very exciting energy to be around." },
      { episode: "s02e06", who: "Michael Schmidt", time: "00:42:55", quote: "I showed up to the shoot, and David said, look, the set is not finished, so we're not going to be able to shoot it. So, of course, I was heartbroken." },
      { episode: "s04e04", who: "Zaldy", time: "00:32:55", quote: "And we won. Even though there was an amazing competition, I remember David LaChapelle's was absolutely incredible." },
      { episode: "s04e08", who: "Richie Rich", time: "00:48:03", quote: "I knew David, like we all did in the club scene, and Amanda, you know, with him." },
    ],
  },
  "grace-jones": {
    story:
      "Model, singer and nightclub queen who held court in the Limelight library and played the Sound Factory's first Halloween, rider and all.",
    timeline: [
      ["1976", "That's the Trouble, her first single"],
      ["1980", "Warm Leatherette, the record playing when Heatherette got its name"],
      ["1981", "Nightclubbing"],
      ["80s", "Dates Dolph Lundgren; the two hang out in the Limelight library"],
      ["Mid 80s", "Her party at the Palladium"],
      ["1989", "A two-hour Halloween concert at the Sound Factory"],
    ],
    liftedUp: [],
    rooms: ["Studio 54", "Area", "Palladium", "Limelight", "Sound Factory"],
    said: [
      { episode: "s06e02", who: "Christina Visca", time: "00:31:16", quote: "She had a chair that she said had to be a certain chair, it had to be a certain height. It was just very stressful. And I remember the rider with the certain champagne and the sushi from this restaurant." },
      { episode: "s06e02", who: "James St. James", time: "00:31:50", quote: "I also know from just being a fan of Grace and seeing her a hundred times in my life that when she says she's going on at two, that means 10 o'clock in the morning." },
      { episode: "s01e02", who: "Michael Musto", time: "01:02:02", quote: "Dolph Lundgren and Grace Jones, when they were a couple, they would hang out in the library and you could just talk to these people." },
      { episode: "s05e06", who: "Christopher Makos", time: "00:16:47", quote: "I have an unbelievable picture of Grace Jones, who was dating Dolph Lundgren at the time. And everybody used to go down to the piers sunbathing." },
      { episode: "s02e10", who: "Brian Belovitch", time: "00:36:02", quote: "I sat down with Grace and it was right at the time when her first big hit came out. It was a very exciting time to be alive." },
      { episode: "s02e06", who: "Michael Schmidt", time: "00:09:13", quote: "Grace Jones was there. I think the opening was Art. And it was one where Andy Warhol stood in the vitrine." },
    ],
  },
  "iggy-pop": {
    first: "Iggy",
    story:
      "The Stooges singer, a friend from the Max's days who Bebe Buell patched up, and whose Blah-Blah-Blah cover and Real Wild Child video Nick Egan made.",
    timeline: [
      ["Early 70s", "Cuts himself on stage at Max's; Bebe Buell cleans him up and he turns up at her door"],
      ["70s", "Photographed by Dustin Pittman, a friend from before anyone made it"],
      ["1977", "Writes Nightclubbing with David Bowie"],
      ["1986", "Blah-Blah-Blah, with Nick Egan's cover and Real Wild Child video"],
    ],
    liftedUp: [],
    rooms: ["Max's Kansas City", "Mudd Club"],
    said: [
      { episode: "s04e03", who: "Bebe Buell", time: "00:34:10", quote: "He was in need of help, and nobody was helping him. So I helped him. And he asked me where I lived, and I said my address only one time. Don't underestimate this kid, ever. He retained everything I said." },
      { episode: "s04e03", who: "Bebe Buell", time: "00:38:09", quote: "I'm not a one night stand kind of person. So I always cultivated relationships, even if they were brief, even if they only lasted two weeks with Iggy." },
      { episode: "s05e04", who: "Nick Egan", time: "00:13:55", quote: "I did the Iggy Pop Blah-Blah-Blah album cover. And yeah, he was a great character." },
      { episode: "s02e06", who: "Michael Schmidt", time: "00:47:26", quote: "Over the entire floor, I spelled out in Braille the lyrics to the Iggy Pop song Nightclubbing." },
      { episode: "s04e05", who: "Dustin Pittman", time: "00:31:34", quote: "David and Lou and Iggy, they were friends of mine before. We were all struggling." },
    ],
  },
  cher: {
    story:
      "The star who taught Michael Schmidt how glamorous a woman could be, turned down It's Raining Men and was famously turned away at Nell's door.",
    timeline: [
      ["1982", "Turns down It's Raining Men, as Paul Jabara told Martha Wash"],
      ["80s", "Sees Michael Schmidt's chain-mail dress in a shop window and calls him"],
      ["Late 80s", "Turned away at Nell's door; Nell apologises at Barneys three days later"],
      ["1990", "Mermaids"],
      ["1996-98", "A guest on The RuPaul Show"],
      ["1998", "Believe"],
    ],
    liftedUp: ["Michael Schmidt"],
    rooms: ["Nell's", "The RuPaul Show"],
    said: [
      { episode: "s02e06", who: "Michael Schmidt", time: "00:22:14", quote: "I grew up on Cher. She informed everything about who I was as a kid, who I am as a designer, who I am as a gay man. She really, really taught me and taught us all how glamorous a woman could be." },
      { episode: "s02e06", who: "Michael Schmidt", time: "00:20:10", quote: "So the dress is in the store, and the next day, lo and behold, Cher walks by." },
      { episode: "s05e01", who: "Nell Campbell", time: "00:35:10", quote: "Famously, Cher was turned away at the door. I bumped into her in Barneys three days later. I adore Cher, and I was so mortified and threw myself at her mercy, and she just found the whole thing amusing." },
      { episode: "s03e02", who: "Martha Wash", time: "00:17:35", quote: "He said that Barbra Streisand turned it down, Donna Summer turned it down, Diana Ross turned it down. Cher turned it down." },
      { episode: "s06e07", who: "Sally Randall", time: "00:36:06", quote: "She said only three other people have ever turned down David Letterman, and one of them was Cher." },
      { episode: "s03e10", who: "Miss Guy", time: "00:05:51", quote: "I was always obsessed with like Kiss or Bowie or Cher or Elton John, anybody that was visual." },
    ],
  },
  "david-glamamore": {
    first: "Glamamore",
    story:
      "Drag queen and designer 'Mr. David', who sewed the Boy Bar looks in the basement, took Connie Fleming to Boy Bar and is writing her biography.",
    timeline: [
      ["80s", "Works at the Antique Boutique, where a Mr. Blackwell dress makes him and Connie friends"],
      ["80s", "Takes Connie to Boy Bar and introduces her to Matthew Kasten"],
      ["Late 80s", "On the Boy Bar stage with Connie and Shannon; makes the outfits downstairs"],
      ["Later", "In San Francisco, drag parent to Domonique Echeverria with Juanita MORE!"],
      ["Now", "Writing Connie Fleming's biography"],
    ],
    liftedUp: ["Connie Fleming", "Domonique Echeverria"],
    rooms: ["Antique Boutique", "Boy Bar"],
    said: [
      { episode: "s02e05", who: "Connie Fleming", time: "00:08:03", quote: "She looked at the label and it said Mr. Blackwell. And we both in unison turned around and said, yes, Mr. Blackwell used to be a designer. And as it came out of our mouths, we looked each other in the eye, and that was it." },
      { episode: "s02e05", who: "Connie Fleming", time: "00:17:29", quote: "And we had Glamamore, Mr. David, who would be on the sewing machine downstairs in the basement finishing up." },
      { episode: "s02e05", who: "James St. James", time: "00:18:13", quote: "I think I had some Mr. David originals until the 2000s. I wish I still had some." },
      { episode: "s03e10", who: "Miss Guy", time: "00:18:09", quote: "That first night we saw Connie, Glamamore and Shannon, I had never seen anything like that, because Glamamore was so demented, and Connie was so gorgeous." },
      { episode: "s03e07", who: "Domonique Echeverria", time: "00:02:12", quote: "I was a child of Juanita MORE! and David Glamamore, who helped birth the legend." },
      { episode: "s03e07", who: "James St. James", time: "00:02:29", quote: "Old friends, old, old, old friends. Glamamore is iconic." },
    ],
  },
  "naomi-campbell": {
    story:
      "The supermodel who came to Love Machine every week with Linda and Christy, walked for Heatherette and turned up at Squeezebox with Marc Jacobs.",
    timeline: [
      ["Mid 80s", "Starts modelling in London as a teenager"],
      ["Early 90s", "At Love Machine every week with Linda Evangelista and Christy Turlington"],
      ["90s", "The red cowgirl look at Mugler was first meant for her, Connie says"],
      ["1994", "The part Kevin Aviance plays in Madonna's Secret video was first meant for her, he heard"],
      ["90s", "Comes to Squeezebox with Marc Jacobs"],
      ["2000s", "Walks for Heatherette in a star-spangled dress"],
    ],
    liftedUp: [],
    rooms: ["Love Machine", "Squeezebox", "Heatherette"],
    said: [
      { episode: "s04e08", who: "Richie Rich", time: "00:48:50", quote: "Naomi Campbell walked a few times, which was amazing to me. I went to her house for a fitting, best fitting of my life. And then she showed up. Boom. And the whole audience gagged in this star-spangled dress." },
      { episode: "s03e08", who: "Larry Tee", time: "00:24:57", quote: "The supermodels would come as a cluster. I call it a supermodel cluster, with Linda, Christy and Naomi every week." },
      { episode: "s03e08", who: "James St. James", time: "00:23:29", quote: "One night I was tripping on acid and I'm walking up the stairs, and Naomi Campbell, Linda Evangelista and Christy Turlington are walking down the stairs." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:48:29", quote: "Naomi Campbell came and sat on the arm of the chair and took the glass out of his hand and drank the champagne and handed it back to him." },
      { episode: "s04e04", who: "Zaldy", time: "00:40:11", quote: "I'm sitting there wearing corsets, waiting with Naomi Campbell to have a fitting." },
      { episode: "s02e05", who: "Connie Fleming", time: "00:30:35", quote: "That look was originally Naomi Campbell's. And she couldn't make the fittings." },
      { episode: "s05e03", who: "Amanda Lepore", time: "00:49:37", quote: "He ran into Naomi Campbell and she said, oh my God, you're naked." },
    ],
  },
  "steve-mass": {
    story:
      "Founder and owner of the Mudd Club, who let teenagers' ideas happen, put Chi Chi on the door and Johnny in the DJ booth, and changed the door rules from his office intercom.",
    timeline: [
      ["70s", "Part of the CBGB crowd around James Chance and Anya Phillips"],
      ["1978", "Opens the Mudd Club on White Street, with Anya Phillips and Diego Cortez as his muses"],
      ["Late 70s", "Makes Chi Chi Valenti the door and Johnny Dynell, who owns no records, the DJ"],
      ["Early 80s", "Eric Goode builds a Grecian grotto in the basement; Eric and Serge Becker get their start"],
      ["1983", "The Mudd Club closes"],
      ["80s", "Opens a bowling-alley club with Eric Goode as the Mudd Club fades"],
    ],
    liftedUp: ["Johnny Dynell", "Chi Chi Valenti", "Eric Goode", "Serge Becker", "Richard Boch"],
    rooms: ["Mudd Club", "CBGB"],
    said: [
      { episode: "s02e11", who: "Richard Boch", time: "00:18:13", quote: "What was great about Steve was he allowed so much to happen. If one of these kids, Howie Pyro, Phoebe Fitch, any of these people, presented Steve with an idea, Steve would go, oh, yeah, let's do that." },
      { episode: "s02e11", who: "Richard Boch", time: "00:19:04", quote: "Steve being a wild man, it was all up here. It wasn't in a physical kind of way. I can honestly say I've never seen Steve on a dance floor." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:05:56", quote: "I had never DJ'd. I didn't even own any records, nothing. And Steve Mass, the owner, was like, okay, you can be the DJ. That was that kind of punk mentality." },
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:20:33", quote: "I wanted to be the cigarette girl, because that to me was going to be the best job. And Steve Mass actually said, no, it's not dominant enough. You have to work the door." },
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:21:33", quote: "Steve calling us on the intercom from his office going like, no fat people tonight, or no black leather jackets. You know, random." },
      { episode: "s03e06", who: "Eric Goode", time: "00:06:52", quote: "I designed the Grecian grotto in the basement of the Mudd Club, and it was terrible. It was so hideous. And Steve Mass loved it." },
      { episode: "s01e07", who: "Rudolf Piper", time: "00:45:24", quote: "Even Steve Mass at the Mudd Club, weirdo as he was, he had some charisma. Something he had that people felt." },
    ],
  },
  // Batch 3 (daily run 22 Nov 2026). Facts: Wikipedia / TVmaze read 22 Nov 2026 and the episodes.
  "benjamin-liu": {
    story:
      "Andy Warhol's assistant from 1982 to 1986 and, in drag, Ming Vauze, who walked Madison Avenue with a stack of Interview magazines for Andy to sign and passed on Andy's go-ahead for Michael Musto's book blurb.",
    timeline: [
      ["1952", "Born in Taipei, Taiwan"],
      ["Late 70s", "Moves from San Francisco to New York with his boyfriend Rags"],
      ["1982", "Andy Warhol hires him as his assistant"],
      ["80s", "Performs in drag as Ming Vauze at the Peppermint Lounge: 'just off the boat'"],
      ["1985", "Third judge at Andy Anderson's show at Danceteria, in James's diary"],
      ["1986", "Leaves the job but keeps visiting the studio on Fridays; Andy's blurb for Michael Musto's Downtown comes through him"],
      ["1998", "Helps with Quentin Crisp's 90th birthday party"],
    ],
    liftedUp: [],
    rooms: ["The Factory", "Interview", "Peppermint Lounge", "Danceteria"],
    said: [
      { episode: "s01e02", who: "Michael Musto", time: "00:30:23", quote: "I was thrilled that through Benjamin Liu, his assistant, he came up with that blurb on the cover of my book, Downtown. Andy never said it. Andy'd tell Benjamin, tell Michael to write whatever he wants and I'll put my name on it." },
      { episode: "s06e01", who: "James St. James", time: "00:22:04", quote: "Andy arrived with Benjamin Liu. And everyone was like, James, James, James, over here. And Andy said, who's that? And Benjamin said, that's James St. James, you don't know? And Benjamin told me that story later." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:08:25", quote: "No one was there, and Benjamin Liu was performing in drag as Ming Vauze. And Ming Vauze's catchphrase was 'just off the boat'." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:09:16", quote: "He would meet Andy uptown at the townhouse, and then they would walk down Madison Avenue, Benjamin carrying Interview magazines, Andy with a Sharpie, so that whoever they would run into, he could sign the latest Interview and hand it out." },
    ],
  },
  "kenny-scharf": {
    story:
      "Painter from Los Angeles who studied at the School of Visual Arts with Keith Haring, ran between Club 57 and the Mudd Club, and painted rooms for the Palladium and the Tunnel.",
    timeline: [
      ["1958", "Born 23 November in Los Angeles"],
      ["1980", "BFA in painting at the School of Visual Arts, where Keith Haring and Sally Randall are in his year; shows in the Times Square Show"],
      ["1981", "The Cosmic Closet in the Times Square apartment he shares with Keith Haring; Customized Appliances at Club 57"],
      ["Early 80s", "One of the few who go to both Club 57 and the Mudd Club"],
      ["Mid 80s", "His room at Steve Rubell's Palladium"],
      ["1989", "Makes one of the Love Ball trophies for Susanne Bartsch"],
      ["90s", "Art for Club USA; the Cosmic Cavern at the far end of the Tunnel (1996)"],
    ],
    liftedUp: [],
    rooms: ["Club 57", "Mudd Club", "Palladium", "Tunnel", "Club USA"],
    said: [
      { episode: "s01e02", who: "Michael Musto", time: "00:49:32", quote: "The artists overnight were Keith Haring, Kenny Scharf, Jean-Michel Basquiat. And it turned out they weren't flashes in the pan." },
      { episode: "s02e11", who: "James St. James", time: "00:55:14", quote: "I think Kenny Scharf was the one who said that 57 was groovy, but the Mudd Club was cool." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:29:42", quote: "Keith Haring, Kenny Scharf. There were a few of us that really went to both places, Mudd and 57." },
      { episode: "s04e10", who: "Ann Magnuson", time: "00:38:03", quote: "When I was managing it, that's when Keith Haring and Kenny Scharf came in. People from the School of Visual Arts." },
      { episode: "s06e07", who: "Sally Randall", time: "00:36:48", quote: "At that point, my work was more cartoony because, again, I had gone to school with Keith and Kenny, and that was sort of the flavor of things." },
      { episode: "s05e06", who: "Christopher Makos", time: "00:18:52", quote: "Keith Haring sort of emerged on the scene along with Kenny Scharf. And all of these scenes were much more fun than the literary scene." },
    ],
  },
  "meryl-streep": {
    story:
      "The actor Susan Seidelman directed as the pink romance novelist in She-Devil and Patricia Field dressed, white hair and all, as Miranda Priestly in The Devil Wears Prada.",
    timeline: [
      ["1949", "Born 22 June in Summit, New Jersey"],
      ["1975", "MFA in drama from Yale, where she plays in theatre comedies"],
      ["1979", "Kramer vs. Kramer, her first Oscar"],
      ["1982", "Sophie's Choice, Best Actress"],
      ["1989", "She-Devil with Roseanne Barr, directed by Susan Seidelman"],
      ["2006", "The Devil Wears Prada, costumes by Patricia Field"],
      ["2011", "The Iron Lady, her third Oscar"],
    ],
    liftedUp: [],
    rooms: [],
    said: [
      { episode: "s03e01", who: "Patricia Field", time: "00:42:56", quote: "I sat down with Meryl and her right hand, and they told me she was going to do her hair white." },
      { episode: "s03e01", who: "Patricia Field", time: "00:43:07", quote: "I always wanted to dress Meryl because she can play any role, but a lot of the roles she plays, it's kind of like folksy or something. And I was like, ooh, I'd like to get my hands on Meryl. And sure enough, it happened." },
      { episode: "s04e09", who: "Susan Seidelman", time: "00:56:16", quote: "What was great about Meryl is, first of all, I'm not gonna tell her anything about how to act. She knows more about acting than I will ever know, but I am gonna direct the scene, so that Meryl can do her thing." },
      { episode: "s04e09", who: "Susan Seidelman", time: "00:57:36", quote: "I had heard that she had been in some comedies when she was at Yale, some theater comedies, and was funny." },
      { episode: "s06e08", who: "William Norwich", time: "00:29:42", quote: "You can take her picture at the party, but you can't go talk to her." },
    ],
  },
  "steve-lewis": {
    story:
      "Club operator, door philosopher and nightlife writer, who ran the Underground, trained James and Lincoln on the door of The World, and still credits Chi Chi Valenti turning him away upstairs at the Mudd Club with starting his career.",
    timeline: [
      ["Late 70s", "Chi Chi Valenti won't let him upstairs at the Mudd Club"],
      ["80s", "Runs the Underground on Union Square, where Michelle Visage starts out"],
      ["Mid 80s", "In the Mike Todd Room at the Palladium, where Lincoln Palsgrove meets him"],
      ["Late 80s", "At The World on Avenue C: with Frank Roccio and Arthur Weinstein he sits James down - no Club Kid shenanigans at the door"],
      ["1989-90", "Puts together the band Evergreen with Moby, DJ Keoki and his wife Jennifer"],
      ["Early 90s", "Has the microphone at Red Zone the night 'Anna Banana' walks on stage"],
      ["Later", "Writes about nightlife; interviews Rudolf Piper about his favourite club"],
    ],
    liftedUp: ["James St. James", "Lincoln Palsgrove IV", "Moby"],
    rooms: ["The World", "Underground", "Palladium", "Red Zone", "Mudd Club"],
    said: [
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:25:54", quote: "Steve Lewis to this day credits me not letting him go upstairs at the Mudd Club with starting his whole career, because he had to kind of learn how to make his way." },
      { episode: "s06e06", who: "James St. James", time: "00:23:25", quote: "Frank Roccio, Arthur Weinstein and Steve Lewis all sat me down and said, we do not want James St. James at the door. We want Jimmy Clark. We don't want any of the Club Kid shenanigans." },
      { episode: "s06e06", who: "James St. James", time: "00:25:12", quote: "Steve Lewis had very explicit ideas of how a door should be run." },
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:14:20", quote: "We would just scooch up the 13th Street entrance and go right into the Mike Todd Room. And so that is where I met Rudolf and Steve Lewis and David Knapp and Anita Sarko." },
      { episode: "s01e09", who: "Moby", time: "00:56:15", quote: "Steve put together this band with me and Keoki and Jennifer. And we were called Evergreen." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:10:42", quote: "The Underground, I think it was Steve Lewis who used to do it. It wasn't a huge club, but it was very popular at the time." },
    ],
  },
  "gabriel-rotello": {
    story:
      "Musician who ran the Downtown Dukes and Divas revues, then founded OutWeek and hired Michelangelo Signorile; one of the people who helped Brian Belovitch in the 80s.",
    timeline: [
      ["1953", "Born 9 February"],
      ["Mid 80s", "Produces the Downtown Dukes and Divas revues at the Limelight, the Palladium and the Saint"],
      ["Mid 80s", "Meets Tish (Brian Belovitch) at Nelson Sullivan's and puts her in the show, rehearsing in his loft on 10th Avenue"],
      ["1989", "Founds OutWeek and is its editor-in-chief, with Michelangelo Signorile on staff"],
      ["1990", "James writes a furious letter about the Malcolm Forbes cover and ends up writing for OutWeek"],
      ["1991", "OutWeek folds"],
      ["1997", "Publishes Sexual Ecology"],
      ["Later", "Makes documentaries for HBO and the History Channel, several with World of Wonder"],
    ],
    liftedUp: ["Michelangelo Signorile", "Brian Belovitch", "James St. James"],
    rooms: ["OutWeek", "Downtown Dukes and Divas", "Limelight"],
    said: [
      { episode: "s02e08", who: "Michelangelo Signorile", time: "00:45:26", quote: "Gabriel had done a lot of research and wanted to take that ACT UP energy and put it into a publication. He also comes out of this world, too. So he understood that this publication needed to be all of it." },
      { episode: "s02e08", who: "Michelangelo Signorile", time: "00:52:46", quote: "Gabriel had said we need to use the term equalizing, because what we're trying to do is equalize the treatment of homosexuality and heterosexuality in the media." },
      { episode: "s02e10", who: "Brian Belovitch", time: "00:33:43", quote: "He was one of the people that was instrumental in getting me some help back in the 80s." },
      { episode: "s02e10", who: "Brian Belovitch", time: "00:53:02", quote: "There I was in Gabriel's loft on 10th Avenue, rehearsing with actual musicians and singing in my real voice." },
      { episode: "s02e08", who: "James St. James", time: "00:46:37", quote: "I wrote a letter to the editor to you and Gabriel saying this shall not stand. And you guys thought it was so funny that you called and you laughed and you said, why don't you write for the magazine?" },
    ],
  },
  "mathu-andersen": {
    first: "Mathu",
    story:
      "Australian make-up artist and Zaldy's partner in work and life for ten years, who bridged fashion and drag, made Susanne Bartsch's invitations with Zaldy and helped create RuPaul's look.",
    timeline: [
      ["1986", "Moves from Australia to New York"],
      ["Early 90s", "Meets Zaldy at a shoot with the photographer Joseph Astor"],
      ["90s", "Mathu and Zaldy: Susanne Bartsch's invitations and presentations at Club USA"],
      ["90s", "Make-up for Steven Meisel and Steven Klein shoots, bringing drag make-up into fashion"],
      ["Early 90s", "With Zaldy, creates RuPaul's look for his first album and video"],
      ["2009-17", "Creative and consulting producer on RuPaul's Drag Race"],
      ["2015", "Emmy nomination for his Drag Race make-up"],
    ],
    liftedUp: ["Zaldy"],
    rooms: ["Club USA", "RuPaul's Drag Race"],
    said: [
      { episode: "s04e04", who: "Zaldy", time: "00:28:52", quote: "Mathu was working with Steven Meisel, Steven Klein, you know, like that was what was also happening in fashion: this drag make-up. So, in a way, Mathu was bridging the fashion and the drag, and sort of like smashing them together." },
      { episode: "s04e04", who: "Zaldy", time: "00:47:44", quote: "Ru said to Mathu and me, do you want to help create this icon, the look? And we were like, of course, whatever this all means. And that's really where it was born." },
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:54:53", quote: "One thing I really loved about club life and my work was working with Mathu and Zaldy. Mathu was such a genius." },
      { episode: "s01e06", who: "Waltpaper", time: "00:49:36", quote: "And then Mathu and Zaldy were walking by, because they were rehearsing for a presentation at USA." },
    ],
  },
  "thairin-smothers": {
    story:
      "Linda Simpson's friend since the 90s, a Hotel 17 club kid who worked on Fenton and Randy's Party Monster documentary, moved to LA for World of Wonder and became a co-executive producer of Drag Race.",
    timeline: [
      ["90s", "Moves to New York, meets Linda Simpson and dives head first into drag and the club kid scene"],
      ["90s", "Lives at the Hotel 17 with Richie Rich, Brooke and Amanda Lepore"],
      ["1998", "Works on the Party Monster documentary, on Linda's recommendation"],
      ["After", "Moves to LA to work for World of Wonder; Linda tells him to go for it"],
      ["Later", "Co-executive producer of Drag Race in the US, UK, Canada and Down Under"],
    ],
    liftedUp: [],
    rooms: ["Hotel 17", "World of Wonder", "RuPaul's Drag Race"],
    said: [
      { episode: "s04e08", who: "James St. James", time: "00:03:10", quote: "Thairin would follow and do it all night long with you and Brooke. And then when Thairin moved to LA and started at Drag Race, he would say it to RuPaul. He'd say it to Michelle Visage. He'd say it to all the queens." },
      { episode: "s02e09", who: "Linda Simpson", time: "00:52:05", quote: "Thairin was very enthusiastic about the scene and dived in head first. Not just the drag queen stuff, but certainly the club kids' scene, too." },
      { episode: "s02e09", who: "Linda Simpson", time: "00:53:13", quote: "You asked him to move out to LA to work for fledgling World of Wonder in Southern California. And he was very torn, and I said, go for it." },
      { episode: "s02e09", who: "Fenton Bailey", time: "00:52:23", quote: "He never really lost his way, in a way that I think some of the club kids did kind of go off the deep end." },
    ],
  },
  "blaine-trump": {
    story:
      "Society philanthropist, married to Robert Trump, who organised Christian Lacroix's first show as a Memorial Sloan Kettering benefit, took up God's Love We Deliver, and let Billy Norwich take her downtown to see Lypsinka and Joey Arias.",
    timeline: [
      ["1948", "Born in Mountain Brook, Alabama"],
      ["About 1958", "Moves to Yokohama, Japan, for her father's job; later graduates from the American School of Paris"],
      ["1984", "Marries Robert Trump"],
      ["Late 80s", "Organises Christian Lacroix's first show as a fundraiser for Memorial Sloan Kettering"],
      ["Late 80s", "A note from Ganga Stone brings her to God's Love We Deliver; the second time she brings Billy Norwich"],
      ["90s", "Marc Jacobs takes her to a Disco 2000 dinner party, where she meets James in ten pairs of eyelashes"],
      ["2010", "Divorce from Robert Trump settled"],
    ],
    liftedUp: [],
    rooms: ["God's Love We Deliver", "Disco 2000", "Limelight"],
    said: [
      { episode: "s06e08", who: "William Norwich", time: "00:32:04", quote: "So you had Lacroix, and Blaine organized for him to have his first fashion show as a fundraiser for Memorial Sloan Kettering." },
      { episode: "s06e08", who: "William Norwich", time: "00:32:39", quote: "We had the AIDS crisis, and she got a note from Ganga Stone, who had started God's Love We Deliver, and Blaine went up there once, and the second time she went she brought me." },
      { episode: "s06e08", who: "James St. James", time: "00:44:23", quote: "Marc Jacobs took her to a party at Disco 2000. She said, how do you see with all those eyelashes? And I said, well, I'm on so much acid right now that I can't really see anything." },
      { episode: "s06e08", who: "James St. James", time: "00:30:26", quote: "Blaine was very old money WASP, who was beloved by society." },
    ],
  },
  "bianca-jagger": {
    story:
      "Studio 54's queen, who rode in on a white horse and later became a human rights campaigner. The guests remember her at Andy's table, coming down to the Mudd Club, and talking about her garden in Nicaragua.",
    timeline: [
      ["1945", "Born 2 May in Managua, Nicaragua"],
      ["1971", "Marries Mick Jagger in Saint-Tropez"],
      ["1977", "Rides a white horse into Studio 54 on her 32nd birthday"],
      ["1978", "Divorce from Mick Jagger"],
      ["Late 70s", "Part of the Studio 54 crowd that starts coming down to the Mudd Club"],
      ["70s", "Andy Warhol brings Jayne County, in three wigs, over to her table"],
      ["Later", "Founds the Bianca Jagger Human Rights Foundation"],
    ],
    liftedUp: [],
    rooms: ["Studio 54", "Mudd Club"],
    said: [
      { episode: "s02e02", who: "Jayne County", time: "00:39:51", quote: "I don't know if Andy did this on purpose to freak Bianca out, but years later I'm thinking he did. I had three wigs, they were huge. Anyway, so Andy brought me over to Bianca's table and I sat down and he said, Bianca, this is Wayne County." },
      { episode: "s02e02", who: "Jayne County", time: "00:41:06", quote: "I was shocked I freaked out Bianca. I wrecked her. I'm glad I wrecked her." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:27:07", quote: "People from Studio 54 started coming down to the Mudd Club. And we started out just like making fun of them. And next thing you know, Bianca Jagger's there." },
      { episode: "s04e05", who: "Dustin Pittman", time: "00:07:48", quote: "There was a separate area for celebrities, whether it's Halston or Calvin or Bianca, and then there would be a curtain. Every once in a while they would raise the curtain and people could dance with the celebrities." },
      { episode: "s01e03", who: "James St. James", time: "00:07:48", quote: "I've always maintained that I never met Bianca Jagger, and looking through there, you and I sat next to Bianca at a dinner party for three hours talking about her garden in Nicaragua." },
      { episode: "s03e06", who: "James St. James", time: "00:16:07", quote: "I had never seen a crowd like that. It was Andy and Liza and Bianca and Halston. It was Grace Jones." },
    ],
  },
  "rudy-giuliani": {
    first: "Rudy",
    story:
      "New York's mayor from 1994 to 2001, whose quality-of-life campaign went after the clubs. The guests remember him as the end of the night-time New York they knew.",
    timeline: [
      ["1944", "Born 28 May in Brooklyn"],
      ["1983-89", "US Attorney for the Southern District of New York, going after Wall Street"],
      ["1994", "Becomes mayor; the quality-of-life campaign begins"],
      ["1996", "After Angel Melendez's killing, the crackdown on nightlife hardens, Michael Musto says"],
      ["Late 90s", "Task force, undercover buys and nuisance-abatement closings at Peter Gatien's clubs, then his federal trial"],
      ["2001", "Leaves office"],
      ["2024", "Disbarred in New York and Washington, DC"],
    ],
    liftedUp: [],
    rooms: [],
    said: [
      { episode: "s01e02", who: "Michael Musto", time: "00:35:21", quote: "Another horror of Angel's death is not just the loss of life. It fed into the Giuliani crackdowns of, look, nightlife is full of bad people. Nightlife is full of drug dealers." },
      { episode: "s01e07", who: "Rudolf Piper", time: "00:05:46", quote: "The crowds and the music and the whole spirit of New York started to change. And then came Giuliani. I just felt that my time, my stint in New York was over." },
      { episode: "s01e07", who: "Rudolf Piper", time: "00:55:42", quote: "Giuliani, I'm sure, has a portrait of La Guardia in his office, because he adores him." },
      { episode: "s01e04", who: "Peter Gatien", time: "00:41:23", quote: "He went after the squeegee people, he even went after the artists that used to sell their art around the Met. My theory is he ran out of squeegee people." },
      { episode: "s02e05", who: "James St. James", time: "00:57:04", quote: "New York has always been about nighttime. That was always part of what made New York special. And people like Giuliani just never recognized that." },
      { episode: "s01e07", who: "James St. James", time: "00:38:52", quote: "You stopped a crime wave with drink tickets. Rudolph Giuliani could have solved all of New York's problems just by giving drink tickets." },
    ],
  },
  // Batch 4 (daily run 23 Nov 2026). Facts: Wikipedia read 23 Nov 2026 and the episodes. Tabboo! and Angie Bowie came in
  // from the not-yet-checked names (13 mentions each, alive), so Imelda Marcos and Sherry Vine move to batch 5.
  "lynn-yaeger": {
    story:
      "Fashion writer who started in the Village Voice's advertising department and wrote about fashion there for 30 years before Vogue; with Michael Musto and Mickey Boardman, one of New York's famous trios.",
    timeline: [
      ["Early years", "Born in New York City, grows up on Long Island"],
      ["70s-80s", "Starts at the Village Voice in the advertising department, always dressed for fashion, and moves into writing about it"],
      ["Fashion Week", "Lauren Ezersky walks up to her on the show bus: you look interesting, who are you?"],
      ["90s", "Lauren introduces her to Mickey Boardman; with Michael Musto they start a bad-movie club that runs for 30 years"],
      ["2008", "Laid off by the Voice on 30 December, after 30 years"],
      ["Later", "Contributing editor at Vogue"],
      ["Now", "The Mickey and Lynn show with Mickey Boardman on Friday nights"],
    ],
    liftedUp: [],
    rooms: ["The Village Voice", "Vogue"],
    said: [
      { episode: "s04e02", who: "Mickey Boardman", time: "00:36:40", quote: "First she started in the classified ads department at The Voice, and she's still always dressed like a freak because she loved fashion. But she ended up segueing into being an editor and writing about fashion." },
      { episode: "s04e02", who: "Mickey Boardman", time: "00:35:15", quote: "I would see him with Lynn, but I always knew, oh, that's Michael's sidekick, I didn't know her. Back in the day in Fashion Week, they used to have a very glamorous bus, and Lynn was sitting with Lauren Ezersky." },
      { episode: "s04e06", who: "Lauren Ezersky", time: "00:12:12", quote: "I love Lynn Yaeger. She's always been true to herself. She's amazing. She's a real original since day one. We just dressed the way we wanted and did what we wanted." },
      { episode: "s04e02", who: "James St. James", time: "00:34:56", quote: "You and Lynn and Michael Musto are three very well-known people to be seen on the scene." },
    ],
  },
  "kim-kardashian": {
    story:
      "Paper's Break the Internet cover star, who arrived in Paris on time with only her bodyguard and, Mickey Boardman says, is one of the easiest and nicest people he has worked with.",
    timeline: [
      ["1980", "Born 21 October in Los Angeles"],
      ["2000s", "Walks in a Heatherette show with Jenna Jameson and Amanda Lepore"],
      ["2007", "Keeping Up with the Kardashians starts"],
      ["Early 2010s", "Shot with Khloé for Paper's social media issue"],
      ["2014", "Paper's Break the Internet cover, shot by Jean-Paul Goude in a studio outside Paris"],
      ["2019", "Founds SKIMS"],
    ],
    liftedUp: [],
    rooms: ["Paper", "Heatherette"],
    said: [
      { episode: "s04e02", who: "Mickey Boardman", time: "00:44:42", quote: "She pulled up and she was great. She said, sorry I'm late, even though she was not late. And she walked in and she said, I'm really excited about this. I'll stay as long as you need. If we're gonna do this, let's really do it. And we were like, we're home." },
      { episode: "s04e02", who: "Mickey Boardman", time: "00:49:47", quote: "She was like a dream. She got it immediately, and opened like 50 bottles of champagne. She's one of the easiest people I've ever worked with and the nicest." },
      { episode: "s04e06", who: "Lauren Ezersky", time: "00:39:05", quote: "I met her once, I interviewed her once, and she was lovely. She was such a nice girl." },
      { episode: "s04e08", who: "Richie Rich", time: "00:51:30", quote: "Kim Kardashian was in the show with Jenna Jameson and Amanda. It's a good mix." },
      { episode: "s05e10", who: "Tish & Snooky", time: "00:28:40", quote: "If you get somebody like one of the Kardashians, somebody had the pink hair, then everybody wanted pink hair. Everybody wanted our cotton candy pink." },
    ],
  },
  "john-waters": {
    story:
      "Baltimore's film-maker of bad taste and one of James's teenage idols, who spoke at Straight to Hell at the Pyramid and still says in his act that Squeezebox was New York's greatest club.",
    timeline: [
      ["1946", "Born 22 April in Baltimore"],
      ["1972", "Pink Flamingos"],
      ["1981", "Polyester"],
      ["80s", "One of the first speakers at Trey Speegle's Straight to Hell nights at the Pyramid; Trey cooks him Mexican food"],
      ["1988", "Hairspray"],
      ["90s", "A regular at Squeezebox"],
      ["1998", "Sits at Quentin Crisp's feet at his 90th birthday party"],
      ["Later", "Spoken-word shows and books"],
    ],
    liftedUp: [],
    rooms: ["Squeezebox", "Pyramid Club"],
    said: [
      { episode: "s04e07", who: "Trey Speegle", time: "00:04:28", quote: "When I did Straight to Hell at the Pyramid, John Waters was one of the first people to do the show. And he came to that apartment and I made Mexican food for him and his boyfriend." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:50:45", quote: "At his 90th birthday party, John Waters was sitting at his feet. And there were people kind of surrounding him as though Oscar Wilde had just come back." },
      { episode: "s02e06", who: "Michael Schmidt", time: "00:57:20", quote: "John Waters, in his act to this day, still says Squeezebox was the greatest club in New York City history. I mean, he says that on stage." },
      { episode: "s03e06", who: "Eric Goode", time: "00:35:43", quote: "I find Middle America fascinating. I think maybe I have some of the same sentiments as John Waters." },
      { episode: "s03e06", who: "Eric Goode", time: "00:47:51", quote: "If I need to call John Waters, I can do it." },
      { episode: "s03e10", who: "James St. James", time: "00:09:35", quote: "When I was 16, my idols were all Truman Capote and Andy Warhol and John Waters. And I remember driving two hours to go get an Interview magazine." },
    ],
  },
  "kenny-kenny": {
    story:
      "The doorman who set the look: Susanne Bartsch took him from making jewellery to her door at Savage, and from The Building to Red Zone, one look at Kenny told you how to dress to get in.",
    timeline: [
      ["Late 80s", "Making jewellery when Susanne Bartsch puts him on the door at Savage"],
      ["Late 80s", "Turns Jenny Talia and Carlin away at The Building, until they come back redone from Patricia Field's"],
      ["Late 80s", "Buddy-buddy with Michelle Visage at The World"],
      ["Early 90s", "On the Red Zone door with Lincoln Palsgrove"],
      ["90s", "On the door at Quick on the Panty Girdle night"],
      ["90s", "On the Joan Rivers couch with the club kids"],
    ],
    liftedUp: [],
    rooms: ["Savage", "The Building", "Red Zone", "Quick", "The World"],
    said: [
      { episode: "s02e03", who: "James St. James", time: "00:33:42", quote: "When you got to the door and you saw Kenny there, you knew, oh, this is how we have to dress to get in." },
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:33:31", quote: "But Kenny was making jewelry. And I liked how he looked. I said, hey, Kenny, come through the door. Get away from that jewelry and do my door." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:05:12", quote: "Carlin and I went to The Building and we were rejected by Kenny Kenny. And then we went to Pat Field's, redid ourselves." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:28:41", quote: "Kenny Kenny and I were like buddy-buddy. I knew the It Twins, I knew Michael, all the legends." },
      { episode: "s05e07b", who: "Really Denise", time: "00:48:04", quote: "I took a girlfriend from school out with me one night, and she had no idea I was Really Denise or a club kid or anything. And of course Kenny Kenny was like, oh my god, darling. Come on in." },
    ],
  },
  "stevie-nicks": {
    story:
      "Fleetwood Mac's witchy soprano, the look of every late-70s California girl and the muse of Chi Chi Valenti and Johnny Dynell's Night of a Thousand Stevies, which she has sent a video.",
    timeline: [
      ["1948", "Born 26 May in Phoenix, Arizona; goes to high school in Arcadia, California"],
      ["1975", "Joins Fleetwood Mac with Lindsey Buckingham"],
      ["1977", "Rumours"],
      ["Late 70s", "Every girl in Southern California looks like her, Miss Guy says"],
      ["1981", "Bella Donna, her first solo album"],
      ["90s", "Chi Chi Valenti and Johnny Dynell start Night of a Thousand Stevies at Jackie 60"],
      ["1998", "Rock and Roll Hall of Fame with Fleetwood Mac; again as a solo artist in 2019"],
    ],
    liftedUp: [],
    rooms: ["Jackie 60", "Night of a Thousand Stevies"],
    said: [
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:55:57", quote: "I happened to be out at my first Stevie Nicks concert, and I ran into Dean Johnson, Joey Arias, and several other people from the whole drag performance scene in New York, and they were all Stevie fans. So I was like, we should do this Stevie Nicks night. And it just really caught on and became an annual." },
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:57:09", quote: "From being a club that had maybe 100, 150 people at it, there were an additional like 40 or 50 Stevie fans there who knew every word, were wearing shawls, had tambourines." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:56:39", quote: "In our world, that night was as big as the White Party or the Black Party. But then, of course, Stevie became so much bigger." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:55:56", quote: "She's made a video for us." },
      { episode: "s03e10", who: "Miss Guy", time: "00:05:51", quote: "Growing up in Southern California, everybody in those late 70s days looked like Stevie Nicks or surfer girls, you know, tan and feathered blonde hair. I had never really seen anybody wear all black." },
      { episode: "s06e03", who: "James St. James", time: "00:15:19", quote: "Tell me about the evolution of the dominatrix meets Victorian meets Stevie Nicks look that you have cultivated over the years." },
    ],
  },
  "ross-bleckner": {
    story:
      "Painter who owned 77 White Street, signed the lease that put the Mudd Club in it, and had the studio upstairs where Johnny Dynell lived when he met Chi Chi Valenti.",
    timeline: [
      ["1949", "Born 12 May in Brooklyn"],
      ["1974", "Buys the building at 77 White Street"],
      ["Late 70s", "Signs the lease with Steve Mass, Anya Phillips and Diego Cortez: the Mudd Club opens downstairs"],
      ["1979", "Starts showing with Mary Boone"],
      ["Late 70s", "Johnny Dynell lives in his painting studio, where Johnny meets Chi Chi Valenti"],
      ["Early 80s", "Steve Mass buys the building, then sells it back to him by the end of the Mudd Club"],
      ["1995", "Retrospective at the Guggenheim"],
      ["2004", "Sells the building"],
    ],
    liftedUp: [],
    rooms: ["Mudd Club"],
    said: [
      { episode: "s06e03", who: "Johnny Dynell", time: "00:24:25", quote: "Ross Bleckner, the artist, the painter, he owned the building. And he lived on the top floor and had a studio on the floor below. For a while, I lived in his painting studio. And that's where I was when we met." },
      { episode: "s02e11", who: "Richard Boch", time: "00:22:39", quote: "Ross bought the building maybe one or two years before the Mudd Club opened. He signed the lease with Steve Mass when they were looking for a space." },
      { episode: "s02e11", who: "Richard Boch", time: "00:23:13", quote: "About into the second year, Steve bought the building from Ross, and then by the end of the Mudd Club, Steve had sold the building back to Ross." },
      { episode: "s02e11", who: "James St. James", time: "00:23:52", quote: "I imagine with Ross, that's where you get Julian Schnabel and a lot of the other artists of the period coming. The whole Mary Boone stable would come there." },
    ],
  },
  "mr-pearl": {
    story:
      "South African corsetier with an 18-inch waist, who went from an Avenue B flat shared with Connie Fleming to Mugler, Galliano and McQueen. Susanne Bartsch ordered his first corset.",
    timeline: [
      ["1962", "Born Mark Erskine-Pullin in South Africa"],
      ["Late 80s", "In New York, sharing a flat on Avenue B with Connie Fleming, Chiclet, Eric Conrad and Vicki Bartlett"],
      ["Late 80s", "Susanne Bartsch is the first person to order a corset from him"],
      ["1989", "Meets Thierry Mugler at the Love Ball"],
      ["90s", "Mugler's red bugle-bead cowgirl look, made for Naomi Campbell, goes to Connie Fleming, who beads some of it"],
      ["90s", "His butterfly at Wigstock"],
      ["Later", "Moves to Paris; corsets for Galliano, Vivienne Westwood and Alexander McQueen"],
    ],
    liftedUp: [],
    rooms: ["Love Ball", "Wigstock"],
    said: [
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:52:51", quote: "Mr. Pearl stuff. It's just the craftsmanship and how you feel in it. It's just amazing. And Mr. Pearl, may I say, I was the first person who ordered and had Mr. Pearl make a corset, just so you know. First." },
      { episode: "s02e03", who: "James St. James", time: "00:53:07", quote: "Mr. Pearl is one of those great characters. There needs to be a documentary about Mr. Pearl." },
      { episode: "s02e05", who: "Connie Fleming", time: "00:30:35", quote: "That look was originally Naomi Campbell's, and she couldn't make it to the fittings. The fabulous Mr. Pearl was a former roommate of mine." },
      { episode: "s02e05", who: "Connie Fleming", time: "00:33:33", quote: "The red cowboy outfit should go to Connie. And it was kind of kismet, because Pearl was right down the street. I could go for fittings." },
      { episode: "s04e04", who: "James St. James", time: "00:36:58", quote: "I will always remember the butterfly at Wigstock that Mr. Pearl did." },
    ],
  },
  tabboo: {
    first: "Tabboo!",
    story:
      "Pyramid star and painter, born Stephen Tashjian, who said yes to Linda Simpson's Pride float, gave her the name Linda and painted the cover of Deee-Lite's World Clique.",
    timeline: [
      ["1959", "Born Stephen Tashjian in Leicester, Massachusetts"],
      ["80s", "A Pyramid Club drag star, sharing a flat with Happyface"],
      ["1986", "Says yes to Linda Simpson's Pyramid float for the Pride parade"],
      ["Late 80s", "Suggests the name Linda when Linda Simpson starts doing drag"],
      ["Late 80s", "Lip-syncs Alice Cooper in drippy eye make-up and a 60s Cher wig; Miss Guy decides that's what she wants to do"],
      ["1990", "Paints the cover of Deee-Lite's World Clique"],
      ["1995", "In Wigstock: The Movie"],
    ],
    liftedUp: ["Linda Simpson"],
    rooms: ["Pyramid Club", "Wigstock"],
    said: [
      { episode: "s02e09", who: "Linda Simpson", time: "00:17:44", quote: "Trey said, why don't you call up Stephen Tashjian, which is Tabboo!'s real name. And so I called up Tabboo! and I said I had this idea for a float, and he was receptive. And so we created this crazy float with mostly people from the Pyramid." },
      { episode: "s02e09", who: "Linda Simpson", time: "00:18:54", quote: "I didn't really even have a name at first, and so, finally, Tabboo! just suggested Linda. My real last name is Simpson. Thank you, Tabboo!, for giving me a Midwestern name." },
      { episode: "s03e10", who: "Miss Guy", time: "00:28:44", quote: "I saw Tabboo!, and he was doing a lip sync to Alice Cooper, in drippy eye make-up, but put like a 60s Cher wig on. So I was like, that's what I want to do." },
      { episode: "s02e09", who: "James St. James", time: "00:17:28", quote: "You talk about how Tabboo! was very much a mentor to you." },
    ],
  },
  "angie-bowie": {
    story:
      "David Bowie's first wife, who welcomed the Pork cast backstage, pushed David to change his image and, Bebe Buell says, brought the professional side into his career.",
    timeline: [
      ["1949", "Born 25 September in Cyprus"],
      ["1970", "Marries David Bowie"],
      ["1971", "Doing the lights at the Country Club in London when Cherry Vanilla, Jayne County and Leee Black Childers come to see David; she takes them backstage"],
      ["1971", "Comes to see Pork in London with David, more than once"],
      ["1972", "Sews Ziggy Stardust costumes; at Max's Kansas City the night David first appears as Ziggy"],
      ["1980", "Divorce from David Bowie"],
    ],
    liftedUp: ["Cherry Vanilla", "Jayne County"],
    rooms: ["Max's Kansas City", "Pork"],
    said: [
      { episode: "s04e03", who: "Bebe Buell", time: "00:23:14", quote: "That was when Angie was at her peak of beauty, and there was just nobody that looked like her. She truly did the space alien thing with authenticity and sincerity. It was beautiful to look at." },
      { episode: "s04e03", who: "Bebe Buell", time: "00:24:12", quote: "I think she championed him to the point that she ushered in all the professional aspects that started to weave into his life. She knew how to work a room. He was shy. Angie was not shy." },
      { episode: "s02e02", who: "Jayne County", time: "00:28:34", quote: "David and Angie came to see Pork more than one time. They would come and hang out backstage, and we used to go to the Sombrero with them to hang out and to dance and carry on." },
      { episode: "s02e02", who: "Jayne County", time: "00:29:12", quote: "He did a whole image change, you know? Angie pushed him into changing his image. She was a big supporter of Pork." },
      { episode: "s03e05", who: "Cherry Vanilla", time: "00:48:55", quote: "So we went and introduced ourselves to Angie. And of course, she was like, oh, darlings, you must come backstage after and see David, he's dying to meet you. Angie, she could make friends with anybody in an instant." },
    ],
  },
  "cyndi-lauper": {
    story:
      "Blue Angel's blonde singer who shopped for vintage at Tish and Snooky's store, then took the leap into hair colour that helped launch her career and Manic Panic's.",
    timeline: [
      ["1953", "Born 22 June in Brooklyn"],
      ["1978", "Forms Blue Angel; still blonde, she shops for vintage at Tish and Snooky's store"],
      ["1980", "Blue Angel's only album"],
      ["1983", "She's So Unusual, and the leap into hair colour"],
      ["80s", "With Madonna, the new artist of Michelle Visage's teen-club era"],
      ["90s", "A guest on The RuPaul Show"],
      ["2013", "Tony Award for the score of Kinky Boots"],
    ],
    liftedUp: [],
    rooms: ["Manic Panic", "The RuPaul Show"],
    said: [
      { episode: "s05e10", who: "Tish & Snooky", time: "00:36:57", quote: "At first she was blonde. She put out her first album with Blue Angel. She would shop in the store and buy vintage-y kind of stuff. And then she made the big leap into hair color." },
      { episode: "s05e10", who: "Tish & Snooky", time: "00:37:18", quote: "I think it really helped to launch her career. So, you're welcome, Cyndi. Oh, she's been so good to us. She's been so supportive." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:03:48", quote: "There was a lot of neon involved, and this was the era of a new artist called Madonna and then Cyndi Lauper." },
      { episode: "s01e01", who: "James St. James", time: "00:04:58", quote: "By the time I got to New York and I saw you in the club, you were bigger in my mind than Madonna, Annie Lennox, Boy George, Cyndi, everyone put together." },
    ],
  },
  // Living people batch 5 (daily run 24 Nov 2026)
  "imelda-marcos": {
    story:
      "The Philippines' First Lady who loved to dance all night. Nikki Haskell flew to her Manila film festival, landed the interview nobody else got and became her friend.",
    timeline: [
      ["1929", "Born 2 July in Manila"],
      ["1965", "First Lady of the Philippines"],
      ["1982", "Manila International Film Festival; Nikki Haskell flies in on her own"],
      ["80s", "Takes Nikki everywhere, dancing all night and calling her from the palace at 2 a.m."],
      ["1986", "The Marcos family leaves for Hawaii"],
      ["1991", "Returns to the Philippines"],
    ],
    liftedUp: [],
    rooms: [],
    maxPerGuest: 3,
    said: [
      { episode: "s02e04", who: "Nikki Haskell", time: "00:26:04", quote: "I made up my mind I was going to interview Madame Marcos no matter what. She wasn't giving out any interviews." },
      { episode: "s02e04", who: "Nikki Haskell", time: "00:26:49", quote: "She said, I just saw you on TV. You come with me. So after that, I was always with Madame Marcos." },
      { episode: "s02e04", who: "Nikki Haskell", time: "00:28:20", quote: "Madame Marcos, she liked to go dancing every night, all night. She would call me from the palace at two o'clock, and they'd come and get me." },
    ],
  },
  sting: {
    story:
      "Before the Police took off he played bass in Cherry Vanilla's London band and opened for Jayne County across Europe. Later he was snapped with Dianne Brill at the Limelight, and Nell Campbell jumped out of his 40th birthday cake.",
    timeline: [
      ["1951", "Born Gordon Sumner, 2 October, in Wallsend"],
      ["1977", "Bass player in Cherry Vanilla's band in London, with Stewart Copeland on drums"],
      ["1977", "The Police tour Europe with Jayne County"],
      ["1983", "Synchronicity; pictured with Dianne Brill at the Limelight opening"],
      ["1985", "First solo album, The Dream of the Blue Turtles"],
      ["1991", "His 40th birthday party: Nell Campbell jumps out of the cake"],
    ],
    liftedUp: [],
    rooms: ["Limelight"],
    said: [
      { episode: "s03e05", who: "Cherry Vanilla", time: "01:11:12", quote: "Miles said, I have a band and I can't get them bookings because they don't have the publicity hooks that you have. And that was Stewart Copeland on drums and Sting on the bass." },
      { episode: "s03e05", who: "Cherry Vanilla", time: "01:12:15", quote: "He already had an ego, which you need to be a star in show business. He already knew he was good at what he did. He was a fabulous bass player and composer." },
      { episode: "s02e02", who: "Jayne County", time: "00:49:20", quote: "I toured all over Europe with the Police, and they opened up, and it was like touring with a group of librarians. They were so well-behaved." },
      { episode: "s02e02", who: "Jayne County", time: "00:50:18", quote: "But I have to say they were very nice to me. Sting was very nice to me. He was very sweet and adorable." },
      { episode: "s05e01", who: "Nell Campbell", time: "00:22:50", quote: "I was asked by Trudie Styler to jump out of Sting's 40th birthday cake. They wheeled out this cake, which I jumped out of." },
    ],
  },
  "paris-hilton": {
    story:
      "Richie Rich found her crying at Patricia Field's as a teenager, dressed her up and put her in Heatherette's first shows. Soon club promoters were hiring her to DJ.",
    timeline: [
      ["1981", "Born 17 February in New York, daughter of Kathy and Rick Hilton"],
      ["90s", "Meets Richie Rich at Patricia Field's store"],
      ["2000", "David LaChapelle's shoot that made her famous"],
      ["00s", "Walks for Heatherette; in a studded bodysuit on their back page in Women's Wear Daily"],
      ["2003", "The Simple Life"],
      ["00s", "Hired to DJ, one of the famous names booked instead of club DJs like Anita Sarko"],
    ],
    liftedUp: [],
    rooms: ["Heatherette"],
    said: [
      { episode: "s04e08", who: "Richie Rich", time: "00:47:44", quote: "Paris I met at Pat Field's when she was fifteen, sixteen, and she was crying in the store because she couldn't buy everything she wanted, because her mom didn't want her to buy boas and garter belts." },
      { episode: "s04e08", who: "Richie Rich", time: "00:48:29", quote: "When Women's Wear Daily happened, I called Paris, and they gave us a whole back page, which they never do. And we put Paris in this studded bodysuit and that began Heatherette." },
      { episode: "s02e04", who: "Nikki Haskell", time: "00:42:07", quote: "I was there when Kathy was pushing Paris around in a baby buggy." },
      { episode: "s01e02", who: "Michael Musto", time: "00:43:17", quote: "They were hiring famous kids and Paris Hilton and people like that to DJ." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:27:47", quote: "I wasn't gifted with a voice like Adele or Mariah. I wasn't given money like, you know, Paris Hilton." },
    ],
  },
  "jack-nicholson": {
    story:
      "The film star Bebe Buell calls her official and acknowledged boyfriend of the early 80s, and a friend for life who walked her through every piece of his art collection.",
    timeline: [
      ["1937", "Born 22 April in Neptune, New Jersey"],
      ["1969", "Easy Rider"],
      ["1975", "One Flew Over the Cuckoo's Nest, his first Oscar"],
      ["80s", "Bebe Buell's boyfriend, then a lifelong friend"],
      ["1983", "Terms of Endearment"],
    ],
    liftedUp: [],
    rooms: [],
    maxPerGuest: 3,
    said: [
      { episode: "s04e03", who: "Bebe Buell", time: "00:39:02", quote: "Jack was my full-fledged boyfriend. Jack Nicholson. I was what they call official and acknowledged." },
      { episode: "s04e03", who: "Bebe Buell", time: "00:39:32", quote: "Jack, I think, now lives a very reclusive, quiet life surrounded by his incredible art collection, which I've had the good fortune to see and have every single piece explained to me." },
      { episode: "s04e03", who: "Bebe Buell", time: "00:58:32", quote: "I consider Jack Nicholson and Mick lifelong friends." },
    ],
  },
  "oprah-winfrey": {
    story:
      "In Chicago, just back from filming The Color Purple, she had James, Sally Randall and friends on her show. It went so badly that it ended up on The Worst of Oprah, and James wrote his first column about it.",
    timeline: [
      ["1954", "Born 29 January in Kosciusko, Mississippi"],
      ["1984", "Takes over AM Chicago"],
      ["1985", "The Color Purple; James, Sally, Anita Sarko, Michael Musto and Benjamin Liu on her show"],
      ["1986", "The Oprah Winfrey Show goes national"],
      ["later", "The club kids' episode turns up on The Worst of Oprah"],
    ],
    liftedUp: [],
    rooms: [],
    said: [
      { episode: "s06e07", who: "Sally Randall", time: "00:21:57", quote: "I do know that the show ended up on The Worst of Oprah. I was very proud of that." },
      { episode: "s06e07", who: "James St. James", time: "00:24:24", quote: "Oprah had just come back after filming The Color Purple. During the commercials, she was signing her autograph in the books. She wouldn't pay any attention to us." },
      { episode: "s06e07", who: "James St. James", time: "00:45:07", quote: "I wrote a sample column and it was, I think it was about when we went on Oprah. And I really enjoyed it." },
    ],
  },
  beyonce: {
    story:
      "She wore Zaldy's gold lamé on a Vanity Fair cover, and on Renaissance she sampled Kevin Aviance's Cunty. He found out when the album dropped and calls it a love letter to the Black queer community.",
    timeline: [
      ["1981", "Born 4 September in Houston"],
      ["1997", "Destiny's Child"],
      ["2003", "Dangerously in Love, her first solo album"],
      ["00s", "On the cover of Vanity Fair's music issue in Zaldy's gold lamé dress"],
      ["2022", "Renaissance samples Kevin Aviance's Cunty"],
    ],
    liftedUp: ["Kevin Aviance"],
    rooms: [],
    said: [
      { episode: "s03e03", who: "Kevin Aviance", time: "00:41:35", quote: "I went to sleep, I woke up, I had the album in my phone, in my computer, I listened to it, I'm like really moved by it. This album's like really touching me." },
      { episode: "s03e03", who: "Kevin Aviance", time: "00:44:55", quote: "It's not just some little track somebody just uses. She was doing something and she was going to follow through with it, and she did. It's a love letter to the Black queer community." },
      { episode: "s04e04", who: "Zaldy", time: "01:01:39", quote: "She wore a dress of mine on the cover of Vanity Fair, which was for the music issue. And that was a really big deal for me. A gold lamé dress." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:41:28", quote: "Gunning to do this girl group and then get out of it and Beyoncé that shit." },
    ],
  },
  "cornelia-guest": {
    story:
      "The uptown debutante of the decade who came downtown, out every night with Andy Warhol's entourage and watching Dynasty at home before Area.",
    timeline: [
      ["1963", "Born in New York, daughter of C. Z. Guest"],
      ["1982", "Named debutante of the decade"],
      ["1982", "On The Nikki Haskell Show at The Best Awards", "https://www.primevideo.com/detail/0RE6DLTJWRWA8WGE6RVXT77UB3"],
      ["80s", "Out with Andy Warhol all over town; runs through Area"],
      ["80s", "Interns on The Nikki Haskell Show"],
      ["1987", "In the front pew at Warhol's memorial"],
    ],
    liftedUp: [],
    rooms: ["Area"],
    said: [
      { episode: "s01e01", who: "Dianne Brill", time: "00:35:38", quote: "I was at Cornelia's with Andy and we're watching Dynasty before going out." },
      { episode: "s01e02", who: "James St. James", time: "00:19:22", quote: "Angela Janklow and Cornelia Guest. They were some of those uptown girls who came downtown." },
      { episode: "s01e04", who: "Peter Gatien", time: "00:26:43", quote: "I remember him and Cornelia Guest, and they sort of had that entourage that, you know, they were all over the place." },
      { episode: "s02e04", who: "James St. James", time: "00:18:30", quote: "There was a Cornelia Guest interview that I loved." },
    ],
  },
  "calvin-klein": {
    story:
      "The designer behind the hip jeans, a Studio 54 regular and an old friend of Christopher Makos, who bought a $10,000 table at Susanne Bartsch's Love Ball.",
    timeline: [
      ["1942", "Born 19 November in the Bronx"],
      ["1968", "Starts his company"],
      ["70s", "Comes into Fiorucci to see what the hip jeans are; in the celebrity corner at Studio 54"],
      ["1987", "At Warhol's memorial with Kelly Klein"],
      ["1989", "Buys a $10,000 table at the Love Ball"],
    ],
    liftedUp: [],
    rooms: ["Studio 54", "Love Ball"],
    said: [
      { episode: "s01e10", who: "Joey Arias", time: "00:12:10", quote: "I remember Calvin Klein coming in there looking what the hip jeans were, because he was looking for jeans." },
      { episode: "s05e06", who: "Christopher Makos", time: "00:29:46", quote: "All of my sort of famous friends, whether it's Calvin Klein, who I've known for a thousand years. What we talk about is between us, always between us." },
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:40:22", quote: "They pay to be on stage so we can make money for them being on stage. And we sell tables for $10,000 to Calvin Klein." },
      { episode: "s02e04", who: "Nikki Haskell", time: "00:49:47", quote: "You saw Andy Warhol and Calvin reaching out to Steve to try to get in the back door of the studio." },
      { episode: "s04e05", who: "Dustin Pittman", time: "00:07:48", quote: "There was a separate area for celebrities, if you want to call them celebrities, whether it's Halston or Calvin or whoever it was, Bianca." },
    ],
  },
  "sarah-jessica-parker": {
    story:
      "She brought Patricia Field into Sex and the City, and together they built Carrie Bradshaw's look. The flower was her own idea.",
    timeline: [
      ["1965", "Born 25 March in Nelsonville, Ohio"],
      ["1995", "Miami Rhapsody, her first film with Patricia Field"],
      ["1998", "Sex and the City: brings Pat Field in to meet Darren Star"],
      ["1998", "Carrie Bradshaw's look, built with Pat Field"],
    ],
    liftedUp: ["Patricia Field"],
    rooms: [],
    maxPerGuest: 3,
    said: [
      { episode: "s03e01", who: "Patricia Field", time: "00:39:57", quote: "Working with Sarah Jessica Parker, she got it immediately. We had fun together. It was like we were playing a game together. And believe me, her input, it was very important to the look." },
      { episode: "s03e01", who: "Patricia Field", time: "00:40:42", quote: "You know, the idea of the flower, she came with that idea." },
      { episode: "s03e01", who: "Patricia Field", time: "00:41:16", quote: "She brought me into Sex and the City because they had made a pilot and nobody liked it. And Sarah Jessica brought me in to meet Darren Star." },
    ],
  },
  "jennie-livingston": {
    story:
      "The director of Paris Is Burning. Chi Chi Valenti kept running into her at the balls, and Luis Xtravaganza remembers how the houses first asked her: why are you here?",
    timeline: [
      ["1962", "Born in Dallas"],
      ["80s", "Films the Harlem balls for years"],
      ["1988", "Chi Chi Valenti keeps running into the shoot while researching Nations for Details"],
      ["1990", "Paris Is Burning"],
      ["1991", "Grand Jury Prize at Sundance"],
    ],
    liftedUp: ["Luis Xtravaganza Camacho"],
    rooms: ["The balls"],
    said: [
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:34:08", quote: "Going to balls and researching that for the piece, of course, I was running into the whole Paris Is Burning shoot. I was running into Jennie Livingston." },
      { episode: "s01e08", who: "Luis Xtravaganza Camacho", time: "00:14:34", quote: "Every time that a Jennie Livingston came in, or a Julie Jewels, or anybody like that came in, it was like, what are you doing here, and why are you here? This is our thing." },
      { episode: "s01e08", who: "Luis Xtravaganza Camacho", time: "00:51:26", quote: "Jennie Livingston, all you guys, the House of Field, that shell was broken open, and there was enough space for you guys to come in and make your mark as well." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:33:56", quote: "My own ego got in the way. And when I pulled back and realized this was not my story." },
    ],
  },
  // Lisa, 24 Nov 2026 (decision card): a short page is fine, only Joey Arias talks about her. Joey's bathroom story stays out.
  "sherry-vine": {
    story:
      "Drag star of the downtown stage. Joey Arias brought her into the Bar d'O line-up with Raven O, and took her on the road, where she went out every night while he stayed in learning his songs.",
    timeline: [
      ["90s", "Joins Joey Arias and Raven O on the Bar d'O stage, after Edwige"],
      ["90s", "Plays Boy Bar"],
      ["Later", "On the road with Joey Arias in Amsterdam"],
    ],
    liftedUp: [],
    rooms: ["Bar d'O", "Boy Bar"],
    said: [
      { episode: "s01e10", who: "Joey Arias", time: "00:49:45", quote: "The original was like Edwige, Raven, and myself. After two months, Edwige had to go, and I got Sherry." },
      { episode: "s01e10", who: "Joey Arias", time: "01:03:46", quote: "We were in Amsterdam, and she would go out. I just waited, there memorizing the songs and crying. She goes, why didn't you come out?" },
    ],
  },
  // Living people batch 6 (daily run, 25 Nov 2026). Left out: the Plaza closet story (Bette Midler, drugs), Zaldy on who held the
  // power on Britney's tour, Richie's Trump make-up joke, and who Jenna Jameson was dating.
  "chloe-sevigny": {
    first: "Chloë's",
    story:
      "The downtown girl the club kids were in awe of. Her first time on camera was Nick Egan's Sugar Kane video for Sonic Youth, and Larry Tee says if you saw her somewhere, you knew you were on the right track.",
    timeline: [
      ["1974", "Born 18 November in Springfield, Massachusetts; grows up in Darien, Connecticut"],
      ["1993", "First time on camera: Sonic Youth's Sugar Kane, directed by Nick Egan"],
      ["1995", "Kids"],
      ["1999", "Boys Don't Cry, an Oscar nomination"],
      ["2010", "Golden Globe for Big Love"],
    ],
    liftedUp: [],
    rooms: ["Sugar Kane video", "Peaches at the Jewish Center"],
    said: [
      { episode: "s05e04", who: "Nick Egan", time: "00:40:48", quote: "That's where Chloë Sevigny's first ever appearance in film was. First time on camera." },
      { episode: "s03e08", who: "Larry Tee", time: "00:48:26", quote: "I knew something was happening, because if you see Chloë Sevigny somewhere, you know you're on the right track." },
      { episode: "s01e09", who: "James St. James", time: "00:05:51", quote: "Chloë always says that she was intimidated by the club kids, but we were always very intimidated by her." },
    ],
  },
  "bette-midler": {
    story:
      "The Divine Miss M started in the basement of the Ansonia, singing to the men in towels at the Continental Baths with Barry Manilow on piano. Bebe Buell, Susan Seidelman and Man Parrish were all in the room.",
    timeline: [
      ["1945", "Born 1 December in Honolulu"],
      ["Early 70s", "Sings at the Continental Baths, Barry Manilow on piano"],
      ["1972", "The Divine Miss M"],
      ["1979", "The Rose, an Oscar nomination"],
      ["1989", "Wind Beneath My Wings"],
      ["2017", "Tony Award for Hello, Dolly!"],
    ],
    liftedUp: ["Barry Manilow"],
    rooms: ["Continental Baths", "Max's Kansas City"],
    said: [
      { episode: "s04e03", who: "Bebe Buell", time: "00:42:17", quote: "Once Bette started to sing, everybody would gather into this front room. She was unbelievable. She would come out sometimes just in a towel and a pair of kitten heels and blow your mind." },
      { episode: "s04e09", who: "Susan Seidelman", time: "00:23:36", quote: "It was just people in towels walking down the runway with Bette Midler and Barry Manilow playing, and my job was to pin the towel around people so that it wouldn't fall off. Some did." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:07:13", quote: "The basement was the Continental Baths. I couldn't have been in a more appropriate college situation. That's where Bette Midler was." },
    ],
  },
  "rosie-o-donnell": {
    first: "Rosie's",
    story:
      "Michael Musto and Michelangelo Signorile kept telling her to come out. She was furious, called Michelangelo a moron on Larry King, then came out, told Musto it was for him, and spoke first at his roast.",
    timeline: [
      ["1962", "Born 21 March in Commack, New York"],
      ["1996", "The Rosie O'Donnell Show starts"],
      ["2002", "Comes out publicly"],
      ["2006", "Joins The View"],
    ],
    liftedUp: [],
    rooms: ["The Village Voice columns", "OutWeek"],
    said: [
      { episode: "s01e02", who: "Michael Musto", time: "00:25:10", quote: "After that, Rosie came out to me. She goes, that was for you. And she was the first speaker at my roast." },
      { episode: "s02e08", who: "Michelangelo Signorile", time: "00:57:31", quote: "I remember Rosie, she was infuriated. She went on Larry King, she called me a moron. And eventually Rosie is writing me, and we're friends, and she's out." },
      { episode: "s02e08", who: "James St. James", time: "00:56:02", quote: "Of those people that you and Musto were wanting to come out, Rosie and Ellen and even Liz Smith, they all eventually came to even befriend you." },
    ],
  },
  "david-letterman": {
    story:
      "The late-night host every nightlife star wanted. Dianne Brill went on his show the night she was on the cover of the New York Post, and Sally Randall became one of the very few people who ever said no.",
    timeline: [
      ["1947", "Born 12 April in Indianapolis"],
      ["1982", "Late Night with David Letterman on NBC"],
      ["80s", "Dianne Brill on the show, the night of her New York Post cover"],
      ["1993", "The Late Show on CBS, until 2015"],
    ],
    liftedUp: [],
    rooms: ["Late Night"],
    said: [
      { episode: "s01e01", who: "Dianne Brill", time: "00:40:19", quote: "I was on the cover of the New York Post the day, the night that I was doing the David Letterman show." },
      { episode: "s06e07", who: "Sally Randall", time: "00:34:48", quote: "What I did notice was at what point I realized that this was not what I had planned to do in New York. And that was when David Letterman called me." },
      { episode: "s06e07", who: "Sally Randall", time: "00:36:06", quote: "She said only three other people have ever turned down David Letterman, and one of them was Cher. And I said, if I do the show, everyone will forever know me as a door person, and I'll never be able to go back to being an artist." },
    ],
  },
  "pauley-perrette": {
    first: "Pauley's",
    story:
      "Before she was Abby on NCIS she worked the nightclubs: a waitress at the Palladium, then the bartender with the shaved head at Club USA, where she and Richie Rich made up the Raspberry Smash.",
    timeline: [
      ["1969", "Born 27 March in New Orleans"],
      ["80s", "Waitress at the Palladium, in the Mike Todd Room crowd"],
      ["90s", "Bartender at Club USA, going to auditions on the side"],
      ["2003", "Abby Sciuto on NCIS, until 2018"],
    ],
    liftedUp: [],
    rooms: ["Palladium", "Mike Todd Room", "Club USA"],
    said: [
      { episode: "s04e08", who: "Richie Rich", time: "00:39:37", quote: "Pauley was a bartender. She had a shaved head, and she was going to science school. And she's like, to make money, I'm going to go to acting auditions. And she ended up being Pauley Perrette." },
      { episode: "s04e07", who: "James St. James", time: "00:30:54", quote: "The Mike Todd Room, that was totally glam. That was Anita Sarko, and Lisa Edelstein was doing the bar, and Pauley Perrette." },
      { episode: "s01e03", who: "Lisa Edelstein", time: "00:23:05", quote: "I knew that Pauley and I knew each other, but I didn't know that I knew Pauley." },
    ],
  },
  "shawn-hausman": {
    story:
      "Eric Goode's high-school friend. Steve Mass gave the pair their start with the basement room at the Mudd Club, then they made Area together, and Shawn went on to design the Standard hotels.",
    timeline: [
      ["Late 70s", "With Eric Goode, turns the Mudd Club basement by the coat check into a room"],
      ["1983", "Area opens, with Eric and Christopher Goode and Darius Azari"],
      ["Later", "Designs the Standard hotels around the world"],
    ],
    liftedUp: [],
    rooms: ["Mudd Club", "Area", "Standard Hotels"],
    said: [
      { episode: "s03e06", who: "Eric Goode", time: "00:07:17", quote: "That was Shawn Hausman, who went on to design all the Standard hotels around the world. My dear high school friend, that I later collaborated with on Area." },
      { episode: "s02e11", who: "Richard Boch", time: "00:17:10", quote: "Steve Mass, the owner of the Mudd Club, gave Eric and Shawn their start, really. The basement really was just a coat check." },
      { episode: "s02e11", who: "Richard Boch", time: "00:17:38", quote: "They did a ceiling, they did a marble effect on the floor, they treated the walls. So it became, in a way, one of their first installations." },
    ],
  },
  "geraldo-rivera": {
    story:
      "The talk-show host who put the club kids on daytime TV. Richie Rich walked off his set when he would only talk about drugs, came back when Geraldo begged, and gave him make-up advice.",
    timeline: [
      ["1943", "Born 4 July in New York"],
      ["1987", "Geraldo, his daytime talk show, until 1998"],
      ["90s", "Has the club kids on the show"],
    ],
    liftedUp: [],
    rooms: ["Geraldo"],
    said: [
      { episode: "s04e08", who: "Richie Rich", time: "00:30:55", quote: "All he wanted to talk about was drugs. And I'm like, I don't do drugs. I look at this as a launching pad for fashion and music and fun. And he wouldn't stop, so I walked off. Then Geraldo comes backstage: please come back, I promise I'll respect what you all do. And I'm like, okay. But you need a new makeup artist, honey." },
      { episode: "s04e08", who: "Richie Rich", time: "00:31:31", quote: "I wasn't being shady, I was just being kind. I was giving him fashion advice." },
      { episode: "s04e08", who: "James St. James", time: "00:28:12", quote: "It's so funny, the Joan Rivers and the Phil Donahues and all the Geraldos. Who would have ever thought, 35 years later?" },
    ],
  },
  "jenna-jameson": {
    story:
      "She walked for Heatherette, Richie Rich's label, in the same show as Kim Kardashian. Of all the names Richie dropped at Christmas dinner, she was the only one his straight brothers knew.",
    timeline: [
      ["1974", "Born 9 April in Las Vegas"],
      ["2000s", "Walks for Heatherette"],
      ["2004", "Her memoir, a New York Times bestseller"],
    ],
    liftedUp: [],
    rooms: ["Heatherette"],
    said: [
      { episode: "s04e08", who: "Richie Rich", time: "00:51:14", quote: "I have two older brothers. They're straight-laced dudes, wives and kids. They're like, oh, little bro, it's cool what you do. They don't really get it." },
      { episode: "s04e08", who: "Richie Rich", time: "00:51:30", quote: "I mentioned Jenna, and they were not impressed by anybody, but their eyes bulged out of their face." },
      { episode: "s04e08", who: "James St. James", time: "00:51:53", quote: "Straight boys know who Jenna Jameson is." },
    ],
  },
  "britney-spears": {
    story:
      "Zaldy dressed her Femme Fatale tour and still remembers walking into rehearsal to hear her alone on the mic, a cappella. Mickey Boardman's crowd went to Vegas just to see her.",
    timeline: [
      ["1981", "Born 2 December in McComb, Mississippi"],
      ["1998", "...Baby One More Time"],
      ["2011", "Femme Fatale Tour, costumes by Zaldy"],
      ["2013", "Piece of Me in Las Vegas"],
      ["2023", "The Woman in Me"],
    ],
    liftedUp: [],
    rooms: ["Las Vegas"],
    said: [
      { episode: "s04e04", who: "Zaldy", time: "01:00:09", quote: "One day I walked into the rehearsal studio from lunch, and I was like, who's singing? And it was just Britney alone, a cappella on the mic. And I was like, wow, she can really, really sing." },
      { episode: "s04e04", who: "Zaldy", time: "01:01:00", quote: "It was Britney Spears, another person who I absolutely love and treasure." },
      { episode: "s04e02", who: "Mickey Boardman", time: "00:39:37", quote: "My friend was getting married and did his gay bachelor party in Las Vegas. So we went one night to see Britney Spears." },
    ],
  },
  "diana-ross": {
    story:
      "The diva the room measured itself against. Michael Schmidt came to New York to see her sing in the rain in Central Park, Lauren Ezersky saw her walk by at Studio 54, and she turned down It's Raining Men.",
    timeline: [
      ["1944", "Born 26 March in Detroit"],
      ["60s", "The Supremes"],
      ["1970", "Goes solo"],
      ["1982", "Turns down It's Raining Men, Martha Wash is told"],
      ["1983", "Sings in the rain in Central Park, July"],
      ["2016", "Presidential Medal of Freedom"],
    ],
    liftedUp: [],
    rooms: ["Studio 54", "Central Park", "Sound Factory"],
    said: [
      { episode: "s02e06", who: "Michael Schmidt", time: "00:06:02", quote: "I went to New York in July of 83 to see Diana Ross in Central Park. And it was the greatest thing I've ever seen. It actually is the reason I do what I do today." },
      { episode: "s04e06", who: "Lauren Ezersky", time: "00:13:33", quote: "I would walk around and be, oh my God, there's Diana Ross. There was Princess Grace, there was Gregory Peck, just walking around." },
      { episode: "s03e02", who: "Martha Wash", time: "00:17:35", quote: "He said that Barbra Streisand turned it down, Donna Summer turned it down, Diana Ross turned it down, Cher turned it down." },
      { episode: "s01e01", who: "Randy Barbato", time: "00:06:32", quote: "I remember that so clearly, because it was like Diana Ross entered the room." },
    ],
  },
  // Living people batch 7 (daily run, 26 Nov 2026). Left out: the acid trip at the Burgess Meredith party, Leo's "pretend you
  // don't know me" story, James's knees joke to Leo, Jenny's dating gossip, and Connie's word for herself in Meisel's message.
  "lady-gaga": {
    story:
      "The pop star the club kids' look ended up on. Michael Schmidt made her bubble dress in fifteen minutes on a LaChapelle shoot, Zaldy and Desi Santiago dressed her tours, and James sees the club kid aesthetic in ballroom after ten years of her.",
    timeline: [
      ["1986", "Born 28 March in New York"],
      ["2008", "The Fame"],
      ["2009", "Rolling Stone cover in Michael Schmidt's bubbles, shot by David LaChapelle"],
      ["2009", "The Monster Ball Tour, costumes by Zaldy"],
      ["2019", "Oscar for Shallow"],
    ],
    liftedUp: [],
    rooms: ["Paper", "Rolling Stone", "The Monster Ball Tour"],
    said: [
      { episode: "s02e06", who: "Michael Schmidt", time: "00:43:19", quote: "So I said, okay, give me 15 minutes. I ran around the studio and found these little plastic bubbles, drilled them out, sewed them together, and then scotch taped them to her body. And that became the Rolling Stone cover." },
      { episode: "s04e02", who: "Mickey Boardman", time: "00:22:35", quote: "When we did Lady Gaga for the cover, Justin, our editor-in-chief, interviewed her, and he's like the biggest Lady Gaga stan ever. That's why he wrote it, not because he has a master's in journalism." },
      { episode: "s06e09", who: "Desi Santiago", time: "00:04:52", quote: "All the pop star tours, like Gaga, Britney, Michael, I was there for as well." },
      { episode: "s01e08", who: "James St. James", time: "00:50:39", quote: "After ten years of Lady Gaga and Nicki Minaj and Katy Perry and Moschino, the club kid aesthetic is a part of the ballroom scene now. Maybe we were ahead of our times." },
    ],
  },
  "bob-colacello": {
    story:
      "Andy Warhol's right hand at the later Factory and the editor of Interview. Sylvia Miles introduced him to Michael Musto, and his book Holy Terror tells its own version of how everybody met.",
    timeline: [
      ["1947", "Born in Brooklyn"],
      ["1971", "Edits Interview, until 1983"],
      ["70s", "Sent to the Gilded Grape for the Ladies and Gentlemen sitters"],
      ["1990", "Holy Terror: Andy Warhol Close Up"],
      ["Later", "Writes for Vanity Fair"],
    ],
    liftedUp: [],
    rooms: ["The Factory", "Interview", "Gilded Grape"],
    said: [
      { episode: "s01e02", who: "Michael Musto", time: "00:09:07", quote: "Nobody worked a room like Sylvia, and she knew everyone, and she introduced me to Bob Colacello." },
      { episode: "s05e06", who: "Christopher Makos", time: "00:14:56", quote: "I'm not questioning Bob's story, but there's a lot of stories that we all have. And that was his story." },
      { episode: "s04e05", who: "Dustin Pittman", time: "00:47:49", quote: "It was more of a business thing. Andy was doing portraits, and Bob Colacello was trying to sell to the celebrities." },
      { episode: "s02e10", who: "James St. James", time: "00:25:27", quote: "The Gilded Grape famously is where Andy Warhol sent Bob Colacello to get the trans women for his Ladies and Gentlemen series." },
    ],
  },
  "steven-meisel": {
    story:
      "The fashion photographer who kept finding the club kids. Limelight's first cool party was for him and Teri Toye, he gave Zaldy his first modelling job, and he spotted Jenny Talia in the Gaultier show and Connie Fleming at Pat Field's ball.",
    timeline: [
      ["1954", "Born 5 June in New York"],
      ["80s", "Limelight's first big cool party, for him and Teri Toye"],
      ["80s", "Shoots Zaldy's first modelling job, for Interview"],
      ["1988", "Starts his run of Italian Vogue covers"],
      ["1992", "Madonna's Sex"],
      ["90s", "Calvin Klein campaign with Jenny Talia"],
    ],
    liftedUp: ["Zaldy", "Jenny Talia", "Connie Fleming"],
    rooms: ["Limelight", "Interview", "Italian Vogue", "Details"],
    said: [
      { episode: "s01e02", who: "Michael Musto", time: "01:01:39", quote: "One of the first big kind of cool parties they had was something for Teri Toye and Steven Meisel." },
      { episode: "s04e04", who: "Zaldy", time: "00:37:47", quote: "They pushed me towards my first modeling job, which was with Steven Meisel for Interview Magazine. Not a bad way to start." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:20:49", quote: "So basically, what happened was Steven Meisel saw me in the Gaultier show." },
      { episode: "s05e04", who: "Nick Egan", time: "00:58:02", quote: "Details had Steven Meisel take some photos for them. And Italian Vogue was a very big influence on everyone. Those really beautifully shot, but austere shots." },
    ],
  },
  "billy-idol": {
    story:
      "The punk from London who moved to New York and held court upstairs in the Limelight library. Musto, James and Christina Visca all remember finding him there.",
    timeline: [
      ["1955", "Born 30 November in Stanmore, Middlesex"],
      ["1976", "Generation X"],
      ["1981", "Moves to New York"],
      ["1982", "White Wedding"],
      ["1983", "Rebel Yell"],
      ["80s", "A regular in the Limelight library"],
    ],
    liftedUp: [],
    rooms: ["Limelight library"],
    said: [
      { episode: "s01e02", who: "James St. James", time: "01:01:51", quote: "You could always find a Billy Idol and Perri Lister or somebody in that library." },
      { episode: "s06e02", who: "Christina Visca", time: "00:13:31", quote: "Up in the library, it was just VIP galore. Actors and singers. Billy Idol was there, Michael Douglas was there, everybody was there." },
      { episode: "s01e04", who: "James St. James", time: "00:29:01", quote: "I always remember Billy Idol being there. I remember meeting Drew Barrymore as a ten-year-old, she was up there." },
    ],
  },
  "idalis-deleo-n": {
    first: "Idalis's",
    story:
      "The Palladium bartender who taught Lisa Edelstein how to make her hair bigger, then became the first girl hired for Seduction and passed the audition on to her best friend, Michelle Visage.",
    timeline: [
      ["80s", "Bartender at the Palladium"],
      ["1988", "The first girl hired for Seduction; tells Michelle Visage about the audition"],
      ["90s", "VJ on MTV"],
    ],
    liftedUp: ["Michelle Visage", "Lisa Edelstein"],
    rooms: ["Palladium", "Seduction", "MTV"],
    said: [
      { episode: "s01e03", who: "Lisa Edelstein", time: "00:23:18", quote: "I loved Idalis because we had the perfect girl conversation in the mid 80s: she taught me how to make my hair bigger." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:42:02", quote: "Idalis was the only one that had been hired. And she was my best friend. And she told me about it." },
      { episode: "s02e01", who: "James St. James", time: "00:42:34", quote: "She and Lisa really sort of mentored Lisa E when she was a bartender at the Palladium. She's such a beautiful, beautiful girl." },
    ],
  },
  "norma-kamali": {
    story:
      "The designer everyone downtown wanted. Lauren Ezersky wore her swimsuits and cover-ups, she shopped at Susanne Bartsch's store, and James wore her gown to the opening of the Palladium.",
    timeline: [
      ["1945", "Born 27 June in New York"],
      ["Late 60s", "Opens her first shop"],
      ["1973", "The sleeping bag coat"],
      ["1976", "Farrah Fawcett's red swimsuit"],
      ["1985", "James wears her gown to the Palladium opening"],
    ],
    liftedUp: [],
    rooms: ["Susanne Bartsch's store", "Palladium"],
    said: [
      { episode: "s04e06", who: "Lauren Ezersky", time: "00:15:09", quote: "The biggest at that time was Kamali. She did that big coat, which I never had. But I would wear her swimsuits and cover-ups, and that was like my outfit." },
      { episode: "s04e06", who: "Lauren Ezersky", time: "00:15:36", quote: "The hot one, I'm telling you, was Norma Kamali. That was it." },
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:21:24", quote: "Norma Kamali would come there and shop." },
      { episode: "s06e07", who: "James St. James", time: "00:05:23", quote: "All the Pyramid people. Me in my Norma Kamali gown, high heels." },
    ],
  },
  "leonardo-dicaprio": {
    first: "Leo's",
    story:
      "A teenage actor in the Tunnel days, when he was in New York making The Basketball Diaries. Richie Rich looked after him at the clubs and, years later, got a call that he wanted to come to Richie's party.",
    timeline: [
      ["1974", "Born 11 November in Los Angeles"],
      ["1994", "In New York shooting The Basketball Diaries; at the Tunnel"],
      ["1997", "Titanic"],
      ["2016", "Oscar for The Revenant"],
    ],
    liftedUp: [],
    rooms: ["Tunnel", "Club USA"],
    said: [
      { episode: "s04e08", who: "Richie Rich", time: "00:42:51", quote: "Tunnel on Fridays was great at that point, because that's when Leonardo DiCaprio and Marky Mark and Juliette Lewis were doing a movie, The Basketball Diaries. We were taking care of that." },
      { episode: "s04e08", who: "Richie Rich", time: "00:44:12", quote: "Leonardo DiCaprio wants to come to your party tonight with Tobey Maguire. And I thought it was a crank call. Click. And then they called back: no, this is really real." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:16:31", quote: "I kind of went a little bit later, like Leonardo DiCaprio." },
    ],
  },
  "richard-hell": {
    story:
      "The punk who gave the world safety pins. He played Eric in Susan Seidelman's Smithereens, and she found that the punk rock heartbreaker was also serious about the work and a real film buff.",
    timeline: [
      ["1949", "Born Richard Meyers, 2 October, in Lexington, Kentucky"],
      ["1973", "Starts Television with Tom Verlaine"],
      ["1977", "Blank Generation, with the Voidoids"],
      ["1977", "One of the first punks through the door of Manic Panic"],
      ["1982", "Smithereens"],
    ],
    liftedUp: [],
    rooms: ["CBGB", "Manic Panic", "Cinemabilia"],
    said: [
      { episode: "s04e09", who: "Susan Seidelman", time: "00:10:51", quote: "He knows it and he plays on that. I was really nervous he wouldn't show up. When you're making this kind of movie with such a limited budget, you have to make sure everyone shows up." },
      { episode: "s04e09", who: "Susan Seidelman", time: "00:11:21", quote: "I was also surprised to find that he was a real cinephile. He had worked at Cinemabilia. It was the best film bookstore." },
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:20:14", quote: "We gave them Richard Hell and safety pins, and they gave us corsets, basically. So thank you." },
    ],
  },
  "patti-smith": {
    story:
      "The poet of CBGB. She was on stage in Jackie Curtis's Femme Fatale with Jayne County, everybody downtown loved her, and Brad Gooch remembers her and Robert Mapplethorpe as two young artists who understood about making it.",
    timeline: [
      ["1946", "Born 30 December in Chicago"],
      ["1970", "On stage with Jayne County in Jackie Curtis's Femme Fatale"],
      ["1975", "Horses"],
      ["1978", "Because the Night"],
      ["2010", "Just Kids wins the National Book Award"],
    ],
    liftedUp: [],
    rooms: ["CBGB", "Max's Kansas City", "La MaMa"],
    said: [
      { episode: "s02e02", who: "Jayne County", time: "00:22:48", quote: "And Patti Smith was in the play as well. She played a mafia member." },
      { episode: "s04e10", who: "Ann Magnuson", time: "00:33:24", quote: "There were so many different little cliques and scenes, but everybody loved Devo, Patti Smith, the Ramones." },
      { episode: "s05e05", who: "Brad Gooch", time: "00:20:58", quote: "Patti and Robert were young, and Keith was young, and they understood about making it and all of that." },
      { episode: "s05e05", who: "Fenton Bailey", time: "00:18:55", quote: "Patti Smith, for example, did not like the film at all. What we saw in him was this clarity, this focus and this ambition." },
    ],
  },
  "cindy-adams": {
    story:
      "The New York Post gossip columnist who still writes every day. The PR men knew exactly what she wanted: Michelangelo Signorile says you gave Cindy her schmaltz.",
    timeline: [
      ["1930", "Born 24 April in New York"],
      ["1979", "Starts her column in the New York Post"],
      ["80s", "The publicists write their items in her style"],
      ["Today", "Still writes every day"],
    ],
    liftedUp: [],
    rooms: ["New York Post"],
    said: [
      { episode: "s02e08", who: "Michelangelo Signorile", time: "00:16:33", quote: "You had to give Cindy Adams all of her kind of Cindy Adams schmaltz, very trashy and flashy kind of stuff. So we always knew who wanted what." },
      { episode: "s02e08", who: "James St. James", time: "00:12:52", quote: "So if Page Six doesn't take it, then you send it to Suzy. If Suzy doesn't take it, it goes to Cindy Adams." },
      { episode: "s06e08", who: "William Norwich", time: "00:59:13", quote: "I wrote every day and Liz Smith wrote every day. And even now, Cindy Adams writes every day." },
    ],
  },
  // Batch 8 (daily run 27 Nov 2026): Nick Cave to Ian Schrager, strictly by mentions.
  "nick-cave": {
    story:
      "The artist of the Soundsuits, not the singer. In Kansas City he was Michael Schmidt's teenage friend 'Nikki', the first person who showed Michael that art is a way of life.",
    timeline: [
      ["1959", "Born in Fulton, Missouri"],
      ["Mid 70s", "Teenage friends with Michael Schmidt in Kansas City, sewing clothes"],
      ["1982", "Graduates from the Kansas City Art Institute"],
      ["1992", "Makes his first Soundsuit, after the Rodney King beating"],
      ["2023", "Forothermore, his retrospective, at the Guggenheim in New York"],
    ],
    liftedUp: [],
    rooms: ["Kansas City Art Institute"],
    said: [
      { episode: "s02e06", who: "James St. James", time: "00:11:48", quote: "This isn't the singer Nick Cave, this is the artist Nick Cave. Google Nick Cave artist Soundsuits, because he creates these looks that I always say are Bigfoot meets Leigh Bowery." },
      { episode: "s02e06", who: "Michael Schmidt", time: "00:13:11", quote: "I never really understood prior to being with Nikki that art was a way of life. It wasn't just something you made that hung on a wall, or was a sculpture, or was worn." },
      { episode: "s02e06", who: "Michael Schmidt", time: "00:13:35", quote: "He was very much an influencer on my way of thinking about how anything could be art, anything could be fashion, as long as you brought a distinctive eye." },
    ],
  },
  "kate-moss": {
    story:
      "The new face from Croydon. Zaldy did an early i-D shoot with her when she was 16, and Jenny Talia woke up to find herself on a full page of Vogue, next to Kate in a Calvin Klein campaign.",
    timeline: [
      ["1974", "Born 16 January in Croydon, south London"],
      ["1988", "Spotted at JFK airport by Sarah Doukas of Storm"],
      ["1990", "On the cover of The Face, shot by Corinne Day"],
      ["Early 90s", "An early i-D shoot with Zaldy"],
      ["1992", "The face of Calvin Klein"],
    ],
    liftedUp: [],
    rooms: ["i-D", "The Face", "Vogue", "Calvin Klein"],
    said: [
      { episode: "s04e04", who: "Zaldy", time: "00:46:17", quote: "An early i-D shoot with Kate Moss, you know, like weird, weird thing. The new face, Kate Moss, doing doubles." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:21:18", quote: "This was the one before, where it was me. It was full page, single. Me, Kate Moss, and two guys. I don't remember who the guys were." },
      { episode: "s02e07", who: "Jenny Talia", time: "00:21:42", quote: "Someone said, have you seen Vogue? And I said, no. And they said, you're on a full page in Vogue. Like next to Kate, with Kate Moss on the second page." },
    ],
  },
  "tracey-africa": {
    story:
      "The Black trans model on the Clairol box in the 70s, from the House of Africa. When Connie Fleming was starting out, the girls before her were only talked about in hushed tones, and Tracey was one of them.",
    timeline: [
      ["1952", "Born in Newark, New Jersey"],
      ["1975", "Her face is on the Clairol Born Beautiful hair colour box"],
      ["Late 70s", "Moves to Paris, gets an agent and models there"],
      ["2015", "Tells her own story to New York magazine"],
      ["2016", "Clairol brings her back for a new campaign"],
    ],
    liftedUp: [],
    rooms: ["House of Africa", "Clairol", "Paris"],
    said: [
      { episode: "s02e05", who: "James St. James", time: "00:26:40", quote: "Back in the 70s, Tracey Africa, a trans woman, was on a bottle of Clairol hair dye that women all over the country bought, but nobody knew that this was a trans woman except for in the community." },
      { episode: "s02e05", who: "Connie Fleming", time: "00:26:25", quote: "Very secretive and in very hushed tones. So I think I saw Tracey once, and I think DeAndre introduced me to her." },
      { episode: "s02e05", who: "Connie Fleming", time: "00:27:22", quote: "She went to Paris, got an agent there, started to model, and she was a fit model for Givenchy. And she came back, built her book there." },
    ],
  },
  "elizabeth-saltzman": {
    story:
      "Fashion editor and stylist, part of the Details crew in the 80s. She organised the night the Downtown crowd went on Oprah, and gave the answer the audience still remembers.",
    timeline: [
      ["80s", "Out every night with the Details crew"],
      ["Late 80s", "Organises the Downtown night people's visit to the Oprah show"],
      ["90s", "Fashion director at Vanity Fair"],
      ["2000s", "Stylist to Gwyneth Paltrow and others"],
    ],
    liftedUp: [],
    rooms: ["Details", "Vanity Fair", "The Oprah Winfrey Show"],
    said: [
      { episode: "s06e07", who: "Sally Randall", time: "00:21:38", quote: "Elizabeth Saltzman. Elizabeth Saltzman was the one who organized everything." },
      { episode: "s06e07", who: "Sally Randall", time: "00:23:30", quote: "I don't remember what the first part of it was, but the last part of it was that we'd read magazine articles, look for pictures of ourselves." },
      { episode: "s04e07", who: "James St. James", time: "00:53:56", quote: "One of the audience members asked, what do you do during the day? And Elizabeth Saltzman said, well, I wake up around noon and then look at my press clippings to see where I was last night. And that is sort of what it was at the time." },
    ],
  },
  "donna-karan": {
    story:
      "The New York designer of Seven Easy Pieces. Zaldy and Mathu walked as the House of Donna Karan at the first Love Ball, and she said yes to Lauren Ezersky's very first interview for Paper.",
    timeline: [
      ["1948", "Born in Forest Hills, Queens"],
      ["1974", "Head designer at Anne Klein"],
      ["1985", "Her own label, with Seven Easy Pieces"],
      ["1989", "DKNY; Zaldy and Mathu's House of Donna Karan at the first Love Ball"],
      ["2007", "Starts Urban Zen"],
    ],
    liftedUp: ["Lauren Ezersky"],
    rooms: ["Anne Klein", "DKNY", "Love Ball", "Paper"],
    said: [
      { episode: "s04e04", who: "James St. James", time: "00:31:42", quote: "That first Love Ball, where you did that outfit. It was the House of Donna Karan. It was those nude illusion bodysuits with the blobs." },
      { episode: "s04e04", who: "Zaldy", time: "00:32:31", quote: "The concept was: let's transform from human to alien. We did it like it was a regular Donna Karan fashion show, and then the music changed, and all of this came off." },
      { episode: "s04e06", who: "Lauren Ezersky", time: "00:23:46", quote: "She goes, go do Donna Karan. If you can do Donna Karan and I like it, I'll print it. I said, okay. I called up Donna Karan. Somehow they said yes, come on. It was my first interview." },
    ],
  },
  "philip-sallon": {
    story:
      "London club host from the Blitz days, friend of Boy George and Marilyn, and the man behind the Mud Club. Nick Egan loves him; James and Jodie Harsh have both had his famous turned back.",
    timeline: [
      ["Late 70s", "Part of the Blitz crowd with Boy George and Marilyn"],
      ["80s", "Runs the Mud Club in London"],
      ["80s", "Keeps calling Nick Egan until he gives in and DJs"],
    ],
    liftedUp: ["Nick Egan"],
    rooms: ["Mud Club", "Blitz"],
    said: [
      { episode: "s05e04", who: "Nick Egan", time: "00:26:15", quote: "They used to call me the King of the Queens, because all my friends were Philip Sallon, Marilyn, Boy George, Denzil." },
      { episode: "s05e04", who: "Nick Egan", time: "00:28:03", quote: "Philip, I love Philip. He used to drive me crazy because he wanted me to DJ, do all these things in there, and he would call me endlessly, over and over and over again. And in the end, I'd give in." },
      { episode: "s05e02", who: "James St. James", time: "00:14:34", quote: "I went up to Philip Sallon and I jumped up and down, hi, how are you, how are you, and he turned his back on me and wouldn't speak to me." },
      { episode: "s05e02", who: "Jodie Harsh", time: "00:14:47", quote: "Philip Sallon still does that all the time. I've seen him so many times over the past year, but he's like, hmm." },
    ],
  },
  "anna-wintour": {
    story:
      "Vogue's editor since 1988. William Norwich had the office across from hers and swears she has the driest sense of humour in the world, and Cat Marnell's first time in print was a letter to her Vogue.",
    timeline: [
      ["1949", "Born 3 November in London"],
      ["1985", "Editor of British Vogue"],
      ["1988", "Editor-in-chief of American Vogue"],
      ["1995", "Starts chairing the Met Gala"],
      ["2013", "Artistic director of Condé Nast"],
    ],
    liftedUp: [],
    rooms: ["Vogue", "Condé Nast", "Met Gala"],
    said: [
      { episode: "s06e08", who: "William Norwich", time: "00:52:38", quote: "For me, Anna Wintour has the best sense of humor in the world, dry as paper. And a little British about it." },
      { episode: "s06e08", who: "William Norwich", time: "00:53:02", quote: "I said, it's not ringing, Anna. And she said, I know you worry a lot, and I don't want you to worry. I will always be able to get you a job in the market department at Brides." },
      { episode: "s03e09", who: "Cat Marnell", time: "00:14:38", quote: "Anna came in to save Courtney. I wrote her a letter being like, dear Vogue, thank you so much for publishing this about my favorite rock star and showing her in a new light." },
      { episode: "s05e04", who: "James St. James", time: "00:43:18", quote: "People still talk about that collection to this day. There was just a show about Anna Wintour, and all the supermodels were still going on and on about that one show." },
    ],
  },
  "tony-defries": {
    story:
      "David Bowie's manager and the boss of MainMan, the company with as many famous characters as any. Cherry Vanilla carried out the plan that made Bowie unreachable, and Man Parrish signed with him years later.",
    timeline: [
      ["1970", "Becomes David Bowie's manager"],
      ["1972", "MainMan; Cherry Vanilla does the publicity for Ziggy Stardust in America"],
      ["1975", "Bowie leaves MainMan"],
      ["80s", "Signs Man Parrish"],
    ],
    liftedUp: ["Cherry Vanilla", "Jayne County"],
    rooms: ["MainMan"],
    said: [
      { episode: "s03e05", who: "Cherry Vanilla", time: "00:52:36", quote: "Tony DeFries and David were very clever, and they created a scene that I had to carry out, where David wasn't available to anybody. He had two bodyguards, but there weren't all that many people wanting him yet." },
      { episode: "s03e05", who: "James St. James", time: "00:57:41", quote: "Tony Zanetta, Tony DeFries and Tony Ingrassia are the three Tonys I hear about all the time." },
      { episode: "s03e04", who: "Man Parrish", time: "00:48:02", quote: "I got involved with David Bowie's manager. Tony DeFries, his infamous manager, wound up wanting to produce a friend of mine. I got signed up with Tony DeFries. I put out a rock and roll kind of thing." },
    ],
  },
  "philip-glass": {
    story:
      "The composer played the Mudd Club and kept coming back as a regular, with friends like his sax player Dickie Landry. James had him on his fantasy dinner-party list.",
    timeline: [
      ["1937", "Born 31 January in Baltimore"],
      ["1968", "Starts the Philip Glass Ensemble"],
      ["1976", "Einstein on the Beach, with Robert Wilson"],
      ["1980", "Plays the Mudd Club and comes back as a regular"],
      ["1982", "Koyaanisqatsi"],
    ],
    liftedUp: [],
    rooms: ["Mudd Club"],
    said: [
      { episode: "s02e11", who: "Richard Boch", time: "00:30:23", quote: "Glass was someone who would also come there. And a lot of his friends, like Dickie Landry, who was his sax player, was at the Mudd Club all the time. Dickie famously played sax in Einstein on the Beach." },
      { episode: "s02e11", who: "Richard Boch", time: "00:30:40", quote: "Rebecca Christiansen, who was married to Donnie Christiansen then, they would often come there. And Rebecca is still one of Phil's closest associates today." },
      { episode: "s06e01", who: "James St. James", time: "00:20:09", quote: "I had fantasy dinner parties I want to have someday. And it would be like Divine, Martha Graham, Andy Warhol, Philip Glass and Howie Montaug." },
    ],
  },
  "ian-schrager": {
    story:
      "Steve Rubell's partner at Studio 54 and the Palladium, who went on to invent the boutique hotel. He brought Peter Gatien to the Times Square theatre that became Club USA.",
    timeline: [
      ["1946", "Born 19 July in Brooklyn"],
      ["1977", "Opens Studio 54 with Steve Rubell"],
      ["1985", "The Palladium, with Steve Rubell"],
      ["1988", "The Royalton, then the Paramount: the boutique hotel"],
      ["1992", "Brings Peter Gatien to the theatre that becomes Club USA"],
    ],
    liftedUp: ["Peter Gatien"],
    rooms: ["Studio 54", "Palladium", "Morgans", "Royalton", "Paramount", "Club USA"],
    said: [
      { episode: "s04e05", who: "Dustin Pittman", time: "00:07:48", quote: "I was lucky enough to have all access to Studio. I knew Ian and Steve very well." },
      { episode: "s06e07", who: "James St. James", time: "00:08:29", quote: "When Steve Rubell and Ian Schrager got out of prison, I think they saw what was happening in culture in general, but also at Area. And they said, we're going to do the biggest club you've ever seen, and it is going to be art." },
      { episode: "s01e04", who: "Peter Gatien", time: "00:36:56", quote: "Ian Schrager was in partners with the guys that owned that property. They also owned the Paramount at the time, and the Royalton. So Ian introduced me to the guy who owned the building." },
    ],
  },
  // Batch 9 (daily run 28 Nov 2026): Sade to Linda Evangelista, strictly by mentions. Kelly Osbourne, Steven Tyler and
  // Gloria Gaynor wait for Lisa (short lists). Left out under the living-people rule: Liv Tyler's father story (S04E03),
  // the poppers dinner and the "I Am What I Am" session remark about Gloria Gaynor (S02E07, S03E04), the ayahuasca story (S01E04).
  sade: {
    story:
      "The British singer played her first American show at Danceteria - Rudolf Piper paid $3,000 to bring her over, his limit for a band - though she never tended bar there, whatever James had read. James simply couldn't picture her and Madonna working the same club.",
    timeline: [
      ["1959", "Born Helen Folasade Adu on 16 January in Ibadan, Nigeria, and grows up in England"],
      ["1982", "Starts the band Sade in London"],
      ["1984", "Diamond Life, with Smooth Operator"],
      ["1980s", "First American show, at Danceteria"],
      ["1985", "Promise, the second album"],
      ["1986", "Grammy for Best New Artist"],
      ["1992", "Love Deluxe, with No Ordinary Love"],
      ["2010", "Soldier of Love"],
    ],
    liftedUp: [],
    rooms: ["Danceteria"],
    said: [
      { episode: "s01e07", who: "James St. James", time: "00:23:09", quote: "But now Sade worked there as well. Sade was a bartender, right?" },
      { episode: "s01e07", who: "Rudolf Piper", time: "00:23:13", quote: "No. Their first American show was at Danceteria. Sade was British. She's in England." },
      { episode: "s01e07", who: "James St. James", time: "00:23:35", quote: "Because I was trying to imagine, like, Sade and Madonna working at the same club and hanging out after. I just couldn't do it in my head." },
      { episode: "s01e07", who: "Rudolf Piper", time: "00:25:26", quote: "I could bring Sade to America, which cost a fortune. It cost $3,000 at the time to bring Sade for the first American show." },
    ],
    // On film (Lisa, 28 Nov 2026: "add film box"). The band's own 1984 videos, all embeddable, checked 28 Nov 2026.
    videos: [
      { id: "4TYv2PhG89A", title: "Sade - Smooth Operator (1984, directed by Julien Temple)" },
      { id: "k1ljpLQ1V6Y", title: "Sade - Your Love Is King (1984)" },
      { id: "kxNJV83EMJw", title: "Sade - Hang On to Your Love (1984)" },
      { id: "SxMavpCwSMo", title: "Sade in 1984, just as Diamond Life came out - an early TV interview" },
      { id: "zwDjJP_l5AY", title: "Sade - Your Love Is King, live at Live Aid, Wembley 1985" },
    ],
  },
  "romy-haag": {
    story:
      "The queen of West Berlin, with her own club in Schöneberg. Rudolf Piper remembers her around in his Berlin days, and Jayne County did a play with her, Romy as the pretty Hollywood starlet next door.",
    timeline: [
      ["1951", "Born in Scheveningen, the Netherlands"],
      ["1974", "Opens her club, Chez Romy Haag, in West Berlin"],
      ["Late 1970s", "Queen of Berlin nightlife while Jayne County lives in the city"],
      ["Late 1970s", "On stage with Jayne County in the play Sheila"],
    ],
    liftedUp: [],
    rooms: ["Chez Romy Haag"],
    said: [
      { episode: "s01e07", who: "Rudolf Piper", time: "00:14:36", quote: "Romy Haag was around, yes." },
      { episode: "s02e02", who: "James St. James", time: "01:01:47", quote: "Going now quickly to Germany and Romy Haag. You were very good friends with her and worked with her, right?" },
      { episode: "s02e02", who: "Jayne County", time: "01:01:56", quote: "Romy Haag was just queen of Berlin, you know. Everyone loved Romy Haag. She was the queen of Berlin. And she's very beautiful. So I became friends with her then. We did a play together called Sheila, and she played a next-door neighbour, pretty Hollywood starlet." },
      { episode: "s01e07", who: "James St. James", time: "00:14:28", quote: "Were there nightclub celebrities? Was Klaus Nomi around? Was Grace Jones, Romy Haag? Was she around?" },
    ],
  },
  danilo: {
    story:
      "The San Francisco hairstylist who taught Richie Rich to airbrush wigs in his parents' garage, took him under his wing and told him he was New York. Today he does Gwen Stefani's hair.",
    timeline: [
      ["Early 1990s", "Hairstylist in San Francisco, where Richie Rich meets him"],
      ["Early 1990s", "Teaches Richie Rich to airbrush wigs and invites him to a George Michael video shoot"],
      ["1990s", "In New York with Billy Beyond's crowd"],
      ["Later", "Gwen Stefani's hairstylist"],
    ],
    liftedUp: ["Richie Rich"],
    rooms: [],
    said: [
      { episode: "s04e08", who: "Richie Rich", time: "00:17:24", quote: "Danilo was from San Francisco, but then he's been in New York for years with Billy Beyond and everybody. He's like, can you take work off from the salon? I'm doing this video. And so he really taught me how to airbrush wigs." },
      { episode: "s04e08", who: "James St. James", time: "00:18:28", quote: "Wait, were you there for the George Michael video? Oh my God, I can't believe you missed that." },
      { episode: "s04e08", who: "Richie Rich", time: "00:18:35", quote: "Danilo is so sweet. He's like, all right, if you have to work, you have to work. I didn't really know how major he was. But he really took me under his wing, and he's like, New York, you are New York." },
      { episode: "s04e08", who: "Richie Rich", time: "00:17:02", quote: "Danilo, who now does Gwen Stefani's hair, did Mugler and couture, I met him through Dimitri in San Francisco. They ran a salon in Union Square." },
      { episode: "s06e04", who: "Raja", time: "00:44:11", quote: "And then him and Danilo on production, and Tyra Banks. My 90s, 17, 18-year-old self could not even understand what was happening." },
    ],
    // Lisa, 28 Nov 2026: "show all mentions" - Richie's three go up together.
    maxPerGuest: 3,
  },
  "kabuki-starshine": {
    story:
      "Club Kid in Richie Rich's crew, who came up from Florida a few months after Desi Santiago. Richie introduced Kabuki to the stylist Patti Wilson, and Kabuki became one of the top make-up artists, working with Steven Klein.",
    timeline: [
      ["Early 1990s", "Comes to New York from Florida and joins the Club Kids, with Desi, Sushi and Sacred Boy"],
      ["1990s", "In Richie Rich's crew, with Jenny Talia and Sushi"],
      ["Later", "Richie introduces Kabuki to the stylist Patti Wilson"],
      ["Today", "One of the top make-up artists, working with Steven Klein"],
    ],
    liftedUp: [],
    rooms: [],
    said: [
      { episode: "s04e08", who: "Richie Rich", time: "00:25:41", quote: "Kabuki Starshine, who I introduced to Patti Wilson, who's one of the biggest stylists in the world. Now he's one of the biggest make-up artists in the world, with Steven Klein." },
      { episode: "s06e09", who: "Desi Santiago", time: "00:17:01", quote: "Kabuki came a little, like, maybe a few months later, a little bit later. I think came from Florida. And then Sushi had come in around the same time too." },
      { episode: "s04e04", who: "James St. James", time: "00:20:43", quote: "You know, I often think of you with Kiday and Sacred Boy and Walt Paper and Desi and Kabuki." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:46:00", quote: "There were really about ten that I liked. You, Desi, I mean, I could name them, but you know, the ones that actually went on to do something. Kabuki, you know." },
      { episode: "s06e09", who: "James St. James", time: "00:16:53", quote: "Sushi and Kabuki and Sacred Boy around them, because I sort of feel like they were your comrades." },
      { episode: "s06e10", who: "Kenneth Hash", time: "00:26:23", quote: "The makeup room, with Lena and Candis Cayne and Amanda Lepore and Onyx and Kabuki and Wallpaper, for like several years. That went on." },
      { episode: "s06e10", who: "James St. James", time: "00:28:46", quote: "We need to get KD on the show, because KD and Kabuki, there was a whole little thing going on right there. They were doing something very different than the rest. He was doing sort of a monster drag, more aligned with Desi Monster." },
    ],
    // Lisa, 28 Nov 2026: "show all mentions" - James's three go up together.
    maxPerGuest: 3,
  },
  "john-taylor": {
    story:
      "Duran Duran's bassist, who went looking for Nick Egan to do an album cover. The punk and the New Romantic got on like a house on fire, and White Lines turned out to be John's favourite of Nick's videos.",
    timeline: [
      ["1960", "Born 20 June in Birmingham, England"],
      ["1978", "Starts Duran Duran with Nick Rhodes"],
      ["1993", "The Wedding Album, cover by Nick Egan with the band's parents' wedding pictures"],
      ["1995", "Thank You, with Duran Duran's version of White Lines"],
    ],
    liftedUp: [],
    rooms: [],
    said: [
      { episode: "s05e04", who: "James St. James", time: "00:50:01", quote: "I believe in my heart of hearts, I will die on this hill, that Duran Duran's White Lines is better than Grandmaster Flash's. I love it so much. It's so good." },
      { episode: "s05e04", who: "Nick Egan", time: "00:50:46", quote: "Billy said to me, oh, I've just been in London. John Taylor's looking for you because he wants you to do an album cover. And I happened to be in London at the time. So we set up a meeting and I went over to John's." },
      { episode: "s05e04", who: "Nick Egan", time: "00:51:07", quote: "John and I got on like a house on fire, which is strange, because I was never up until that point really a Duran Duran fan. Because I was a punk." },
      { episode: "s04e02", who: "Mickey Boardman", time: "00:43:37", quote: "We were shooting Duran Duran for the cover, and a ton of women in our office were like, Oh my God, I need to stop by the shoot. I love Duran Duran. I love Simon. I love John." },
    ],
  },
  "grandmaster-flash": {
    // On film (Lisa, 28 Nov 2026: "grandmaster flash add video box"). All embeddable, checked 28 Nov 2026.
    videos: [
      { id: "PobrSpMwKk4", title: "Grandmaster Flash & the Furious Five - The Message (the 1982 video)" },
      { id: "F3unhUrwp68", title: "The Adventures of Grandmaster Flash on the Wheels of Steel (1981)" },
      { id: "Au86wouG5Hk", title: "Where hip-hop is from: Grandmaster Flash back in the South Bronx" },
      { id: "bIoeoOaqD6g", title: "The Furious Five's block party grounds in the Bronx" },
      { id: "KQoSAGWEuKg", title: "Grandmaster Flash explains his Quick Mix Theory at the turntables" },
      { id: "1J2HknXcl3Q", title: "Grandmaster Flash & the Furious Five enter the Rock & Roll Hall of Fame (2007)" },
    ],
    story:
      "South Bronx DJ and hip-hop pioneer. Back then Manhattan didn't know him yet, Nick Egan says, but he did. Man Parrish was making records in the same years, and James still prefers Duran Duran's White Lines.",
    timeline: [
      ["1958", "Born Joseph Saddler on 1 January in Barbados, grows up in the Bronx"],
      ["Late 1970s", "DJs at parties in the South Bronx with the Furious Five"],
      ["1981", "The Adventures of Grandmaster Flash on the Wheels of Steel"],
      ["1982", "The Message"],
      ["2007", "The first hip-hop act in the Rock and Roll Hall of Fame"],
    ],
    liftedUp: [],
    rooms: [],
    said: [
      { episode: "s05e04", who: "Nick Egan", time: "00:21:38", quote: "That was coming from the South Bronx, where people in Manhattan didn't know about Afrika Bambaataa or Grandmaster Flash. But we kind of did, because of a girl called Blue and a guy called Michael Holman." },
      { episode: "s03e04", who: "James St. James", time: "00:22:31", quote: "I'm wondering if during this period of hip-hop, be-bop, don't stop, you were playing shows up in the Bronx. Is this around the time of Grandmaster Flash and the Furious Five?" },
      { episode: "s05e04", who: "James St. James", time: "00:50:01", quote: "I believe in my heart of hearts, I will die on this hill, that Duran Duran's White Lines is better than Grandmaster Flash's." },
      { episode: "s03e04", who: "Man Parrish", time: "00:22:46", quote: "And I'm like, you're a legend. So it was Grandmaster Flash." },
    ],
  },
  "laurie-metcalf": {
    story:
      "Steppenwolf actor Susan Seidelman first saw in Balm in Gilead, and cast in Desperately Seeking Susan and again in Making Mr. Right. Ann Magnuson, who played the straight part in that one, envied her the kooky one.",
    timeline: [
      ["1955", "Born 16 June in Carbondale, Illinois"],
      ["1970s", "One of the first actors of the Steppenwolf Theatre Company in Chicago"],
      ["1984", "Balm in Gilead in New York, directed by John Malkovich"],
      ["1985", "Desperately Seeking Susan"],
      ["1987", "Making Mr. Right"],
      ["1988", "Jackie in Roseanne"],
      ["2017", "Lady Bird"],
    ],
    liftedUp: [],
    rooms: [],
    said: [
      { episode: "s04e09", who: "Susan Seidelman", time: "00:53:41", quote: "I had happened to go to the theatre and saw a Steppenwolf play called Balm in Gilead, and I was blown away by it. And that's where I first saw Laurie. John Malkovich directed it. Glenne Headly was in it. Laurie Metcalf was in it." },
      { episode: "s04e09", who: "Susan Seidelman", time: "00:54:31", quote: "I used Laurie Metcalf in Desperately Seeking Susan. And then when it came time to do Making Mr. Right, I thought, I'll use Malkovich, his wife at the time, Glenne Headly, and also Laurie Metcalf again." },
      { episode: "s04e09", who: "James St. James", time: "00:54:48", quote: "Laurie Metcalf is hysterical, as is Polly Bergen, who plays her mother. So fabulous." },
      { episode: "s04e10", who: "Ann Magnuson", time: "00:58:58", quote: "With Making Mr. Right, I was the straight guy, really. And I had to temper down so much of my personality. I was so excited that I got to be a kook. I was so envious of Laurie Metcalf's part in Making Mr. Right." },
    ],
  },
  // Lisa, 28 Nov 2026: "jim fouratt show all quotes, libary and film box". Every mention on the show; facts from the episodes
  // and Wikipedia "Jim Fouratt" (read 28 Nov 2026). Left out under the living-people rule: the put-downs about him (S01E07
  // 00:30:14-00:30:39, S02E02 00:43:55 "Nobody does") and the Peppermint Lounge mob talk (S02E11 00:57:31).
  "jim-fouratt": {
    first: "Jim",
    story:
      "Gay-rights activist and club maker. Jayne County was with him on Christopher Street on the first night of Stonewall, chanting gay power. Rudolf Piper hired him for Pravda, opened Danceteria with him and needed weeks to win him over to the name. At the Peppermint Lounge he brought Richard Boch on, and Eric Goode always wanted to know what he was up to.",
    timeline: [
      ["1941", "Born 23 June, grows up in Rhode Island"],
      ["1967", "One of the organisers of the Central Park Be-In, and a co-founder of the Yippies"],
      ["1969", "On Christopher Street with Jayne County on the first night of the Stonewall riots; co-founds the Gay Liberation Front days later"],
      ["Late 1970s", "Hurrah, the first rock disco: DJs, live bands and music videos"],
      ["1980", "Rudolf Piper hires him for Pravda, which lasts one night; together they open Danceteria on West 37th Street"],
      ["Nov 1980", "The new Peppermint Lounge with Rudolf Piper, where he brings Richard Boch on"],
      ["Sep 1981", "Manages the reopened Studio 54 with Rudolf Piper"],
      ["1995-1999", "Vice president of A&R at Mercury Records"],
    ],
    liftedUp: ["Richard Boch"],
    rooms: ["Danceteria", "Peppermint Lounge", "Hurrah", "Studio 54", "Pravda", "Christopher Street", "Stonewall riots"],
    said: [
      { episode: "s02e02", who: "Jayne County", time: "00:43:55", quote: "And I remember being there with Jim Fouratt. And so we were just marching up and down Christopher Street, back and forth, just screaming gay power, gay power, with a fist in the air." },
      { episode: "s01e07", who: "James St. James", time: "00:29:05", quote: "So there was Pravda, then Danceteria, then the new Danceteria. And where does Jim Fouratt come into that? Because he was your partner for a time, wasn't he?" },
      { episode: "s01e07", who: "Rudolf Piper", time: "00:29:25", quote: "Peppermint Lounge, that was Jim, right? And Jim Fouratt came in as I hired him for Pravda. And then, when Pravda was only one night, we were looking for another space, and then we found the space of Danceteria. So he was my partner at Danceteria." },
      { episode: "s01e07", who: "Rudolf Piper", time: "00:53:39", quote: "We were walking on the street, Jim Fouratt, me, David King and Sean Cassette, a DJ. We passed in front of a cafeteria and somebody said, Oh, I don't want a cafeteria, I want a dancing area. And then I had a hell of a time to convince Jim Fouratt that this was the name. Two weeks, three weeks later, he grudgingly accepted the name." },
      { episode: "s02e11", who: "Richard Boch", time: "00:57:31", context: "Richard on working the Peppermint Lounge for Rudolf and Jim", quote: "Yeah, they only lasted about a month. I worked with them. Jim brought me on there." },
      { episode: "s03e06", who: "Eric Goode", time: "00:37:59", quote: "Yes, I went to the other places. I wanted to know what they were doing. Yes, I always wanted to know what Rudolf was doing, what Jim Fouratt was doing, what Steve Rubell was doing." },
    ],
    // On film (Lisa, 28 Nov 2026). All embeddable, checked 28 Nov 2026.
    videos: [
      { id: "ulU3UEdiRwo", title: "Jim Fouratt on Danceteria's stage, 1982" },
      { id: "iFvjPmPkofs", title: "Jim Fouratt on affirmation and joy in Gay Liberation (Media Burn Archive)" },
      { id: "EZI6y3eIYPk", title: "Jim Fouratt and Tony Fletcher on New York's music scene, Strand Book Store 2009" },
      { id: "YK7BngbI8Bw", title: "Danceteria - New York in the 80s" },
    ],
  },
  "lil-nas-x": {
    story:
      "The rapper who came out at the top of the charts. Michael Schmidt made him a golden tearaway suit of armour with Versace, and Randy sees his freedom from shame as part of what Michelangelo Signorile fought for.",
    timeline: [
      ["1999", "Born Montero Lamar Hill on 9 April near Atlanta, Georgia"],
      ["2019", "Old Town Road, a record 19 weeks at number one in America"],
      ["2019", "Comes out while the song is at the top"],
      ["2021", "Montero, his first album"],
      ["2020s", "Wears Michael Schmidt's golden tearaway armour, made with Versace"],
    ],
    liftedUp: [],
    rooms: [],
    said: [
      { episode: "s02e06", who: "Michael Schmidt", time: "01:06:07", quote: "That was a collaboration with Versace. The challenge about that piece really was the fact that it's not only a golden suit of armour, but it's a tearaway suit of armour." },
      { episode: "s02e06", who: "Michael Schmidt", time: "01:04:44", quote: "Politically powerful. I like that. He's obviously very gifted and he's fearless." },
      { episode: "s02e06", who: "James St. James", time: "01:05:32", quote: "That's exactly what you've done with Lil Nas X, because he is a genius and fearless. I saw him perform recently at the iHeartRadio thing, and it was so mesmerizing." },
      { episode: "s02e08", who: "Randy Barbato", time: "00:58:14", quote: "I look at someone like Lil Nas X, you know, and just the freedom from shame. It gives us Lil Nas X, who's just so fabulous, who's here and queer and out and proud." },
      { episode: "s02e06", who: "James St. James", time: "00:00:35", quote: "His work with Cher, Tina Turner, Grace Jones, Lady Gaga, Madonna, Rihanna, Doja Cat, Lil Nas X. The list goes on and on and on." },
    ],
  },
  // Lisa, 28 Nov 2026: "show all mentiones". Every mention on S01E04 except the two about the ayahuasca ceremony
  // (00:02:27, 00:03:46), left out under the living-people rule.
  "jen-gatien": {
    story:
      "Peter Gatien's daughter, who did the guest list at his clubs, with James on the door at the Limelight and the Tunnel, and later produced Limelight, the 2011 documentary about her father.",
    timeline: [
      ["Early 1990s", "Does the guest list at her father's clubs"],
      ["1990s", "On the door with James St. James at the Limelight and the Tunnel"],
      ["2011", "Produces Limelight, the documentary about Peter Gatien"],
    ],
    liftedUp: [],
    rooms: ["Limelight", "Tunnel"],
    said: [
      { episode: "s01e04", who: "James St. James", time: "00:01:13", quote: "The subject of a 2011 documentary made by his daughter, Jen Gatien." },
      { episode: "s01e04", who: "James St. James", time: "00:56:20", quote: "I remember your daughter was involved in a lot of the clubs. I did the door with her at Limelight, the door with her at Tunnel. She really grew into an amazing woman, didn't she?" },
      { episode: "s01e04", who: "Peter Gatien", time: "00:56:35", quote: "She was young at the time, you know. I basically had the choice. At least she's at my nightclub, and she used to do the guest list. I can watch her." },
      { episode: "s01e04", who: "Peter Gatien", time: "00:56:55", quote: "So it worked out well. Plus, obviously, she was my daughter, she was going to be honest. Remember, back then we'd have three or four guest lists, or even up to five, six at the Tunnel. So it was good to have a person that you knew that was not handing out comps to best buddies. People who got comps deserved them." },
      { episode: "s01e04", who: "Randy Barbato", time: "00:57:27", quote: "I met her back then, but Fenton knows her better than I do." },
    ],
  },
  "linda-evangelista": {
    story:
      "The supermodel who came to Love Machine every week with Christy and Naomi, the 'supermodel cluster', as Larry Tee calls it. At the Roxy, Lincoln Palsgrove had to pull her in from the crowd.",
    timeline: [
      ["1965", "Born 10 May in St. Catharines, Ontario"],
      ["1988", "The short haircut"],
      ["1990", "Says the supermodels don't wake up for less than $10,000 a day"],
      ["1990", "In George Michael's Freedom! '90 video"],
      ["Early 1990s", "At Love Machine every week with Christy Turlington and Naomi Campbell"],
    ],
    liftedUp: [],
    rooms: ["Love Machine", "Roxy"],
    said: [
      { episode: "s03e08", who: "Larry Tee", time: "00:24:57", quote: "The supermodels, you know, they would come as a cluster. I call it a supermodel cluster, with Linda, Christy and Naomi every week, and they would stand under this light in the basement." },
      { episode: "s03e08", who: "Larry Tee", time: "00:25:22", quote: "Clearly, it was these three most famous models of all time. And living in the meat market, they used to shoot all the winter issues of Vogue. So all the time we would run down with cigarettes and we would feed Linda Evangelista." },
      { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:42:45", quote: "On occasion you'd have different celebrities and supermodels show up, which I can remember vividly, having to go down into a massive crowd and pull in Linda Evangelista." },
      { episode: "s05e05", who: "James St. James", time: "01:02:07", quote: "It's a bit like the Linda Evangelista. I'm not going to get out of bed for less than $10,000." },
      { episode: "s03e08", who: "Larry Tee", context: "Larry, Lahoma and RuPaul at Versace's show in Milan, 1991", time: "00:36:29", quote: "It was a time where they threw the supermodels down the runway like confetti. It was Linda, Christy, Nadja. It was everybody on that runway." },
    ],
    // Lisa, 28 Nov 2026: "show all mentions" - Larry's three go up together. Left out under the living-people rule: James's
    // Love Machine staircase story (S03E08 00:23:29, he says himself it needs cutting) and the "hots for" line (00:24:37).
    maxPerGuest: 3,
  },
  // Pages behind the top Google searches (Lisa, 27 Nov 2026: "do all the suggested updates"). Facts from the guests'
  // own words on the show and the Xenon club page; Peppo's founding from Wikipedia "Xenon (nightclub)", read 27 Nov 2026.
  "peppo-vanini": {
    // On film (Lisa, 27 Nov 2026: "all"): his YouTube playlist PLd67fLFlUa14 is private for now - add playlist once it's public.
    videos: [
      { id: "RNQjstPreJ4", title: "Xenon's opening night, June 1978 - the club Peppo opened with Howard Stein" },
      { id: "nYEaDPuNOIo", title: "Xenon in 1979" },
      { id: "6dYWe1c3OyU", title: "Gloria Gaynor - I Will Survive (the 1979 video, filmed on Xenon's dance floor)" },
      { id: "fcZMEuytALY", title: "Régine's discotheque, New York" },
    ],
    story:
      "Co-owner of Xenon, the one disco that could keep up with Studio 54. Peppo had run some of Europe's best clubs, Régine's among them, and met Howard Stein at Studio 54. In June 1978 they opened Xenon in the old Henry Miller's Theatre on West 43rd Street - xenon is element 54, a wink at Studio. Silver walls, rays of light from a giant X over the dance floor, the first go-go boxes for anyone who wanted to dance on one, and the fashion crowd where Studio had Hollywood. On Night Fever, Christina Visca remembers FIT students let in free on Thursdays, Nikki Haskell her Christmas party there, and Nora Burns reads her 1980 diary - night after night at Xenon, and a P.S. that ends at Peppo's window.",
    timeline: [
      ["Before 1978", "Runs clubs in Europe, Régine's among them"],
      ["Studio 54 days", "Meets Howard Stein at Studio 54"],
      ["Jun 1978", "Opens Xenon with Howard Stein in the former Henry Miller's Theatre"],
      ["Oct 1978", "Everybody Hates Punk night at Xenon - costume a must"],
      ["1980", "Nora Burns's diary: the Kennedy party, five dollars and a limo to Magique, and the P.S. about Peppo's window"],
      ["Early 80s", "Free for FIT students on Thursdays; Nikki Haskell's Christmas party"],
      ["1984", "Xenon closes; the building is now the Stephen Sondheim Theatre"],
    ],
    liftedUp: [],
    rooms: ["Xenon", "Studio 54", "Régine's"],
    // Lisa, 27 Nov 2026: "more context in quote" / "for quotes give them more context" - the diary passages in full, from
    // src/data/diaries.ts, and a line on what was being talked about. Max 2 per guest.
    said: [
      { episode: "s06e05", who: "Nora Burns", time: "00:08:49", context: "The last entry Nora reads from her 1980 diary, the year the scene already felt over", quote: "We all went to Xenon and Danceteria. Every place was sort of dull. No place has the energy it used to... P.S., Earl is dead. Davey told me last night he fell off the roof of the Navarro trying to climb into Peppo's window - that was the owner of Xenon. I feel sad about it. I wish I'd been nicer or seen him more or something." },
      { episode: "s06e02", who: "Christina Visca", time: "00:10:33", context: "Christina, a 19-year-old FIT student, on how she got into Peppo's club", quote: "When I came to FIT, I started going out right away. And I often mentioned this, Xenon was very smart. On Thursday nights, they would let FIT students in for free, which was a genius idea. We were fashioned out, we got in for free, so when the regular patrons came in, it was filled with good-looking people." },
      { episode: "s02e04", who: "Nikki Haskell", time: "00:47:38", context: "James asks about the other clubs of the time - Xenon, Hurrah - and Nikki remembers her parties there", quote: "We gave a party at Xenon. It was the first time anybody had ever given a party because of all the newspapers and everything... And I gave a very famous party - I don't know if you might have been on one of the tapes - the Xenon Christmas party." },
      { episode: "s06e05", who: "Nora Burns", time: "00:06:14", context: "Nora's diary, 2 May 1980, read on air", quote: "I took $5 and went to Xenon, and then got into a limo with... Brenda Vaccaro... and some other actors, and we went to Magique. Wednesday night was Bond's, Xenon, Magique, Xenon and Bond's again, all with different people. It seems like I don't live in sunshine hours." },
    ],
    also: { heading: "The Xenon crowd", names: ["Howard Stein", "Nikki Haskell", "Christina Visca", "Nora Burns", "Nora Burns's diaries (1980)", "Andy Warhol", "Brooke Shields", "Halston"] },
  },
  "lahoma-van-zandt": {
    first: "Lahoma",
    story:
      "Drag queen from Atlanta, Larry Tee's partner in crime, who came to New York with RuPaul and Larry, lived in Nelson Sullivan's house, co-hosted Celebrity Club in the Tunnel basement with Larry - 'the king and queen of Manhattan', he says - and later hung up the wig for publishing.",
    timeline: [
      ["Atlanta", "Larry Tee's partner in crime"],
      ["1987", "Moves in with Nelson Sullivan at 5 Ninth Avenue, up from Atlanta with RuPaul and Larry Tee"],
      ["Late 80s", "Co-hosts Celebrity Club in the Tunnel basement with Larry Tee"],
      ["90s", "Busy at Disco 2000 at the Limelight; out at the Roxy with Larry Tee"],
      ["Later", "Hangs up the wig for publishing, and saves the box of archive photos"],
    ],
    liftedUp: [],
    rooms: ["Celebrity Club", "Tunnel", "Disco 2000", "Limelight", "Roxy"],
    said: [{ episode: "s01e02", who: "Michael Musto", time: "00:38:35", quote: "Lahoma and RuPaul all moved to New York and lived with Nelson. And Lady Bunny was part of that." }],
    also: { heading: "The crowd", names: ["Nelson Sullivan", "Larry Tee", "RuPaul", "Lady Bunny", "Alexis DiBiasio", "Linda Simpson"] },
  },
  "clara-the-carefree-chicken": {
    first: "Clara",
    story:
      "Ernie Glam's Club Kid character at Disco 2000, the Wednesday party at the Limelight. As James tells it, Clara came out of her egg on the party's opening night, one of the names Michael gave his costume-shop characters. Boy Bar's drag shows gave Ernie the spark, and Clara became his 'cartoon drag' - a female character without women's clothes - go-go dancing in a cage over the dance floor. He kept her for three years, sweaty suits and all, and his show Peeew! has been looking for her ever since.",
    timeline: [
      ["Before Disco 2000", "Boy Bar's drag shows give Ernie Glam the spark"],
      ["Disco 2000 opening night", "Clara comes out of her egg at the Limelight"],
      ["The next three years", "Ernie's 'cartoon drag', go-go dancing in the cage over the floor"],
      ["Later", "Peeew!, Ernie's show, goes searching for Clara"],
    ],
    liftedUp: [],
    rooms: ["Disco 2000", "Limelight", "Boy Bar"],
    // Lines from the transcripts (Lisa, 27 Nov 2026: "quotes from people?", "give them more context"); max two per guest.
    // A host's line at S1E5 00:28:15 waits until we know whether it was Fenton or Randy.
    said: [
      { episode: "s01e05", who: "Ernie Glam", time: "00:28:50", context: "Ernie on taking the job at Disco 2000", quote: "When Michael hired me to be Clara the Chicken, I decided that this was going to be my drag persona. I used to go to Boy Bar on St. Mark's Place every Thursday to watch the drag shows, and I kind of wanted to do that, but I didn't really want to be a drag queen." },
      { episode: "s01e05", who: "James St. James", time: "00:28:27", context: "James remembers how Clara arrived", quote: "Clara the Chicken came out of her egg on the opening night of Disco 2000. There was Hans Ulrich the dog, a leather dog - Michael had just gone and gotten all these costumes from a costume shop and christened everybody." },
      { episode: "s01e05", who: "Ernie Glam", time: "00:29:30", context: "Ernie on the chicken suit", quote: "When Michael presented me with the chicken suit, I thought, okay, here's my opportunity to do a type of cartoon drag - I'm still playing a female character, but I'm not really having to wear women's clothes. The suits were so smelly, they got so sweaty... but I did it for three years. I just wanted it to be something fabulous." },
      { episode: "s01e02", who: "Michael Musto", time: "01:02:14", context: "Musto on the Limelight in the 90s", quote: "At the Limelight there was the chapel area, there was the main dance floor. And then it became Disco 2000, the big club kid party on Wednesdays, with Clara the Carefree Chicken." },
      { episode: "s01e09", who: "Moby", time: "00:07:02", context: "Moby working out when he first met James", quote: "I had just DJ'd for the first time at Limelight, and Michael took me to Peter Gatien's office... So, James, I would have definitely encountered you around the same time I met Clara the Chicken, basically." },
    ],
    // Same order as Lisa's YouTube playlist "Clara the Carefree Chicken – the AFTERPARTY playlist" (PLJqISi2pr5Qo, PRIVATE
    // 27 Nov 2026) - add playlist: "https://www.youtube.com/playlist?list=PLJqISi2pr5Qo" once she makes it public.
    videos: [
      { id: "aAYRvJGmsDQ", title: "Peeew! #90: Searching for Clara the Carefree Chicken" },
      { id: "Ir0Y0QQQnsw", title: "The Disco 2000 commercial" },
      { id: "Cd4kmrC_PPo", title: "Ernie Glam + Clara the Carefree Chicken in Montréal" },
      { id: "dfd6iABsJAI", title: "Peeew! #97: One step closer to finding Clara" },
      { id: "Yrln7HwA2ck", title: "Peeew! #134: Clara the Carefree Chicken sightings" },
      { id: "tLfNUMsmv-o", title: "Night Fever S1E5 - Ernie Glam (Clara comes up at 28:00)" },
    ],
    also: { heading: "Clara's flock", names: ["Ernie Glam", "James St. James", "Michael Musto", "Moby", "Amanda Lepore", "Hans Ulrich", "Clara the Chicken suit", "Peeew!", "Fabulousity"] },
  },
  // The next five top-searched pages (Search Console 31 Oct - 27 Nov 2026; Lisa, 27 Nov 2026: "yes"). Quotes follow from
  // the transcripts on Lisa's Mac.
  "house-of-xtravaganza": {
    first: "the House",
    story:
      "The ballroom house Angie Xtravaganza founded in 1982 with Hector Xtravaganza, and mothered until she died. Mostly Latino in a mostly African-American ball scene - which meant, Luis says, they had to work harder and be fiercer. Everybody wanted to be an Xtravaganza. The house opened the first Love Ball with Willi Ninja, made the Sound Factory its home, sent Jose and Luis to dance for Madonna, and the world met it in Paris Is Burning.",
    timeline: [
      ["1982", "Angie Xtravaganza founds the house with Hector Xtravaganza and becomes its mother"],
      ["Late 80s", "At home at the Sound Factory: after the club closes, the Xtravaganzas go to the park with Junior Vasquez's boom box"],
      ["1989", "Opens the first Love Ball with Willi Ninja"],
      ["1990", "Paris Is Burning comes out; Jose and Luis Xtravaganza dance in Madonna's Vogue and on Blond Ambition"],
      ["1993", "Mother Angie dies, aged 28; Hector keeps the house going"],
    ],
    liftedUp: ["Luis Xtravaganza Camacho", "Jose Xtravaganza", "Venus Xtravaganza", "David Ian Xtravaganza"],
    rooms: ["Sound Factory", "Love Ball", "Red Zone", "Voguing", "Paris Is Burning"],
    also: { heading: "The family", names: ["Angie Xtravaganza", "Hector Xtravaganza", "Willi Ninja", "Junior Vasquez", "Madonna", "Chi Chi Valenti & Johnny Dynell", "Nations"] },
    said: [
      { episode: "s01e08", who: "Luis Xtravaganza Camacho", time: "00:09:09", context: "Luis on joining the House of Xtravaganza", quote: "They were mostly Latino house in a world where there was a lot of African-American houses, which is great. We stood out, and for that fact, we had to push harder, work harder, be fiercer to get noticed." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:13:14", context: "Michelle on the piers, before the House of Magnifique took her in", quote: "And I didn't know what it was, but I knew that I wanted to be a part of the house. Everybody wanted to be an Xtravaganza. Xtravaganza paid me no mind, but the Magnifiques saw me and I was like, yeah, I want to do this." },
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:34:08", context: "Chi Chi on writing Nations for Details, about the tribes of the night", quote: "I was writing about these tribes in the night that I called nations that hung together like families, like style tribes. And so one of the four tribes that I picked was the House of Xtravaganza because they, of all the houses that were around me at the time, they really had the strongest family feel." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:37:56", context: "Johnny on how he joined the house", quote: "I would meet the kids like at the Garage like years ago, the ball kids, and also on the pier, like they were all on the pier, and I became an Xtravaganza." },
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:43:08", context: "Susanne on opening the first Love Ball, 1989", quote: "It's important to have the house ball community be part of it. And I mean, I never forget, I opened with Willi Ninja and the Xtravaganzas were opening a ball and people were crazy. They'd never seen anything like it. Because a lot of people didn't know about the house ball community." },
      { episode: "s06e06", who: "James St. James", time: "00:32:41", context: "James to Lincoln Palsgrove IV about Red Zone", quote: "It was sort of right before Vogue and Paris Is Burning and everything. When those kids were just red hot and we sort of gave the club over to them, the Xtravaganzas, the Magnifiques." },
      { episode: "s06e02", who: "Christina Visca", time: "00:27:35", context: "Christina on the Sound Factory family after closing time", quote: "We would all get together outside the club when the club closed. The 'Ganzas, Junior, a group of us, we would all hang out afterward. We would go up to the park, Junior would bring his boom box and we'd listen. So the 'Ganzas themselves were a family, but then we joined on to others at Sound Factory and it was just really a beautiful time." },
    ],
    // "On film" (Lisa, 28 Nov 2026: the House "needs ... a video box"). Embeds checked; Paris Is Burning uploads left out
    // (unofficial copies of the film).
    videos: [
      { id: "8ej86oHMJ8o", title: "Welcome to the House of Xtravaganza, the most iconic house in New York's ballroom scene (In The Know)" },
      { id: "TybDsSlaR0E", title: "Remembering Hector Xtravaganza, the house's founding father (Logo)" },
      { id: "BpRSk_knBec", title: "Remembering Mother Angie Xtravaganza" },
      { id: "-YrP3Ajf6qM", title: "Angie Xtravaganza at the Xtravaganza Spring Affair Ball, Tracks, 1992" },
      { id: "5hi_c9sSbb8", title: "Voguing at a House of Xtravaganza ball, Harlem, 2001 (Kinolibrary)" },
      { id: "z3X5Igcf4Ms", title: "Jose Xtravaganza interview" },
      { id: "rcmcuANg-sg", title: "Hector Xtravaganza walks Legendary Statement Status, Evisu Ball, 2010" },
      { id: "IfSmZcH1Opo", title: "Night Fever with Luis Xtravaganza Camacho (S1E8, WOW Presents)" },
    ],
  },
  "laurie-pike": {
    story:
      "Downtown's hostess with a microphone: she hosted Manhattan Cable, the cable show about New York nights, and at the first Love Ball in 1989 she was the MC for the cameras, as Randy and Fenton remember it.",
    timeline: [
      ["Late 80s", "Hosts Manhattan Cable"],
      ["1989", "MC for the cameras at the first Love Ball"],
    ],
    liftedUp: [],
    rooms: ["Manhattan Cable", "Love Ball"],
    also: { heading: "On the show with her", names: ["Fenton Bailey", "Randy Barbato", "Willi Ninja", "House of Xtravaganza"] },
    said: [
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:45:33", context: "Susanne remembers the MC of the first Love Ball at Roseland, which Fenton and Randy filmed for Channel 4", quote: "What was with that girl? She was great. The girl was emceeing for... She was great, Laurie Pike." },
    ],
  },
  "lynn-wagenknecht": {
    story:
      "Keith McNally's wife and partner in the restaurants that fed downtown: the Odeon, then Cafe Luxembourg, and with Nell Campbell the club Nell's. After the divorce, Nell says, Lynn kept those three.",
    timeline: [
      ["1980", "Opens the Odeon in Tribeca with Keith McNally"],
      ["1983", "Cafe Luxembourg on the Upper West Side"],
      ["Fall 1986", "Opens Nell's on West 14th Street with Nell Campbell and Keith McNally"],
      ["Later", "Keeps the Odeon, Cafe Luxembourg and Nell's after the divorce"],
    ],
    liftedUp: [],
    rooms: ["Odeon", "Cafe Luxembourg", "Nell's"],
    also: { heading: "At her tables", names: ["Keith McNally", "Nell Campbell"] },
    said: [],
  },
  "serge-becker": {
    story:
      "Eric Goode's collaborator from the Area years. Together they built MK in an old bank on Fifth Avenue - the supper club Andy Warhol wanted to be a partner in - and Peter Gatien's Club USA in Times Square, with its giant slide.",
    timeline: [
      ["1983", "Works with Eric Goode at Area"],
      ["Mar 1988", "Opens MK with Eric Goode at 204 Fifth Avenue"],
      ["1992", "Builds Club USA for Peter Gatien with Eric Goode"],
    ],
    liftedUp: [],
    rooms: ["Area", "MK", "Club USA", "Mudd Club"],
    also: { heading: "Who he built them with", names: ["Eric Goode", "Shawn Hausman", "Peter Gatien", "Richard Boch"] },
    said: [
      { episode: "s02e11", who: "Richard Boch", time: "00:17:10", context: "James first credits Serge with the Mudd Club basement; Richard, who had just been talking to Serge, sets it straight", quote: "Serge actually, I was just talking to him the other day and he was saying that, yeah, Steve Mass, the owner of the Mudd Club, gave Eric and Shawn their start, really." },
      // All three mentions in quote boxes (Lisa, 28 Nov 2026: "it says there are 3 mentions there - show them all").
      { episode: "s01e04", who: "James St. James", time: "00:36:26", context: "James asks Peter Gatien how Club USA in Times Square began", quote: "Then when you worked with Eric Goode from Area and Serge Becker, and you went to open Club USA in Times Square. How did you find that space? What was the space and how did you go about it?" },
      { episode: "s03e06", who: "Eric Goode", time: "00:07:13", context: "The Mudd Club basement: James asks if it was Serge; Eric says it was Shawn Hausman", quote: "(James: Was that you and Serge or you and Shawn? Who was it?) That was Shawn Hausman, who went on to design all the Standard hotels around the world. My dear high school friend Shawn Hausman that I later collaborated with on Area." },
    ],
  },
};
