// "A night at <club> sounded like this": songs documented as played at the club (DJ lists, recorded sets,
// official compilations, live shows) - every song with the reason it is here and its source.
// Keyed by the club's A–Z card slug. Add a club only when real sources exist; never guess a Spotify id.

export type Source = { key: string; label: string; href: string };
export type Kind = "played" | "live" | "dj-artist";
export type ClubSong = {
  title: string;
  artist: string;
  year: number;
  spotify: string; // Spotify track id (checked against Spotify, never guessed)
  kind: Kind;
  why?: string;
  sources: string[]; // Source keys
  guest?: { slug: string; label: string }; // a Night Fever guest tied to this song at the club (links to their card)
};
export type ClubNight = {
  slug: string; // entity slug of the club card
  club: string;
  playlistId?: string; // Lisa's public Spotify playlist, once created
  note: string; // where the songs come from
  sources: Source[];
  songs: ClubSong[];
};

const pg: ClubNight = {
  slug: "paradise-garage",
  club: "Paradise Garage",
  playlistId: "3fgUA8uxz3DavUVhit80Ty",
  note:
    "Records documented at the Paradise Garage (1977–1987), mostly through resident DJ Larry Levan: the club's \"Top 100\" published in Bill Brewster and Frank Broughton's Last Night a DJ Saved My Life, a 1979 Levan set recorded at the Garage, his West End remixes made famous there and a top five from Garage staffer Joey Llanos. Not one exact night - the records the club was known for.",
  sources: [
    { key: "A", label: "Paradise Garage Top 100 (Last Night a DJ Saved My Life, via Wikipedia)", href: "https://en.wikipedia.org/wiki/Paradise_Garage" },
    { key: "B", label: "Larry Levan, Live at the Paradise Garage (set recorded 1979)", href: "https://www.allmusic.com/album/live-at-the-paradise-garage-mw0000105029" },
    { key: "C", label: "Larry Levan's West End remixes made famous at the Garage", href: "https://sisterray.co.uk/products/larry-levan-s-classic-west-end-records-remixes-made-famous-at-the-legendary-paradise-garage" },
    { key: "D", label: "Joey Llanos's top 5 Garage tracks (Dancing Astronaut)", href: "https://dancingastronaut.com/2015/12/paradise-garages-joey-llanos-unveils-top-5-classic-tracks-legendary-nyc-nightclub/" },
    { key: "E", label: "Larry Levan, Genius of Time (Resident Advisor review)", href: "https://ra.co/reviews/18942" },
  ],
  songs: [
    { title: "Love Is the Message", artist: "MFSB", year: 1973, spotify: "1GbBfA4tgiCpNXHIEogoJP", kind: "played", sources: ["A"] },
    { title: "Love Hangover", artist: "Diana Ross", year: 1976, spotify: "4poc2NX2Ap8MnZjOtoiGir", kind: "played", sources: ["A"] },
    { title: "Bourgie' Bourgie'", artist: "Ashford & Simpson", year: 1977, spotify: "0dKAgkeaMcmLGzgjlASphY", kind: "played", why: "In Levan's 1979 Garage set", sources: ["B"] },
    { title: "I Feel Love", artist: "Donna Summer", year: 1977, spotify: "1vCBk33l9HaWp5FOnhSGxk", kind: "played", sources: ["A"] },
    { title: "Over and Over", artist: "Sylvester", year: 1977, spotify: "23PqxkDoz1hHEKg0PHRZGv", kind: "played", sources: ["A"] },
    { title: "My First Mistake", artist: "The Chi-Lites", year: 1977, spotify: "37bc9uAsVQ2OLZbmxyyrih", kind: "played", sources: ["A", "B"] },
    { title: "Weekend", artist: "Phreek", year: 1978, spotify: "37XLql4sOhKLcw7Id872uj", kind: "played", why: "Joey Llanos calls it the Garage's number one", sources: ["A", "D"] },
    { title: "I Got My Mind Made Up (Larry Levan mix)", artist: "Instant Funk", year: 1978, spotify: "49V6jTgI4I4XLA8Yl78sm5", kind: "played", sources: ["A", "D", "E"] },
    { title: "Lost in Music", artist: "Sister Sledge", year: 1979, spotify: "2Qd3DygsQQYCCTy2KBkct3", kind: "played", sources: ["A"] },
    { title: "Put Your Body in It", artist: "Stephanie Mills", year: 1979, spotify: "4pJRDwBEBBnDGYwwm8JkBw", kind: "played", why: "In Levan's 1979 Garage set", sources: ["B"] },
    { title: "Street Player", artist: "Chicago", year: 1979, spotify: "1HiaZTm2nGQL4wtnJLPNV0", kind: "played", sources: ["A"] },
    { title: "I Zimbra", artist: "Talking Heads", year: 1979, spotify: "6WXWvuIVR2g3MklmHXXZp8", kind: "played", sources: ["A"] },
    { title: "Love Sensation", artist: "Loleatta Holloway", year: 1980, spotify: "3su8VunluUL4Oj7UTTEREt", kind: "played", sources: ["A"] },
    { title: "Is It All Over My Face (Larry Levan female vocal)", artist: "Loose Joints", year: 1980, spotify: "1WtsuRKEu7GVJrxkOJXPO7", kind: "played", sources: ["A", "C", "E"] },
    { title: "Heartbeat (club version)", artist: "Taana Gardner", year: 1981, spotify: "4RB9jISwfLLloQ0tTyZFPa", kind: "played", why: "A Larry Levan remix", sources: ["A", "C", "D"] },
    { title: "Ain't No Mountain High Enough", artist: "Inner Life", year: 1981, spotify: "0ufXsZGpeGNOq6hI6hbWAF", kind: "played", why: "Mixed by Larry Levan", sources: ["A", "E"] },
    { title: "Pull Up to the Bumper", artist: "Grace Jones", year: 1981, spotify: "653Fi3bqMxQQQmjw72ur6G", kind: "played", sources: ["A"] },
    { title: "Moody", artist: "ESG", year: 1981, spotify: "6jjxVP7mXgDboCpkICaTvi", kind: "played", sources: ["A"] },
    { title: "You're the One for Me", artist: "D-Train", year: 1981, spotify: "66i1lieIMso7ef4P7KdWcE", kind: "played", sources: ["A"] },
    { title: "Walking on Thin Ice", artist: "Yoko Ono", year: 1981, spotify: "3dSmcooRQGXXQ3wi0ZxGde", kind: "played", sources: ["A"] },
    { title: "Go Bang! #5", artist: "Dinosaur L", year: 1982, spotify: "6GFpzRarqu9n7L2JT5O7k8", kind: "played", why: "Llanos says Levan tuned the sound system to it", sources: ["A", "D"] },
    { title: "Don't Make Me Wait", artist: "Peech Boys", year: 1982, spotify: "4cqzudRpeLx9kBocTzTHlV", kind: "played", why: "Produced by Larry Levan", sources: ["A", "C", "D"] },
    { title: "Dirty Talk", artist: "Klein & M.B.O.", year: 1982, spotify: "4CMKgb0qrIsVu202dmop15", kind: "played", sources: ["A"] },
    { title: "Situation", artist: "Yazoo", year: 1982, spotify: "6b9dCj2PyHsVs2CDl1RsiK", kind: "played", sources: ["A"] },
    { title: "Just an Illusion", artist: "Imagination", year: 1982, spotify: "4QT3YKobBj4BI7xCYRLr9u", kind: "played", sources: ["A"] },
    { title: "Let No Man Put Asunder", artist: "First Choice", year: 1983, spotify: "5p3PdTiNcAz68eBNkDHgGn", kind: "played", sources: ["A"] },
    { title: "Padlock (Larry Levan mix)", artist: "Gwen Guthrie", year: 1985, spotify: "6vVwnG6libRP0JUYDZbfyk", kind: "played", sources: ["A", "E"] },
    { title: "Slave to the Rhythm", artist: "Grace Jones", year: 1985, spotify: "3Hv9i1KAOXF2Wn42tj5s0h", kind: "played", sources: ["A"] },
    { title: "Move Your Body", artist: "Marshall Jefferson", year: 1986, spotify: "4dKi8v4oeEpGDz18UXF2E5", kind: "played", sources: ["A"] },
  ],
};

