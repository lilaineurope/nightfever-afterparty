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
  "afrika-bambaataa-planet-rock": [
    { episode: "s03e04", who: "Man Parrish", time: "00:23:16", quote: "Planet Rock, Alisha's Baby Talk, Shannon's Give Me Tonight - it was like a Muscle Shoals of electronic music in New York City." },
  ],
  "after-dark": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:25:53", quote: "The community theater was gay, and they'd have After Dark Magazine at their house, him and his boyfriend. These people have better taste - they've got an inside line to this cool stuff." },
    { episode: "s02e09", who: "Linda Simpson", time: "00:03:00", quote: "I lived in St. Paul by a college, so I had some access to The Village Voice and After Dark magazine, Interview - things that were hard to find." },
  ],
  "alice-s-adventures-in-wonderland": [
    { episode: "s04e09", who: "Susan Seidelman", time: "00:15:23", quote: "It was like Alice in Wonderland, like I had gone through this hole and now I was in this other bizarre world." },
  ],
  "alisha-baby-talk": [
    { episode: "s03e04", who: "Man Parrish", time: "00:19:31", quote: "You weren't a real artist unless you had an album out. And a lot of those groups, Shannon, Alisha - I've worked on a lot of records back in those days that you heard." },
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
  "b-52-s-planet-claire": [
    { episode: "s03e10", who: "Miss Guy", time: "00:07:58", quote: "My brother put on the first B-52's record, and I was staring at the cover, and I had never seen anything like them. And Planet Claire started, and I said, take this off. It was creepy and eerie to me. But after a couple more listens..." },
  ],
  "b-52-s-rock-lobster": [
    { episode: "s03e08", who: "Larry Tee", time: "00:07:51", quote: "I had a band called the Fans, and they had produced the B-52's Rock Lobster single." },
  ],
  "baby": [
    { episode: "s04e02", who: "Mickey Boardman", time: "00:37:30", quote: "Some of the classics we've done over the years include The Baby with Ruth Roman and Anjanette Comer. Movies where you scratch your head and are like, how did this ever get made?" },
  ],
  "back-in-time-for-tea": [
    { episode: "s05e04", who: "Nick Egan", time: "00:09:41", quote: "Cleopatra Records asked me, would it be possible for them to release the best of the C-Set, the singles? So in 2019 an album came out on Cleopatra Records called Back in Time for Tea, and I even went back in the studio and recorded a new song." },
  ],
  "barbie": [
    { episode: "s02e11", who: "Richard Boch", time: "00:50:10", quote: "She sautés a Barbie doll in a frying pan on the stove. And I think it's just called Barbie." },
  ],
  "basketball-diaries": [
    { episode: "s03e08", who: "Larry Tee", time: "00:25:55", quote: "They shot What's Love Got to Do with It and Basketball Diaries at the basketball park across the street. We'd sit in the window of this three-story townhouse as they were shooting." },
  ],
  "batman": [
    { episode: "s01e07", who: "Rudolf Piper", time: "00:37:51", quote: "With the first Batman movie, a bunch of kids decided to become super villains, and they started to break into warehouses in their neighborhood dressed as superheroes or super villains." },
  ],
  "bedtime-stories": [
    { episode: "s04e08", who: "Richie Rich", time: "00:04:20", quote: "Madonna came and did her Bedtime Stories album artwork there, you know, photographs. And it was just like an artsy-partsy..." },
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
  "billie-holiday-lady-in-satin": [
    { episode: "s01e10", who: "Joey Arias", time: "00:43:54", quote: "My friend Tony said, look at Billie Holiday, Lady in Satin. Just pull your hair back and be elegant." },
  ],
  "black-box": [
    { episode: "s03e02", who: "Martha Wash", time: "00:21:47", quote: "I saw the video on TV. I happened to hear my voice before I looked at the TV. And I turned around and watched the whole video. And I said, what in the hell?" },
  ],
  "black-box-everybody-everybody": [
    { episode: "s03e02", who: "Martha Wash", time: "00:21:47", quote: "I saw the video on TV. I happened to hear my voice before I looked at the TV. And I turned around and watched the whole video. And I said, what in the hell?" },
  ],
  "blah-blah-blah": [
    { episode: "s05e04", who: "Nick Egan", time: "00:13:55", quote: "I did the Iggy Pop Blah-Blah-Blah album cover. He was a great character." },
  ],
  "blondie-parallel-lines": [
    { episode: "s03e10", who: "Miss Guy", time: "00:05:51", quote: "He brought home a bunch of records - Blondie, Parallel Lines, the first Devo, the first B-52's. Blondie especially was exciting for me." },
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
  "c-c-music-factory-gonna-make-you-sweat": [
    { episode: "s03e02", who: "Martha Wash", time: "00:24:41", quote: "On TV again, basically. When Sweat came out, it was like, why would you do something like that?" },
  ],
  "cabaret": [
    { episode: "s01e02", who: "Michael Musto", time: "00:31:31", quote: "I love Liza Minnelli. Cabaret was her best film." },
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
  "creative-vandal": [
    { episode: "s05e04", who: "Nick Egan", time: "00:13:55", quote: "As explained in the documentary, I was always very lucky, because my first artwork I did was a Ramones T-shirt. My first single cover was The Clash, White Man in Hammersmith Palais. My first album cover was Dexys Midnight Runners, Searching for the Young Soul Rebels. And my first video was Iggy Pop, Real Wild Child." },
  ],
  "cruising": [
    { episode: "s01e04", who: "Peter Gatien", time: "00:12:41", quote: "A little bit of a glimpse I got of that was maybe the Al Pacino movie. Cruising! Point of the story, I was terrified." },
  ],
  "culture-club-kissing-to-be-clever": [
    { episode: "s03e10", who: "Miss Guy", time: "00:10:58", quote: "She brought Kissing to Be Clever in, and we were mesmerized by the cover." },
  ],
  "curb-your-enthusiasm": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:59:58", quote: "That show would have run for as long as Curb Your Enthusiasm. We laughed so much." },
  ],
  "daphne-guinness-optimist-in-black": [
    { episode: "s04e01", who: "Daphne Guinness", time: "00:06:19", quote: "Tony and I wrote the string arrangements together, because there's a lot of classical elements. I'm quite strict about the counterpoints and the keys that are used, and on this record there are thirty-four strings." },
  ],
  "dark-shadows": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:14:52", quote: "I wasn't watching soap operas, except for Dark Shadows." },
    { episode: "s06e01", who: "James St. James", time: "00:14:42", quote: "Lara Parker, who was on Dark Shadows. She was Angelique on Dark Shadows." },
  ],
  "david-bowie-young-americans": [
    { episode: "s03e04", who: "Man Parrish", time: "01:09:02", quote: "I tell stories like when I got to hear Young Americans off the 24-track at Electric Lady Studios." },
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
  "dna": [
    { episode: "s06e03", who: "Johnny Dynell", time: "00:31:44", quote: "I was an original member of DNA. But not the DNA that everybody knows. I was not the good one." },
  ],
  "dog-day-afternoon": [
    { episode: "s02e10", who: "Brian Belovitch", time: "00:23:26", quote: "Most of them are dead, unfortunately. Not many of them survived AIDS and drug overdose. Liz Eden was a friend of mine from Dog Day Afternoon." },
  ],
  "duck-rock": [
    { episode: "s06e03", who: "Johnny Dynell", time: "00:38:14", quote: "I had worked with Malcolm McLaren on a couple of things, on the opera and Duck Rock, with my friend Nick Egan." },
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
  "fans": [
    { episode: "s06e03", who: "Johnny Dynell", time: "00:38:14", quote: "I had worked with Malcolm McLaren on a couple of things, on the opera and Duck Rock, with my friend Nick Egan." },
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
  "flora-the-red-menace": [
    { episode: "s01e02", who: "Michael Musto", time: "00:32:34", quote: "Liza won the Tony Award for Flora the Red Menace." },
  ],
  "forrest-gump": [
    { episode: "s06e09", who: "Desi Santiago", time: "00:51:16", quote: "Someone called me, like, a Forrest Gump. I just happen to end up in all these interesting moments of culture." },
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
  "ghost-cat": [
    { episode: "s04e10", who: "Ann Magnuson", time: "01:04:45", quote: "I did a song called Ghost Cat, which name-drops some monsters from West Virginia, like Mothman, and the lesser known but more glamorous Flatwoods monster." },
  ],
  "gilded-age": [
    { episode: "s02e08", who: "Michelangelo Signorile", time: "00:17:47", quote: "I remember getting a lot of shade. Have you been watching The Gilded Age? It's exactly like that." },
  ],
  "ginger-and-fred": [
    { episode: "s02e10", who: "Brian Belovitch", time: "00:02:41", quote: "Here I am with my idol. If there's anyone that I love more than anyone as a filmmaker, it's Federico Fellini. All of his movies had people like us in them." },
  ],
  "girl-can-t-help-it": [
    { episode: "s05e03", who: "Amanda Lepore", time: "00:29:56", quote: "I liked Marilyn Monroe and Jayne Mansfield - they were all movie stars. So I would watch The Girl Can't Help It and movies like that." },
  ],
  "gloria-gaynor-i-am-what-i-am": [
    { episode: "s03e04", who: "Man Parrish", time: "00:25:04", quote: "I did all the keyboards on I Am What I Am. I was hired as a session singer." },
  ],
  "gloria-gaynor-i-will-survive": [
    { episode: "s03e03", who: "Kevin Aviance", time: "00:51:11", quote: "The first time I ever did drag was in fifth grade. I stole my sister's dress and did I Will Survive at the talent contest. And I won it." },
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
  "heart-of-glass-blondie": [
    { episode: "s01e02", who: "Michael Musto", time: "00:54:44", quote: "Some of the songs were played at both, like Debbie Harry, Heart of Glass, Grace Jones, David Bowie. So there were some crossovers, which I love." },
  ],
  "hedwig-and-the-angry-inch": [
    { episode: "s02e06", who: "Michael Schmidt", time: "00:56:15", quote: "One night they workshopped Hedwig and the Angry Inch, and it was all the same songs. It was fully fleshed out. And Mike Potter, who ended up doing all the hair, he was my go-go dancer. So this is how everybody connected." },
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
  "jennifer-holliday-i-am-love": [
    { episode: "s02e01", who: "Michelle Visage", time: "00:44:01", quote: "I Am Love by Jennifer Holliday. I sang it and I stopped right before the high part. And David Cole said, if you sing that high, you've got the job." },
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
  "larry-tee-and-princess-superstar-licky": [
    { episode: "s03e08", who: "Larry Tee", time: "00:54:34", quote: "Licky with Princess Superstar went gold on the Steve Aoki collection. It really was the song that gave us the meow, meow, meow kind of thing that was so catchy and dumb." },
  ],
  "late-night-with-david-letterman": [
    { episode: "s06e07", who: "Sally Randall", time: "00:35:38", quote: "She asked if I'd like to appear on Letterman and I said no, thank you. She said only three other people have ever turned down David Letterman, and one of them was Cher. I said, if I do the show, everyone will forever know me as a door person." },
    { episode: "s01e01", who: "Dianne Brill", time: "00:40:19", quote: "I was on the cover of the New York Post the night that I was doing the David Letterman show. You're not going to deny me my title, Queen of the Night, tonight, David Letterman." },
  ],
  "law-and-order": [
    { episode: "s04e09", who: "Susan Seidelman", time: "01:07:18", quote: "I was once invited to visit the set of Law & Order - he was one of the detectives on Law & Order for a little while - and we chatted about Smithereens and the early days in New York." },
  ],
  "led-zeppelin": [
    { episode: "s03e06", who: "Eric Goode", time: "00:15:21", quote: "It was taken from the famous Led Zeppelin album cover, where there's that object that appears in different places. I always liked this enigmatic thing. So I thought, let's do something with a shape and we'll repeat it." },
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
  "like-a-virgin": [
    { episode: "s01e08", who: "Luis Xtravaganza Camacho", time: "00:29:54", quote: "I honestly didn't put two and two together. I didn't know that the Like a Virgin Madonna was the Everybody Madonna. I was into Mötley Crüe when I was in high school." },
  ],
  "lisa-s-world": [
    { episode: "s01e03", who: "Lisa Edelstein", time: "01:02:18", quote: "I got a lot of experience on camera, and I started this thing called Lisa's World, where I started to pull people from that scene who were, I thought, really creative, interesting performance artists." },
  ],
  "little-house-on-the-prairie": [
    { episode: "s01e06", who: "Waltpaper", time: "00:05:31", quote: "It went from 70s California - disco, roller skating, Kiss, Disneyland, Knott's Berry Farm - to Little House on the Prairie, basically." },
  ],
  "love-is-in-the-legend": [
    { episode: "s03e01", who: "Patricia Field", time: "00:38:42", quote: "As far as Myra's concerned, she has a documentary called Love Is in the Legend, about the Grand Street Ball." },
  ],
  "made-for-tv": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:42:50", quote: "He was a videographer, and he made quite a famous documentary-style TV show called Made for TV with Ann Magnuson, where she performs as all of these different characters." },
  ],
  "madonna-borderline": [
    { episode: "s02e06", who: "Michael Schmidt", time: "00:07:08", quote: "First night I was there, I saw Madonna for $2 at the Ritz. And she was doing Borderline and Lucky Star and all that. It was so great." },
  ],
  "madonna-burning-up": [
    { episode: "s02e05", who: "Connie Fleming", time: "00:05:03", quote: "Holiday was the big hit, and everybody thought she was black. So I'm trying to peek up in the DJ booth, and all I see is blonde hair." },
  ],
  "madonna-everybody": [
    { episode: "s03e04", who: "Man Parrish", time: "00:54:51", quote: "It was one of those very early songs - Everybody, I think it was. And then I played with her two times after that at the Red Parrot, with Soulsonic Force, me and Madonna." },
  ],
  "madonna-holiday": [
    { episode: "s02e05", who: "Connie Fleming", time: "00:05:03", quote: "Holiday was the big hit, and everybody thought she was black. So I'm trying to peek up in the DJ booth, and all I see is blonde hair." },
  ],
  "madonna-into-the-groove": [
    { episode: "s04e09", who: "Susan Seidelman", time: "00:39:21", quote: "She said to me, I have this new song that I just worked on with Stephen Bray. So literally, she brought in the cassette. It had a great beat, and everyone loved it. We put it in just as temp music, and we just fell in love with it in the editing room." },
  ],
  "madonna-lucky-star": [
    { episode: "s02e06", who: "Michael Schmidt", time: "00:07:08", quote: "First night I was there, I saw Madonna for $2 at the Ritz. And she was doing Borderline and Lucky Star and all that. It was so great." },
  ],
  "making-mr-right": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:00:44", quote: "Making Mr. Right - my one lead role." },
    { episode: "s04e09", who: "Susan Seidelman", time: "00:50:17", quote: "This movie was about a woman who falls in love with an android. It was kind of an AI movie before people were talking about it." },
  ],
  "manhattan-cable": [
    { episode: "s04e09", who: "Susan Seidelman", time: "00:47:01", quote: "Manhattan Cable, late night, Ugly George, Al Goldstein... That was a fascinating time in cable TV. Fascinating." },
  ],
  "marianne-faithfull-broken-english": [
    { episode: "s02e11", who: "Richard Boch", time: "00:26:34", quote: "She went on about one in the morning. I'd never seen the Mudd Club so crowded. The band sounded amazing - the same band from Broken English, just about." },
  ],
  "marie-antoinette": [
    { episode: "s03e01", who: "Patricia Field", time: "00:43:34", quote: "My favorite designer, Milena Canonero, she was sitting right behind me, and she did Marie Antoinette." },
  ],
  "marilyn-manson-the-dope-show": [
    { episode: "s06e09", who: "Desi Santiago", time: "00:49:36", quote: "Marilyn Manson was coming out to Squeezebox all the time. Then he transforms into the whole glam Dope Show moment." },
  ],
  "martha-wash-love-and-conflict": [
    { episode: "s03e02", who: "Martha Wash", time: "00:46:56", quote: "I still haven't even promoted my Love and Conflict album, because I was working with First Ladies of Disco." },
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
  "michael-jackson-speed-demon": [
    { episode: "s03e04", who: "Man Parrish", time: "00:53:40", quote: "He was experimenting with electro and hip hop, bebop type of sounds. He said, I have a new album and a track on it called Speed Demon. Would you like to do it? And I said, yes." },
  ],
  "mickey-boardman-s-journal": [
    { episode: "s04e02", who: "Mickey Boardman", time: "00:28:14", quote: "It made me laser-focused. I would write in my journal for 12 hours at a time." },
  ],
  "midnight-cowboy": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:11:15", quote: "A welcome wagon for New York City at that time, which was very, very much like Scorsese's Mean Streets and Midnight Cowboy." },
    { episode: "s04e09", who: "Susan Seidelman", time: "00:06:49", quote: "The great male characters of that time period were allowed to make mistakes. Ratso Rizzo - one of my favorite movies, Midnight Cowboy - both of them are manipulative, and they're wonderful." },
  ],
  "misandrists": [
    { episode: "s06e09", who: "Desi Santiago", time: "00:45:14", quote: "This project came up, The Misandrists, that he was shooting in Berlin and outside of Berlin. That was an interesting experience - there was no budget at all, and we were all staying at the main location, the schoolhouse." },
  ],
  "miss-guy-s-journals": [
    { episode: "s03e10", who: "Miss Guy", time: "00:32:45", quote: "I just recently started flipping through some of my old journals from those days. There was a journal entry from March of '89, at like 5:45 in the morning: Me and Bunny went to Pyramid and the Roxy tonight, had a great time." },
  ],
  "moby-doc": [
    { episode: "s01e09", who: "Moby", time: "01:00:19", quote: "Using puns publicly is always a regrettable thing, so I feel like it's my job to apologize for naming this movie after a pun. But it's really spectacular." },
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
  "nations": [
    { episode: "s06e03", who: "Chi Chi Valenti", time: "00:34:08", quote: "My very first big piece of writing was for Details. And I was writing about these tribes in the night that I called nations, that hung together like families, like style tribes. And so one of the four tribes that I picked was the House of Xtravaganza, because of all the houses that were around me at the time, they really had the strongest family feel." },
    { episode: "s06e03", who: "Chi Chi Valenti", time: "00:35:10", quote: "Very, very early, going to balls and researching that for the piece, of course, I was running into the whole Paris Is Burning shoot that was going on. I was running into Jennie Livingston. And also Donald Suggs, who was writing the other first piece, specifically about voguing and the balls, called Venus Envy, that was in The Village Voice." },
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
  "paula-abdul-opposites-attract": [
    { episode: "s02e01", who: "Michelle Visage", time: "00:40:37", quote: "We were number two with a bullet. Then Paula debuts at number one and stays at number one. And she does an incredibly insane video, with MC Skat Kat - the worst name in history." },
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
  "porcelain-moby": [
    { episode: "s01e09", who: "Moby", time: "00:54:05", quote: "They'll say, wow, I had some pretty intense drug experiences to your music. Like, man, I've made some good drug soundtracks." },
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
  "rocky-horror-show": [
    { episode: "s05e01", who: "Nell Campbell", time: "00:10:28", quote: "It opened in an attic room. Brian Thomson, the brilliant set designer - his budget was £500, and that £500 had to cover the lighting, the stage, the seating." },
  ],
  "rolling-stone": [
    { episode: "s02e06", who: "Michael Schmidt", time: "00:33:16", quote: "I drew a little picture of her from Rolling Stone or something." },
    { episode: "s03e05", who: "Cherry Vanilla", time: "00:46:47", quote: "There was a little notice in some magazine, Rolling Stone or something, and I guess the picture in the dress was in there." },
  ],
  "roseanne": [
    { episode: "s04e09", who: "Susan Seidelman", time: "01:00:24", quote: "There was something about Roseanne at that time - who she was, how she looked, what she had achieved - that felt right for that housewife who was going to go from being a victim to a powerful she-devil." },
  ],
  "runaways-cherry-bomb": [
    { episode: "s03e10", who: "Miss Guy", time: "00:28:00", quote: "Finally he said, you really aren't coming out of your shell. Why don't you pick a song that you want to do? And I picked Cherry Bomb by the Runaways and did a lip sync to that, and the crowd sort of ate it up." },
  ],
  "rupaul-back-to-my-roots": [
    { episode: "s04e04", who: "Zaldy", time: "00:49:10", quote: "Yes, it was a wig. It was such an exciting moment, because we were doing what we do best - creating art and fashion and music with our friends." },
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
  "rupaul-supermodel": [
    { episode: "s02e01", who: "Michelle Visage", time: "00:29:51", quote: "Ru came out with Supermodel, and we were at the dance music convention, in the same green room. I walked up to Ru and I was like, hi, I don't know if you remember me. And he was like, girl, stop right there. I've been watching your little blonde ass for years." },
    { episode: "s04e04", who: "Zaldy", time: "00:46:40", quote: "I met Ru at Palace de Beauté, and I just remember being mesmerized by the hair, the makeup, everything, the height. You could feel the power of RuPaul from across the room." },
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
  "searching-for-the-young-soul-rebels": [
    { episode: "s05e04", who: "Nick Egan", time: "00:14:05", quote: "My first artwork was a Ramones T-shirt. My first single cover was the Clash, White Man in Hammersmith Palais. My first album cover was Dexys Midnight Runners, Searching for the Young Soul Rebels." },
  ],
  "seattle-times": [
    { episode: "s05e07b", who: "Really Denise", time: "00:58:59", quote: "I reached out to the Seattle Times. They have a Sunday magazine, which focuses on arts and culture, so I wrote the cover story for the Seattle Times Sunday magazine about my project. It was an eight-page spread." },
  ],
  "see-jungle-see-jungle-go-join-your-gang-yeah-city-all-over-go-ape-crazy": [
    { episode: "s05e04", who: "Nick Egan", time: "00:44:45", quote: "Manet's Luncheon on the Grass - two men and one woman, and the woman is naked and the men are fully dressed. It caused a huge uproar, but not because she was naked. It was the style in which it was painted, because it was considered crude." },
  ],
  "sex": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:23:23", quote: "The Gaiety Male Burlesque was made famous by Madonna's Sex book. A lot of the book was shot there." },
  ],
  "sex-and-the-city": [
    { episode: "s03e08", who: "Larry Tee", time: "00:24:16", quote: "Rebecca, who is also an Atlanta girl - she was the stylist with Pat for Sex and the City." },
  ],
  "sex-pistols-anarchy-in-the-uk": [
    { episode: "s03e05", who: "Cherry Vanilla", time: "01:08:33", quote: "When I heard the opening lines of Anarchy in the UK, I said, okay, let's just sell everything and get some plane tickets and go over there. And that's what we did." },
    { episode: "s03e04", who: "Man Parrish", time: "00:31:02", quote: "I said, disco is dead. Why don't we do a disco version of Anarchy in the UK? Which is the most sacrilegious thing you could possibly do, right?" },
  ],
  "silence-of-the-lambs": [
    { episode: "s06e03", who: "Johnny Dynell", time: "00:47:47", quote: "For the invitation - this is before the murder and everything - I took Michael's head from a picture and put it on The Silence of the Lambs, the butterfly. So it was Michael as the killer." },
  ],
  "siouxsie-and-the-banshees": [
    { episode: "s06e09", who: "Desi Santiago", time: "00:18:42", quote: "We were all colorful going out to the techno parties, but we were all kind of goth industrial. So we'd come home crashing and play This Mortal Coil and Siouxsie, all this somber, quiet music." },
  ],
  "social-circus": [
    { episode: "s06e08", who: "William Norwich", time: "00:09:57", quote: "I was Tuesday and Thursday, and she was Monday, Wednesday - downtown. And then I wrote something called The Social Circus on Sunday." },
  ],
  "soho-weekly-news": [
    { episode: "s01e02", who: "Michael Musto", time: "00:06:12", quote: "There was a paper called the SoHo Weekly News, which was even more alternative than the Village Voice. It was really underground and cool." },
    { episode: "s04e07", who: "Trey Speegle", time: "00:05:39", quote: "They did the SoHo Weekly News, and they were the first really to publish Bruce Weber." },
    { episode: "s03e06", who: "Eric Goode", time: "00:11:10", quote: "Thank God there was a guy named Stephen Saban who loved me and wrote about me in Details Magazine and Soho News." },
  ],
  "sonny-and-cher-i-got-you-babe": [
    { episode: "s01e10", who: "Joey Arias", time: "00:00:01", quote: "Ann said, why don't we do the Andy-Edie Show based on Sonny and Cher? So we did it at Danceteria, in the Congo Bill room. We put up tin foil and silver balloons and television monitors, and we came out singing I Got You Babe." },
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
  "sylvester-you-make-me-feel": [
    { episode: "s03e02", who: "Martha Wash", time: "00:10:58", quote: "It was fun doing the TV shows. I think we did Dinah Shore when she was down at Busch Gardens. Just going out and doing our thing and being background singers for Sylvester." },
  ],
  "talking-heads": [
    { episode: "s02e11", who: "Richard Boch", time: "00:07:42", quote: "I had been coming into the city to go to shows at CBGB to see Television and Talking Heads and Ramones and Patti Smith." },
    { episode: "s03e04", who: "Man Parrish", time: "00:26:24", quote: "The Cars, the Ramones, Talking Heads - they were all kind of like kids that we hung out with. It was a very small thing." },
  ],
  "texas-monthly": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:04:55", quote: "It was kind of like New York magazine, and it was run by people who were at Texas Monthly." },
  ],
  "thank-you-andy-warhol": [
    { episode: "s04e07", who: "Trey Speegle", time: "00:56:38", quote: "My friend Catherine Johnson had done this book called Thank You, Andy Warhol, that I was in with a lot of other people. And I told the story in that." },
  ],
  // Lisa, 28 Nov 2026 (top Google search pages): the guests' own words on Musto's piece.
  "the-death-of-downtown": [
    { episode: "s01e02", who: "Michael Musto", time: "00:30:15", quote: "Warhol to me was the centerpiece of the scene. When you saw him in a room, you knew you were in the right place. Everyone craved his validation. I know I did... Not only did Andy die, but the clubs were dying. The excitement was dying. People were moving on. Yuppies were taking over. The paying customers, the dreaded bridge-and-tunnel people, were taking over, and the press was drying up." },
    { episode: "s01e02", who: "Michael Musto", time: "00:31:01", quote: "It was really fun to walk into Area, go right through the dance floor, go to the VIP room, and you knew everyone there. That moment was past. But James, I ended the piece by saying, of course, nothing's ever really over. Something's going to come back to kick everyone in the pants. It might be a revolution." },
    { episode: "s03e06", who: "Eric Goode", time: "00:34:30", quote: "Andy wanted to invest in MK and be a partner in MK. And of course, he died in 1987... It just felt like the end of the 80s, and the rise of someone named Donald Trump, and the commodification of downtown culture with Absolut vodka and Swatch. And it just changed, and money became the currency rather than ideas." },
    { episode: "s06e01", who: "James St. James", time: "00:29:58", quote: "There was a feeling of adapt or die. I did not want to be a dinosaur. And even when Michael Musto wrote The Death of Downtown after Andy Warhol died, and there was that vacuum in the club scene, and Michael Alig came in to fill it, that's when I just saw: I'm working in clubs now, and these are the people that are running the club scene now." },
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
  "tina-turner-foreign-affair": [
    { episode: "s02e06", who: "Michael Schmidt", time: "00:29:08", quote: "I started working with Tina because she was working on this record, Foreign Affair. But she didn't want to do anything with me initially." },
  ],
  "tina-turner-proud-mary": [
    { episode: "s02e06", who: "Michael Schmidt", time: "00:31:36", quote: "It would just be me and Tina Turner alone in a hotel room, and she would be trying on things that I had made for her, and she would go through the iconic Tina moves, like the Proud Mary moves." },
  ],
  "titanic": [
    { episode: "s04e08", who: "Richie Rich", time: "00:44:02", quote: "After Titanic, somebody called: Leonardo DiCaprio wants to come to your party tonight with Tobey Maguire. And I thought it was a crank call." },
  ],
  "to-wong-foo-thanks-for-everything-julie-newmar": [
    { episode: "s04e11", who: "Elyssa Maxx Goodman", time: "00:34:35", quote: "What I was drawn to was the color and the costume and these beautiful people. And that's what To Wong Foo was, but it was happening now. As I say in the book, they were my Disney princesses." },
  ],
  "today-show": [
    { episode: "s04e10", who: "Ann Magnuson", time: "00:16:26", quote: "Growing up, we would watch the Today Show every morning. And the Today Show would have the original Broadway cast of these shows doing a number. I remember seeing West Side Story." },
  ],
  "too-funky": [
    { episode: "s02e05", who: "Connie Fleming", time: "00:40:30", quote: "We did the APLA show in LA, which was the inspiration for Too Funky." },
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
  "video-killed-the-radio-star": [
    { episode: "s05e04", who: "Nick Egan", time: "00:12:35", quote: "A Flock of Seagulls and Video Killed the Radio Star and the Buggles - it wasn't really taken particularly seriously. There weren't enough directors to go around, so record labels started to look towards painters or photographers or graphic designers." },
  ],
  "village-people-macho-man": [
    { episode: "s01e04", who: "Peter Gatien", time: "00:13:18", quote: "That week of Easter we had booked the Trammps and the Village People. I had people asking me, did you own a radio station? Because those songs were in such rotation - every fourth song was Village People or the Trammps." },
  ],
  "village-people-san-francisco": [
    { episode: "s01e04", who: "Peter Gatien", time: "00:13:18", quote: "That week of Easter we had booked the Trammps and the Village People. I had people asking me, did you own a radio station? Because those songs were in such rotation - every fourth song was Village People or the Trammps." },
  ],
  "village-people-y-m-c-a": [
    { episode: "s01e04", who: "Peter Gatien", time: "00:13:18", quote: "That week of Easter we had booked the Trammps and the Village People. I had people asking me, did you own a radio station? Because those songs were in such rotation - every fourth song was Village People or the Trammps." },
  ],
  "village-voice": [
    { episode: "s04e02", who: "Mickey Boardman", time: "00:36:40", quote: "Lynn first started in the classified ads department at The Voice, and she always dressed like a freak because she loved fashion. But she ended up segueing into being an editor and writing about fashion." },
    { episode: "s03e08", who: "Larry Tee", time: "00:08:46", quote: "The Fans used to play with Blondie and Talking Heads, all the cool groups at the time. One of their singles had been Village Voice Single of the Year." },
    { episode: "s01e09", who: "Moby", time: "00:51:13", quote: "Reading Paper or reading the Voice, you'd always see her name. I felt like I was in the presence of royalty." },
    { episode: "s01e02", who: "Michael Musto", time: "00:04:35", quote: "I was the Village Voice columnist at this point." },
  ],
  "vogue": [
    { episode: "s06e03", who: "Johnny Dynell", time: "00:40:36", quote: "Malcolm's Deep in Vogue and my Elements of Vogue were the first Vogue records - a year before the other one." },
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
  "wedding-album": [
    { episode: "s05e04", who: "Nick Egan", time: "00:51:28", quote: "They wanted to do their parents' wedding pictures, which was a tough one, because wedding pictures tend to be kitsch. So I used the influence of Robert Rauschenberg, the great American pop artist, to make them art." },
  ],
  "what-s-love-got-to-do-with-it": [
    { episode: "s03e08", who: "Larry Tee", time: "00:25:55", quote: "It was during the peak, when they shot What's Love Got to Do with It with Tina Turner at the basketball park - and Basketball Diaries. They used the park across the street. We'd sit in the window of this three-story townhouse as they were shooting." },
  ],
  "what-s-the-tee": [
    { episode: "s06e06", who: "Lincoln Palsgrove IV", time: "00:31:30", quote: "Ru talks about it on one of the episodes of his podcast, because that was one of those nights I introduced Michelle and RuPaul on the dance floor of Red Zone." },
  ],
  "white-man-in-hammersmith-palais": [
    { episode: "s05e04", who: "Nick Egan", time: "00:14:05", quote: "My first artwork was a Ramones T-shirt. My first single cover was the Clash, White Man in Hammersmith Palais. My first album cover was Dexys Midnight Runners, Searching for the Young Soul Rebels." },
  ],
  "whitney-houston-i-wanna-dance-with-somebody": [
    { episode: "s02e06", who: "Michael Schmidt", time: "00:16:39", quote: "They were beads, crystals strung on strips of suede, and they were quite popular. Whitney Houston wears them in that biggest video she did, I Wanna Dance with Somebody." },
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
  "your-cassette-pet": [
    { episode: "s05e04", who: "Nick Egan", time: "00:48:53", quote: "Back then the cassette revolutionized everything, because you could tape off the radio. And the idea was: don't buy it, tape off the radio. Look what happened 30 years later with the internet and streaming." },
  ],
  "ziggy-stardust-and-the-spiders-from-mars": [
    { episode: "s04e03", who: "Bebe Buell", time: "00:24:12", quote: "I think the influences were more Marcel Marceau, Jayne County, Andy Warhol." },
  ],

};
