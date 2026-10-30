// "A night at <club> sounded like this": songs documented as played at the club (DJ lists, recorded sets,
// official compilations, live shows) - every song with the reason it is here and its source.
// Keyed by the club's A–Z card slug. Add a club only when real sources exist; never guess a Spotify id.

export type Source = { key: string; label: string; href: string };
export type Kind = "played" | "live" | "dj-artist";
export type ClubSong = {
  title: string;
  artist: string;
  year: number;
  spotify?: string; // Spotify track id (checked against Spotify, never guessed) - left out when the song isn't on Spotify
  youtube?: string; // video to link instead when the song isn't on Spotify
  video?: string; // YouTube video id the Jukebox plays for it (the song's video in the club's YouTube playlist)
  kind: Kind;
  why?: string;
  sources: string[]; // Source keys
  guest?: { slug: string; label: string }; // a Night Fever guest tied to this song at the club (links to their card)
};
export type ClubNight = {
  slug: string; // entity slug of the club card
  club: string;
  playlistId?: string; // Lisa's public Spotify playlist, once created
  youtubePlaylist?: string; // Lisa's public AFTERPARTY playlist on YouTube, once it is public
  note: string; // where the songs come from
  footage?: { id: string; title: string }[]; // videos filmed inside the club (and songs named after it), from its YouTube playlist - the Jukebox's "On film" section
  sources: Source[];
  songs: ClubSong[];
};