const s54: ClubNight = {
  slug: "studio-54",
  club: "Studio 54",
  playlistId: "1wxk4SWOmqT2ILYOn9CJc8",
  note:
    "Most of these are on A Night at Studio 54 (Casablanca, 1979), the double album made with the club's owners and mixed by its DJs Roy Thode and Marc Paul Simon from records played at the club. The rest come from Brooklyn Museum curator Matthew Yakobosky's list of songs heard in Studio 54 DJ sets between 1977 and 1980, and Devil's Gun, reported as the first record played on opening night. Not one exact night.",
  sources: [
    { key: "A", label: "A Night at Studio 54 (Casablanca, 1979 - Wikipedia)", href: "https://en.wikipedia.org/wiki/A_Night_at_Studio_54" },
    { key: "B", label: "Studio 54 DJ-set playlist by Brooklyn Museum curator Matthew Yakobosky (Slowdown)", href: "https://www.slowdown.media/article/a-studio-playlist-by-brooklyn-museum-curator-matthew-yakobosky" },
    { key: "C", label: "Devil's Gun (Wikipedia)", href: "https://en.wikipedia.org/wiki/Devil%27s_Gun" },
    { key: "D", label: "Richie Kaczor (Wikipedia)", href: "https://en.wikipedia.org/wiki/Richie_Kaczor" },
  ],
  songs: [
    { title: "Devil's Gun", artist: "C.J. & Co.", year: 1977, spotify: "2Dhvk1foUg665791VnnQmK", kind: "played", why: "Reported as the first record played on opening night, 26 April 1977", sources: ["C"] },
    { title: "Le Freak", artist: "Chic", year: 1978, spotify: "7Kszjzps0xbQXyo1pO4KfE", kind: "played", sources: ["A", "B"] },
    { title: "Let's All Chant", artist: "Michael Zager Band", year: 1977, spotify: "2xGMzDlPnmPHD8HUYOy4Lw", kind: "played", sources: ["A", "B"] },
    { title: "Y.M.C.A.", artist: "Village People", year: 1978, spotify: "3UAdO916wku6gCnTL8ObL8", kind: "played", sources: ["A"] },
    { title: "Disco Nights (Rock-Freak)", artist: "G.Q.", year: 1979, spotify: "4aVowfVhlyNUgHYqXbK8Ev", kind: "played", sources: ["A", "B"] },
    { title: "Take Me Home", artist: "Cher", year: 1979, spotify: "3YWTp4Ap4sZNIyFkP0a0rx", kind: "played", sources: ["A"] },
    { title: "I Love the Nightlife", artist: "Alicia Bridges", year: 1978, spotify: "0GyBa8w1j7G8IiZeTwCGjn", kind: "played", sources: ["A"] },
    { title: "Last Dance", artist: "Donna Summer", year: 1978, spotify: "4nWrCsWZzxiXX8FYHbydzl", kind: "played", sources: ["A"] },
    { title: "Got to Be Real", artist: "Cheryl Lynn", year: 1978, spotify: "58r4JuwHhXLAkttkaUZfLw", kind: "played", sources: ["A"] },
    { title: "I Got My Mind Made Up", artist: "Instant Funk", year: 1979, spotify: "7abgit8a70zjN2q5Q3wvyh", kind: "played", sources: ["A"] },
    { title: "Hot Shot", artist: "Karen Young", year: 1978, spotify: "4AQi2sQAg9E0ysJtID9hdN", kind: "played", sources: ["A"] },
    { title: "I Love America", artist: "Patrick Juvet", year: 1978, spotify: "4IjldRgoXtkgo7g6Z7nA6N", kind: "played", sources: ["A"] },
    { title: "Souvenirs", artist: "Voyage", year: 1978, spotify: "0YUwSy9SLto4mnpOtOIDIr", kind: "played", sources: ["A"] },
    { title: "In the Bush", artist: "Musique", year: 1978, spotify: "5d91gYhpa5j11JKx2fgWHx", kind: "played", sources: ["A"] },
    { title: "Instant Replay", artist: "Dan Hartman", year: 1978, spotify: "0E1PR66A94yVPiYJxGHimf", kind: "played", sources: ["A"] },
    { title: "Shake Your Groove Thing", artist: "Peaches & Herb", year: 1978, spotify: "5o89Bf80t8ko3uNXJkYoVs", kind: "played", sources: ["A"] },
    { title: "Love Vibration", artist: "Joe Simon", year: 1977, spotify: "0JNbE9l3ikNGZEiF0lMqqi", kind: "played", sources: ["B"] },
    { title: "I Will Survive", artist: "Gloria Gaynor", year: 1978, spotify: "7rIovIsXE6kMn629b7kDig", kind: "played", why: "The club's first DJ, Richie Kaczor, is credited with popularising it", sources: ["B", "D"] },
    { title: "Hit and Run", artist: "Loleatta Holloway", year: 1977, spotify: "1Xsp6qu4qeu0OCkfaU8Eg8", kind: "played", sources: ["B"] },
    { title: "Rio de Janeiro", artist: "Gary Criss", year: 1978, spotify: "3UaHpcXpYtKZlFToxX0CvM", kind: "played", sources: ["B"] },
    { title: "Moon Boots", artist: "Orlando Riva Sound", year: 1977, spotify: "4PYJXVHOazUQhwDMwwKdRR", kind: "played", sources: ["B"] },
    { title: "Don't Stop", artist: "Ish", year: 1978, spotify: "5CBmSuEdqXKEYPWCZkJUnj", kind: "played", sources: ["B"] },
    { title: "Boogie Oogie Oogie", artist: "A Taste of Honey", year: 1978, spotify: "07NrCEN3egNvw8td2LxqJO", kind: "played", sources: ["B"] },
  ],
};

