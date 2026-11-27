// Diary pages (Lisa, 21 Nov 2026: "they are still categorised as books, make it diaries. Also put every full and contexted
// comment on their diaries there, highlight when they read out of it"). Every diary on the Library's Diaries shelf gets a
// page of its own on /explore/<slug>: who kept it, and every moment it comes up on the show, in episode order, with the
// talk around it. The words read straight out of the diary are marked `read` and show as a highlighted diary page.
// Source: the episode transcripts (NightFever/Season N/.../transcript), all searched for diary/diaries/journal on
// 21 Nov 2026, plus the moments the reference sheets tie to a diary (James's Warhol memorial list says no "diary" aloud).
// Lines are cleaned up lightly from the machine transcripts: names spelled right, ums and repeats left out, "…" where a
// stretch is cut or the recording can't be made out. Nothing here links off the site: timestamps play on-site.

export type DiaryLine = {
  who: string;
  text: string;
  /** Words read out of the diary itself. */
  read?: boolean;
};

export type DiaryMoment = {
  episode: string;
  /** Where the moment starts (the play-from timestamp). */
  time: string;
  /** One line on what happens - the moment's heading. */
  title: string;
  lines: DiaryLine[];
};

export type DiaryPage = {
  /** Who kept it - their name links to their card or episode. */
  keeper: string;
  /** The keeper's AFTERPARTY episode, for their polaroid. */
  keeperEpisode?: string;
  /** Years the diary covers, shown on the header card. */
  years?: string;
  story: string;
  moments: DiaryMoment[];
};

const J = "James St. James";

