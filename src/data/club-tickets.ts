import danceteria from "@/assets/club-tickets/danceteria.webp";

/** Real period club tickets (Lisa, 30 Oct 2026 - like the Library covers): a photo of an original drink ticket, admission ticket or
 *  membership card, captured once at card size and hosted here (never hotlinked), with the source named on the page.
 *  Used as the background of the club's ticket on Inside the Clubs and as the admit-one picture on its Jukebox club night.
 *  Terms section 5 covers them (shown for identification, removed on request). Show Lisa new finds on a contact sheet first. */
export type ClubTicket = { src: string; alt: string; credit: string; href: string };

export const CLUB_TICKETS: Record<string, ClubTicket> = {
  danceteria: {
    src: danceteria,
    alt: "An original Danceteria drink ticket, early 1980s",
    credit: "Danceteria drink ticket, early 1980s - Gallery 98",
    href: "https://gallery98.org/2019/danceteria-drink-ticket-card-early-1980s/",
  },
};
