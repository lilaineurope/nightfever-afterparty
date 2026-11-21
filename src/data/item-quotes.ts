// "What the guests said about it" on Library item pages (Lisa, 21 Nov 2026: "a row of quotes from guests"): the guests' own
// words about a book, magazine, column, diary or film, taken from the episode transcripts (kept on Lisa's Mac, never
// published) and checked against the episode audio. Keyed by A–Z card slug. Same rule as the club quote walls: at most 9,
// as many different guests as possible, never more than 2 from the same guest (src/data/cards.test.ts checks).
// Guests only - not the hosts (James, Fenton, Randy), unless the host is the episode's own guest (S06E01).

export type GuestQuote = { episode: string; who: string; time: string; quote: string };

export const ITEM_QUOTES: Record<string, GuestQuote[]> = {
  "81-2": [
    { episode: "s02e10", who: "Brian Belovitch", time: "00:03:54", quote: "I was living my Fellini, like La Dolce Vita, like 8½." },
  ],
  "a-touch-of-crass": [
    { episode: "s06e08", who: "William Norwich", time: "00:07:09", quote: "I had done a thing called A Touch of Crass: How to Be a Social Climber in New York City. It was laid out as a Monopoly game. It was sort of a precursor to Spy magazine, with all the little bits all over the place." },
  ],
  "after-dark": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:25:53", quote: "The community theater was gay, and they'd have After Dark Magazine at their house, him and his boyfriend. These people have better taste - they've got an inside line to this cool stuff." },
    { episode: "s02e09", who: "Linda Simpson", time: "00:03:00", quote: "I lived in St. Paul by a college, so I had some access to The Village Voice and After Dark magazine, Interview - things that were hard to find." },
  ],
  "alice-s-adventures-in-wonderland": [
    { episode: "s04e09", who: "Susan Seidelman", time: "00:15:23", quote: "It was like Alice in Wonderland, like I had gone through this hole and now I was in this other bizarre world." },
  ],
  "all-about-eve": [
    { episode: "s01e02", who: "Michael Musto", time: "00:05:30", quote: "It was like the ending of All About Eve, where there's a new Eve Harrington coming along." },
  ],
  "all-my-children": [
    { episode: "s04e02", who: "Mickey Boardman", time: "00:42:19", quote: "He said, okay, we're going to do a quiz now to show who knows the most about All My Children. And we have someone here as a guest in case there's any discrepancies. Out walks Susan Lucci." },
  ],
  "american-fabulous": [
    { episode: "s03e06", who: "Eric Goode", time: "00:28:58", quote: "He's another incredible talent, and later was the subject of a film called American Fabulous that Reno Dakota directed." },
  ],
  "american-music-show": [
    { episode: "s03e08", who: "Larry Tee", time: "00:11:26", quote: "We met Ru actually through The American Music Show, because The American Music Show saw our band." },
  ],
  "an-american-family": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:12:18", quote: "PBS was really one of the best portals. And then An American Family showed on PBS and Lance Loud appeared." },
    { episode: "s03e04", who: "Man Parrish", time: "00:29:54", quote: "An American Family was early to mid seventies. I remember being at home watching it." },
  ],
  "andy-warhol-diaries": [
    { episode: "s04e05", who: "Dustin Pittman", time: "00:47:16", quote: "When they came out with The Andy Warhol Diaries, I said, you believe what you want to believe. Everybody's got their own story." },
    { episode: "s01e10", who: "Joey Arias", time: "00:30:59", quote: "We all looked at Andy Warhol as our savior. Andy Warhol was God. I came to New York to meet God." },
  ],
  "april-ashley-s-odyssey": [
    { episode: "s02e05", who: "Connie Fleming", time: "00:23:49", quote: "She gave me April Ashley's book. And I read it. It speaks to me as a trans person going through transition - she was a model, and she was like, well, I see this in you." },
  ],
  "avengers": [
    { episode: "s04e06", who: "Lauren Ezersky", time: "00:16:12", quote: "John Bates did all the clothing for The Avengers - remember Diana Rigg? He had a showroom in New York, and I just had the balls. I went up into that showroom and said, I've got to buy this dress." },
  ],
  "baby": [
    { episode: "s04e02", who: "Mickey Boardman", time: "00:37:30", quote: "Some of the classics we've done over the years include The Baby with Ruth Roman and Anjanette Comer. Movies where you scratch your head and are like, how did this ever get made?" },
  ],
  "basketball-diaries": [
    { episode: "s03e08", who: "Larry Tee", time: "00:25:55", quote: "They shot What's Love Got to Do with It and Basketball Diaries at the basketball park across the street. We'd sit in the window of this three-story townhouse as they were shooting." },
  ],
  "batman": [
    { episode: "s01e07", who: "Rudolf Piper", time: "00:37:51", quote: "With the first Batman movie, a bunch of kids decided to become super villains, and they started to break into warehouses in their neighborhood dressed as superheroes or super villains." },
  ],
  "best-little-whorehouse-in-texas": [
    { episode: "s02e01", who: "Michelle Visage", time: "00:49:25", quote: "One of the dream roles for me has always been Miss Mona in Best Little Whorehouse. To be able to do that song with Ru all those moons ago, when I was far too young to play Miss Mona, was special." },
  ],
  "bettie-page-book": [
    { episode: "s01e10", who: "Joey Arias", time: "00:48:53", quote: "People kept saying, wow, you look like Bettie Page. So then I started doing more Bettie Page, and then I wound up being in Bettie Page's book and meeting Bettie Page in LA before she passed away." },
  ],
  "beverly-hills-90210": [
    { episode: "s04e09", who: "Susan Seidelman", time: "01:02:57", quote: "I really had not watched much of Melrose Place or Beverly Hills 90210. But somebody sent me the script, and you've got to go with your gut. I read it and I said, this is good. This is different." },
  ],
  "blueboy": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:21:33", quote: "Swap meets. People would be encouraged to bring their porn, mostly in print. Someone would have, you know, I have a Blueboy, I'll trade." },
  ],
  "bodyguard": [
    { episode: "s02e01", who: "Michelle Visage", time: "00:29:51", quote: "I came out with a song on The Bodyguard soundtrack, and Ru came out with Supermodel, and we were at the dance music convention, in the same green room." },
  ],
  "bring-on-the-night": [
    { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:29:28", quote: "The Night, on the cover of the New York Post. It was a picture - I still have it - of me and Tony Senecal. And it was all about all the clubs that were going on at that time." },
  ],
  "carrie": [
    { episode: "s01e10", who: "Joey Arias", time: "00:10:19", quote: "All I wanted when I came to New York was to find my tribe, the misfits. I used to go for movie auditions - they actually cast me in Carrie." },
  ],
  "channel-j": [
    { episode: "s04e09", who: "Susan Seidelman", time: "00:47:01", quote: "Manhattan Cable, late night, Ugly George, Al Goldstein... That was a fascinating time in cable TV. Fascinating." },
  ],
  "charlie-s-angels": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:15:53", quote: "I saw CHiPs. I didn't watch it, but I saw it. And I thought, well, that's Los Angeles and Charlie's Angels. So I can't go there, because I don't fit in that at all." },
  ],
  "chips": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:15:53", quote: "I saw CHiPs. I didn't watch it, but I saw it. And I thought, well, that's Los Angeles and Charlie's Angels. So I can't go there, because I don't fit in that at all." },
  ],
  "circus": [
    { episode: "s05e06", who: "Christopher Makos", time: "00:14:56", quote: "Jerry Rothberg, who started Circus Magazine, hired me basically to file things. And then I became a photo editor." },
  ],
  "club-57-film-performance-and-art-in-the-east-village": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:41:51", quote: "It was important for a third party with that kind of academic rigor and emotional distance. There's things that happened in that club I had no idea about once I left it." },
    { episode: "s04e10", who: "Ann Magnuson", time: "00:44:19", quote: "There was no censorship at Club 57. Somebody from more of the Mudd Club world heard that MoMA was doing this show: Club 57? Why are they doing a show about them?" },
  ],
  "cruising": [
    { episode: "s01e04", who: "Peter Gatien", time: "00:12:41", quote: "A little bit of a glimpse I got of that was maybe the Al Pacino movie. Cruising! Point of the story, I was terrified." },
  ],
  "curb-your-enthusiasm": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:59:58", quote: "That show would have run for as long as Curb Your Enthusiasm. We laughed so much." },
  ],
  "dark-shadows": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:14:52", quote: "I wasn't watching soap operas, except for Dark Shadows." },
    { episode: "s06e01", who: "James St. James", time: "00:14:42", quote: "Lara Parker, who was on Dark Shadows. She was Angelique on Dark Shadows." },
  ],
  "dazed-and-confused": [
    { episode: "s03e08", who: "Larry Tee", time: "00:50:26", quote: "By the time we did the festival, I had one of the writers from The Face and Dazed and Confused living in my loft. So the minute it went on, it was immediately distributed into the veins of the music and writing industry." },
  ],
  "details": [
    { episode: "s05e04", who: "Nick Egan", time: "00:57:42", quote: "Details magazine in New York, i-D had come out, The Face - all these cultural, iconic magazines that were looking at fashion and music and putting them together. Those magazines were really important." },
    { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:13:43", quote: "When I became addicted to Details Magazine, they would have their fashion issue, and I would try to spend whatever money I'd saved to get my hands on more fashion-forward clothing." },
    { episode: "s02e09", who: "Linda Simpson", time: "00:09:13", quote: "I was very immersed in the nightlife, mostly as an observer, and I read Details magazine religiously, Paper magazine, et cetera." },
    { episode: "s01e06", who: "Waltpaper", time: "00:15:01", quote: "I didn't read Details Magazine or Interview Magazine. I was pretty green and pretty dumb when it came to nightlife culture in New York." },
    { episode: "s02e06", who: "Michael Schmidt", time: "00:08:47", quote: "Annie saunters in, because Annie was the queen of us all, running Details Magazine." },
    { episode: "s03e06", who: "Eric Goode", time: "00:11:10", quote: "Thank God there was a guy named Stephen Saban who loved me and wrote about me in Details Magazine and Soho News." },
    { episode: "s04e08", who: "Richie Rich", time: "00:17:24", quote: "I knew of you, James, because of Details Magazine. And I was like, wow, that's the world. Those are my peeps." },
    { episode: "s01e02", who: "Michael Musto", time: "00:14:01", quote: "It was Annie Flanders' birthday - she was the other Details, who I knew from Soho News - and I got my Mustettes together. We sang happy birthday to her just as they were clearing it off." },
    { episode: "s05e03", who: "Amanda Lepore", time: "00:30:40", quote: "I knew about it from Details. I used to always see Dianne Brill, and I love Dianne Brill. She was like in drag, but a woman - half real woman and half cartoon." },
  ],
  "diary-of-a-mad-queen": [
    { episode: "s06e01", who: "James St. James", time: "00:34:05", quote: "When OutWeek closed, I was enjoying what I was doing there, and I wondered, can I take those columns and turn it into a long-form book?" },
    { episode: "s06e01", who: "James St. James", time: "00:35:00", quote: "It was about a bedraggled little drag queen who ends up on the streets. It was a whole story." },
  ],
  "dinah": [
    { episode: "s03e02", who: "Martha Wash", time: "00:10:58", quote: "It was fun doing the TV shows. I think we did Dinah Shore when she was down at Busch Gardens - just going out and doing our thing, being background singers for Sylvester." },
  ],
  "disco-bloodbath-party-monster": [
    { episode: "s04e08", who: "Richie Rich", time: "00:56:36", quote: "You write Disco Bloodbath and it becomes Party Monster, and then now it's a mega cult." },
    { episode: "s03e05", who: "Cherry Vanilla", time: "01:16:35", quote: "It takes a writer, James. And I love your movie, by the way, and your book." },
    { episode: "s02e07", who: "Jenny Talia", time: "00:35:38", quote: "So, this is going to be the big reveal. I have not read the book and I have not seen the movie." },
    { episode: "s06e01", who: "James St. James", time: "00:52:26", quote: "You hooked me up with the literary agent and you got the book deal." },
  ],
  "dog-day-afternoon": [
    { episode: "s02e10", who: "Brian Belovitch", time: "00:23:26", quote: "Most of them are dead, unfortunately. Not many of them survived AIDS and drug overdose. Liz Eden was a friend of mine from Dog Day Afternoon." },
  ],
  "dynasty": [
    { episode: "s01e01", who: "Dianne Brill", time: "00:35:38", quote: "I was at Cornelia's with Andy and we're watching Dynasty before going out." },
    { episode: "s01e06", who: "Waltpaper", time: "00:18:32", quote: "Diahann Carroll from Dynasty! We were like, oh my God, Diahann Carroll's here. It took me a while, after I met Linda Simpson and saw Ru perform at Pyramid. I was like, oh, it's not Diahann Carroll." },
  ],
  "edie-an-american-biography": [
    { episode: "s06e01", who: "James St. James", time: "00:05:01", quote: "And then Edie Sedgwick - the book Edie came out, and that was like a holy grail for me." },
  ],
  "emperor-s-new-clothes": [
    { episode: "s05e04", who: "Nick Egan", time: "00:42:01", quote: "This whole expensive grunge thing is the Emperor's New Clothes. It's like, oh, look how fabulous - but really, there's nothing to it." },
  ],
  "entertainment-tonight": [
    { episode: "s02e04", who: "Nikki Haskell", time: "00:19:22", quote: "He also created Entertainment Tonight and Star Search, without question." },
    { episode: "s03e04", who: "Man Parrish", time: "00:58:49", quote: "My father called me and said, the National Enquirer and Entertainment Tonight called me, they want to know about you - and who's Madonna? And I said, don't talk." },
  ],
  "evening-magazine": [
    { episode: "s05e07b", who: "Really Denise", time: "00:58:59", quote: "A month after that, I was on KING, the largest news station in our market. In the evenings they have a show called Evening Magazine, which focuses on art and culture in this area. They did a wonderful segment." },
  ],
  "explant": [
    { episode: "s02e01", who: "Michelle Visage", time: "00:59:19", quote: "The whole point of Explant, the documentary, is not anti-plastic surgery, it's pro-transparency. So we know what's in our bodies, because nobody else - and I'm living proof - nobody else will advocate for us." },
  ],
  "face": [
    { episode: "s03e08", who: "Larry Tee", time: "00:49:38", quote: "They were on the cover of The Face magazine. I was like, oh, well, maybe I have to give these guys a listen. And it was love at first sight." },
    { episode: "s05e04", who: "Nick Egan", time: "00:57:42", quote: "Details magazine in New York, i-D had come out, The Face - all these cultural, iconic magazines that were looking at fashion and music and putting them together." },
  ],
  "fashion-file": [
    { episode: "s04e06", who: "Lauren Ezersky", time: "00:08:40", quote: "There was Robert Verdi. There was me. There was Elsa Klensch, Jeanne Beker, and then there was Fashion File with Tim Blanks. There was a bunch of us. There's nobody doing anything now." },
  ],
  "fiorucci-the-book": [
    { episode: "s01e07", who: "Rudolf Piper", time: "00:18:17", quote: "I just discovered this book by Eve Babitz. She used to be an it girl in LA in the 60s and 70s. She wrote an entire book about Fiorucci, how fabulous it was - and you read this book today as total science fiction." },
  ],
  "first-ladies-of-disco-32-stars-discuss-the-era-and-their-singing-careers": [
    { episode: "s03e02", who: "Martha Wash", time: "00:46:22", quote: "It takes you back, for a lot of people, to their teenage, young adult years, where they're just getting into the clubs, or listening to the music on the radio at that time. It brings back a lot of memories." },
  ],
  "freak-show": [
    { episode: "s06e01", who: "James St. James", time: "00:08:00", quote: "In my book Freak Show, I open it up with an actual incident: on the first day of high school, I walked into my first class, eight o'clock in the morning, thinking I was Liza Minnelli at Studio 54." },
  ],
  "gawker": [
    { episode: "s01e09", who: "Moby", time: "01:01:04", quote: "We all remember the early days of Gawker and Gothamist, around 2003. I was so self-involved and self-obsessed, I read everything about me - and it was when the press had really started to turn against me." },
  ],
  "geraldo": [
    { episode: "s04e08", who: "Richie Rich", time: "00:30:55", quote: "Geraldo - all he wanted to talk about was drugs. And I'm like, I don't do drugs. I look at this as a platform, a launching pad for fashion and music and fun. So I walked off. And then Geraldo comes backstage: please come back." },
    { episode: "s01e06", who: "Waltpaper", time: "00:14:14", quote: "He was like, oh, you're a club kid. And I didn't know what that was. And I also had not seen the TV show, the first Geraldo show." },
  ],
  "gilded-age": [
    { episode: "s02e08", who: "Michelangelo Signorile", time: "00:17:47", quote: "I remember getting a lot of shade. Have you been watching The Gilded Age? It's exactly like that." },
  ],
  "girl-can-t-help-it": [
    { episode: "s05e03", who: "Amanda Lepore", time: "00:29:56", quote: "I liked Marilyn Monroe and Jayne Mansfield - they were all movie stars. So I would watch The Girl Can't Help It and movies like that." },
  ],
  "goodfellas": [
    { episode: "s04e03", who: "Bebe Buell", time: "00:53:48", quote: "Have you ever watched Goodfellas? You know what it was like when they would walk into a club with the wife - that scene in Goodfellas? There you go." },
  ],
  "goonies": [
    { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:09:23", quote: "She was catching up on having missed school for filming Goonies." },
  ],
  "gothamist": [
    { episode: "s01e09", who: "Moby", time: "01:01:04", quote: "We all remember the early days of Gawker and Gothamist, around 2003. I was so self-involved and self-obsessed, I read everything about me - and it was when the press had really started to turn against me." },
  ],
  "i-m-gonna-make-you-love-me": [
    { episode: "s02e10", who: "Brian Belovitch", time: "00:51:12", quote: "When we did the documentary, I wanted to let him know it wasn't going to be a secret. If Elizabeth Taylor can talk about all her ex-husbands, why couldn't I?" },
  ],
  "i-ve-seen-the-future-and-i-m-not-going": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:57:01", quote: "In Peter's book that he writes about the 80s - I was standing next to them for the entire decade, and I'm not mentioned." },
  ],
  "inchon": [
    { episode: "s02e04", who: "Nikki Haskell", time: "00:29:57", quote: "Reverend Moon had this movie called Inchon, and they flew me over to the Cannes Film Festival to cover that. That was fabulous." },
  ],
  "interview-magazine": [
    { episode: "s01e02", who: "Michael Musto", time: "00:09:12", quote: "I started writing for Interview. The only downside was I started to feel like William Holden in Sunset Boulevard a little bit, minus the sex." },
    { episode: "s04e04", who: "Zaldy", time: "00:37:47", quote: "They pushed me towards my first modeling job, which was with Steven Meisel for Interview Magazine. Not a bad way to start." },
    { episode: "s04e07", who: "Trey Speegle", time: "00:09:16", quote: "They would walk down Madison Avenue, Benjamin carrying Interview magazines, Andy with a Sharpie, so that whoever they would run into, he could sign the latest Interview and hand it out." },
    { episode: "s01e09", who: "Moby", time: "00:18:03", quote: "My girlfriend at the time was working at Interview, and she said, oh, there's this new club opening called Mars and they're hiring. So I made a demo tape with house music on one side and hip-hop on the other." },
    { episode: "s01e06", who: "Waltpaper", time: "00:15:49", quote: "My best friend Ricky was the exact opposite. He studied Interview magazine, he studied Details." },
    { episode: "s02e09", who: "Linda Simpson", time: "00:03:00", quote: "I lived in St. Paul by a college, so I had some access to The Village Voice and After Dark magazine, Interview - things that were hard to find." },
  ],
  "joan-rivers-show": [
    { episode: "s04e08", who: "Richie Rich", time: "00:27:09", quote: "Michael thrust me onto the Joan Rivers show. He's like, you're going to emcee a fashion show with all the club kids. And it was Michael Musto, Kenny Kenny, Patrick McMullan sitting next to me on the couch. I'm like, royalty." },
    { episode: "s05e03", who: "Amanda Lepore", time: "00:32:11", quote: "Right away I did that Joan Rivers thing." },
  ],
  "jubilee": [
    { episode: "s02e02", who: "Jayne County", time: "00:50:56", quote: "I knew Adam from when I did Jubilee, the movie. Derek Jarman's Jubilee. Very punk rock, a very famous punk rock movie." },
  ],
  "juliet-of-the-spirits": [
    { episode: "s02e10", who: "Brian Belovitch", time: "00:04:03", quote: "Oh, Juliet of the Spirits. I was all that and more. It was a culmination of everything I felt I had worked for, as this ultimate glamorous sex pot." },
  ],
  "kindergarten-cop": [
    { episode: "s01e03", who: "Lisa Edelstein", time: "00:44:44", quote: "The longest conversation I had with Warhol was about the movie Kindergarten Cop, which he loved. I was like, I can't believe I'm walking down the street talking about Kindergarten Cop with Andy Warhol." },
  ],
  "klute": [
    { episode: "s02e05", who: "Connie Fleming", time: "00:11:00", quote: "Paul McGregor had the salon upstairs. Legend has it when Jane Fonda was doing Klute, she went there to go and get the Klute cut." },
  ],
  "la-dolce-vita": [
    { episode: "s02e10", who: "Brian Belovitch", time: "00:03:54", quote: "I was living my Fellini, like La Dolce Vita, like 8½." },
  ],
  "larry-king-live": [
    { episode: "s02e08", who: "Michelangelo Signorile", time: "00:57:31", quote: "I remember Rosie - she was infuriated. She went on Larry King. She called me a moron. But eventually, Rosie is writing me, and we're friends, and she's out." },
  ],
  "late-night-with-david-letterman": [
    { episode: "s06e07", who: "Sally Randall", time: "00:35:38", quote: "She asked if I'd like to appear on Letterman and I said no, thank you. She said only three other people have ever turned down David Letterman, and one of them was Cher. I said, if I do the show, everyone will forever know me as a door person." },
    { episode: "s01e01", who: "Dianne Brill", time: "00:40:19", quote: "I was on the cover of the New York Post the night that I was doing the David Letterman show. You're not going to deny me my title, Queen of the Night, tonight, David Letterman." },
  ],
  "law-and-order": [
    { episode: "s04e09", who: "Susan Seidelman", time: "01:07:18", quote: "I was once invited to visit the set of Law & Order - he was one of the detectives on Law & Order for a little while - and we chatted about Smithereens and the early days in New York." },
  ],
  "legendary": [
    { episode: "s01e08", who: "Luis Xtravaganza Camacho", time: "00:52:39", quote: "I honestly love those shows. Pose and Legendary deserve a space and a place. And I'm very proud that there is interest in shows like that." },
  ],
  "life-as-art-the-club-57-story": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:34:55", quote: "He wrote a book about all this called My Life as Art, I think it's called. It's an interesting book." },
  ],
  "lifestyles-of-the-rich-and-famous": [
    { episode: "s02e04", who: "Nikki Haskell", time: "00:18:58", quote: "Al Masini, who created Lifestyles of the Rich and Famous - he took my tapes and knocked them off and did Lifestyles of the Rich and Famous, without question." },
  ],
  "lisa-s-world": [
    { episode: "s01e03", who: "Lisa Edelstein", time: "01:02:18", quote: "I got a lot of experience on camera, and I started this thing called Lisa's World, where I started to pull people from that scene who were, I thought, really creative, interesting performance artists." },
  ],
  "love-is-in-the-legend": [
    { episode: "s03e01", who: "Patricia Field", time: "00:38:42", quote: "As far as Myra's concerned, she has a documentary called Love Is in the Legend, about the Grand Street Ball." },
  ],
  "made-for-tv": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:42:50", quote: "He was a videographer, and he made quite a famous documentary-style TV show called Made for TV with Ann Magnuson, where she performs as all of these different characters." },
  ],
  "making-mr-right": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:00:44", quote: "Making Mr. Right - my one lead role." },
    { episode: "s04e09", who: "Susan Seidelman", time: "00:50:17", quote: "This movie was about a woman who falls in love with an android. It was kind of an AI movie before people were talking about it." },
  ],
  "manhattan-cable": [
    { episode: "s04e09", who: "Susan Seidelman", time: "00:47:01", quote: "Manhattan Cable, late night, Ugly George, Al Goldstein... That was a fascinating time in cable TV. Fascinating." },
  ],
  "marie-antoinette": [
    { episode: "s03e01", who: "Patricia Field", time: "00:43:34", quote: "My favorite designer, Milena Canonero, she was sitting right behind me, and she did Marie Antoinette." },
  ],
  "mean-streets": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:11:15", quote: "A welcome wagon for New York City at that time, which was very, very much like Scorsese's Mean Streets and Midnight Cowboy." },
  ],
  "melody-maker": [
    { episode: "s02e02", who: "Jayne County", time: "00:55:04", quote: "When I played the Roxy, they were lined up around the block. They said they had never had that reaction before. And I've been on the cover of Melody Maker and everything." },
  ],
  "melrose-place": [
    { episode: "s04e09", who: "Susan Seidelman", time: "01:02:57", quote: "I really had not watched much of Melrose Place or Beverly Hills 90210. But somebody sent me the script, and you've got to go with your gut. I read it and I said, this is good. This is different." },
  ],
  "mermaids": [
    { episode: "s01e06", who: "Waltpaper", time: "00:04:45", quote: "You know that movie Mermaids with Cher? You know how whenever there's a problem, they move? That was basically my family." },
  ],
  "miami-rhapsody": [
    { episode: "s03e01", who: "Patricia Field", time: "00:41:13", quote: "I worked with Sarah Jessica on Miami Rhapsody." },
  ],
  "mickey-boardman-s-journal": [
    { episode: "s04e02", who: "Mickey Boardman", time: "00:28:14", quote: "It made me laser-focused. I would write in my journal for 12 hours at a time." },
  ],
  "midnight-cowboy": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:11:15", quote: "A welcome wagon for New York City at that time, which was very, very much like Scorsese's Mean Streets and Midnight Cowboy." },
    { episode: "s04e09", who: "Susan Seidelman", time: "00:06:49", quote: "The great male characters of that time period were allowed to make mistakes. Ratso Rizzo - one of my favorite movies, Midnight Cowboy - both of them are manipulative, and they're wonderful." },
  ],
  "miss-guy-s-journals": [
    { episode: "s03e10", who: "Miss Guy", time: "00:32:45", quote: "I just recently started flipping through some of my old journals from those days. There was a journal entry from March of '89, at like 5:45 in the morning: Me and Bunny went to Pyramid and the Roxy tonight, had a great time." },
  ],
  "more-80s-polaroids": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:54:43", quote: "The other one's called More 80s Polaroids. But the first one has a Polaroid that I took of Andy, actually, at Limelight." },
  ],
  "muppet-show": [
    { episode: "s04e08", who: "Richie Rich", time: "00:49:54", quote: "Heatherette's here with Miss Piggy. And I'm like, Piggy, I'm your biggest fan, because growing up I loved the Muppets. And Kelly looks right down at the Muppeteer and goes, why can't she talk?" },
  ],
  "my-comrade-anthology": [
    { episode: "s02e09", who: "Linda Simpson", time: "00:39:43", quote: "In June of this year I'm having an exhibit of My Comrade at a gallery in the East Village called Howl." },
  ],
  "new-york-club-kids": [
    { episode: "s01e06", who: "Waltpaper", time: "00:03:53", quote: "We had to keep it just under the art book framework in order to have access to the Urban Outfitters kids. I really wanted to reach the new generation." },
    { episode: "s02e07", who: "Jenny Talia", time: "00:19:17", quote: "Put these incredible stories out and really create such a beautiful book. I can't even." },
  ],
  "new-york-daily-news": [
    { episode: "s01e02", who: "Michael Musto", time: "00:16:35", quote: "There was a woman named Dinah Prince who did a column in the New York Daily News. I remember walking to Area once and I saw a deflated balloon of an airplane on the street. I put it on my head and strapped it with a rubber band." },
    { episode: "s02e08", who: "Michelangelo Signorile", time: "00:27:01", quote: "Suzy was Aileen Mehle - the columnist who wrote the column in the Daily News that was all high society. She liked celebrities, though, too." },
    { episode: "s06e08", who: "William Norwich", time: "00:06:09", quote: "My mother took the Daily News, and I would read my mother's Daily News, reading Aileen Mehle." },
  ],
  "new-york-herald-tribune": [
    { episode: "s06e08", who: "William Norwich", time: "00:08:27", quote: "There was a relationship between fashion and society. She became a columnist for various newspapers, the Herald Tribune..." },
  ],
  "new-york-magazine": [
    { episode: "s06e01", who: "James St. James", time: "00:07:12", quote: "My mother gave me a New York magazine subscription. So I would be looking up where I wanted to live, the restaurants I wanted to go to. I had a book in which I wrote all these things down." },
    { episode: "s02e07", who: "Jenny Talia", time: "00:35:58", quote: "He was a writer for New York Magazine. He got a pre-copy, and he really cared for me deeply, so he highlighted whatever I was in. I was like, I don't even want to see. I never read it." },
    { episode: "s02e09", who: "Linda Simpson", time: "00:58:36", quote: "That magazine cover, New York Magazine, was declaring drag is here to stay - and it was only about a year or two after that that the scene started collapsing." },
    { episode: "s04e07", who: "Trey Speegle", time: "00:04:55", quote: "It was kind of like New York magazine, and it was run by people who were at Texas Monthly." },
  ],
  "new-york-magazine-club-kids": [
    { episode: "s01e02", who: "Michael Musto", time: "00:34:00", quote: "The lead item on Page Six in April '96 was Mystery of the Missing Club Kid, and it put together my two items as well as a New York Magazine thing where they talked to Michael. That's really what made the story: me, New York Magazine, Page Six." },
  ],
  "new-york-observer": [
    { episode: "s06e08", who: "William Norwich", time: "00:51:13", quote: "I wrote weekly for something called the New York Observer and continued at Vogue, and left Vogue and went to the New York Times, and then went back to Vogue after the New York Times." },
  ],
  "new-york-post": [
    { episode: "s01e04", who: "Peter Gatien", time: "00:41:53", quote: "Back then, the New York Post was basically a newsletter for Giuliani." },
    { episode: "s04e07", who: "Trey Speegle", time: "00:55:31", quote: "Andy died really suddenly. So I took their blank memorial poster and took the cover of the New York Post that said Andy Warhol dead at 58, and I put Andy's high school yearbook picture in. And my printer did a thousand copies of it." },
    { episode: "s06e08", who: "William Norwich", time: "00:06:33", quote: "One day the New York Post offered her a ton of money to move. And so she moved and left a hole in society coverage." },
    { episode: "s01e01", who: "Dianne Brill", time: "00:40:19", quote: "I was on the cover of the New York Post the night that I was doing the David Letterman show." },
    { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:29:28", quote: "The Night, on the cover of the New York Post. It was a picture - I still have it - of me and Tony Senecal." },
  ],
  "new-york-times": [
    { episode: "s02e03", who: "Susanne Bartsch", time: "00:10:46", quote: "He did a story on my store, which was a full page in the New York Times before I opened. And it really got everyone focused on London." },
    { episode: "s01e10", who: "Joey Arias", time: "01:04:23", quote: "I cried so much for that show that the New York Times said, Madonna, eat your heart out. It was two pages, and me on the cover of the arts section with my hands out." },
    { episode: "s01e04", who: "Peter Gatien", time: "00:11:00", quote: "I never read The New York Times in my life." },
  ],
  "newsday": [
    { episode: "s06e08", who: "William Norwich", time: "00:56:04", quote: "Newsday was a Long Island newspaper, and then they decided they would do a New York City edition. So suddenly, for a while, we had another tabloid besides the Daily News and the New York Post." },
  ],
  "niagara": [
    { episode: "s02e10", who: "Brian Belovitch", time: "00:47:37", quote: "I was like Marilyn Monroe in Niagara, clicking along in my little heels, not looking back." },
  ],
  "night-porter": [
    { episode: "s06e03", who: "Chi Chi Valenti", time: "00:14:44", quote: "The incredible Karl Lagerfeld party - we were all in our, let's just call it, Night Porter wear. And I was photographed so many times, and have been in so many books." },
  ],
  "nightbirds": [
    { episode: "s01e05", who: "Ernie Glam", time: "00:01:45", quote: "I wrote the foreword for Michael Fazakerley's Nightbirds." },
  ],
  "nomi-song": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:22:00", quote: "This is a story I tell in The Nomi Song: he jumped up on this snow mound and started singing opera, lit by the street light." },
  ],
  "norman-is-that-you": [
    { episode: "s04e02", who: "Mickey Boardman", time: "00:37:30", quote: "Some of the classics we've done over the years include The Baby with Ruth Roman and Anjanette Comer. And Norman, Is That You? is one of the best. Movies where you scratch your head and are like, how did this ever get made?" },
  ],
  "once-upon-a-time-in-america": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:53:04", quote: "He said, Sergio Leone's coming in town. They're casting Once Upon a Time in America. And I got to meet Sergio Leone." },
  ],
  "oprah-winfrey-show": [
    { episode: "s06e07", who: "Sally Randall", time: "00:21:57", quote: "I do know that the show ended up on The Worst of Oprah." },
  ],
  "orphans-of-the-storm": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:12:18", quote: "PBS was really one of the best portals. They showed a lot of silent films. So I watched Orphans of the Storm, D.W. Griffith, many, many times over." },
  ],
  "our-town": [
    { episode: "s06e05", who: "Nora Burns", time: "00:51:35", quote: "I love Our Town. It's my favorite book, play. I actually like reading it better than seeing it. It makes me weep every time." },
  ],
  "out-magazine-the-glass-closet": [
    { episode: "s01e02", who: "Michael Musto", time: "00:26:10", quote: "I did a cover story for Out Magazine called The Glass Closet, and it was Jodie Foster and Anderson Cooper." },
  ],
  "out-of-towners": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:13:56", quote: "New York was definitely a dangerous place. One of my first impressions of New York was from that movie The Out of Towners, with Jack Lemmon." },
  ],
  "outsiders": [
    { episode: "s03e08", who: "Larry Tee", time: "00:42:16", quote: "Growing up as a kid, my mother used to read us S. E. Hinton's book, The Outsiders." },
  ],
  "outweek": [
    { episode: "s06e01", who: "James St. James", time: "00:33:23", quote: "At that time I was doing a column for OutWeek magazine that was getting some attention." },
    { episode: "s06e01", who: "James St. James", time: "00:34:05", quote: "When OutWeek closed, I was enjoying what I was doing there, and I wondered, can I take those columns and turn it into a long-form book?" },
  ],
  "page-six": [
    { episode: "s01e02", who: "Michael Musto", time: "00:34:00", quote: "The lead item on Page Six in April '96 was Mystery of the Missing Club Kid, and it put together my two items as well as a New York Magazine thing where they talked to Michael. That's really what made the story: me, New York Magazine, Page Six." },
    { episode: "s02e08", who: "Michelangelo Signorile", time: "00:11:05", quote: "It would be trading dirt and gossip for getting plugs on our clients. We would send the columnists pages of stuff, and every other item was a client item, and every item in between was juicy gossip about somebody else." },
  ],
  "pansy-beat": [
    { episode: "s02e09", who: "Linda Simpson", time: "00:37:14", quote: "Pansy Beat was another gay zine that was going on. They were influenced by My Comrade - the editor said so. There was kind of a little network of gay zines at that point." },
  ],
  "paris-is-burning": [
    { episode: "s02e01", who: "Michelle Visage", time: "00:33:40", quote: "Paris Is Burning. We were always around when the cameras were around." },
  ],
  "party-monster": [
    { episode: "s03e08", who: "Larry Tee", time: "00:46:09", quote: "James, you should be very proud. That was quite an inspiring book. You caught the scene so well in Party Monster. And the movie has still stood the test of time in its sheer shamelessness." },
    { episode: "s05e04", who: "Nick Egan", time: "00:33:48", quote: "Your movie - I thought it was a brilliant movie, and I thought it was very moving. There was a message in it, but it didn't hit you over the head with it." },
    { episode: "s01e09", who: "Moby", time: "00:31:30", quote: "I still think of that scene of Seth Green as you, making ketamine on the baking tray in his kitchen." },
    { episode: "s02e07", who: "Jenny Talia", time: "00:37:40", quote: "As we were all struggling with our personal demons, the party just did not feel like a party anymore. It wasn't celebratory, it wasn't joyful, it was just kind of dark." },
    { episode: "s06e01", who: "James St. James", time: "00:02:29", quote: "On the Party Monster red carpet, I was talking to various outlets, blah, blah, blah, and Randy came up behind me and whispered in my ear." },
  ],
  "party-monster-the-shockumentary": [
    { episode: "s02e09", who: "Linda Simpson", time: "00:52:50", quote: "I will pat myself on the back a little. I was the one that recommended him to you when you were working on the Michael Alig documentary." },
  ],
  "people-magazine": [
    { episode: "s06e01", who: "James St. James", time: "00:25:34", quote: "My father saw a picture of me in People magazine in drag, and he called me up, and he was furious. He said, I don't like this lifestyle you're living." },
  ],
  "playboy": [
    { episode: "s03e05", who: "Cherry Vanilla", time: "00:26:35", quote: "David Taylor, who was the assistant to the fashion director at Playboy Magazine, came in one night and said, come downtown with me after work, because I'm going to audition for a play. And I think you should do it, too." },
  ],
  "playgirl": [
    { episode: "s04e02", who: "Mickey Boardman", time: "00:02:22", quote: "Playgirl, the classic women's magazine, is relaunching in spring, and I'm the creative director, in addition to working at Paper. So I've gone from being totally underemployed to being over-employed." },
  ],
  "popism-the-warhol-sixties": [
    { episode: "s06e01", who: "James St. James", time: "00:04:36", quote: "I stumbled across Andy Warhol's POPism when I was in ninth grade, and the doors that opened when I realized there was a downtown scene in New York in which weirdos were accepted and celebrated." },
  ],
  "pose": [
    { episode: "s01e08", who: "Luis Xtravaganza Camacho", time: "00:52:39", quote: "I honestly love those shows. Pose and Legendary deserve a space and a place. And I'm very proud that there is interest in shows like that." },
    { episode: "s06e03", who: "Johnny Dynell", time: "00:41:27", quote: "A couple years ago, I did the closing party for that TV show Pose." },
  ],
  "pretty-in-pink": [
    { episode: "s01e06", who: "Waltpaper", time: "00:08:13", quote: "To bring up some movie references, it was very Pretty in Pink. I was the white kid that lived on the wrong side of the tracks." },
  ],
  "project-x": [
    { episode: "s01e05", who: "Ernie Glam", time: "00:14:46", quote: "Eventually he hired me to work at Project X, and I was basically his representative at Project X during the daytime while the magazine was up and running." },
    { episode: "s06e01", who: "James St. James", time: "00:32:19", quote: "I was doing Project X, things like that. And I remember I was leaning against Walt and Marc Jacobs came up to me." },
  ],
  "punk-magazine": [
    { episode: "s03e05", who: "Cherry Vanilla", time: "01:05:32", quote: "There was a magazine called Punk. It might have been just local - when I was writing my book I had to look all that stuff up." },
  ],
  "queer-in-america": [
    { episode: "s02e08", who: "Michelangelo Signorile", time: "00:01:35", quote: "Oh my God, Fenton has the hardcover Queer in America, with the backwards map, which a lot of people don't notice." },
  ],
  "refocus-the-films-of-susan-seidelman": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:56:38", quote: "I just got a book in the mail from some academics who've written about Susan Seidelman's whole body of work. And there's a really nice chapter in there about Making Mr. Right and this female character." },
  ],
  "rent-a-cop": [
    { episode: "s01e02", who: "Michael Musto", time: "00:31:45", quote: "Well, you know, when Liza did Rent-a-Cop, that was a big step backward, I thought." },
  ],
  "rip-van-winkle": [
    { episode: "s01e05", who: "Ernie Glam", time: "00:48:54", quote: "It was very difficult for him coming out of prison and readjusting. It was like being Rip Van Winkle - waking up and all of a sudden there's the internet and all this technology, and you have no idea how to use any of it." },
  ],
  "rocky-horror-picture-show": [
    { episode: "s05e01", who: "Nell Campbell", time: "00:13:07", quote: "Everything about homosexuality in film and theatre and books was depressing, sad, tragic. Rocky Horror was an explosion of a celebration, like RuPaul's Drag Race. And it just exploded on the first night." },
    { episode: "s05e01", who: "Nell Campbell", time: "00:02:09", quote: "It's a one woman show, and it's about me growing up, and then it's all about Rocky Horror, with a zillion fabulous photographs." },
  ],
  "rolling-stone": [
    { episode: "s02e06", who: "Michael Schmidt", time: "00:33:16", quote: "I drew a little picture of her from Rolling Stone or something." },
    { episode: "s03e05", who: "Cherry Vanilla", time: "00:46:47", quote: "There was a little notice in some magazine, Rolling Stone or something, and I guess the picture in the dress was in there." },
  ],
  "roseanne": [
    { episode: "s04e09", who: "Susan Seidelman", time: "01:00:24", quote: "There was something about Roseanne at that time - who she was, how she looked, what she had achieved - that felt right for that housewife who was going to go from being a victim to a powerful she-devil." },
  ],
  "rupaul-s-drag-race": [
    { episode: "s01e01", who: "Dianne Brill", time: "00:33:12", quote: "When I wear those clothes every single day and night of my life - nobody looks like that, except anyone who ever watched RuPaul's Drag Race." },
    { episode: "s01e10", who: "Joey Arias", time: "01:07:11", quote: "I want to thank you guys for what Drag Race did for the world accepting drag. It became part of the culture now." },
    { episode: "s03e02", who: "Martha Wash", time: "00:01:07", quote: "I did work with RuPaul, and I was one of the judges on Drag Race over 10 years ago." },
    { episode: "s02e09", who: "Linda Simpson", time: "01:00:30", quote: "A lot of young people think that drag started and ended with RuPaul's Drag Race, which is its own era. But of course there was stuff that came before that too." },
  ],
  "rupaul-s-drag-race-uk": [
    { episode: "s03e08", who: "Larry Tee", time: "01:02:21", quote: "She's one of my favorites of the UK franchise, though I am mad about Dakota Schiffer." },
  ],
  "saturday-night-fever": [
    { episode: "s03e06", who: "Eric Goode", time: "00:08:22", quote: "I was working on Saturday Night Fever and some films in the late 1970s, and I was given the job of location scouting." },
  ],
  "saturday-night-live": [
    { episode: "s03e08", who: "Larry Tee", time: "00:09:34", quote: "When I saw the B-52s on Saturday Night Live, suddenly disco held no meaning whatsoever. Disco died the night I saw the B-52s." },
    { episode: "s02e11", who: "Richard Boch", time: "00:26:13", quote: "She was on Saturday Night Live the night before, and the same thing happened. She bombed. And then the Mudd Club was sort of her night to make it right." },
    { episode: "s05e06", who: "Christopher Makos", time: "00:27:15", quote: "I don't know if you saw that skit on Saturday Night Live about the lines. I live in the West Village. Every place, there's a line." },
  ],
  "scorpio-rising": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:20:34", quote: "He wanted to show Scorpio Rising, which is 45 minutes. So he wanted to turn the music off on the dance floor and show a movie for 45 minutes. So we compromised: we showed the movie and had a DJ playing." },
  ],
  "seattle-times": [
    { episode: "s05e07b", who: "Really Denise", time: "00:58:59", quote: "I reached out to the Seattle Times. They have a Sunday magazine, which focuses on arts and culture, so I wrote the cover story for the Seattle Times Sunday magazine about my project. It was an eight-page spread." },
  ],
  "sex": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:23:23", quote: "The Gaiety Male Burlesque was made famous by Madonna's Sex book. A lot of the book was shot there." },
  ],
  "sex-and-the-city": [
    { episode: "s03e08", who: "Larry Tee", time: "00:24:16", quote: "Rebecca, who is also an Atlanta girl - she was the stylist with Pat for Sex and the City." },
  ],
  "silence-of-the-lambs": [
    { episode: "s06e03", who: "Johnny Dynell", time: "00:47:47", quote: "For the invitation - this is before the murder and everything - I took Michael's head from a picture and put it on The Silence of the Lambs, the butterfly. So it was Michael as the killer." },
  ],
  "social-circus": [
    { episode: "s06e08", who: "William Norwich", time: "00:09:57", quote: "I was Tuesday and Thursday, and she was Monday, Wednesday - downtown. And then I wrote something called The Social Circus on Sunday." },
  ],
  "soho-weekly-news": [
    { episode: "s01e02", who: "Michael Musto", time: "00:06:12", quote: "There was a paper called the SoHo Weekly News, which was even more alternative than the Village Voice. It was really underground and cool." },
    { episode: "s04e07", who: "Trey Speegle", time: "00:05:39", quote: "They did the SoHo Weekly News, and they were the first really to publish Bruce Weber." },
    { episode: "s03e06", who: "Eric Goode", time: "00:11:10", quote: "Thank God there was a guy named Stephen Saban who loved me and wrote about me in Details Magazine and Soho News." },
  ],
  "sophie-s-choice": [
    { episode: "s01e02", who: "Michael Musto", time: "00:08:32", quote: "There wasn't that will I, won't I, Sophie's Choice kind of thing." },
  ],
  "star-diet": [
    { episode: "s02e04", who: "Nikki Haskell", time: "00:35:24", quote: "I'll never forget when my book came out, The Star Diet, my PR guy said to me, can't we get rid of this sort of Studio 54 image that you have? I can't change reality." },
  ],
  "star-search": [
    { episode: "s02e04", who: "Nikki Haskell", time: "00:19:22", quote: "He also created Entertainment Tonight and Star Search, without question." },
  ],
  "star-wars": [
    { episode: "s04e08", who: "Richie Rich", time: "00:19:20", quote: "It was kind of everything I dreamt of. I don't know if Star Wars is a good comparison - it was like the dark and the light." },
  ],
  "straight-to-hell": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:18:10", quote: "Straight to Hell was sort of like Grindr in print." },
  ],
  "strange-journey-the-story-of-rocky-horror": [
    { episode: "s05e01", who: "Nell Campbell", time: "00:13:07", quote: "Everything about homosexuality in film and theatre and books was depressing, sad, tragic. Rocky Horror was an explosion of a celebration, like RuPaul's Drag Race. And it just exploded on the first night." },
  ],
  "style-network": [
    { episode: "s04e06", who: "Lauren Ezersky", time: "00:30:10", quote: "It went on the Style channel. I was the only one doing everything. There was no assistant. Produced it, directed it, did everything." },
  ],
  "sunset-boulevard": [
    { episode: "s01e02", who: "Michael Musto", time: "00:09:12", quote: "I started writing for Interview. The only downside was I started to feel like William Holden in Sunset Boulevard a little bit, minus the sex." },
  ],
  "sunset-strip-documentary": [
    { episode: "s02e04", who: "Nikki Haskell", time: "00:54:43", quote: "I did this documentary called Sunset Strip. We found so much footage from the 20s, 30s, 40s. I was shocked. There's nothing on the 80s - none of the nightlife." },
  ],
  "texas-monthly": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:04:55", quote: "It was kind of like New York magazine, and it was run by people who were at Texas Monthly." },
  ],
  "thank-you-andy-warhol": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:56:38", quote: "My friend Catherine Johnson had done this book called Thank You, Andy Warhol, that I was in with a lot of other people. And I told the story in that." },
  ],
  "the-death-of-downtown": [
    { episode: "s06e01", who: "James St. James", time: "00:30:11", quote: "When Michael Musto wrote The Death of Downtown after Andy Warhol died, there was that vacuum in the club scene, and Michael Alig came in to fill it." },
  ],
  "the-night-of-the-iguana": [
    { episode: "s03e06", who: "Eric Goode", time: "00:11:10", quote: "Thank God there was a guy named Stephen Saban who loved me and wrote about me in Details Magazine and Soho News. He wrote a story called The Night of the Iguana about that club." },
  ],
  "this-is-spinal-tap": [
    { episode: "s01e09", who: "Moby", time: "00:51:57", quote: "I saw Dianne Brill at a nightclub from across the room, and I honestly felt like it was the Spinal Tap moment, where I didn't think I was even allowed to look at her." },
  ],
  "tiger-king": [
    { episode: "s01e02", who: "Michael Musto", time: "00:56:29", quote: "It was a club co-owned by Eric Goode, who went on to direct Tiger King. He made it big too." },
  ],
  "time": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:18:29", quote: "Time Magazine came every month, and I got really fascinated with the Berrigan brothers burning their draft cards. So, this idea of protest and counterculture." },
  ],
  "time-out-new-york": [
    { episode: "s02e09", who: "Linda Simpson", time: "00:36:31", quote: "I started working at Time Out in the late 90s, during kind of its glory years. I never went to journalism school. I managed to be a self-taught journalist." },
  ],
  "today-show": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:16:26", quote: "Growing up, we would watch the Today Show every morning. And the Today Show would have the original Broadway cast of these shows doing a number. I remember seeing West Side Story." },
  ],
  "tv-guide": [
    { episode: "s06e08", who: "William Norwich", time: "00:13:08", quote: "A British woman named Anthea Disney, who went on to really do great things for TV Guide - she hired me." },
  ],
  "tv-star-parade": [
    { episode: "s01e02", who: "Michael Musto", time: "00:07:26", quote: "It was for TV Star Parade, which was my first job. It was a fan magazine where they somehow let me go interview this Andy Warhol star at the Russian Tea Room, and they even paid for it." },
  ],
  "uptown-downtown": [
    { episode: "s06e08", who: "William Norwich", time: "00:01:56", quote: "May I remind you, that column did start out as Uptown, Downtown - but Downtown quit. And so I had to go downtown. And the dinner jacket I wore Uptown was designed for me by Dianne Brill." },
  ],
  "vanity-fair": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:16:14", quote: "One of my Polaroids of John Sex ran in Vanity Fair, and I wrote up the Pyramid in Vanity Fair in like 1984." },
    { episode: "s06e01", who: "James St. James", time: "00:05:08", quote: "I remember reading Vanity Fair, and there was a tiny, tiny picture of Dianne Brill and Sting at the opening of Limelight." },
    { episode: "s04e04", who: "Zaldy", time: "00:25:29", quote: "Matthew was doing a shoot with him before, for like Vanity Fair. Joseph was like, oh, you should stick around, there's this amazing guy coming by." },
  ],
  "variety": [
    { episode: "s04e09", who: "Susan Seidelman", time: "01:11:58", quote: "I was pretty innocent when I went to NYU. I never read Variety." },
  ],
  "village-voice": [
    { episode: "s04e02", who: "Mickey Boardman", time: "00:36:40", quote: "Lynn first started in the classified ads department at The Voice, and she always dressed like a freak because she loved fashion. But she ended up segueing into being an editor and writing about fashion." },
    { episode: "s03e08", who: "Larry Tee", time: "00:08:46", quote: "The Fans used to play with Blondie and Talking Heads, all the cool groups at the time. One of their singles had been Village Voice Single of the Year." },
    { episode: "s01e09", who: "Moby", time: "00:51:13", quote: "Reading Paper or reading the Voice, you'd always see her name. I felt like I was in the presence of royalty." },
    { episode: "s01e02", who: "Michael Musto", time: "00:04:35", quote: "I was the Village Voice columnist at this point." },
  ],
  "vogue-magazine": [
    { episode: "s02e07", who: "Jenny Talia", time: "00:21:18", quote: "It was full page, single: me, Kate Moss, and two guys. Someone called me and said, have you seen Vogue? You're on a full page in Vogue." },
    { episode: "s04e03", who: "Bebe Buell", time: "00:17:07", quote: "The St. Regis magazine stand - it's where all the models went to find their tear sheets, because you could get French Vogue and Italian Vogue and British Vogue. And Salvador was also perusing the magazines." },
    { episode: "s04e04", who: "Zaldy", time: "00:12:29", quote: "I'd be looking at her W magazines, her Vogue magazines. Everyone knew how much I loved fashion, but they didn't think of it as a viable career option. Of course not. No way." },
  ],
  "vortex": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:52:51", quote: "I got into a Beth and Scott B movie called Vortex, starring Lydia Lunch and James Russo, and Jimmy Russo and I became friends." },
  ],
  "w-magazine": [
    { episode: "s04e04", who: "Zaldy", time: "00:12:29", quote: "I'd be looking at her W magazines, her Vogue magazines. Everyone knew how much I loved fashion, but they didn't think of it as a viable career option." },
  ],
  "war-and-peace": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:09:27", quote: "PBS showed the BBC series War and Peace with him. And I got completely obsessed with him, and with War and Peace." },
  ],
  "wayne-s-world": [
    { episode: "s01e09", who: "Moby", time: "00:52:20", quote: "I was like, how am I even able to talk to them? This is New York royalty in the flesh. It was like that scene in Wayne's World." },
  ],
  "what-s-love-got-to-do-with-it": [
    { episode: "s03e08", who: "Larry Tee", time: "00:25:55", quote: "It was during the peak, when they shot What's Love Got to Do with It with Tina Turner at the basketball park - and Basketball Diaries. They used the park across the street. We'd sit in the window of this three-story townhouse as they were shooting." },
  ],
  "wigstock-the-movie": [
    { episode: "s02e09", who: "Linda Simpson", time: "00:31:34", quote: "That was one of the years they were filming Wigstock for Barry Shils' Wigstock documentary. If they had been smart, they would have kept that in. My reputation would have been ruined forever, but it would have shown a little bit of drama." },
  ],
  "wizard-of-oz": [
    { episode: "s02e01", who: "Michelle Visage", time: "00:11:50", quote: "Dorothy clicked her heels three times and ended up in Kansas. I clicked my heels three times and ended up on Christopher Street." },
  ],
  "women-in-revolt": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:19:47", quote: "Women in Revolt, with Candy Darling, Jackie Curtis and Holly Woodlawn. I remember it so clearly." },
  ],
  "women-s-wear-daily": [
    { episode: "s05e04", who: "Nick Egan", time: "00:42:01", quote: "And then Marc got fashion designer of the year - I think it's the Women's Wear Daily Fashion Designer of the Year." },
    { episode: "s01e02", who: "Michael Musto", time: "00:17:48", quote: "Downtown is about making something of yourself, and wearing something that's not in the pages of Women's Wear." },
    { episode: "s04e08", who: "Richie Rich", time: "00:48:29", quote: "When Women's Wear Daily happened, I called Paris, and they gave us a whole back page, which they never do. We put Paris in this studded bodysuit, and that began Heatherette." },
  ],

};
