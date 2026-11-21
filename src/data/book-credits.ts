// "Who made me" on Library book pages (Lisa, 21 Nov 2026: "add a box on publishing team: publisher, editor, photographer,
// illustrator, distributor, what else?"). The people and companies behind each book, beyond the author and publisher
// (those come from the stocktake, src/data/library-facts.ts). Only roles confirmed from the book itself, its library
// records (Libris, WorldCat) or the guest saying it on the show - no guesses, so a role we can't confirm is simply left out.
// Keyed by A–Z card slug. A name that has an A–Z card links to it (src/lib/library-item.server.ts).

export type CreditRole =
  | "Imprint"
  | "Co-written with"
  | "Edited by"
  | "Foreword by"
  | "Introduction by"
  | "Photographs by"
  | "Cover photo by"
  | "Illustrated by"
  | "Designed by"
  | "Translated by"
  | "Printed by"
  | "Distributed by";

export type Credit = { role: CreditRole; name: string; source: string };

export const BOOK_CREDITS: Record<string, Credit[]> = {
  nightbirds: [{ role: "Foreword by", name: "Ernie Glam", source: "Ernie Glam on the show, S01E05 00:01:45" }],
};

/** The order the roles are shown in. */
export const CREDIT_ORDER: CreditRole[] = [
  "Imprint", "Co-written with", "Edited by", "Foreword by", "Introduction by", "Photographs by", "Cover photo by",
  "Illustrated by", "Designed by", "Translated by", "Printed by", "Distributed by",
];
