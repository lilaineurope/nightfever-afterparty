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
  /** Lisa's rule is two quotes per guest; a page can go higher when she says so (Kim: Mickey x3, Lisa 21 Nov 2026). */
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
      { episode: "s04e04", who: "Zaldy", time: "00:46:40", quote: "I met Ru at Palais de Beauté, and I just remember seeing Ru and being mesmerized by the hair, the makeup, everything, the height. You could feel the power of RuPaul from across [the room]." },
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
};
