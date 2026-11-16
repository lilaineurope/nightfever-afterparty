import { createContext, useContext, type ReactNode } from "react";
import type { episodePath } from "@/data/episodes";

// How a name becomes a link to its card, without every page loading the whole A–Z (page weight, 16 Nov 2026).
// Most pages load the A–Z data anyway: src/data/entities.ts and src/lib/name-links.ts register the full lookups here when
// they load (import "@/lib/full-links" makes sure of it). An A–Z card page doesn't: the server works out every name the
// card shows (src/lib/card-view.server.ts) and the page passes those answers down with <LinkDataProvider>, so EntityLink,
// EntityText and the card sections give exactly the same links from a few kilobytes instead of the whole A–Z.

export type Segment = { text: string; slug?: string };
/** A card a name can link to: its slug, its display name and where it lives (/explore/<slug> or a guest's AFTERPARTY). */
export type LinkCard = { slug: string; name: string; to: string };
export type LinkData = {
  /** name (as written) -> slug, or null when the name has no card */
  names: Record<string, string | null>;
  cards: Record<string, LinkCard>;
  /** `${selfSlug}|${text}` -> the text split into plain parts and linked names */
  texts: Record<string, Segment[]>;
};
type Full = {
  cardForName: (name: string) => LinkCard | undefined;
  cardForSlug: (slug: string) => LinkCard | undefined;
  linkNames?: (text: string, selfSlug?: string) => Segment[];
};

const full: Full = { cardForName: () => undefined, cardForSlug: () => undefined };
export function registerFullLinks(f: Partial<Full>) {
  Object.assign(full, f);
}

export const textKey = (text: string, selfSlug?: string) => `${selfSlug ?? ""}|${text}`;

const LinkDataContext = createContext<LinkData | null>(null);
export function LinkDataProvider({ value, children }: { value: LinkData; children: ReactNode }) {
  return <LinkDataContext.Provider value={value}>{children}</LinkDataContext.Provider>;
}

export type Links = {
  cardForName: (name: string) => LinkCard | undefined;
  cardForSlug: (slug: string) => LinkCard | undefined;
  linkNames: (text: string, selfSlug?: string) => Segment[];
};

/** The lookups for this page: the card's own answers inside <LinkDataProvider>, the full A–Z everywhere else. */
export function useLinks(): Links {
  const d = useContext(LinkDataContext);
  if (!d) {
    return {
      cardForName: full.cardForName,
      cardForSlug: full.cardForSlug,
      linkNames: (text, selfSlug) => full.linkNames?.(text, selfSlug) ?? [{ text }],
    };
  }
  return {
    cardForName: (name) => {
      const slug = d.names[name];
      return slug ? d.cards[slug] : undefined;
    },
    cardForSlug: (slug) => d.cards[slug],
    linkNames: (text, selfSlug) => d.texts[textKey(text, selfSlug)] ?? [{ text }],
  };
}

/** Link props for a card: <Link {...linkTo(card)}> - the same as cardTo() in src/lib/card-link.ts. */
export function linkTo(card: LinkCard) {
  if (card.to === `/explore/${card.slug}`) return { to: "/explore/$slug", params: { slug: card.slug } } as const;
  return { to: card.to as ReturnType<typeof episodePath> } as const;
}

/** Link props for a slug (a card that isn't known still links to /explore/<slug>, like cardTo). */
export const linkToSlug = (links: Links, slug: string) => linkTo(links.cardForSlug(slug) ?? { slug, name: slug, to: `/explore/${slug}` });