export const DIARY_PAGES: Record<string, DiaryPage> = {
  "james-st-james-s-diaries": {
    keeper: J,
    keeperEpisode: "s06e01",
    years: "1981–1991",
    story:
      "James wrote down every night from 1981 to 1991: what he wore, where he went and who was there. He goes through the diaries before the show, as he always does, and reads from them on air - though he never put the year on a single page.",
    moments: [
      {
        episode: "s01e03",
        time: "00:06:48",
        title: "James reveals the diaries",
        lines: [
          { who: J, text: "Well, you know, it's funny, because I do have my diaries from that period. I was going through them the other night. Some of it is awful and needs to be burned and never seen by the public, but some of it is so precious and adorable. I'm going to read a few things here and there." },
          { who: "Fenton Bailey", text: "This is a big reveal. I didn't know you kept a diary, because you've always pretended you were out of your mind on drugs. You can't remember a thing." },
          { who: J, text: "No, I mean, I was, but that was later. From '81 until '91 I have them. But basically what it is, is what I wore, where I went and who was there. It's not a lot of gossip. It's just: I was wearing spandex and pumps and the Planet of the Apes lunchbox, and I saw Dianne and Michael and Beauregard. It's basically that." },
          { who: J, text: "But one of the funny things I keep going back to: I've always maintained that I never met Bianca Jagger, and looking through there, you and I sat next to Bianca at a dinner party for three hours talking about her garden in Nicaragua." },
          { who: "Lisa Edelstein", text: "Can you imagine how bored she was?" },
          { who: J, text: "I thought I only met Way Bandy, the famous makeup artist, once. We spent every night with him for like a year. I don't think I ever went to Paradise Garage, and I'm there like every weekend." },
          { who: "Lisa Edelstein", text: "We were there! I wanna read these. Will you send me excerpts?" },
          { who: J, text: "There are so many things I think I remember that I don't really remember." },
        ],
      },
      {
        episode: "s01e03",
        time: "00:19:48",
        title: "Breakfast with Tony Shafrazi",
        lines: [
          { who: J, text: "Talking about your innocence: I found in my diary a story where you and I are walking out of Area at the end of the night - me, you and Benji, Ben Vereen Jr. - and we're going to breakfast at 103. As we're walking out, Andy Warhol is walking in with Tony Shafrazi, the great art gallery owner who made or broke artists - Jean-Michel Basquiat, Keith Haring. Very, very imposing. So we stop and talk to Andy, we introduce ourselves to Tony, we're chattering away - and then Tony ditches Andy and says he's going to come to breakfast with you and me at 103. So we go and have breakfast with Tony Shafrazi. I have a feeling he thought he was going to get something. And you, in your infinite innocence, were like: okay, bye. And I'm sure he was like, what was that?" },
          { who: "Lisa Edelstein", text: "He was a little lecherous, Tony Shafrazi. I do remember that. I got to understand it as time went by. Very slow picking that up." },
        ],
      },
      {
        episode: "s01e03",
        time: "00:22:13",
        title: "How Lisa got the Palladium job",
        lines: [
          { who: J, text: "You started working at Palladium, you were bartending there. And I have a funny story about that I found in the diaries too: you probably don't remember this, but you didn't get the job at first." },
          { who: "Lisa Edelstein", text: "No, I auditioned twice." },
          { who: J, text: "We went out and we ran into Steve Rubell, and we went up to him and you said, I'm trying to get a job at Palladium and I didn't get it. And he said, that's [bleep], you're hired, I'll take care of it. And the next day you got it." },
        ],
      },
      {
        episode: "s01e03",
        time: "00:23:35",
        title: "March: “I've given up clubs for good”",
        lines: [
          { who: J, text: "Three months into going out, okay? We started really going out heavily in January, and this is March. And I write in my diary:" },
          { who: J, read: true, text: "I've given up clubs for good. Lisa talked me into it. She said people were bored of us, we need space to grow, always leave them wanting more. So during this time I'm going to rest and buy clothes and makeup and learn how to apply it, and then experiment with my hair. We're already staging our comeback. We ought to be tanned, gorgeous and eye-poppingly noticeable. We want to generate excitement with our reappearance." },
          { who: J, text: "We'd been going out for three months and we're staging our comeback." },
          { who: "Fenton Bailey", text: "So when did you reappear? Like the next night?" },
          { who: J, text: "Probably like two days later." },
          { who: "Lisa Edelstein", text: "I remember we were knitting those big hats." },
        ],
      },
      {
        episode: "s01e03",
        time: "00:32:46",
        title: "Lisa in James's red dress",
        lines: [
          { who: J, text: "I have a funny story that I found in my diaries again. I had this red spandex dress with a fishtail on the end of it, with tulle around it and a big black rose, that I wore all the time. Angela Janklow, the famous it girl, was having a 30th anniversary party for her parents - a big to-do in the basement of the Tunnel - and you borrowed that red dress. And everybody there: oh my God, you've never looked better, this is the best you've ever looked. And I was like, no, wait a minute, she's wearing my dress, and I wore that dress and I look good. And I remember Lena Horne was there, and she said, honey, you look fabulous. And I was like, no, but I look fabulous in it too. And she was like, I'm sure you do. I'm sure you do. And then at the time there was that song, Lady in Red… Never seen so many people ask you if you wanted to dance." },
          { who: "Lisa Edelstein", text: "It's really funny. We did have a very bickery friendship. We had a deep love, but it was a bickery one." },
        ],
      },
      {
        episode: "s01e03",
        time: "00:40:12",
        title: "James reads his account of Andy Warhol's memorial",
        lines: [
          { who: J, text: "You want to talk about some famous people that we met? I'm going to read to you now. This is my account of Andy Warhol's funeral that we went to. If you'll remember, it was on April 1st, and we were convinced that it was an art-world hoax and that Andy was alive and was going to pop out of his casket. So we dressed like we were going to a party - hair, boobs out, high heels on - and we go there, and this is what happened." },
          { who: J, read: true, text: "April 1st, 1987. With Lisa, Michael, Michael's photographer and Michelangelo Signorile to St. Patrick's early in the morning. We were late, so we made a big dramatic entrance while tons of photographers took our pictures outside. We were led up to the front of the line, and Judith Martin, Miss Manners, was right in front of me, and that was the coolest thing I'd ever seen. We took communion with Don Johnson and Claus von Bülow. I made Lisa come with me, and she's Jewish, and people were appalled." },
          { who: "Lisa Edelstein", text: "I do remember. I was like, I'm at Warhol's funeral, I'm gonna take communion." },
          { who: J, read: true, text: "Yoko Ono spoke. Cornelia Guest, Viva, Baby Jane Holzer and Brigid Polk were in the front pew with Keith Haring, Jean-Michel Basquiat and Francesco Clemente. Liza Minnelli waved hi to Michelangelo - we don't know why. Grace Jones and Azzedine crying and looking fabulous, pushing photographers out of her way. Claudette Colbert arrived. Marisa Berenson, Calvin and Kelly, Halston, John Waters, Irene Worth. Raquel Welch made a fabulous exit. Dianne and Rudolf looked resplendent, if a bit fluorescent." },
          { who: J, text: "Because remember, Dianne was on that carrot and miso soup diet, and she turned bright orange." },
          { who: J, read: true, text: "Afterwards we went to the party at Steve Rubell and Brian McNally's new club. Don Johnson again, Yoko, Debbie Harry, Dominick Dunne, Timothy Leary. Richard Gere talked to us for half an hour… Bianca. Claus von Bülow talking about boobs with Lisa. Monique van Vooren with a new chin - she said she'd just gotten a transplant. John Waters, David Hockney, Pat Ast, Mary McFadden, Tama Janowitz, who said, come over some night and I'll cook beef for you. Sylvia Miles, who said she bleached her hair for the occasion. Billy Norwich, Marcus Leatherdale, Beauregard Houston-Montgomery, Alan Rish, Susan Blond, Matthew Rolston. Patti D'Arbanville looked fab. Other people who were there: George Plimpton, Lou Reed, Beverly Johnson, Stephen Sprouse, Henry Geldzahler, Billy Squier, Peter Allen, Robert Mapplethorpe, Andrew Wyeth, Lynn Wyatt, Carolina Herrera, Ahmet Ertegun, Tina Chow…" },
          { who: J, text: "It just goes on and on and on." },
          { who: "Lisa Edelstein", text: "It's amazing that you wrote all that down." },
          { who: "Randy Barbato", text: "That's what I'm wondering. You went home and wrote it down that night?" },
          { who: J, text: "I did." },
          { who: "Lisa Edelstein", text: "He did. That's what was so interesting about going out with James: he really knew who everybody was, all their history. He was dedicated to what he was doing. It was very exciting to be around." },
        ],
      },
      {
        episode: "s01e03",
        time: "00:46:55",
        title: "February 11th: the Bleecker Street murders",
        lines: [
          { who: J, text: "Wait, one more quick thing from my diaries that I want to see if you remember, because I know you probably don't." },
          { who: "Lisa Edelstein", text: "I love this diary stuff. This is amazing." },
          { who: J, text: "This is February 11th, and I'm thinking it's '87." },
          { who: J, read: true, text: "Turned on the news and found that people were murdered in Lisa's building - the Bleecker Street bloodbath, they called it. Tried to call her, but she wasn't around, so I went over to see her about it." },
          { who: J, text: "Do you remember this?" },
          { who: "Lisa Edelstein", text: "No! I don't remember that at all. That's so interesting." },
          { who: J, text: "And I'm wondering if that's where I got my Disco Bloodbath from." },
        ],
      },
      {
        episode: "s02e05",
        time: "00:01:13",
        title: "Out of control with Connie - and the shoe",
        lines: [
          { who: J, text: "It's funny, because I was going through my diaries, as I always do before this, and there are so many nights, girl, where you and I were just out of control. Running from Area to Limelight to everywhere, to the after-hours, to Save the Robots. There was one night - and I'm just going to get this one out of the way right off the bat - I was with you and Cody, and we were at Numbers, an after-hours club, and I threw up on your shoe. And you were furious with me. I was on the ground and I crawled over to you and I threw up on your shoe." },
          { who: "Connie Fleming", text: "Oh my gosh. I remember." },
          { who: J, text: "I'm glad, because if you were still holding on to that grudge, we would be having a problem." },
        ],
      },
      {
        episode: "s02e06",
        time: "00:34:35",
        title: "Every single night, Michael Schmidt",
        lines: [
          { who: "Fenton Bailey", text: "Were you also going out at night, clubbing and partying?" },
          { who: J, text: "When I go through my diaries - literally every single diary - I wrote what I wore, where I went and who I saw. That's basically all it is. But every single night, it's Michael Schmidt. You were out every night, every single night. And you had this incredible work ethic, where you were up the next morning… It's incredible how much you went out, but how much you actually got accomplished." },
          { who: "Michael Schmidt", text: "Well, you know, we were 20 years old. You can do that at that age. But yeah, there was so much to go out for. There was so much to do. You couldn't miss it." },
        ],
      },
      {
        episode: "s02e08",
        time: "00:17:02",
        title: "When did James meet Michelangelo?",
        lines: [
          { who: J, text: "I was going back in my diaries, trying to pinpoint the exact moment that we started hanging out and the moment that we met. And I can't. All of a sudden, one day you were just there in my life, every single day. You, Michael and I were a threesome. You were the first person I called in the morning to talk about the night before. We went out to dinner every day, we went to lunch every day. We were together almost 24/7 during this period, but I can't pinpoint when." },
          { who: "Michelangelo Signorile", text: "I remember kind of knowing of you and knowing Michael, but getting a lot of shade. You just need to keep being there every night. And then finally Michael talks to you, and then maybe James talks to you, and then you're hanging out." },
        ],
      },
      {
        episode: "s02e08",
        time: "00:20:59",
        title: "Six pages on one night at Paradise Garage",
        lines: [
          { who: J, text: "We got into a lot of trouble. We were troublemakers, the two of us. I'm not going to go into detail about a couple of things, because I have to burn some diaries. There's one trip you and I took to Paradise Garage. It's six o'clock in the morning, and it took up six pages of my diary. It's that scandalous. I will tell you some other time what we did, but we were bad." },
          { who: "Michelangelo Signorile", text: "Was it Paradise Garage, or the other club we would go to as well?" },
          { who: J, text: "There was Save the Robots and Sound Factory, but we were going to the Garage… I'm such a tease. It's all in my diary and I'll tell you later." },
        ],
      },
      {
        episode: "s02e08",
        time: "01:01:21",
        title: "Why James writes it all down",
        lines: [
          { who: J, text: "I'm thinking you'd better get your hands on those diaries. Ten thousand dollars." },
          { who: "Michelangelo Signorile", text: "I probably blocked out a lot of what I just want to filter out from back then." },
          { who: J, text: "It's… and I think you know this too, and Michael Musto certainly knows this: if you go home that night and you write out what you did, it stays with you longer. It's the act of writing and journaling that makes me perfect for this podcast." },
        ],
      },
      {
        episode: "s02e11",
        time: "00:51:52",
        title: "Five diaries that just say September",
        lines: [
          { who: "Richard Boch", text: "Setting up the timeline was difficult too, because if you ever look at club flyers from the 70s, they never have the year." },
          { who: J, text: "That's because I kept diaries at the time, and I never put the year on the diaries, ever. So I have like five diaries that just say September, and you have to really do context clues as to what the hell year it was. That was the challenge." },
        ],
      },
      {
        episode: "s06e05",
        time: "00:07:44",
        title: "Who the hell was Richard?",
        lines: [
          { who: J, text: "The funny thing about diaries - I do the same thing that you do, you talk about it in David's Friend: you read them and it's like you spent all night talking with your friend, and they're the best friend you've ever had, you can't believe the connection - and you're like, who the hell was that? Every night: I am so in love with Richard, I've never been this in love in my life. And it's like, who the hell was Richard?" },
          { who: "Fenton Bailey", text: "Just another day with you, James. Every time we do the report you're like, oh, I'm so in love with him." },
          { who: J, text: "We don't change. We really don't." },
        ],
      },
      {
        episode: "s06e06",
        time: "00:16:19",
        title: "Drunk drives to Atlantic City",
        lines: [
          { who: J, text: "It's funny, because I was going through my diaries, and after Robots or something, you and I would drive to Atlantic City, to your house." },
          { who: "Lincoln Palsgrove IV", text: "To my house in Atlantic City. Eight in the morning? Do you have that in your diary?" },
          { who: J, text: "I do, I have it. I had my car, and I would be drunk and be like, let's go to Atlantic City, and we'd hit the highway. I have a very funny story." },
        ],
      },
      {
        episode: "s06e06",
        time: "00:32:41",
        title: "Every day with Lincoln - then the falling out",
        lines: [
          { who: J, text: "I was going through my diaries the other day, and every day it's you. You and I have become friends, we're at the same club, we're working the club. We go out afterwards, you come back to my house afterwards. First thing in the morning, we call each other on the phone. We spend our days off together. But around this time, you and I had a sort of major falling out. I don't know if you want to talk about it." },
          { who: "Lincoln Palsgrove IV", text: "Of course we can talk about it. I don't know if I realized at the time what I was doing, although I think what I was doing was going after a boy that you liked, for my own self." },
        ],
      },
      {
        episode: "s06e07",
        time: "00:02:04",
        title: "James reads the weeks up to the Palladium opening",
        lines: [
          { who: J, text: "I do want to start in the middle here, because I was going through my diaries and I found some Sally Randall bits that I want to read. It starts leading up to the opening of the Palladium, when everyone is talking about Sally Randall. Sally Randall, Sally Randall, Sally Randall. And then I want to talk about the opening night of Palladium and what I saw, and then get your perspective on it, Sally." },
          { who: J, read: true, text: "Saturday, May 1st. Helped Andy Anderson get ready for his show at Danceteria - blowing up balloons, twisting streamers and all of that. … was the first celebrity judge who showed. Michael Musto came just as [Andy's boyfriend] threatened to kill me and get his mob friends to break every bone in my body. Benjamin Liu showed up; he was the third judge. Then Sally Randall came with her new beau. The show was a riot. Sally and I screamed and carried on and had a great time, and in the end we jumped on stage and sang We Are the World. Then all of us piled into a van and went to Area. Sat with Sally and talked with her about art and other things. We were all very blasé." },
          { who: J, text: "God, how many people would kill to hang out with Sally Randall just as the Palladium is about to open? So that shows that Sally is becoming a very big deal. Okay, so, Monday:" },
          { who: J, read: true, text: "I'm in a manic, panicky mood about Palladium. I'm just very worried. … says it will cause the biggest nightclub upheaval of the decade. Vogue did an article on it saying no one will be able to get in. Lisa tells me she has no guest list privileges because she works there, and Sally will not come. The Palladium is just going to change everything. Everyone is in a near-frenzy. The rumors are flying: Area's closed, the Palladium will suck. I just don't know about any of this." },
          { who: J, text: "So then the opening happens." },
          { who: J, read: true, text: "Went alone, planned on meeting Michael Musto and everybody else there. But as I got there, a riot was taking place. The task force was there, the cops were beating people, the crowd was nasty. People were rushing the gates, the gates were lowered and people were smashed. Bloody bodies were taken away in ambulances; people were pushed to the ground and stampeded on. I got in, of course, unscathed and free. But I did not like the place. It was too big - you couldn't find anyone. I was there five hours and didn't see some people till the fourth or fifth hour. So many rooms, so many places to hide, and the crowd was so uptown they acted like they'd never seen a man in a dress before. Michael Schmidt, Clancy, … Andy Anderson, the La Copia people, Pedro and Alejandro - who I was very naughty with - Lady Bunny, all the Pyramid people. Me in my Norma Kamali gown and high heels. And then I went home." },
          { who: "Fenton Bailey", text: "And that's all we've got time for this week. Sally, thank you so much!" },
          { who: J, text: "I told you I was going to hijack the show. But I wanted to start there because everyone is talking about Sally Randall - Sally, Sally, Sally - and then the opening happens and it's chaotic. Do you remember that night? Because you were doing the door." },
          { who: "Sally Randall", text: "What basically happened was there were too many people on the street. Traffic couldn't move. At first the task force wanted us to shut the gates, and people were rolling underneath the gates. Then the task force said there's too many people out there, you have to open the gates and let everybody in. So people just came pouring in." },
          { who: "Fenton Bailey", text: "The only thing you edited out of that diary was me and Randy." },
        ],
      },
      {
        episode: "s06e07",
        time: "00:57:16",
        title: "By '87, Sally had ducked out",
        lines: [
          { who: J, text: "It was, I think, by '87 - I have it in my diaries, because I was going through them - and I see that you're still doing your parties with Patrick McMullan, you still do the St. Patrick's Day party. But for the most part, you had pretty much ducked out." },
          { who: "Sally Randall", text: "Well, I'm basically introverted, and I went through a period where I could just kind of throw it all out there, and then I was done with it." },
        ],
      },
      {
        episode: "s06e08",
        time: "00:46:46",
        title: "Upstairs at Régine's",
        lines: [
          { who: J, text: "I have diaries, so I went back and looked at all my diaries about this, looking up your name. So we were at Régine's with Musto, for Gaultier, and you brought me upstairs to this chic uptown party, and it was another case of the record skip: the whole place turned and looked at me with horror on their faces. And you were like Homer Simpson disappearing into the hedge - suddenly you realized your mistake of bringing me, and you disappeared and left me to weather the anger of the uptown people." },
          { who: "William Norwich", text: "For daring to come into the world." },
        ],
      },
    ],
  },

  "nora-burns-s-diaries": {
    keeper: "Nora Burns",
    keeperEpisode: "s06e05",
    years: "1980–1981",
    story:
      "Nora started a new diary in 1980, soon after moving to New York, and kept it for a couple of years. She sent some of it to James before her episode, and he calls out dates for her to read on air: the Mudd Club, Xenon, Magique, Bond's, the Roxy - and a scene that already feels over in 1980.",
    moments: [
      {
        episode: "s06e05",
        time: "00:03:05",
        title: "James calls out the dates",
        lines: [
          { who: J, text: "One of the things that I love about you, that I've just discovered, is that you kept diaries all throughout this period - and I did too. You sent me some of them, and I was wondering: I'll call out a date and you can read what happened on that date." },
          { who: "Nora Burns", text: "I really kept them when I first moved here. I moved here in 1979; I got my diary in 1980 because I lost my previous diary. So I really only did it for a couple of years, but they were good." },
        ],
      },
      {
        episode: "s06e05",
        time: "00:03:41",
        title: "January 25th, 1980",
        lines: [
          { who: J, text: "I want you to read what happened on January 25th." },
          { who: "Nora Burns", text: "January 25th, 1980. Okay." },
          { who: "Nora Burns", read: true, text: "Mudd last night, then the Nursery. Thanks to Novak, the DJ gave me so much coke. Some truck driver drove me home. People are really nice to me." },
          { who: J, text: "First of all, what is the Nursery? I've never heard of it." },
          { who: "Nora Burns", text: "I don't know! There are so many places in here where I'm like, where was that?" },
        ],
      },
      {
        episode: "s06e05",
        time: "00:04:14",
        title: "May 1980: the club called No Name",
        lines: [
          { who: "Nora Burns", text: "I found something from May of 1980, and I said:" },
          { who: "Nora Burns", read: true, text: "I danced till 8 a.m. at this club called No Name on West 25th Street, where they were playing bestiality porn." },
          { who: "Nora Burns", text: "And I was like, God, what was that? So I put something on Facebook: can anyone tell me what this club was? And someone said that was Eric Goode's club." },
          { who: J, text: "Eric Goode's club! He told us he was going through the meatpacking district getting animal carcasses and hanging them in the club, and then playing bestiality porn. And you were there - that's fascinating." },
        ],
      },
      {
        episode: "s06e05",
        time: "00:05:15",
        title: "January 31st: Craig Russell does the town",
        lines: [
          { who: J, text: "Okay, let's do 1/31." },
          { who: "Nora Burns", read: true, text: "Craig Russell did the town, ending up with Richie throwing up all over 54, as Nora was chased by the doorman demanding a blowjob." },
          { who: J, text: "Would that have been Marc Benecke asking for a blowjob?" },
          { who: "Nora Burns", text: "No. No - some other doorman." },
        ],
      },
      {
        episode: "s06e05",
        time: "00:05:37",
        title: "March 1st: the Kennedy party at Xenon",
        lines: [
          { who: J, text: "Okay, let's do 3/1. Just do the last part of that." },
          { who: "Nora Burns", read: true, text: "Last night Richie and I went to the Kennedy party at Xenon because I had to see Brooke Shields. Kennedy people are so straight. I got really good coke, and for a while I thought I was standing on the top of the world forever. And then suddenly I fell to the bottom of the Grand Canyon." },
          { who: "Nora Burns", text: "This is when somebody doesn't remember ever doing drugs. I was like, I never did drugs back then!" },
        ],
      },
      {
        episode: "s06e05",
        time: "00:06:09",
        title: "May 2nd, 1980: Brenda Vaccaro and a limo to Magique",
        lines: [
          { who: J, text: "Let me see. Let's do 5/2/80." },
          { who: "Nora Burns", read: true, text: "Time doth fly. I am a broken woman physically, though it's spreading to my brain. My legs keep getting worse, but I still go dancing in heels when I get codeine. My lip is goopy, and I suddenly developed a black eye - don't ask me why. I took $5 and went to Xenon, and then got into a limo with Brenda Vaccaro and some other actors, and we went to Magique. Wednesday night was Bond's, Xenon, Magique, Xenon and Bond's again, all with different people. It seems like I don't live in sunshine hours." },
          { who: J, text: "I love you going with Brenda Vaccaro to Magique." },
          { who: "Nora Burns", text: "She came to my disco musical's opening night last summer - a friend of mine is a friend of hers - and I was reading her this, and she was like, hilarious!" },
          { who: "Nora Burns", text: "And I remember that right around this time I had these horrible shin splints from wearing heels, so I was on crutches. I had a giant herpes. I had a sty. And I went out. I remember some friend saying, you can stay home, you really don't have to go out every night." },
        ],
      },
      {
        episode: "s06e05",
        time: "00:07:44",
        title: "James on reading old diaries",
        lines: [
          { who: J, text: "The funny thing about diaries - I do the same thing that you do, you talk about it in David's Friend: you read them and it's like you spent all night talking with your friend, and they're the best friend you've ever had, and you're like, who the hell was that? Every night: I am so in love with Richard, I've never been this in love in my life. And it's like, who the hell was Richard?" },
          { who: "Fenton Bailey", text: "Just another day with you, James." },
        ],
      },
      {
        episode: "s06e05",
        time: "00:08:25",
        title: "The last entry: the scene's already over",
        lines: [
          { who: J, text: "We don't change, we really don't. Let's do one more, and that'll be the end of the diaries." },
          { who: "Nora Burns", read: true, text: "The Princess of Kuwait and her friend took me to dinner, and then we went to the Roxy. Roller disco is fun. Poor Luwala, though - she kept falling and her space outfit fell off. We all went to Xenon and Danceteria. Every place was sort of dull. No place has the energy it used to." },
          { who: "Nora Burns", text: "This is 1980, and the scene's already over in 1980!" },
          { who: "Nora Burns", read: true, text: "I feel like the city used to be the center of a tornado, and now it's a breeze." },
          { who: "Nora Burns", text: "How profound." },
          // Exact words from the audio (00:09:06-00:09:20): her aside about Peppo comes mid-sentence.
          { who: "Nora Burns", read: true, text: "P.S., Earl is dead. Davey told me last night he fell off the roof of the Navarro trying to climb into Peppo's window -" },
          { who: "Nora Burns", text: "that was the owner of Xenon." },
          { who: "Nora Burns", read: true, text: "I feel sad about it. I wish I'd been nicer or seen him more or something." },
          { who: J, text: "I love that in 1980 the scene is done. It used to be so fun, and now it's just…" },
          { who: "Nora Burns", text: "Studio was closed. It was over." },
        ],
      },
      {
        episode: "s06e05",
        time: "00:19:07",
        title: "Harlem, had to walk home",
        lines: [
          { who: "Nora Burns", text: "We were young, so we didn't care. And we were part of the danger. I can't believe nothing really bad ever happened. I look in my diary, like: Harlem, had to walk home." },
        ],
      },
    ],
  },

  "miss-guy-s-journals": {
    keeper: "Miss Guy",
    keeperEpisode: "s03e10",
    years: "1989",
    story:
      "Miss Guy has been flipping through her old journals from her first years in New York. On the show she reads one entry, written at a quarter to six in the morning in March 1989.",
    moments: [
      {
        episode: "s03e10",
        time: "00:32:27",
        title: "March 1989, 5.45 in the morning",
        lines: [
          { who: J, text: "How did we do it? How did we go out every single night, different outfits, three clubs and after-hours - Robots, Sound Factory? How did you afford it? When did you sleep?" },
          { who: "Miss Guy", text: "How did we do any of that? Cabs were so cheap in those days. I just recently started flipping through some of my old journals from those days, and there was a journal entry from March of '89, I think. It was at like 5.45 in the morning, and I wrote:" },
          { who: "Miss Guy", read: true, text: "Me and Bunny went to Pyramid, The Building and the Roxy tonight. Had a great time." },
          { who: "Miss Guy", text: "Something like that. In high heels, I'm sure, and dressed up, and we were probably on ecstasy, I would imagine, if I was writing in my journal at 5.45 in the morning. But it made me feel really nostalgic for those days." },
          { who: J, text: "You'd probably find three things to do in a month now in New York. All three of those - Roxy, Building and Pyramid - would be completely different crowds. And yet all three of them would be absolutely fabulous on any given night." },
        ],
      },
    ],
  },

  "richard-boch-s-journals": {
    keeper: "Richard Boch",
    keeperEpisode: "s02e11",
    story:
      "Richard kept journals in his Mudd Club years and went back to them, with an archive of flyers and clothes and close to 200 interviews, to write his book The Mudd Club.",
    moments: [
      {
        episode: "s02e11",
        time: "00:03:00",
        title: "How Richard remembers every outfit",
        lines: [
          { who: J, text: "Richard, there are so many specific memories in the book. I have to ask: did you have diaries? Did you have journals? Because your memory for clothes and specific conversations is just spot on. How did you do it?" },
          { who: "Richard Boch", text: "Well, I did keep some journals, and I did refer to them. I had a lot of things in an archive, even some clothes from those days. And I also interviewed just under 200 people for this book. When you interview that many people, someone will say something and you respond - oh, I never would have remembered that - and you start riffing back and forth, and it may jar something in their memory. So a lot of details came up that I never would have remembered if they hadn't been poked and prodded out of me." },
        ],
      },
    ],
  },

  "ann-magnuson-s-journals": {
    keeper: "Ann Magnuson",
    keeperEpisode: "s04e10",
    story: "Ann keeps journals - she'd have to check them for the details of her very first weekend in New York.",
    moments: [
      {
        episode: "s04e10",
        time: "00:07:06",
        title: "Her first New York weekend",
        lines: [
          { who: J, text: "The first time you went to New York, what happened? You were mugged, or…?" },
          { who: "Ann Magnuson", text: "Well, I went with my friend Carol from college. It was the three-day weekend for Thanksgiving. We drove all night, all day, got to New York, went straight to CBGB's. It was too crowded, so we couldn't get in. And then we went to my friend Timothy's house… You know what? I have to look at my journals and everything. But basically, I met somebody who would be my first boyfriend. We were there for maybe 24 hours, stayed up all night and didn't even really have a place to sleep. It was all very, very 70s. Went to the Empire Diner." },
        ],
      },
    ],
  },

  "mickey-boardman-s-journal": {
    keeper: "Mickey Boardman",
    keeperEpisode: "s04e02",
    story:
      "Mickey talks about his journal once on the show, looking back on his addiction in the 90s: crystal meth made him so focused that he would write in it for 12 hours at a time. He has been sober for 26 years.",
    moments: [
      {
        episode: "s04e02",
        time: "00:26:44",
        title: "Twelve hours at a time",
        lines: [
          { who: J, text: "You were dealing with addiction at a certain point in the 90s. Tell me a little bit about the club scene at the time, and how it was that you fell into the addiction and how you got out of it." },
          { who: "Mickey Boardman", text: "Well, I kind of always have had an addictive personality… My friend gave me some crystal meth one time." },
          { who: "Mickey Boardman", text: "I'm borderline ADHD anyway, so for me it sort of acted like Ritalin to a hyperactive child. It made me laser-focused. I would write in my journal for 12 hours at a time. I would scrub the bathroom floor with a toothbrush. I'd be thinking, this is the very most amazing thing I could possibly be doing. I was so happy. And you don't eat for weeks, so you become very skinny." },
        ],
      },
    ],
  },

  "andy-warhol-diaries": {
    keeper: "Andy Warhol",
    years: "1976–1987",
    story:
      "Andy phoned his day in to Pat Hackett every morning from 1976 until shortly before he died in 1987; she edited the calls into The Andy Warhol Diaries (1989). The hosts and guests use it to check their own stories - and James reads Andy's words about Christopher Makos aloud.",
    moments: [
      {
        episode: "s01e10",
        time: "00:30:47",
        title: "Basquiat selling postcards in SoHo",
        lines: [
          { who: "Fenton Bailey", text: "There's a reference in Andy Warhol's diaries, I think, where he met Basquiat. He was walking around SoHo, and Basquiat was selling his postcards." },
          { who: "Joey Arias", text: "Right. Because he'd walk around. He was very bold about it. He'd walk up to police or anybody - anybody who looked like they had money, he just walked up. And of course, we all looked at Andy Warhol as our savior. Andy Warhol was God. I came to New York to meet God." },
        ],
      },
      {
        episode: "s02e10",
        time: "00:40:49",
        title: "Monique and Wilhelmina",
        lines: [
          { who: "Brian Belovitch", text: "Monique and Wilhelmina, they're in the book. They were in the Andy Warhol Diaries - you know, the drag series that he did. And Wilhelmina lived upstairs from me; she was my neighbor at the Albert Hotel." },
        ],
      },
      {
        episode: "s02e11",
        time: "00:01:19",
        title: "Like the Warhol Diaries: open at any page",
        lines: [
          { who: J, text: "So much of the conversation about nightlife in the 1970s is Studio 54. And your book right here, The Mudd Club, is an exhaustive and fascinating look at the other legend of the time. It's very much like the Warhol Diaries, Fenton: you can read it from start to finish, and I think you should, but you can also just open it at any page and there is something scandalous and shocking and absolutely jaw-dropping." },
        ],
      },
      {
        episode: "s03e09",
        time: "00:26:10",
        title: "Everything about the entire world",
        lines: [
          { who: "Fenton Bailey", text: "Also like James St. James, I might add, who studied everybody before you went to New York." },
          { who: J, text: "Yep. I mean, Warhol Diaries taught me everything about the entire world." },
        ],
      },
      {
        episode: "s04e05",
        time: "00:47:16",
        title: "Everybody's got their own Andy",
        lines: [
          { who: "Dustin Pittman", text: "With Andy, when they came out with the Andy Warhol Diaries, I said, you believe what you want to believe. Everybody's got their own story. I knew Andy all his life, but my period with Andy was early Andy - we used to hang around Trudy Heller's, Reno Sweeney's, the cabarets. So everybody has their own story, based on the different time they knew Andy." },
        ],
      },
      {
        episode: "s05e06",
        time: "00:25:53",
        title: "Taking Andy and Halston to Cowboys",
        lines: [
          { who: J, text: "In the Warhol Diaries, there's a mention of you taking Andy and Halston to a hustler club called Cowboys on 52nd Street. Do you remember Cowboys? Do you remember some of the hustler clubs in New York?" },
          { who: "Christopher Makos", text: "Yeah. That was the main one. Do you remember Catherine Guinness? That crowd, when they were in town, they all wanted to do kinky things." },
        ],
      },
      {
        episode: "s05e06",
        time: "00:40:37",
        title: "James reads what Andy wrote about Makos",
        lines: [
          { who: J, text: "I want to read to you something that Andy said about you in the Warhol Diaries. I think it is probably the nicest thing that Andy has ever said about anyone. He said:" },
          { who: "Andy Warhol", read: true, text: "Chris is the perfect companion for me. He's everything I've ever wanted. He's pushy, then he's not pushy. He's a child, then he goes off to sex parties and comes back satisfied with his pipes cleaned. He gets me to go running all over, even though he has me carrying his knapsack now. It's all so exciting and it makes me feel so young." },
          { who: J, text: "Andy could come off as sort of bitchy many times, but that's one of the most earnest things I've ever heard him say. It's so sweet, the way he felt about you." },
          { who: "Christopher Makos", text: "I know, I was flattered too. We were really good pals, buddies. We traveled a lot to Europe together. He was a fun person to be around. And of course, everybody has their personal Andy." },
        ],
      },
      {
        episode: "s05e05",
        time: "00:47:39",
        title: "After Keith's Fun Gallery show",
        lines: [
          { who: "Brad Gooch", text: "Warhol could be whiny in a certain way. It's all in his journals. So when he goes to the Haring Fun Gallery show, after that he's writing about, oh, I went down to the show. That's the way people used to be about me when I was on top." },
        ],
      },
    ],
  },
};
