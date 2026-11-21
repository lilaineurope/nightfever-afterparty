// Which Library item pages get their own share picture (public/og/explore/<slug>.jpg, scripts/og-cards.py): every book,
// magazine, newspaper and column with a real photo cover - not diaries (their cover is the keeper's polaroid) and not
// masthead logos. Shared by explore.$slug.tsx and scripts/og-cards-data.ts so the page never points at a missing picture.
export const libraryShareCover = (shelf: string, coverKind: string | undefined): boolean => coverKind === "book" && shelf !== "diaries";