const dt: ClubNight = {
  slug: "danceteria",
  club: "Danceteria",
  note:
    "From documented accounts of Danceteria (1980–1986): interviews with resident DJs Mark Kamins and Johnny Dynell, Tim Lawrence's history Life and Death on the New York Dance Floor, 1980–1983, and the bands who played its stages. Some songs were named as played or born there, some are by acts who performed there live, and some stand in for artists the DJs are known to have mixed. Not one exact night.",
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
  ],
  songs: [
    { title: "Everybody", artist: "Madonna", year: 1982, spotify: "4sFGkok98Cu0gu52fD48Xr", kind: "played", why: "Mark Kamins played her demo at the club; she first performed it there on 18 Dec 1982", sources: ["W", "K"] },
    { title: "Planet Rock", artist: "Afrika Bambaataa & the Soulsonic Force", year: 1982, spotify: "5aD3fAa1fy8XUesj3lgr19", kind: "played", why: "Kamins names it among his Danceteria records; Bambaataa DJed there in March 1982", sources: ["K", "F"] },
    { title: "Taj Mahal", artist: "Jorge Ben", year: 1972, spotify: "0H2G2c1u3XnzOlGFNJ6Er0", kind: "played", why: "Kamins: \"I'm famous for playing 'Taj Mahal'\"", sources: ["K"] },
    { title: "Ashes to Ashes", artist: "David Bowie", year: 1980, spotify: "37CRPk0L5ZpfPeePEPwE0t", kind: "played", why: "Its video premiered at the club in summer 1980", sources: ["L"] },
    { title: "Jam Hot", artist: "Johnny Dynell", year: 1983, spotify: "46qCv6ODMDCcadIjntyqrQ", kind: "played", why: "Dynell DJed there and says it was born at Danceteria", sources: ["J"], guest: { slug: "chi-chi-valenti-johnny-dynell", label: "Johnny Dynell" } },
    { title: "Smooth Operator", artist: "Sade", year: 1984, spotify: "7pLuEMFougkSHXrPBtNxTR", kind: "live", why: "Sade played their first US show there in 1983", sources: ["S"] },
    { title: "This Charming Man", artist: "The Smiths", year: 1983, spotify: "1FvDJ9KGxcqwv1utyPL3JZ", kind: "live", why: "Their US debut, New Year's Eve 1983", sources: ["T"] },
    { title: "Cavern", artist: "Liquid Liquid", year: 1983, spotify: "6j370rNNGiu8zOnoSTioPk", kind: "live", sources: ["K"] },
    { title: "Konk Party", artist: "Konk", year: 1981, spotify: "16W8U6KlqGsStHnusAlfFZ", kind: "live", sources: ["K"] },
    { title: "Cool as Ice", artist: "52nd Street", year: 1982, spotify: "2aDfGTjZxw0Qo3AYYfrWkn", kind: "live", why: "The band played two nights there to launch it", sources: ["N"] },
    { title: "Annie, I'm Not Your Daddy", artist: "Kid Creole and the Coconuts", year: 1981, spotify: "3NV3YfKFceFlZsRgpGVzLj", kind: "live", sources: ["M"] },
    { title: "It's Like That", artist: "Run-DMC", year: 1983, spotify: "2J6QnTjHIWwXErNWyF0RUC", kind: "live", sources: ["M"] },
    { title: "I Can't Live Without My Radio", artist: "LL Cool J", year: 1985, spotify: "2qfTGzETefwtBWKDThZjnU", kind: "live", sources: ["M"] },
    { title: "Girls Just Want to Have Fun", artist: "Cyndi Lauper", year: 1983, spotify: "4y1LsJpmMti1PfRQV9AWWe", kind: "live", sources: ["M"] },
    { title: "Whip It", artist: "Devo", year: 1980, spotify: "6QG0wcgoCsa9pqFyTg0rRO", kind: "live", sources: ["L"] },
    { title: "We Got the Beat", artist: "The Go-Go's", year: 1981, spotify: "5kz9GDBTX846OXwqWoyKzF", kind: "live", sources: ["L"] },
    { title: "To Hell with Poverty", artist: "Gang of Four", year: 1981, spotify: "19vvQlbD05Kgg1fYVwnjjy", kind: "live", sources: ["L"] },
    { title: "Cool", artist: "Pylon", year: 1979, spotify: "0tQdpfaW5XlupjNklNec33", kind: "live", sources: ["L", "K"] },
    { title: "Fa Cé-La", artist: "The Feelies", year: 1980, spotify: "1tA4vXKgYffzQ9PnUMzKax", kind: "live", sources: ["L"] },
    { title: "Jukebox Babe", artist: "Alan Vega", year: 1980, spotify: "2OypHuz6IWCnwmvfoIXoBv", kind: "live", sources: ["L"] },
    { title: "Cold Life", artist: "Ministry", year: 1981, spotify: "76RvIZ3acrj7dixkMED0ay", kind: "live", sources: ["L"] },
    { title: "Oye Como Va", artist: "Tito Puente", year: 1962, spotify: "73uEbChpBB29ttwVnwuNVE", kind: "live", sources: ["L"] },
    { title: "Death Disco", artist: "Public Image Ltd", year: 1979, spotify: "7bBr5DdLIOICNKX9IbaHfh", kind: "dj-artist", sources: ["L", "K"] },
    { title: "Let's Start the Dance", artist: "Bohannon", year: 1978, spotify: "5kzro4mOcjwXuugRc6nzm7", kind: "dj-artist", sources: ["L", "K"] },
    { title: "Wardance", artist: "Killing Joke", year: 1980, spotify: "38Pqjy8ptttAXIBxNUk2Iu", kind: "dj-artist", sources: ["L"] },
    { title: "I Feel Love (12\")", artist: "Donna Summer", year: 1977, spotify: "7B7lf3sIze5VR2WuYttn18", kind: "dj-artist", sources: ["L"] },
    { title: "Rock Lobster", artist: "The B-52's", year: 1979, spotify: "0rme3FLbw5o1KLXpJzivjS", kind: "dj-artist", why: "Kamins: \"I would play B-52's\"", sources: ["K"] },
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