const pg: ClubNight = {
  slug: "paradise-garage",
  club: "Paradise Garage",
  playlistId: "3fgUA8uxz3DavUVhit80Ty",
  youtubePlaylist: "https://www.youtube.com/playlist?list=PLckHVSymsCkI",
  note:
    "Records documented at the Paradise Garage (1977–1987), mostly through resident DJ Larry Levan: the club's \"Top 100\" published in Bill Brewster and Frank Broughton's Last Night a DJ Saved My Life, a 1979 Levan set recorded at the Garage, his West End remixes made famous there and a top five from Garage staffer Joey Llanos - plus the records YouTube recognises in Larry Levan's sets taped at the club, up to the closing night in 1987. Not one exact night - the records the club was known for.",
  footage: [
    { id: "cdVyhpW5bdE", title: "Paradise Garage Closing Party - NYC 1987 (Reupload)" },
    { id: "peBqn8DtNL8", title: "Keith Haring \"Party of Life\" at Paradise Garage, 1985" },
    { id: "F1hQcFXSWkQ", title: "New York clubbing around 1983/4. The emerging 'dance music' " },
    { id: "39JerMg2IQE", title: "Larry Levan - Live At The Paradise Garage [1979]" },
    { id: "luAx0xKWiRo", title: "Larry Levan live at Paradise Garage 1985" },
    { id: "SnEc9lhNR0A", title: "Larry Levan live at Paradise Garage 1986-87" },
    { id: "B3cGe4GwZR8", title: "Larry Levan - The Final Night of Paradise Garage / 26.09.198" },
    { id: "qgQ0FAaBT-U", title: "Larry Levan - Live @ Closing Party, The Paradise Garage, New" },
    { id: "S-sJeTfXmQY", title: "The Paradise Garage 1985 - Larry Levan With A Live PA From J" },
    { id: "X2O6y74xTXM", title: "What Is The Paradise Garage? (Larry Levan Way, 2014)" },
    { id: "8ApuznGVRJQ", title: "MAESTRO - The Story of Larry Levan, Paradise Garage & Dancem" },
    { id: "O14MWhjXGr8", title: "LARRY’S GARAGE  - A documentary about Larry Levan and  Parad" },
  ],
  sources: [
    { key: "A", label: "Paradise Garage Top 100 (Last Night a DJ Saved My Life, via Wikipedia)", href: "https://en.wikipedia.org/wiki/Paradise_Garage" },
    { key: "B", label: "Larry Levan, Live at the Paradise Garage (set recorded 1979)", href: "https://www.allmusic.com/album/live-at-the-paradise-garage-mw0000105029" },
    { key: "C", label: "Larry Levan's West End remixes made famous at the Garage", href: "https://sisterray.co.uk/products/larry-levan-s-classic-west-end-records-remixes-made-famous-at-the-legendary-paradise-garage" },
    { key: "D", label: "Joey Llanos's top 5 Garage tracks (Dancing Astronaut)", href: "https://dancingastronaut.com/2015/12/paradise-garages-joey-llanos-unveils-top-5-classic-tracks-legendary-nyc-nightclub/" },
    { key: "E", label: "Larry Levan, Genius of Time (Resident Advisor review)", href: "https://ra.co/reviews/18942" },
    { key: "F", label: "Larry Levan live at the Paradise Garage, 1979 (YouTube - song recognition)", href: "https://www.youtube.com/watch?v=39JerMg2IQE" },
    { key: "G", label: "Larry Levan live at the Paradise Garage, 1985 (YouTube - song recognition)", href: "https://www.youtube.com/watch?v=luAx0xKWiRo" },
    { key: "H", label: "Larry Levan live at the Paradise Garage, 1986-87 (YouTube - song recognition)", href: "https://www.youtube.com/watch?v=SnEc9lhNR0A" },
    { key: "I", label: "Larry Levan, the final night of the Paradise Garage, 1987 (YouTube - song recognition)", href: "https://www.youtube.com/watch?v=B3cGe4GwZR8" },
    { key: "J", label: "Larry Levan live at the Paradise Garage closing party, 1987 (YouTube - song recognition)", href: "https://www.youtube.com/watch?v=qgQ0FAaBT-U" },
    { key: "K", label: "The Paradise Garage 1985, Larry Levan (YouTube - song recognition)", href: "https://www.youtube.com/watch?v=S-sJeTfXmQY" },
  ],
  songs: [
    { title: "Love Is the Message", artist: "MFSB", year: 1973, spotify: "1GbBfA4tgiCpNXHIEogoJP", video: "M3wpG6Rw-tE", kind: "played", sources: ["A"] },
    { title: "Love Hangover", artist: "Diana Ross", year: 1976, spotify: "4poc2NX2Ap8MnZjOtoiGir", video: "Y9-7rcKxIc8", kind: "played", sources: ["A"] },
    { title: "Bourgie' Bourgie'", artist: "Ashford & Simpson", year: 1977, spotify: "0dKAgkeaMcmLGzgjlASphY", video: "QU7ZQqZ-E5s", kind: "played", why: "In Levan's 1979 Garage set", sources: ["B"] },
    { title: "I Feel Love", artist: "Donna Summer", year: 1977, spotify: "1vCBk33l9HaWp5FOnhSGxk", video: "yEbaeLv-aOo", kind: "played", sources: ["A"] },
    { title: "Over and Over", artist: "Sylvester", year: 1977, spotify: "23PqxkDoz1hHEKg0PHRZGv", video: "oDCJucIgDaI", kind: "played", sources: ["A"] },
    { title: "My First Mistake", artist: "The Chi-Lites", year: 1977, spotify: "37bc9uAsVQ2OLZbmxyyrih", video: "RYz20Yf0nX8", kind: "played", sources: ["A", "B"] },
    { title: "Weekend", artist: "Phreek", year: 1978, spotify: "37XLql4sOhKLcw7Id872uj", video: "2Ccm6v1-axw", kind: "played", why: "Joey Llanos calls it the Garage's number one", sources: ["A", "D"] },
    { title: "I Got My Mind Made Up (Larry Levan mix)", artist: "Instant Funk", year: 1978, spotify: "49V6jTgI4I4XLA8Yl78sm5", video: "ALIGgEqDwck", kind: "played", sources: ["A", "D", "E"] },
    { title: "Lost in Music", artist: "Sister Sledge", year: 1979, spotify: "2Qd3DygsQQYCCTy2KBkct3", video: "nIrnevgyCFw", kind: "played", sources: ["A"] },
    { title: "Put Your Body in It", artist: "Stephanie Mills", year: 1979, spotify: "4pJRDwBEBBnDGYwwm8JkBw", video: "IyroR0sjYrk", kind: "played", why: "In Levan's 1979 Garage set", sources: ["B"] },
    { title: "Street Player", artist: "Chicago", year: 1979, spotify: "1HiaZTm2nGQL4wtnJLPNV0", video: "TeQy-YxGPP4", kind: "played", sources: ["A"] },
    { title: "I Zimbra", artist: "Talking Heads", year: 1979, spotify: "6WXWvuIVR2g3MklmHXXZp8", video: "qKFn66dzdz0", kind: "played", sources: ["A"] },
    { title: "Love Sensation", artist: "Loleatta Holloway", year: 1980, spotify: "3su8VunluUL4Oj7UTTEREt", video: "1h6Su3t5Lqs", kind: "played", sources: ["A"] },
    { title: "Is It All Over My Face (Larry Levan female vocal)", artist: "Loose Joints", year: 1980, spotify: "1WtsuRKEu7GVJrxkOJXPO7", video: "hn27RiqRj7s", kind: "played", sources: ["A", "C", "E"] },
    { title: "Heartbeat (club version)", artist: "Taana Gardner", year: 1981, spotify: "4RB9jISwfLLloQ0tTyZFPa", video: "MN5GBxLZ-5o", kind: "played", why: "A Larry Levan remix", sources: ["A", "C", "D"] },
    { title: "Ain't No Mountain High Enough", artist: "Inner Life", year: 1981, spotify: "0ufXsZGpeGNOq6hI6hbWAF", video: "fF8jL1zyjNE", kind: "played", why: "Mixed by Larry Levan", sources: ["A", "E"] },
    { title: "Pull Up to the Bumper", artist: "Grace Jones", year: 1981, spotify: "653Fi3bqMxQQQmjw72ur6G", video: "Tc1IphRx1pk", kind: "played", sources: ["A"] },
    { title: "Moody", artist: "ESG", year: 1981, spotify: "6jjxVP7mXgDboCpkICaTvi", video: "w6VKgfwqnOY", kind: "played", sources: ["A"] },
    { title: "You're the One for Me", artist: "D-Train", year: 1981, spotify: "66i1lieIMso7ef4P7KdWcE", video: "pAQGetcjC-A", kind: "played", sources: ["A"] },
    { title: "Walking on Thin Ice", artist: "Yoko Ono", year: 1981, spotify: "3dSmcooRQGXXQ3wi0ZxGde", video: "i1TsynZ_TZg", kind: "played", sources: ["A"] },
    { title: "Go Bang! #5", artist: "Dinosaur L", year: 1982, spotify: "6GFpzRarqu9n7L2JT5O7k8", video: "9fA0MP7FGWc", kind: "played", why: "Llanos says Levan tuned the sound system to it", sources: ["A", "D"] },
    { title: "Don't Make Me Wait", artist: "Peech Boys", year: 1982, spotify: "4cqzudRpeLx9kBocTzTHlV", video: "QXCSYeNb10Y", kind: "played", why: "Produced by Larry Levan", sources: ["A", "C", "D"] },
    { title: "Dirty Talk", artist: "Klein & M.B.O.", year: 1982, spotify: "4CMKgb0qrIsVu202dmop15", video: "i5nt1ji_IKc", kind: "played", sources: ["A"] },
    { title: "Situation", artist: "Yazoo", year: 1982, spotify: "6b9dCj2PyHsVs2CDl1RsiK", video: "ysmVlaw36L0", kind: "played", sources: ["A"] },
    { title: "Just an Illusion", artist: "Imagination", year: 1982, spotify: "4QT3YKobBj4BI7xCYRLr9u", video: "wFaCuHa10oE", kind: "played", sources: ["A"] },
    { title: "Let No Man Put Asunder", artist: "First Choice", year: 1983, spotify: "5p3PdTiNcAz68eBNkDHgGn", video: "SeM-ANuGldQ", kind: "played", sources: ["A"] },
    { title: "Padlock (Larry Levan mix)", artist: "Gwen Guthrie", year: 1985, spotify: "6vVwnG6libRP0JUYDZbfyk", video: "W34hm7vYpq8", kind: "played", sources: ["A", "E"] },
    { title: "Slave to the Rhythm", artist: "Grace Jones", year: 1985, spotify: "3Hv9i1KAOXF2Wn42tj5s0h", video: "1rAmAPLiIQo", kind: "played", sources: ["A"] },
    { title: "Move Your Body", artist: "Marshall Jefferson", year: 1986, spotify: "4dKi8v4oeEpGDz18UXF2E5", video: "RhKMMh4qOL8", kind: "played", why: "Also played on the closing night in 1987", sources: ["A", "I", "J"] },
    { title: "It's Music", artist: "Damon Harris", year: 1978, spotify: "53DStjK5fenegoTJyarKye", video: "w4XuutYVFO8", kind: "played", why: "In Larry Levan's 1979 set taped at the club (YouTube's song recognition)", sources: ["F"] },
    { title: "Dreaming a Dream (Goes Dancin')", artist: "Crown Heights Affair", year: 1975, spotify: "0AuTsJ4N8TiNonl9Celcbb", video: "7DNDUUOUiIg", kind: "played", why: "In Larry Levan's 1979 set taped at the club (YouTube's song recognition)", sources: ["F"] },
    { title: "Right in the Socket", artist: "Shalamar", year: 1979, spotify: "3QmyJDY3uu0ytymUYCli1P", video: "sNGyMe3bu1E", kind: "played", why: "In Larry Levan's 1979 set taped at the club (YouTube's song recognition)", sources: ["F"] },
    { title: "Pick Me Up, I'll Dance", artist: "Melba Moore", year: 1979, spotify: "523Cyc5NfYlI6wqXUSLLMs", video: "F0Iu4ZpwKDc", kind: "played", why: "In Larry Levan's 1979 set taped at the club (YouTube's song recognition)", sources: ["F"] },
    { title: "Take Me Home", artist: "Cher", year: 1979, spotify: "3YWTp4Ap4sZNIyFkP0a0rx", video: "KTFMm-gV3qM", kind: "played", why: "In Larry Levan's 1979 set taped at the club (YouTube's song recognition)", sources: ["F"] },
    { title: "Angel in My Pocket", artist: "Change", year: 1980, spotify: "0rIzzj9UYWCZDCld6Ko8wE", video: "MAW9n7BlEIQ", kind: "played", why: "In Larry Levan's 1979 set taped at the club (YouTube's song recognition)", sources: ["F"] },
    { title: "Call Me Mr. Telephone", artist: "Cheyne", year: 1985, spotify: "234P04Ybak2Iob7Nliya2q", video: "_OMxKaawllg", kind: "played", why: "In Larry Levan's 1985 sets taped at the club (YouTube's song recognition)", sources: ["G", "K"] },
    { title: "Music Is the Answer", artist: "Colonel Abrams", year: 1984, spotify: "6G97WtWxjUEaW1EZoWiyMk", video: "27cOfVBYo7Q", kind: "played", why: "In Larry Levan's 1985 sets taped at the club (YouTube's song recognition)", sources: ["G", "K"] },
    { title: "I Want It to Be Real", artist: "John Rocca", year: 1984, spotify: "3RaKDxzGRJ1PSrwxLK3IFK", video: "A1wMuNPqwV8", kind: "played", why: "In Larry Levan's 1985 sets taped at the club (YouTube's song recognition)", sources: ["G", "K"] },
    { title: "Mystery of Love", artist: "Fingers Inc.", year: 1985, spotify: "1E8hMeQvfgvQPjN3BZ2viF", video: "5tqErnknRsE", kind: "played", why: "In Larry Levan's 1986-87 set taped at the club (YouTube's song recognition)", sources: ["H"] },
    { title: "The Magnificent Dance", artist: "The Clash", year: 1981, spotify: "2vUlFUyRbemQaseUj6NESz", video: "hFGKqNQnnrE", kind: "played", why: "In Larry Levan's 1986-87 set taped at the club (YouTube's song recognition)", sources: ["H"] },
    { title: "I'm Here Again", artist: "Thelma Houston", year: 1979, spotify: "1ATW550oLVrduhPtSq7eDP", video: "ymcIIDuwQuA", kind: "played", why: "In Larry Levan's 1986-87 set taped at the club (YouTube's song recognition)", sources: ["H"] },
    { title: "Nude Photo", artist: "Rhythim Is Rhythim (Derrick May)", year: 1987, spotify: "2VLCjPLcKFkMcver7t8yLf", video: "I7HiL2m63pQ", kind: "played", why: "Played on the club's closing night in 1987 (YouTube's song recognition)", sources: ["I", "J"] },
    { title: "Dreamin'", artist: "Loleatta Holloway", year: 1976, spotify: "5JWbh2iOVqgOAExDnduyHB", video: "2VuFSKcDmwE", kind: "played", why: "Played on the club's closing night in 1987 (YouTube's song recognition)", sources: ["I", "J"] },
    { title: "You Don't Know", artist: "Serious Intention", year: 1985, spotify: "6EeqiIJ6lFo7Ok0OUBeVQq", video: "V7rOje8nSdE", kind: "played", why: "Played on the club's closing night in 1987 (YouTube's song recognition)", sources: ["I", "J"] },
    { title: "Let's Make a Baby", artist: "Billy Paul", year: 1976, spotify: "2nUdP86O3XTrrsz4KItvQV", video: "QnYP8H8LQx0", kind: "played", why: "Played on the club's closing night in 1987 (YouTube's song recognition)", sources: ["I", "J"] },
    { title: "Goin' Down", artist: "Joe Smooth", year: 1987, spotify: "6X2Xz0SUU5bbJfAX25dlSR", video: "5TIWzg9LlBk", kind: "played", why: "Played on the club's closing night in 1987 (YouTube's song recognition)", sources: ["I", "J"] },
  ],
};

