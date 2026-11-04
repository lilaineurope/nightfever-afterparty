// In memoriam pages (Lisa, 4 Nov 2026, "option C"): people the guests talk about who have died get a fuller A–Z page -
// dates, a short story, and a wall of what the guests said about them, each quote with its play-from timestamp.
// Quotes are cleaned-up lines from the episode transcripts; show Lisa new quotes before they go live.
// Facts: obituaries (Brian: Los Angeles Blade 31 Jan 2019, amNY Feb 2019, Howl! Arts 30 Jan 2019); daily batches: Wikipedia.

export type MemoriamQuote = {
  episode: string; // episode id, e.g. "s04e10"
  who: string; // who says it
  time: string; // hh:mm:ss in the episode
  quote: string;
};

export type Memoriam = {
  born: string;
  died: string;
  diedLine: string; // "Died 30 January 2019 in New York, aged 62"
  aka?: string;
  story: string;
  timeline: [string, string][];
  liftedUp: string[]; // people they gave a start
  rooms: string[]; // clubs, nights, places
  said: MemoriamQuote[];
  memorial?: { label: string; href: string };
  // "Read more" on the name card instead of the Google search, when there is no Wikipedia article (Lisa, 4 Nov 2026).
  readMore?: { label: string; href: string };
  wikidata?: string; // for the page markup (sameAs)
};

