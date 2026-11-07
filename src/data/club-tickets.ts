import danceteria from "@/assets/club-tickets/danceteria.webp";
import area from "@/assets/club-tickets/area.webp";
import areaJukebox from "@/assets/club-tickets/area-jukebox.webp";
import muddClub from "@/assets/club-tickets/mudd-club.webp";
import muddClubJukebox from "@/assets/club-tickets/mudd-club-jukebox.webp";
import limelight from "@/assets/club-tickets/limelight.webp";
import palladium from "@/assets/club-tickets/palladium.webp";
import palladiumJukebox from "@/assets/club-tickets/palladium-jukebox.webp";
import tunnel from "@/assets/club-tickets/tunnel.webp";
import club57 from "@/assets/club-tickets/club-57.webp";
import club57Jukebox from "@/assets/club-tickets/club-57-jukebox.webp";
import pyramidClub from "@/assets/club-tickets/pyramid-club.webp";
import boyBar from "@/assets/club-tickets/boy-bar.webp";
import boyBarJukebox from "@/assets/club-tickets/boy-bar-jukebox.webp";
import nells from "@/assets/club-tickets/nell-s.webp";
import paradiseGarage from "@/assets/club-tickets/paradise-garage.webp";
import studio54 from "@/assets/club-tickets/studio-54.webp";

/** Real period club tickets (Lisa, 30 Oct 2026 - like the Library covers): a photo of an original drink ticket, admission ticket or
 *  membership card, captured once at card size and hosted here (never hotlinked), with the source named on the page.
 *  Used as the background of the club's ticket on Inside the Clubs and as the admit-one picture on its Jukebox club night.
 *  Terms section 5 covers them (shown for identification, removed on request). Show Lisa new finds on a contact sheet first. */
export type ClubTicket = {
  src: string;
  alt: string;
  credit: string;
  href: string;
  /** Pixel size of the hosted file, so the Jukebox picture keeps its shape while it loads. */
  w?: number;
  h?: number;
  /** CSS background-position for the Clubs ticket, when the middle of a tall poster isn't the best part. */
  pos?: string;
};

export const CLUB_TICKETS: Record<string, ClubTicket> = {
  danceteria: {
    src: danceteria,
    alt: "An original Danceteria drink ticket, early 1980s",
    credit: "Danceteria drink ticket, early 1980s - Gallery 98",
    href: "https://gallery98.org/2019/danceteria-drink-ticket-card-early-1980s/",
  },
  // Lisa's picks, 1 Nov 2026 (contact sheet on the Club Playlists Review page). Where she picked two, the first is the Clubs ticket, the second the Jukebox picture (JUKEBOX_PICTURES).
  area: {
    src: area,
    w: 800,
    h: 1258,
    pos: "center 30%",
    alt: "Invitation from Johnny Dynell and Nick Egan to the release party of Malcolm McLaren's Swamp Thing at Area, 31 October 1985",
    credit: "Swamp Thing invitation, Area, 31 Oct 1985 - Gallery 98",
    href: "https://gallery98.org/2023/area-nightclub-malcolm-mclarens-swamp-thing-double-sided-card-with-condom-and-envelope-october-31-1985/",
  },
  "mudd-club": {
    src: muddClub,
    w: 800,
    h: 1045,
    pos: "center 20%",
    alt: "Fernando Natalici's 1979 Mudd Club street poster: \"Did you say the Mudd Club is free!! 227-7777\"",
    credit: "Fernando Natalici street poster, 1979 - 1stDibs",
    href: "https://www.1stdibs.com/art/prints-works-on-paper/fernando-natalici-mudd-club-new-york-1979-street-poster-framed/id-a_14499732",
  },
  limelight: {
    src: limelight,
    w: 611,
    h: 900,
    alt: "Limelight poster with a David LaChapelle photo, Wednesday 2 October 1985",
    credit: "LaChapelle poster, Limelight, 2 Oct 1985 - Gallery 98",
    href: "https://gallery98.org/2018/limelight-david-la-chappelle-poster-1985/",
  },
  palladium: {
    src: palladium,
    w: 682,
    h: 1050,
    pos: "center 25%",
    alt: "\"Pinup Girl!\" poster for Dianne Brill's birthday party at the Palladium, produced by Rudolf",
    credit: "Dianne Brill \"Pinup Girl\" poster, Palladium - Gallery 98",
    href: "https://gallery98.org/2019/palladium-pinup-girl-diane-brills-birthday-party-poster/",
  },
  tunnel: {
    src: tunnel,
    w: 800,
    h: 1130,
    pos: "center 35%",
    alt: "Card for Ultra Violet's \"The Last Supper\" in the Tunnel's Chandelier Room, 22 September 1988",
    credit: "Ultra Violet \"The Last Supper\" card, Tunnel, 1988 - Gallery 98",
    href: "https://gallery98.org/2021/tunnel-ultra-violet-baird-jones-the-last-supper-card-1988/",
  },
  "club-57": {
    src: club57,
    w: 800,
    h: 479,
    alt: "Original Club 57 flyer: a smiling woman holding a Heinz-style \"Club 57\" label",
    credit: "Original Club 57 flyer, early 1980s - 1stDibs",
    href: "https://www.1stdibs.com/art/prints-works-on-paper/unknown-original-club-57-flyer-ny-keith-haring-kenny-scharf-related/id-a_3573341",
  },
  // Lisa's picks, 2 Nov 2026 ("yes to your picks").
  "pyramid-club": {
    src: pyramidClub,
    w: 600,
    h: 800,
    pos: "center 20%",
    alt: "\"Born to Be a Wild Night\" card for Wendy Wild's benefit at the Pyramid, with a list of performers including Brian Butterick, John Sex, Lady Bunny, Deee-Lite and Joey Arias",
    credit: "\"Born to Be a Wild Night\" card, Pyramid, 1995 - Gallery 98",
    href: "https://gallery98.org/2025/pyramid-cancer-benefit-invitation-wendy-wild-born-wild-night/",
  },
  // Jillian Jonas photo, 7 Nov 2026: Village Preservation and Jillian Jonas approved ONE Boy Bar photo on the Clubs page (6 Nov),
  // credited to her and Village Preservation with a link to their post. Not for the Jukebox or anywhere else on the site.
  "boy-bar": {
    src: boyBar,
    w: 800,
    h: 518,
    pos: "center 45%",
    alt: "The Harlem Women's Contingent on stage at Boy Bar, 15 St. Marks Place, 26 May 1994: Flotilla DeBarge, Aphro-dite, Raven O and a fellow performer in flowered dresses in front of a leopard-print wall",
    credit: "Photo: Jillian Jonas / Village Preservation, Boy Bar, 1994",
    href: "https://urbanarchive.org/o/villagepreservation/post/d2def65d-c4c9-4a6f-9250-0346c7ee984d",
  },
  "nell-s": {
    src: nells,
    w: 800,
    h: 310,
    alt: "A black key with a pink Nell's tag, drawn for the AFTERPARTY - Nell's mailed its regulars a key before it opened",
    credit: "Nell's key, drawn for the AFTERPARTY",
    href: "https://daily.redbullmusicacademy.com/2019/04/nightclubbing-nells-nyc",
  },
  // Picked 4 Nov 2026 (thread "Find Paradise Garage and Studio 54 backgrounds"): the last two clubs without a ticket picture.
  "paradise-garage": {
    src: paradiseGarage,
    w: 560,
    h: 1418,
    pos: "center 88%",
    alt: "Paradise Garage car stub and claim check, 84 King Street: Vito and Roman present the Charivari Christmas Party, Wednesday 12 December 1984",
    credit: "Car stub invite, Paradise Garage, 12 Dec 1984 - Gallery 98",
    href: "https://gallery98.org/2019/paradise-garage-car-stub-invite-card-1984/",
  },
  "studio-54": {
    src: studio54,
    w: 800,
    h: 514,
    pos: "left center",
    alt: "Studio 54 admission pass: the silver and gold Studio 54 logo on a black card",
    credit: "Studio 54 admission pass - Gallery 98",
    href: "https://gallery98.org/2023/studio-54-admission-pass-double-sided-card-grants-the-holder-complimentary-entrance-to-studio-54/",
  },
};

