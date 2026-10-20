import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/collection-page";
import { BOOK_SHELVES, bookClub, findBookLink } from "@/data/collections";
import { abs, jsonLd, pageHead } from "@/lib/seo";

const books = bookClub.filter((b) => b.shelf === "books").length;
const press = bookClub.length - books;
const description = `Every book, magazine, newspaper and column the Night Fever guests mention - ${books} books and ${press} papers and magazines, each with the moment it comes up. Pull up a chair!`;

export const Route = createFileRoute("/book-club")({
  staticData: { sitemap: true },
  head: () => ({
    ...pageHead({ path: "/book-club", title: "Night Fever Book Club – every book & magazine the guests mention", description, image: "/og/book-club.jpg" }),
    scripts: [
      jsonLd({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Night Fever Book Club",
        url: abs("/book-club"),
        numberOfItems: bookClub.length,
        itemListElement: bookClub.slice(0, 50).map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: { "@type": b.shelf === "books" ? "Book" : "Periodical", name: b.name, url: abs(`/explore/${b.slug}`) },
        })),
      }),
    ],
  }),
  component: BookClubPage,
});

function BookClubPage() {
  return (
    <CollectionPage
      kicker="The Night Fever"
      title={<>Book <span className="text-pink text-glow-pink">Club</span></>}
      intro={<>Every book, magazine, gossip column and newspaper the guests drop - from diaries read aloud to the columns that made the Club Kids famous. Tap a timestamp to hear the moment it comes up.</>}
      items={bookClub}
      shelves={[...BOOK_SHELVES]}
      extras={(b) => (b.shelf === "books" ? [{ label: "Find a copy on Open Library", href: findBookLink(b.name) }] : [])}
      note={<>The list fills itself from my episode indexes, so every new Afterparty adds its reading. Titles link to their card in Everything A–Z; "Find a copy" searches the free Open Library catalogue.</>}
    />
  );
}
