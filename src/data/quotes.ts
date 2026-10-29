// Quote notes on the Afterparty page: one line per guest, in their own words, with the moment it was said.
// Picked from "Night Fever Afterparty quotes.xlsx" (each checked against the episode audio).
export type EpisodeQuote = { quote: string; time: string; who?: string }; // who: only when not the episode's guest line

export const episodeQuotes: Record<string, EpisodeQuote> = {
  s01e01: { quote: "Just be authentic and connect. They're looking for you too.", time: "00:48:51" }, // Dianne Brill
  s01e02: { quote: "This is either the low point of civilization or the high point of my entire life.", time: "01:02:40" }, // Michael Musto
  s01e03: { quote: "Fame for fame's sake is ugly. It's just ugly.", time: "01:01:51" }, // Lisa Edelstein
  s01e04: { quote: "The idea is to really draw a cross-section of people. In the end, they end up entertaining each other.", time: "00:34:11" }, // Peter Gatien
  s01e07: { quote: "Every generation has its own cool people, and whether the generation before considers them cool is a different question.", time: "01:00:29" }, // Rudolf Piper
  s02e03: { quote: "I'm like the last one standing, the Chelsea girl here, working that hallway until the cows come home.", time: "00:02:12" }, // Susanne Bartsch
  s02e04: { quote: "I do my best thinking on the dance floor.", time: "00:29:32" }, // Nikki Haskell
  s02e06: { quote: "I don't want to just make a dress that will be worn on a model and then forgotten the next day. I want to create a moment.", time: "01:00:25" }, // Michael Schmidt
  s02e08: { quote: "There was something I found in ACT UP that was sort of antithetical to the scene. It was very nurturing... whereas we were ruthless and bitchy.", time: "00:41:54" }, // Michelangelo Signorile
  s03e01: { quote: "I mean, you could call it craziness, but I call it originality.", time: "00:22:25" }, // Patricia Field
  s03e06: { quote: "People say I'm in the hospitality business. I was in the in-hospitality business, because Area was terribly uncomfortable.", time: "00:31:53" }, // Eric Goode
  s04e08: { quote: "I think in a way Heatherette was a little bit too ahead of its time.", time: "00:02:07" }, // Richie Rich
  s04e10: { quote: "These were like primal caves that we could all go into and dance around the bonfire and do cave paintings and feel less alone.", time: "00:45:11" }, // Ann Magnuson
  s05e03: { quote: "Oh, I didn't know that these were real diamonds.", time: "00:37:21" }, // Amanda Lepore
  s05e04: { quote: "Ego isn't necessarily a bad thing. You have to have an ego to do what any of us do.", time: "00:11:06" }, // Nick Egan
  s05e06: { quote: "There is nothing more surreal than a drag queen.", time: "00:31:02" }, // Christopher Makos
  s06e01: { quote: "I was obsessed with the idea of it girls. And I thought, well, why can't there be it boys?", time: "00:03:46" }, // James St. James
  s06e03: { quote: "Club 57 was kooky and kinky and just like zippity doo-dah. It was really fun.", time: "00:29:54", who: "Johnny Dynell" }, // Chi Chi Valenti & Johnny Dynell
  s06e08: { quote: "Look, things weren't better in the old days, but they were different.", time: "00:17:54" }, // William Norwich
  s06e07: { quote: "I had to build my defenses. And I do think that part of the outfits, too, were a defense.", time: "00:14:26" }, // Sally Randall
  s01e10: { quote: "I was engineered to perform. My life is what I'm doing.", time: "00:51:01" }, // Joey Arias
  s03e08: { quote: "Disco died the night I saw the B-52's.", time: "00:09:49" }, // Larry Tee
  s04e04: { quote: "Glitter is still a valid option. Glitter looks amazingly expensive in the lights.", time: "00:09:56" }, // Zaldy
  s02e01: { quote: "Dorothy clicked her heels three times and ended up in Kansas. I clicked my heels three times and ended up on Christopher Street.", time: "00:11:50" }, // Michelle Visage
  s01e06: { quote: "Punk gave me my skeleton and the club kids gave me my flesh.", time: "00:09:20" }, // Waltpaper
  s02e05: { quote: "I remember taking the D train over the Williamsburg Bridge, and the city would be all lit up like a Versace dress.", time: "00:03:51" }, // Connie Fleming
  s03e10: { quote: "Getting dressed up, putting some effort into your appearance really went a long way in those days.", time: "00:34:20" }, // Miss Guy
  s02e07: { quote: "We were the creatures of the night, walking pieces of art who use shock and awe to garner fame and drink tickets.", time: "00:03:06" }, // Jenny Talia
};
