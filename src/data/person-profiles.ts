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
};
