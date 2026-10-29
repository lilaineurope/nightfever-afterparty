// One description line per guest, shown under the name on the polaroid episode boxes (Home and the Afterparty page)
// and on the framed polaroid prints. Taken from the subtitle under the guest's name on the episode page.
// Kept in sync with scripts/episode-guests.json ("line"), which the polaroid scripts read.
export const GUEST_LINES: Record<string, string> = {
  s01e01: "The Queen of the Night · downtown club icon, crowned by Andy Warhol",
  s01e02: "Village Voice nightlife columnist · La Dolce Musto",
  s01e03: "\"Lisa E.\", 80s it girl · actor, playwright and James's partner-in-crime",
  s01e07: "Club owner and promoter · Danceteria, the Tunnel, Mars",
  s02e03: "Empress of the Night · Love Ball founder, boutique owner and party host",
  s02e08: "Journalist and co-founder of OutWeek magazine · ACT UP · Queer in America",
  s03e01: "Store owner, stylist and costume designer · Sex and the City",
  s03e06: "Area co-founder · club, restaurant and hotel owner · tortoise conservationist",
  s04e08: "Club kid, figure skater, singer and designer · Heatherette",
  s04e10: "Actress, performance artist and singer · Club 57 · Bongwater, Pulsallama",
  s05e03: "Trans icon, model and singer · Club Kid · David LaChapelle's muse",
  s06e08: "Society columnist · Vogue editor · novelist",
  s02e06: "Designer · the chain-mail man · Squeezebox host",
  s01e04: "Club King · the Limelight, the Tunnel, Club USA & the Palladium",
  s02e04: "Studio 54 regular · stockbroker · host of The Nikki Haskell Show",
  s06e07: "Palladium door legend · artist · 80s It girl",
  s01e10: "Drag goddess · Klaus Nomi's partner · Fiorucci stylist",
  s03e08: "DJ · 'Supermodel' songwriter · Electroclash founder",
  s04e04: "Club Kid · model · RuPaul's Emmy-winning designer",
  s02e01: "Voguer · Seduction singer · Drag Race judge",
  s01e06: "Club kid · Artist · Author of New York Club Kids",
  s02e07: "Club kid icon · Model and muse · Lower East Side Girls Club",
  s02e05: "Boy Bar beauty · Mugler supermodel · Door legend",
  s05e04: "Graphic designer and music-video director · Bow Wow Wow, Duran Duran, INXS",
  s05e06: "Photographer and artist · Andy Warhol's best friend and travelling companion",
  s06e01: "Club Kid legend, author and host of Night Fever",
  s06e03: "Poet, journalist and door legend · DJ, producer and promoter · Jackie 60, Mother",
};

export const guestLine = (id: string): string | undefined => GUEST_LINES[id];
