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
  timeline: [string, string][];
  liftedUp: string[]; // people they gave a start
  rooms: string[]; // magazines, clubs, nights, places
  said: MemoriamQuote[];
  /** Lisa's rule is two quotes per guest; a page can go higher when she says so (Kim: Mickey x4, Lisa 21 Nov 2026). */
  maxPerGuest?: number;
};

export const PERSON_PROFILES: Record<string, PersonProfile> = {
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
      { episode: "s04e02", who: "Mickey Boardman", time: "00:28:55", quote: "Kim took me to lunch one day, and she said: we know you're a heroin addict. You have to go to rehab, or you can't work at Paper anymore." },
      { episode: "s01e10", who: "Joey Arias", time: "01:01:25", quote: "Kim had an intervention, about 35 people, and took me to a rehab for three months." },
      { episode: "s04e06", who: "Lauren Ezersky", time: "00:23:46", quote: "They said, go meet Kim Hastreiter, who owned Paper. She goes, go do Donna Karan. If you can do Donna Karan and I like it, I'll print it." },
      { episode: "s04e02", who: "Mickey Boardman", time: "00:23:15", quote: "I kept saying no, I'm not a writer. But finally she said, listen, you know, Kim has always said: if you can talk, you can write." },
      { episode: "s01e10", who: "Joey Arias", time: "00:09:05", quote: "My friend Bo Allen introduced me to Kim when I was in LA. He said, you're gonna meet this girl, she's going to CalArts. So I met her in '74, and we became great friends. When she was gonna graduate, I was getting ready to blow to New York, so I said, I'll drive cross-country with you. She had this big truck, and when she covered it up, it was a covered wagon. We drove to Las Vegas and went to all the casinos." },
      { episode: "s04e02", who: "Mickey Boardman", time: "00:44:50", quote: "I always think if Kim was the mom, I was the son, and Drew is the grandson." },
      { episode: "s04e02", who: "Mickey Boardman", time: "00:01:51", quote: "Kim Hastreiter, the co-founder of Paper - her favorite combination was chartreuse and fuchsia. I always think of her when I see either of them, or the two of them together." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:51:31", quote: "Kim Hastreiter and David Hershkovits were the editors, and my part was the giant foldout with the ads that went all the way around. Recently there was an article in the New York Times about the oral history of Paper, and Kim posted something on Facebook. I was kind of hinting, and she was like, oh, you're one of the first people to help us. I was like, no, no, no. I was employee number one. It was the four of you and me." },
    ],
    // Lisa picked two more of Mickey's (21 Nov 2026): "if you can talk, you can write" and chartreuse and fuchsia.
    maxPerGuest: 4,
  },
};