const s54: ClubNight = {
  slug: "studio-54",
  club: "Studio 54",
  playlistId: "1wxk4SWOmqT2ILYOn9CJc8",
  youtubePlaylist: "https://www.youtube.com/playlist?list=PLC7nN_IAiRM4",
  note:
    "Most of these are on A Night at Studio 54 (Casablanca, 1979), the double album made with the club's owners and mixed by its DJs Roy Thode and Marc Paul Simon from records played at the club. The rest come from Brooklyn Museum curator Matthew Yakobosky's list of songs heard in Studio 54 DJ sets between 1977 and 1980, Devil's Gun, reported as the first record played on opening night, and the songs YouTube recognises in footage filmed inside the club. Not one exact night.",
  footage: [
    { id: "RdfYSI5HkDU", title: "1978: Inside Iconic Disco Nightclub Studio 54" },
    { id: "TD2tlgpTd6M", title: "Studio 54 opens April 26 1977" },
    { id: "v3b8Z71zoPE", title: "Anton Perich Presents: Kenzo at Studio 54 (1977)" },
    { id: "wElyGy_VlWU", title: "Anton Perich Presents: Studio 54 Bella Abzug Party (1977)" },
    { id: "MmxEsVit4u8", title: "Studio 54 New York Grease Opening Party 1978" },
    { id: "NXiW3JSsC3M", title: "STUDIO 54 (New York 1978) Rare footage" },
    { id: "vDqcvhUlOWg", title: "CBS 60 Minutes of Disco Scene (1978)" },
    { id: "8BAVTJqMxhU", title: "Richie Kaczor rare interview, Spain 1982" },
    { id: "5cOy3HykFdc", title: "1980s New York, Inside Studio 54, Disco Dancing | Kinolibrary" },
    { id: "LLhgvkDZ2EI", title: "The Big Apple Circus Performers at Studio 54 | Kinolibrary" },
    { id: "qMi-UYxOvy8", title: "1984 Studio 54 Reopening Gala | Kinolibrary x Nelson Sullivan" },
  ],
  sources: [
    { key: "A", label: "A Night at Studio 54 (Casablanca, 1979 - Wikipedia)", href: "https://en.wikipedia.org/wiki/A_Night_at_Studio_54" },
    { key: "B", label: "Studio 54 DJ-set playlist by Brooklyn Museum curator Matthew Yakobosky (Slowdown)", href: "https://www.slowdown.media/article/a-studio-playlist-by-brooklyn-museum-curator-matthew-yakobosky" },
    { key: "C", label: "Devil's Gun (Wikipedia)", href: "https://en.wikipedia.org/wiki/Devil%27s_Gun" },
    { key: "D", label: "Richie Kaczor (Wikipedia)", href: "https://en.wikipedia.org/wiki/Richie_Kaczor" },
    { key: "E", label: "Anton Perich Presents: Kenzo at Studio 54, 1977 (YouTube - song recognition)", href: "https://www.youtube.com/watch?v=v3b8Z71zoPE" },
    { key: "F", label: "Studio 54 Grease opening party, 1978 (YouTube - song recognition)", href: "https://www.youtube.com/watch?v=MmxEsVit4u8" },
    { key: "G", label: "Inside Studio 54, 1980s - Nelson Sullivan (YouTube - song recognition)", href: "https://www.youtube.com/watch?v=5cOy3HykFdc" },
  ],
  songs: [
    { title: "Devil's Gun", artist: "C.J. & Co.", year: 1977, spotify: "2Dhvk1foUg665791VnnQmK", video: "IMCLvlv7ocE", kind: "played", why: "Reported as the first record played on opening night, 26 April 1977", sources: ["C"] },
    { title: "Le Freak", artist: "Chic", year: 1978, spotify: "7Kszjzps0xbQXyo1pO4KfE", video: "aXgSHL7efKg", kind: "played", sources: ["A", "B"] },
    { title: "Let's All Chant", artist: "Michael Zager Band", year: 1977, spotify: "2xGMzDlPnmPHD8HUYOy4Lw", video: "tVOycFbfIDA", kind: "played", sources: ["A", "B"] },
    { title: "Y.M.C.A.", artist: "Village People", year: 1978, spotify: "3UAdO916wku6gCnTL8ObL8", video: "CS9OO0S5w2k", kind: "played", sources: ["A"] },
    { title: "Disco Nights (Rock-Freak)", artist: "G.Q.", year: 1979, spotify: "4aVowfVhlyNUgHYqXbK8Ev", video: "YcZFDwWfnZA", kind: "played", sources: ["A", "B"] },
    { title: "Take Me Home", artist: "Cher", year: 1979, spotify: "3YWTp4Ap4sZNIyFkP0a0rx", video: "KTFMm-gV3qM", kind: "played", sources: ["A"] },
    { title: "I Love the Nightlife", artist: "Alicia Bridges", year: 1978, spotify: "0GyBa8w1j7G8IiZeTwCGjn", video: "TZzLKIhmse8", kind: "played", sources: ["A"] },
    { title: "Last Dance", artist: "Donna Summer", year: 1978, spotify: "4nWrCsWZzxiXX8FYHbydzl", video: "561fy1vqIo8", kind: "played", sources: ["A"] },
    { title: "Got to Be Real", artist: "Cheryl Lynn", year: 1978, spotify: "58r4JuwHhXLAkttkaUZfLw", video: "fI569nw0YUQ", kind: "played", sources: ["A"] },
    { title: "I Got My Mind Made Up", artist: "Instant Funk", year: 1979, spotify: "7abgit8a70zjN2q5Q3wvyh", video: "ALIGgEqDwck", kind: "played", sources: ["A"] },
    { title: "Hot Shot", artist: "Karen Young", year: 1978, spotify: "4AQi2sQAg9E0ysJtID9hdN", video: "j5TlpUF2GGw", kind: "played", sources: ["A"] },
    { title: "I Love America", artist: "Patrick Juvet", year: 1978, spotify: "4IjldRgoXtkgo7g6Z7nA6N", video: "xmftvZSll3A", kind: "played", sources: ["A"] },
    { title: "Souvenirs", artist: "Voyage", year: 1978, spotify: "0YUwSy9SLto4mnpOtOIDIr", video: "YUb2OHv8Wj0", kind: "played", sources: ["A"] },
    { title: "In the Bush", artist: "Musique", year: 1978, spotify: "5d91gYhpa5j11JKx2fgWHx", video: "lvhok_wzASs", kind: "played", sources: ["A"] },
    { title: "Instant Replay", artist: "Dan Hartman", year: 1978, spotify: "0E1PR66A94yVPiYJxGHimf", video: "jW-OfaiBs9k", kind: "played", sources: ["A"] },
    { title: "Shake Your Groove Thing", artist: "Peaches & Herb", year: 1978, spotify: "5o89Bf80t8ko3uNXJkYoVs", video: "e-LeujZNV08", kind: "played", sources: ["A"] },
    { title: "Love Vibration", artist: "Joe Simon", year: 1977, spotify: "0JNbE9l3ikNGZEiF0lMqqi", video: "eKJ5Xb59WKY", kind: "played", sources: ["B"] },
    { title: "I Will Survive", artist: "Gloria Gaynor", year: 1978, spotify: "7rIovIsXE6kMn629b7kDig", video: "6dYWe1c3OyU", kind: "played", why: "The club's first DJ, Richie Kaczor, is credited with popularising it", sources: ["B", "D"] },
    { title: "Hit and Run", artist: "Loleatta Holloway", year: 1977, spotify: "1Xsp6qu4qeu0OCkfaU8Eg8", video: "nxq0hy7AVpU", kind: "played", sources: ["B"] },
    { title: "Rio de Janeiro", artist: "Gary Criss", year: 1978, spotify: "3UaHpcXpYtKZlFToxX0CvM", video: "5gtET2fWWpI", kind: "played", sources: ["B"] },
    { title: "Moon Boots", artist: "Orlando Riva Sound", year: 1977, spotify: "4PYJXVHOazUQhwDMwwKdRR", video: "sSHQlkT1TLU", kind: "played", sources: ["B"] },
    { title: "Don't Stop", artist: "Ish", year: 1978, spotify: "5CBmSuEdqXKEYPWCZkJUnj", video: "tGIEhi3KZrg", kind: "played", sources: ["B"] },
    { title: "Boogie Oogie Oogie", artist: "A Taste of Honey", year: 1978, spotify: "07NrCEN3egNvw8td2LxqJO", video: "PhD58dP9kq8", kind: "played", sources: ["B"] },
    { title: "I Need a Man", artist: "Grace Jones", year: 1977, spotify: "3Zc9b3YS8wcGDzH92joizS", video: "ECVdqazgaSY", kind: "played", why: "Plays in the footage of Kenzo's party at the club in 1977 (YouTube's song recognition)", sources: ["E"] },
    { title: "Best of My Love", artist: "The Emotions", year: 1977, spotify: "2M2WJ7gBlcKNxdhyfPp9zY", video: "r3Rd33DvJ7w", kind: "played", why: "Plays in the footage of Kenzo's party at the club in 1977 (YouTube's song recognition)", sources: ["E"] },
    { title: "I'm Still in Love with You", artist: "Al Green", year: 1972, spotify: "2GEDd9qtGXU7IvGgqTF6Uj", video: "Tg_Guhd6fEY", kind: "played", why: "Plays in the footage of Kenzo's party at the club in 1977 (YouTube's song recognition)", sources: ["E"] },
    { title: "You Are the Song", artist: "Herbie Mann", year: 1977, spotify: "4n915OiBw2n9zGDoNzRqko", video: "6PMUtiZL1VA", kind: "played", why: "Plays in the footage of Kenzo's party at the club in 1977 (YouTube's song recognition)", sources: ["E"] },
    { title: "City, Country, City", artist: "War", year: 1972, spotify: "2RWS2btML7g1ZgqWPWGu7b", video: "uXTWpkxGeAY", kind: "played", why: "Plays in the footage of Kenzo's party at the club in 1977 (YouTube's song recognition)", sources: ["E"] },
    { title: "I Can't Turn You Loose", artist: "Anthony White", year: 1977, spotify: "4A6ZWZ37qwP7Io8ca1Y4q5", video: "mbK_t7iBGRg", kind: "played", why: "Plays in the footage of Kenzo's party at the club in 1977 (YouTube's song recognition)", sources: ["E"] },
    { title: "If My Friends Could See Me Now", artist: "Linda Clifford", year: 1978, youtube: "https://www.youtube.com/watch?v=JB11xXzejZE", video: "JB11xXzejZE", kind: "played", why: "Plays at the Grease opening party at the club in 1978 (YouTube's song recognition)", sources: ["F"] },
    { title: "Miss You", artist: "The Rolling Stones", year: 1978, spotify: "3hJLKtTpgct9Y9wKww0BiR", video: "hic-dnps6MU", kind: "played", why: "Plays at the Grease opening party at the club in 1978 (YouTube's song recognition)", sources: ["F"] },
    { title: "Touch My Heart", artist: "Madleen Kane", year: 1978, youtube: "https://www.youtube.com/watch?v=FsnyTtsFjdc", video: "FsnyTtsFjdc", kind: "played", why: "Plays at the Grease opening party at the club in 1978 (YouTube's song recognition)", sources: ["F"] },
    { title: "Let's Start the Dance", artist: "Bohannon", year: 1978, spotify: "5kzro4mOcjwXuugRc6nzm7", video: "mls04iVmU9o", kind: "played", why: "Plays at the Grease opening party at the club in 1978 (YouTube's song recognition)", sources: ["F"] },
    { title: "Body", artist: "The Jacksons", year: 1984, spotify: "1B7rsWK4bD7UYhAVQq6Wbq", video: "-Gbf8vY4MgE", kind: "played", why: "Plays in Nelson Sullivan's footage from inside the club (YouTube's song recognition)", sources: ["G"] },
  ],
};

