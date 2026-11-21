// Fan suggestion boxes (Lisa, 21 Nov 2026: "do this for all suggestions functions on the website"): one shared form on
// every list page. A suggestion is stored as "pending" in the fan_suggestions table, Lisa gets a Web3Forms heads-up with a
// link to /guestbook/admin?fan=<id>, and once she approves it, it shows under "Suggested by you, the fans" on its page -
// never with the visitor's name. Who to interview next keeps its own table (interview_suggestions, src/lib/suggestions.functions.ts).
// A new box: add it here AND to the box check on the fan_suggestions table (Lovable Cloud), then put <FanSuggestions box=…/> on its page.

export const FAN_BOXES = ["library", "jukebox", "hall-of-fame", "clubs"] as const;
export type FanBox = (typeof FAN_BOXES)[number];

export type FanBoxConfig = {
  /** Where it sits - shown on the moderation page and in the email subject */
  page: string;
  path: string;
  heading: string;
  intro: string;
  /** Optional choice chips (stored as "kind"); the first is picked to start with */
  kinds?: { value: string; label: string; placeholder: string }[];
  placeholder: string;
  whyPlaceholder: string;
  thanks: string;
};

export const FAN_BOX: Record<FanBox, FanBoxConfig> = {
  library: {
    page: "Library · Publish this",
    path: "/library",
    heading: "What do you want to be made?",
    intro: "Which downtown story needs a book or a film? Tell me - the best ones go up here.",
    kinds: [
      { value: "Book", label: "A book", placeholder: "Which book should be written?" },
      { value: "Film", label: "A film", placeholder: "Which film should be made?" },
    ],
    placeholder: "Which book should be written?",
    whyPlaceholder: "Why? (optional)",
    thanks: "Thank you - your idea is on its way to me!",
  },
  jukebox: {
    page: "Jukebox",
    path: "/jukebox",
    heading: "Which song belongs on the Jukebox?",
    intro: "A record that takes you straight back to the dance floor? Tell me - the best ones go up here.",
    placeholder: "Song and artist",
    whyPlaceholder: "Which club, night or memory? (optional)",
    thanks: "Thank you - your song is on its way to me!",
  },
  "hall-of-fame": {
    page: "Hall of Fame",
    path: "/hall-of-fame",
    heading: "Who belongs in the Hall of Fame?",
    intro: "Someone who opened doors, lifted others up or tied the whole scene together? Tell me - the best ones go up here.",
    placeholder: "Who belongs in the Hall of Fame?",
    whyPlaceholder: "Who did they help, and how? (optional)",
    thanks: "Thank you - your nomination is on its way to me!",
  },
  clubs: {
    page: "Inside the Clubs",
    path: "/inside-the-clubs",
    heading: "Which club are we missing?",
    intro: "A door you walked through that nobody on the show has named yet? Tell me - the best ones go up here.",
    placeholder: "Name of the club (and the city, if not New York)",
    whyPlaceholder: "Where was it, when, and what was the night like? (optional)",
    thanks: "Thank you - your club is on its way to me!",
  },
};

export const isFanBox = (v: unknown): v is FanBox => typeof v === "string" && (FAN_BOXES as readonly string[]).includes(v);