export const MEMORIAM: Record<string, Memoriam> = {
  "brian-butterick": {
    born: "1956",
    died: "2019",
    diedLine: "Died 30 January 2019 in New York, aged 62",
    aka: "Hattie Hathaway",
    story:
      "Ran the Pyramid Club on Avenue A, and as Hattie Hathaway was one of the Pyramid girls who turned drag into their own characters. Later the fourth Jackie 60 producer.",
    timeline: [
      ["1981", "Starts on the door at the Pyramid, then runs it with Bobby Bradley until 1986"],
      ["1980s", "Becomes Hattie Hathaway and gives early stages to Lypsinka and Ethyl Eichelberger"],
      ["1980s", "Sings in the band 3 Teens Kill 4"],
      ["1984", "Part of the small Pyramid crowd that dreams up Wigstock with Lady Bunny"],
      ["1990s", "Fourth producer of Jackie 60, after Richard Move"],
      ["2003", "Co-runs the Howl! Festival in Tompkins Square Park, until 2013"],
      ["2019", "Dies of lung cancer, aged 62"],
    ],
    liftedUp: ["Lypsinka", "Ethyl Eichelberger", "Lady Bunny", "Sister Dimension"],
    rooms: ["Pyramid Club", "Jackie 60", "Wigstock", "Howl! Happening"],
    said: [
      { episode: "s04e10", who: "Ann Magnuson", time: "00:47:39", quote: "Bobby Bradley and Brian Butterick put it together, and Kestutis Nakas helped a lot." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:17:47", quote: "I was friends with Bobby Bradley and with Brian Butterick. They were the managers and they ran the Pyramid." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:43:10", quote: "It wasn't until the Pyramid, these girls at the Pyramid became, you know, Hattie Hathaway…" },
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:50:15", quote: "Later, Richard left and was replaced by Hattie Hathaway as the fourth Jackie producer." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:36:55", quote: "Brian Butterick did a whole Pyramid exhibit, and Sister performed. And it was as weird as hell." },
      { episode: "s02e03", who: "Fenton Bailey", time: "00:27:27", quote: "Bobby Bradley and Brian." },
    ],
    memorial: { label: "brianbutterick.org", href: "https://brianbutterick.org/" },
    // No Wikipedia article for him (checked 4 Nov 2026), so the name card links his memorial site.
    readMore: { label: "on his memorial site", href: "https://brianbutterick.org/" },
    wikidata: "https://www.wikidata.org/wiki/Q81233089",
  },
  // Batch 1 of the daily In memoriam run (Lisa, 4 Nov 2026). Facts checked against Wikipedia; Wikidata ids from
  // the "Died youngest" sheet. These names already have a Wikipedia link on the card, so no readMore is needed.
  "andy-warhol": {
    born: "1928",
    died: "1987",
    diedLine: "Died 22 February 1987 in New York, after gallbladder surgery, aged 58",
    story:
      "The Pop artist who ran the Factory, started Interview and was out in the clubs most nights with a camera and a tape recorder. For the guests he was the one who put uptown, downtown, Broadway and Hollywood in the same room.",
    timeline: [
      ["1949", "Moves from Pittsburgh to New York and works as a commercial illustrator"],
      ["1962", "Soup cans and Marilyns make him the face of Pop Art"],
      ["1964", "Opens the Factory on East 47th Street"],
      ["1969", "Starts Interview magazine"],
      ["1977", "A regular at Studio 54 from its first year"],
      ["1980s", "Works side by side with Jean-Michel Basquiat and turns up at Area, Palladium and Limelight"],
      ["1987", "Dies after routine gallbladder surgery, aged 58"],
    ],
    liftedUp: ["Jean-Michel Basquiat", "Christopher Makos", "Benjamin Liu", "Edie Sedgwick"],
    rooms: ["The Factory", "Studio 54", "Area", "Palladium", "Limelight"],
    said: [
      { episode: "s05e06", who: "Christopher Makos", time: "00:44:40", quote: "Andy was like this sofa that was in New York City. It was a comfortable place to be, and he would never not be there." },
      { episode: "s05e06", who: "Christopher Makos", time: "00:28:45", quote: "In the end, just like everybody, Andy just wanted to be pretty." },
      { episode: "s04e07", who: "James St. James", time: "00:32:07", quote: "Yes, he had a mystique and he was a legend, but he was just one of the kids. He was just a club person and he hung out with people." },
      { episode: "s01e10", who: "Joey Arias", time: "00:00:50", quote: "After the show, Andy was downstairs, and he's like, that was the best show I ever saw in my life. It was better than Broadway." },
      { episode: "s01e10", who: "Joey Arias", time: "00:40:17", quote: "There were ten other people who looked like Andy. But Andy looked at me and went, you look more like me than anybody else." },
      { episode: "s04e07", who: "Trey Speegle", time: "00:56:14", quote: "Andy's brother gave it to the gravestone maker. So that poster was the template for his gravestone." },
    ],
    wikidata: "https://www.wikidata.org/wiki/Q5603",
  },
  "malcolm-mclaren": {
    born: "1946",
    died: "2010",
    diedLine: "Died 8 April 2010 in Bellinzona, Switzerland, of mesothelioma, aged 64",
    story:
      "Ran SEX on the King's Road with Vivienne Westwood, managed the Sex Pistols and Bow Wow Wow, then mixed hip-hop with square dancing on Duck Rock and put voguing in the charts with Deep in Vogue.",
    timeline: [
      ["1971", "Opens Let It Rock at 430 King's Road with Vivienne Westwood, later the shop SEX"],
      ["1975", "Looks after the New York Dolls, then puts together the Sex Pistols"],
      ["1980", "Starts Bow Wow Wow"],
      ["1983", "Duck Rock with Trevor Horn: Buffalo Gals and Double Dutch"],
      ["1984", "Fans, his opera album"],
      ["1989", "Deep in Vogue tops the US dance chart"],
      ["2010", "Dies of mesothelioma in Switzerland, aged 64"],
    ],
    liftedUp: ["Sex Pistols", "Bow Wow Wow", "Annabella Lwin", "Boy George", "Nick Egan"],
    rooms: ["SEX", "Area"],
    said: [
      { episode: "s05e04", who: "Nick Egan", time: "00:17:57", quote: "If you spent any time in London, Malcolm was like a kind of a god. He was a cultural god." },
      { episode: "s05e04", who: "Nick Egan", time: "00:18:17", quote: "He'd come up with an idea, and within a month, everyone was listening to it, dancing to it, dressing to it." },
      { episode: "s05e04", who: "Nick Egan", time: "00:24:55", quote: "Trevor Horn asked him if he had a demo, and Malcolm didn't. He just gave him this Honduran merengue 78 and said, that's the demo." },
      { episode: "s03e06", who: "Eric Goode", time: "00:29:35", quote: "I loved Malcolm to the day he died." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:38:39", quote: "I wrote to him and said, you really got to come to New York. You got to see this scene. This whole ballroom thing, voguing. It's so you." },
      { episode: "s06e03", who: "Chi Chi Valenti", time: "00:40:03", quote: "I have deep respect for Malcolm's work. I think he's completely brilliant." },
    ],
    wikidata: "https://www.wikidata.org/wiki/Q325377",
  },
  "keith-haring": {
    born: "1958",
    died: "1990",
    diedLine: "Died 16 February 1990 in New York, of AIDS-related illness, aged 31",
    story:
      "Chalk drawings in the subway, murals over dance floors. He curated shows at Club 57 and the Mudd Club, bused tables at the first Danceteria, danced at the Paradise Garage and opened the Pop Shop so anyone could own his art.",
    timeline: [
      ["1978", "Moves to New York to study at the School of Visual Arts"],
      ["1980", "Curates shows at Club 57 and the Mudd Club, and starts drawing in the subway"],
      ["1980s", "A Saturday regular at the Paradise Garage"],
      ["1985", "Paints the huge backdrop behind Palladium's dance floor"],
      ["1986", "Opens the Pop Shop on Lafayette Street"],
      ["1989", "Starts the Keith Haring Foundation"],
      ["1990", "Dies of AIDS-related illness, aged 31"],
    ],
    liftedUp: ["LA II", "Juan Dubose"],
    rooms: ["Club 57", "Mudd Club", "Danceteria", "Paradise Garage", "Palladium", "Pop Shop"],
    said: [
      { episode: "s04e07", who: "Trey Speegle", time: "00:11:17", quote: "The first Danceteria was on 37th Street. It was illegal. Keith Haring was a busboy. And Keith had painted a mural over the staircase." },
      { episode: "s03e06", who: "Eric Goode", time: "00:05:49", quote: "This drawing show at the Mudd Club that Keith curated… it's funny when you think back, it felt like such a small community." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:29:42", quote: "Keith Haring, Kenny Scharf. There were a few of us that really went to both places, Mudd and 57." },
      { episode: "s06e07", who: "Sally Randall", time: "00:36:48", quote: "I had gone to school with Keith and Kenny, and that was sort of the flavor of things." },
      { episode: "s04e07", who: "Fenton Bailey", time: "01:01:26", quote: "I think Keith Haring is thrilled to be on every Uniqlo T-shirt." },
      { episode: "s04e07", who: "Trey Speegle", time: "01:01:32", quote: "He had the Pop Shop. That's where he and Andy really connected, because they both thought art should be everywhere. Keith wasn't apologizing for having a store." },
    ],
    wikidata: "https://www.wikidata.org/wiki/Q485635",
  },
  "klaus-nomi": {
    born: "1944",
    died: "1983",
    diedLine: "Died 6 August 1983 in New York, of AIDS-related illness, aged 39",
    aka: "Klaus Sperber",
    story:
      "A pastry chef by day and a countertenor by night. He stepped onto the New Wave Vaudeville stage in a plastic cape, sang Saint-Saëns, and a year later was singing behind David Bowie on Saturday Night Live.",
    timeline: [
      ["1972", "Moves from West Berlin to New York and runs a pastry shop"],
      ["1978", "Becomes Klaus Nomi and stops the show at New Wave Vaudeville, Irving Plaza"],
      ["1979", "Sings with Joey Arias behind David Bowie on Saturday Night Live"],
      ["1981", "First album, Klaus Nomi"],
      ["1982", "Second album, Simple Man"],
      ["1983", "Dies of AIDS-related illness, aged 39, one of the first well-known people lost to it"],
    ],
    liftedUp: ["Joey Arias"],
    rooms: ["New Wave Vaudeville", "Irving Plaza", "Mudd Club", "Fiorucci"],
    said: [
      { episode: "s01e10", who: "Joey Arias", time: "00:16:37", quote: "That first week, I met Klaus, who's a baker and an opera singer." },
      { episode: "s04e10", who: "Ann Magnuson", time: "00:21:29", quote: "We went right up to this guy and said, who are you? Because you're the most interesting person here. And it was Klaus Nomi, Klaus Sperber." },
      { episode: "s04e10", who: "Ann Magnuson", time: "00:22:00", quote: "He jumped up on this snow mound and started singing opera, lit by the street light." },
      { episode: "s01e10", who: "Joey Arias", time: "00:19:49", quote: "They told Klaus, your name is on the poster. So Klaus was writing: Klaus, Emini, Omni, Omni, Nomi. No me?" },
      { episode: "s03e04", who: "Man Parrish", time: "00:37:09", quote: "Klaus was a sweetheart." },
      { episode: "s01e10", who: "Joey Arias", time: "01:00:08", quote: "I promised Klaus I would watch after the legacy. I have everything of Klaus." },
    ],
    wikidata: "https://www.wikidata.org/wiki/Q57774",
  },
  "ivana-trump": {
    born: "1949",
    died: "2022",
    diedLine: "Died 14 July 2022 in New York, after a fall at home, aged 73",
    story:
      "Came from Czechoslovakia by way of Montreal, and with Nikki Haskell at her side went from Le Club to Studio 54 in her first year in New York. Later ran a casino and the Plaza Hotel before building her own brand.",
    timeline: [
      ["1949", "Born Ivana Zelníčková in Zlín, Czechoslovakia"],
      ["1976", "Arrives in New York and meets Nikki Haskell, who becomes her best friend"],
      ["1977", "Marries in April, and goes to the opening night of Studio 54 with Nikki"],
      ["1980s", "Runs the Trump Castle casino in Atlantic City, then the Plaza Hotel"],
      ["1990s", "Launches her own clothing, jewelry and beauty lines"],
      ["2022", "Dies after a fall at home in Manhattan, aged 73"],
    ],
    liftedUp: [],
    rooms: ["Le Club", "Studio 54", "Plaza Hotel"],
    said: [
      { episode: "s02e04", who: "Nikki Haskell", time: "00:12:14", quote: "Ivana and I hit it off immediately. We became new best friends in like five seconds. Actually, we were wearing the same outfit." },
      { episode: "s02e04", who: "Nikki Haskell", time: "00:16:42", quote: "When Ivana first came to town, she didn't know anything or anyone, and I introduced her to everyone." },
      { episode: "s02e04", who: "Nikki Haskell", time: "00:36:57", quote: "For 10 summers, I was with Ivana on the boat with the kids." },
      { episode: "s01e02", who: "Michael Musto", time: "00:37:40", quote: "I cottoned to Ivana. I thought she was interesting." },
      { episode: "s01e02", who: "James St. James", time: "00:37:45", quote: "I still have a soft spot for Ivana. She had terrible taste in men, but God bless her. I loved her to death." },
      { episode: "s06e08", who: "James St. James", time: "00:44:01", quote: "We loved Ivana, she was adorable." },
    ],
    wikidata: "https://www.wikidata.org/wiki/Q242351",
  },
  "aileen-mehle": {
    born: "1918",
    died: "2016",
    diedLine: "Died 11 November 2016 at home in Manhattan, aged 98",
    story:
      "As Suzy, the society columnist New York read for almost fifty years, from the Mirror and the Journal-American to the Daily News, Women's Wear Daily and W. In 1988 Suzygate made her front-page news herself.",
    timeline: [
      ["1918", "Born in El Paso, Texas"],
      ["1940s", "Starts writing society news in Miami"],
      ["1957", "Brings Suzy to New York's Mirror"],
      ["1963", "Becomes Suzy Knickerbocker at the Journal-American"],
      ["1985", "Starts writing for Women's Wear Daily and W, until she retires in 2005"],
      ["1988", "Suzygate: rival columnist James Revson says some of her parties came from press releases"],
      ["2016", "Dies at home in Manhattan, aged 98"],
    ],
    liftedUp: [],
    rooms: ["Women's Wear Daily"],
    said: [
      { episode: "s02e08", who: "Michelangelo Signorile", time: "00:27:01", quote: "Suzy was Aileen Mehle, the columnist who wrote the column in the Daily News that was all high society. She liked celebrities, though, too." },
      { episode: "s02e08", who: "James St. James", time: "00:31:43", quote: "All of New York came to a standstill because Suzy did not write her own column. It became front-page news in every New York newspaper." },
      { episode: "s06e08", who: "William Norwich", time: "00:06:09", quote: "I grew up reading her. My mother took the Daily News and I would read my mother's Daily News, reading Aileen Mehle." },
      { episode: "s06e08", who: "William Norwich", time: "00:17:04", quote: "She had expressions like, catch me, I'm falling." },
      { episode: "s06e08", who: "James St. James", time: "00:17:24", quote: "Editing a book of Suzy columns would be the happiest I would ever be in my life." },
    ],
    wikidata: "https://www.wikidata.org/wiki/Q4697031",
  },
  "liz-smith": {
    born: "1923",
    died: "2017",
    diedLine: "Died 12 November 2017 at home in Manhattan, aged 94",
    aka: "The Grand Dame of Dish",
    story:
      "The Texan who made gossip a front-page business: her own column in the Daily News from 1976, then Newsday and the New York Post, and eleven years on TV with Live at Five. Suzy was her great rival.",
    timeline: [
      ["1923", "Born in Fort Worth, Texas"],
      ["1950s", "Moves to New York and ghostwrites the Cholly Knickerbocker column"],
      ["1976", "Starts her own column in the Daily News"],
      ["1978", "Joins Live at Five on WNBC for eleven years, and wins an Emmy in 1985"],
      ["1991", "Moves her column to Newsday, later also the New York Post"],
      ["2000", "Her memoir Natural Blonde"],
      ["2017", "Dies at home in Manhattan, aged 94"],
    ],
    liftedUp: [],
    rooms: ["Newsday", "Cosmopolitan"],
    said: [
      { episode: "s01e02", who: "Michael Musto", time: "00:22:30", quote: "He would enlighten me to people like Liz Smith, who was the big syndicated gossip columnist, and how she would closet celebrities." },
      { episode: "s02e08", who: "Michelangelo Signorile", time: "00:12:11", quote: "Sometimes we'd send Liz a whole page of stuff and she'd use all this great gossip and only give us one plug." },
      { episode: "s02e08", who: "Michelangelo Signorile", time: "00:56:24", quote: "Liz always was kind of sore with me, but she came out and she acknowledged it." },
      { episode: "s06e08", who: "William Norwich", time: "00:12:13", quote: "The sister of my invention introduced me to Liz Smith, who was a very well-known columnist from Texas." },
      { episode: "s06e08", who: "William Norwich", time: "00:58:05", quote: "Liz Smith and Mrs. Mehle loathed each other, although they made up before Liz died." },
    ],
    wikidata: "https://www.wikidata.org/wiki/Q6660303",
  },
  "nelson-sullivan": {
    born: "1948",
    died: "1989",
    diedLine: "Died 4 July 1989 in New York, of a heart attack, aged 41",
    story:
      "The man with the video camera. From his house at 5 Ninth Avenue he filmed the downtown scene every day for six years, took in RuPaul, Larry Tee and Lahoma from Atlanta, and brought Ru to Fenton and Randy.",
    timeline: [
      ["1948", "Born in Kershaw, South Carolina"],
      ["1971", "Moves to Manhattan after Davidson College"],
      ["1981", "Rents 5 Ninth Avenue in the Meatpacking District"],
      ["1983", "Starts filming the clubs and daily life downtown"],
      ["1987", "RuPaul, Larry Tee and Lahoma Van Zandt move in with him from Atlanta"],
      ["1989", "Dies of a heart attack on the Fourth of July, aged 41"],
      ["1994", "Fenton and Randy make Nelson Sullivan's World of Wonder from his tapes"],
    ],
    liftedUp: ["RuPaul", "Larry Tee", "Lahoma Van Zandt"],
    rooms: ["Downtown Dukes and Divas", "Pyramid Club", "World of Wonder"],
    said: [
      { episode: "s01e02", who: "Michael Musto", time: "00:38:17", quote: "Nelson, of course, is the brilliant late videographer who documented the 1980s. He had access. I would bring him everywhere I went." },
      { episode: "s01e02", who: "Michael Musto", time: "00:38:35", quote: "Lahoma and RuPaul all moved to New York and lived with Nelson. And Lady Bunny was part of that." },
      { episode: "s03e08", who: "Larry Tee", time: "00:27:37", quote: "We didn't have any money. We were lucky that Nelson took us under his wing, and we met so many people through Nelson." },
      { episode: "s03e08", who: "Larry Tee", time: "00:18:35", quote: "Nelson was Michael Musto's running partner. And Michael gave Nelson access to Keith Haring's private parties, Andy Warhol's book signing, Stephen Sprouse backstage." },
      { episode: "s06e01", who: "James St. James", time: "00:19:00", quote: "I met you guys through Nelson as well. Backstage at the Downtown Dukes and Divas, and also just at Nelson's house." },
      { episode: "s06e03", who: "Johnny Dynell", time: "00:43:20", quote: "They had that whole house on the west side, that crazy house. Nelson's house." },
    ],
    wikidata: "https://www.wikidata.org/wiki/Q3337971",
  },
  "jean-michel-basquiat": {
    born: "1960",
    died: "1988",
    diedLine: "Died 12 August 1988 in New York, aged 27",
    aka: "SAMO",
    story:
      "Started as SAMO, spraying walls downtown, and was at the Mudd Club almost every night. Within a few years he was painting for Mary Boone and side by side with Warhol, and his paintings hung in Palladium's Michael Todd Room.",
    timeline: [
      ["1960", "Born in Brooklyn"],
      ["1977", "Writes SAMO on walls around SoHo and the Lower East Side"],
      ["1979", "A regular at the Mudd Club, and in the band Gray"],
      ["1982", "Solo shows at the Fun Gallery and with Larry Gagosian in Los Angeles"],
      ["1984", "Joins Mary Boone's gallery"],
      ["1985", "Shows paintings made with Andy Warhol at Tony Shafrazi, and his work hangs in Palladium's Michael Todd Room"],
      ["1988", "Dies in his Great Jones Street studio, aged 27"],
    ],
    liftedUp: [],
    rooms: ["Mudd Club", "Club 57", "Fun Gallery", "Palladium"],
    said: [
      { episode: "s02e11", who: "Richard Boch", time: "00:24:16", quote: "He was another one of those kids. They were still teenagers then. He was a sweet kid. He was always on the dance floor, always at the DJ booth asking what they were playing." },
      { episode: "s02e11", who: "Richard Boch", time: "00:24:38", quote: "We would bum-rush him out the door because he was spray painting the bathroom. He would come back the next day with a sad face with a little smirk attached to it. We would let him back in." },
      { episode: "s01e10", who: "Joey Arias", time: "00:30:17", quote: "I remember him walking around trying to sell the little cards he scribbled. I thought, $20 is like a week's worth of food, man. I did buy one eventually." },
      { episode: "s01e10", who: "Joey Arias", time: "00:30:59", quote: "He was very bold about it. He didn't care. Anybody who looked like they had money, he just walked up." },
      { episode: "s03e06", who: "Eric Goode", time: "00:06:04", quote: "That show probably had 50 artists. The notable ones today were Jean-Michel Basquiat and Keith Haring and Kenny Scharf." },
      { episode: "s01e06", who: "Waltpaper", time: "00:27:03", quote: "I was 18 years old. My idols were Robert Mapplethorpe and Jean-Michel Basquiat." },
    ],
    wikidata: "https://www.wikidata.org/wiki/Q155407",
  },
  "leigh-bowery": {
    born: "1961",
    died: "1994",
    diedLine: "Died 31 December 1994 in London, of AIDS-related illness, aged 33",
    story:
      "From the Melbourne suburbs to London's clubs: he ran Taboo, made costumes for the Michael Clark Company, sat for Lucian Freud and turned every look into a performance. Susanne Bartsch brought him to New York.",
    timeline: [
      ["1961", "Born in Melbourne, Australia"],
      ["1980", "Moves to London"],
      ["1985", "Opens the club Taboo in Leicester Square"],
      ["1987", "His costumes for the Michael Clark Company win a Bessie Award"],
      ["1988", "Meets Lucian Freud and starts sitting for him"],
      ["1991", "Hosts the second Love Ball in New York for Susanne Bartsch"],
      ["1994", "Marries Nicola Bateman, and dies of AIDS-related illness at the end of the year, aged 33"],
    ],
    liftedUp: ["Trojan", "Nicola Bateman"],
    rooms: ["Taboo", "Kinky Gerlinky", "Love Ball", "Wigstock"],
    said: [
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:17:06", quote: "Leigh was just really funny. He was very sarcastic, hysterical. His jokes were so dry." },
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:17:15", quote: "Him and Trojan were the ultimate magic to me." },
      { episode: "s02e03", who: "Susanne Bartsch", time: "00:17:40", quote: "Leigh was outrageous, really outrageous. And the more outrageous he could be, the happier he was." },
      { episode: "s01e10", who: "Joey Arias", time: "00:54:03", quote: "Leigh Bowery, who's the godfather, the saint to all this world." },
      { episode: "s02e01", who: "Michelle Visage", time: "00:32:21", quote: "I would see Leigh Bowery all the time at Susanne's parties." },
      { episode: "s05e03", who: "James St. James", time: "00:32:41", quote: "It's hard to imagine this, but you stole the show from Leigh Bowery." },
    ],
    wikidata: "https://www.wikidata.org/wiki/Q1024044",
  },
};