const dt: ClubNight = {
  slug: "danceteria",
  club: "Danceteria",
  playlistId: "2aPYyqs3vWySfJPTCBeK1C",
  youtubePlaylist: "https://www.youtube.com/playlist?list=PLVw_1KfuOBCM",
  note:
    "From documented accounts of Danceteria (1980–1986): interviews with resident DJs Mark Kamins and Johnny Dynell, Tim Lawrence's history Life and Death on the New York Dance Floor, 1980–1983, and the bands who played its stages - plus the songs YouTube recognises in footage filmed inside the club. Some songs were named as played or born there, some are by acts who performed there live, and some stand in for artists the DJs are known to have mixed. Not one exact night.",
  footage: [
    { id: "haHXisfvoeI", title: "Rudolf Piper - Danceteria - 1983 Nickelodeon Interview" },
    { id: "TueeQKzdB6s", title: "New York Dance Stand from Danceteria (1983)" },
    { id: "PTDI4InokjI", title: "New York Dance Stand 1983 complete Danceteria episode" },
    { id: "ttJBJTcnroc", title: "Madonna - Everybody - Live at the Danceteria" },
    { id: "YK7BngbI8Bw", title: "Danceteria - New York in the 80's" },
    { id: "ulU3UEdiRwo", title: "Jim Fouratt Danceteria 1982" },
    { id: "8TgoJwcdzSE", title: "Danceteria, 1980s New York Clubbing | Kinolibrary x Nelson Sullivan" },
    { id: "-k_kJKumj7Q", title: "Outside Danceteria, 1985 | Kinolibrary x Nelson Sullivan" },
    { id: "OV3vrbvaEbc", title: "Queueing for Danceteria, 1980s home movie | Kinolibrary" },
    { id: "i4vyjYL8Xg8", title: "Danceteria by day, 1980s | Kinolibrary" },
    { id: "Va_dGNrc_Do", title: "Christina's Show at Danceteria" },
    { id: "0Yz27ybzACs", title: "Christina & Andy Anderson Get Caricatures at Danceteria" },
    { id: "rM2JfP0f2aQ", title: "Natasha's fashion show at Danceteria, 1984" },
    { id: "s77mmhzWKek", title: "Danceteria and Pyramid Club 1984 backstage NYC" },
    { id: "xWN7Pb3tOdo", title: "Of a Mesh: Live at Danceteria NYC 1980s" },
    { id: "QhvU5kmdJsk", title: "Danceteria television commercial 1984" },
    { id: "nA3ERvPfxuc", title: "Mark Kamins the legend (Danceteria)" },
    { id: "VhGBGXb7G6o", title: "Danceteria: The 1980s NYC Club That Made Madonna" },
    { id: "D3zkX-Am4o4", title: "Madonna - Danceteria" },
    { id: "P4kE8CNvoOw", title: "Soft Cell - Danceteria" },
  ],
  sources: [
    { key: "K", label: "Mark Kamins interview (Red Bull Music Academy, 2014)", href: "https://daily.redbullmusicacademy.com/2014/02/mark-kamins-interview" },
    { key: "L", label: "Tim Lawrence, \"Nightclubbing: Danceteria\" (Red Bull Music Academy, 2016)", href: "https://daily.redbullmusicacademy.com/2016/10/danceteria-nightclubbing" },
    { key: "M", label: "80s NYC - Museum of the City of New York", href: "https://mappingnyc.mcny.org/pr/80s-nyc/s/b19c5dbd-bc02-4d46-83ee-e9de08c514df" },
    { key: "W", label: "Everybody (Madonna song) - Wikipedia", href: "https://en.wikipedia.org/wiki/Everybody_(Madonna_song)" },
    { key: "F", label: "Afrika Bambaataa at Danceteria, 1982 flyer (Cornell archive)", href: "https://archives.library.cornell.edu/agents/corporate_entities/18594" },
    { key: "J", label: "Johnny Dynell on Jam Hot", href: "https://finn-johannsen.de/?p=1644" },
    { key: "S", label: "Sade (band) - Wikipedia", href: "https://en.wikipedia.org/wiki/Sade_(band)" },
    { key: "T", label: "The Smiths' Danceteria gig (Spin)", href: "https://www.spinmagazine.com/2014/04/madonna-smiths-danceteria-gig-legendary-coat-check/" },
    { key: "N", label: "52nd Street - the Factory years", href: "https://www.liquisearch.com/52nd_street_band/the_factory_years" },
    { key: "D", label: "New York Dance Stand 1983, complete Danceteria episode (YouTube - song recognition)", href: "https://www.youtube.com/watch?v=PTDI4InokjI" },
    { key: "E", label: "New York Dance Stand from Danceteria, 1983, with Dianne Brill (YouTube - song recognition)", href: "https://www.youtube.com/watch?v=TueeQKzdB6s" },
    { key: "X", label: "Natasha's fashion show at Danceteria, 1984 (YouTube - song recognition)", href: "https://www.youtube.com/watch?v=rM2JfP0f2aQ" },
    { key: "V", label: "Danceteria, 1980s New York clubbing - Nelson Sullivan / Kinolibrary (YouTube - a viewer's track ID)", href: "https://www.youtube.com/watch?v=8TgoJwcdzSE" },
  ],
  songs: [
    { title: "Everybody", artist: "Madonna", year: 1982, spotify: "4sFGkok98Cu0gu52fD48Xr", video: "cOqr_x_9fMc", kind: "played", why: "Mark Kamins played her demo at the club; she first performed it there on 18 Dec 1982", sources: ["W", "K"] },
    { title: "Planet Rock", artist: "Afrika Bambaataa & the Soulsonic Force", year: 1982, spotify: "5aD3fAa1fy8XUesj3lgr19", video: "9J3lwZjHenA", kind: "played", why: "Kamins names it among his Danceteria records; Bambaataa DJed there in March 1982", sources: ["K", "F"] },
    { title: "Taj Mahal", artist: "Jorge Ben", year: 1972, spotify: "0H2G2c1u3XnzOlGFNJ6Er0", video: "rfrpOhC6858", kind: "played", why: "Kamins: \"I'm famous for playing 'Taj Mahal'\"", sources: ["K"] },
    { title: "Ashes to Ashes", artist: "David Bowie", year: 1980, spotify: "37CRPk0L5ZpfPeePEPwE0t", video: "HyMm4rJemtI", kind: "played", why: "Its video premiered at the club in summer 1980", sources: ["L"] },
    { title: "Jam Hot", artist: "Johnny Dynell", year: 1983, spotify: "46qCv6ODMDCcadIjntyqrQ", video: "gRU-XNOvT5E", kind: "played", why: "Dynell DJed there and says it was born at Danceteria", sources: ["J"], guest: { slug: "chi-chi-valenti-johnny-dynell", label: "Johnny Dynell" } },
    { title: "Smooth Operator", artist: "Sade", year: 1984, spotify: "7pLuEMFougkSHXrPBtNxTR", video: "4TYv2PhG89A", kind: "live", why: "Sade played their first US show there in 1983", sources: ["S"] },
    { title: "This Charming Man", artist: "The Smiths", year: 1983, spotify: "1FvDJ9KGxcqwv1utyPL3JZ", video: "cJRP3LRcUFg", kind: "live", why: "Their US debut, New Year's Eve 1983", sources: ["T"] },
    { title: "Cavern", artist: "Liquid Liquid", year: 1983, spotify: "6j370rNNGiu8zOnoSTioPk", video: "hoZaH58NHV4", kind: "live", sources: ["K"] },
    { title: "Konk Party", artist: "Konk", year: 1981, spotify: "16W8U6KlqGsStHnusAlfFZ", video: "gwluIkaoR0M", kind: "live", sources: ["K"] },
    { title: "Cool as Ice", artist: "52nd Street", year: 1982, spotify: "2aDfGTjZxw0Qo3AYYfrWkn", video: "k17_X3WuCmk", kind: "live", why: "The band played two nights there to launch it", sources: ["N"] },
    { title: "Annie, I'm Not Your Daddy", artist: "Kid Creole and the Coconuts", year: 1981, spotify: "3NV3YfKFceFlZsRgpGVzLj", video: "4rNpxRRv9bw", kind: "live", sources: ["M"] },
    { title: "It's Like That", artist: "Run-DMC", year: 1983, spotify: "2J6QnTjHIWwXErNWyF0RUC", video: "X0Dd4PvaGhU", kind: "live", sources: ["M"] },
    { title: "I Can't Live Without My Radio", artist: "LL Cool J", year: 1985, spotify: "2qfTGzETefwtBWKDThZjnU", video: "3-7VCUAGaYw", kind: "live", sources: ["M"] },
    { title: "Girls Just Want to Have Fun", artist: "Cyndi Lauper", year: 1983, spotify: "4y1LsJpmMti1PfRQV9AWWe", video: "PIb6AZdTr-A", kind: "live", sources: ["M"] },
    { title: "Whip It", artist: "Devo", year: 1980, spotify: "6QG0wcgoCsa9pqFyTg0rRO", video: "j_QLzthSkfM", kind: "live", sources: ["L"] },
    { title: "We Got the Beat", artist: "The Go-Go's", year: 1981, spotify: "5kz9GDBTX846OXwqWoyKzF", video: "f55KlPe81Yw", kind: "live", sources: ["L"] },
    { title: "To Hell with Poverty", artist: "Gang of Four", year: 1981, spotify: "19vvQlbD05Kgg1fYVwnjjy", video: "I_QJwR6D9d4", kind: "live", sources: ["L"] },
    { title: "Cool", artist: "Pylon", year: 1979, spotify: "0tQdpfaW5XlupjNklNec33", video: "wdo3mw0Rx7Q", kind: "live", sources: ["L", "K"] },
    { title: "Fa Cé-La", artist: "The Feelies", year: 1980, spotify: "1tA4vXKgYffzQ9PnUMzKax", video: "ROsodJdKAbo", kind: "live", sources: ["L"] },
    { title: "Jukebox Babe", artist: "Alan Vega", year: 1980, spotify: "2OypHuz6IWCnwmvfoIXoBv", video: "os5xeR1yWCw", kind: "live", sources: ["L"] },
    { title: "Cold Life", artist: "Ministry", year: 1981, spotify: "76RvIZ3acrj7dixkMED0ay", video: "6u13SHHzVBE", kind: "live", sources: ["L"] },
    { title: "Oye Como Va", artist: "Tito Puente", year: 1962, spotify: "73uEbChpBB29ttwVnwuNVE", video: "BpAXzTpANNw", kind: "live", sources: ["L"] },
    { title: "Death Disco", artist: "Public Image Ltd", year: 1979, spotify: "7bBr5DdLIOICNKX9IbaHfh", video: "eFxpL5TpZH0", kind: "dj-artist", sources: ["L", "K"] },
    { title: "Let's Start the Dance", artist: "Bohannon", year: 1978, spotify: "5kzro4mOcjwXuugRc6nzm7", video: "mls04iVmU9o", kind: "dj-artist", sources: ["L", "K"] },
    { title: "Wardance", artist: "Killing Joke", year: 1980, spotify: "38Pqjy8ptttAXIBxNUk2Iu", video: "1Dxjh1Cq-cQ", kind: "dj-artist", sources: ["L"] },
    { title: "I Feel Love (12\")", artist: "Donna Summer", year: 1977, spotify: "7B7lf3sIze5VR2WuYttn18", video: "yEbaeLv-aOo", kind: "dj-artist", sources: ["L"] },
    { title: "Rock Lobster", artist: "The B-52's", year: 1979, spotify: "0rme3FLbw5o1KLXpJzivjS", video: "n4QSYx4wVQg", kind: "dj-artist", why: "Kamins: \"I would play B-52's\"", sources: ["K"] },
    { title: "Blue Monday", artist: "New Order", year: 1983, spotify: "6hHc7Pks7wtBIW8Z6A0iFq", video: "c1GxjzHm5us", kind: "played", why: "Plays on New York Dance Stand, filmed at the club in 1983 (YouTube's song recognition)", sources: ["D"] },
    { title: "Haunted House of Rock", artist: "Whodini", year: 1983, spotify: "50brfU9ecCxbyTEe8MNXUP", video: "bgK8aex4wHA", kind: "played", why: "Plays on both New York Dance Stand shows filmed at the club in 1983 (YouTube's song recognition)", sources: ["D", "E"] },
    { title: "I Love You", artist: "Yello", year: 1983, spotify: "3JGMel50Hoif9AySxeGgep", video: "50pl9u6tyTc", kind: "played", why: "Plays on New York Dance Stand, filmed at the club in 1983 (YouTube's song recognition)", sources: ["D"] },
    { title: "Jukebox (Don't Put Another Dime)", artist: "The Flirts", year: 1982, spotify: "4ELCfn46P7TLfPSEkf2nbo", video: "Gf8hvcopfkY", kind: "played", why: "Plays at Natasha's fashion show at the club in 1984 (YouTube's song recognition)", sources: ["X"] },
    { title: "White Wedding", artist: "Billy Idol", year: 1982, spotify: "24kNjskAjp7GBtP0MPEiC6", video: "AAZQaYKZMTI", kind: "played", why: "Plays at Natasha's fashion show at the club in 1984 (YouTube's song recognition)", sources: ["X"] },
    { title: "Funkbox Party", artist: "The Masterdon Committee", year: 1982, spotify: "6078HP47Q6H6LcQN9nKLxX", video: "r_OxZKktwQc", kind: "played", why: "A viewer identifies it in Nelson Sullivan's footage from inside the club", sources: ["V"] },
  ],
};

export const CLUB_NIGHTS: ClubNight[] = [pg, s54, dt];

export const clubNightFor = (slug: string) => CLUB_NIGHTS.find((c) => c.slug === slug);
export const playlistUrl = (id: string) => `https://open.spotify.com/playlist/${id}`;
export const trackUrl = (id: string) => `https://open.spotify.com/track/${id}`;
export const KIND_LABEL: Record<Kind, string> = {
  played: "Played there",
  live: "Performed there live",
  "dj-artist": "An artist the DJs played",
};