/** A second picture for a club's Jukebox night, when Lisa picked two (1 Nov 2026). Without one the Jukebox shows the Clubs ticket picture. */
export const JUKEBOX_PICTURES: Record<string, ClubTicket> = {
  area: {
    src: areaJukebox,
    w: 800,
    h: 310,
    alt: "Three Area drink tickets - silver, blue and purple - redrawn for the AFTERPARTY",
    credit: "Area drink tickets, c. 1984, redrawn for the AFTERPARTY",
    href: "https://www.1stdibs.com/furniture/wall-decorations/decorative-art/area-nightclub-new-york-set-of-6-original-drink-tickets-circa-1984/id-f_40562762",
  },
  "mudd-club": {
    src: muddClubJukebox,
    w: 800,
    h: 1046,
    alt: "\"Here's Mudd in Your Ears\" flyer: readings and music with Nancy Reilly, Cookie Mueller, Chris Kraus and Avant Squares at the Mudd Club",
    credit: "\"Here's Mudd in Your Ears\" flyer, 1981 - Gallery 98",
    href: "https://gallery98.org/2018/mudd-club-cookie-muller-cris-kraus-heres-mudd-in-your-ears-flyer-1981/",
  },
  palladium: {
    src: palladiumJukebox,
    w: 800,
    h: 1251,
    alt: "Roy Lichtenstein's brushstroke poster for the Palladium, 23 November 1985",
    credit: "Roy Lichtenstein poster, Palladium, 1985 - Gallery 98",
    href: "https://gallery98.org/2023/roy-lichtenstein-poster-palladium-1985/",
  },
  "boy-bar": {
    src: boyBarJukebox,
    w: 800,
    h: 224,
    alt: "Back of the Georges Piette opening card: his 1984 photograph of the bar at Boybar",
    credit: "Georges Piette, boybar (detail), 1984 - Gallery 98",
    href: "https://gallery98.org/2021/15-st-marks-georges-piette-boybar-opening-party-card-1984/",
  },
  "club-57": {
    src: club57Jukebox,
    w: 800,
    h: 1050,
    alt: "\"Got to Be Hip\" flyer for John Savas (later Johnny Dynell), disco performance and dance party at Club 57, 57 St. Mark's Place",
    credit: "John Savas \"Got to Be Hip\" flyer, Club 57, 1979 - Gallery 98",
    href: "https://gallery98.org/2024/john-savas-got-to-be-hip-flyer-club-57-1979/",
  },
};
