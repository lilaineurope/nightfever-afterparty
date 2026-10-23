// Quote notes on the Afterparty page: one line per guest, in their own words, with the moment it was said.
// Picked from "Night Fever Afterparty quotes.xlsx" (each checked against the episode audio).
export type EpisodeQuote = { quote: string; time: string; who?: string }; // who: only when not the episode's guest line

export const episodeQuotes: Record<string, EpisodeQuote> = {
  s01e01: { quote: "I don't need the goal, I just need the soul.", time: "00:09:40" }, // Dianne Brill
  s01e02: { quote: "This is either the low point of civilization or the high point of my entire life.", time: "01:02:40" }, // Michael Musto
  s01e03: { quote: "Fame for fame's sake is ugly. It's just ugly.", time: "01:01:51" }, // Lisa Edelstein
  s01e04: { quote: "Customers love dancing over a shark cage.", time: "00:17:34" }, // Peter Gatien
  s01e07: { quote: "It was majestic. It was a cathedral of clubs.", time: "01:03:47" }, // Rudolf Piper
  s02e03: { quote: "The dance floor to me is a religion of action.", time: "00:03:56" }, // Susanne Bartsch
  s02e04: { quote: "That's when I invented the disco nap.", time: "00:07:03" }, // Nikki Haskell
  s02e06: { quote: "I never really understood prior to being with Nikki that art was a way of life.", time: "00:13:11" }, // Michael Schmidt
  s02e08: { quote: "Everything that I walked down the runway with, they just let me keep.", time: "00:20:53" }, // Michelangelo Signorile
  s03e01: { quote: "You're not born with style. You're born naked.", time: "00:34:32" }, // Patricia Field
  s03e06: { quote: "That club was made out of spit and tape and garbage.", time: "00:12:09" }, // Eric Goode
  s04e08: { quote: "I was supposed to be Kristi Yamaguchi's pair partner, but I kept kind of dropping her. I'm like, honey, I'm a single skater.", time: "00:07:54" }, // Richie Rich
  s04e10: { quote: "These were like primal caves that we could all go into and dance around the bonfire and do cave paintings and feel less alone.", time: "00:45:11" }, // Ann Magnuson
  s05e03: { quote: "I couldn't get away from the glamour.", time: "01:02:17" }, // Amanda Lepore
  s05e04: { quote: "They liked me because I had a good look. I couldn't sing, but I had a good look.", time: "00:08:20" }, // Nick Egan
  s05e06: { quote: "If there's no line, there's no point.", time: "00:27:58" }, // Christopher Makos
  s06e01: { quote: "I didn't want to be his plus one. I wanted to be my own person. I wanted to be my own star.", time: "00:24:55" }, // James St. James
  s06e03: { quote: "I was more of a mind game door person than a mean door person.", time: "00:26:46", who: "Chi Chi Valenti" }, // Chi Chi Valenti & Johnny Dynell
  s06e08: { quote: "Look, things weren't better in the old days, but they were different.", time: "00:17:54" }, // William Norwich
};
