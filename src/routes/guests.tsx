import { createFileRoute } from "@tanstack/react-router";
import { GuestsSection } from "@/components/guests-section";
import { SiteFooter } from "@/components/site-footer";
import guestsHeader from "@/assets/guests-header.jpg";

export const Route = createFileRoute("/guests")({
  component: GuestsPage,
  head: () => ({
    meta: [
      { title: "Guests | Night Fever fan page" },
      {
        name: "description",
        content:
          "Every Night Fever guest, one by one! The Timestamp and the Afterparty show how they are all connected, step by step.",
      },
      { property: "og:title", content: "Guests | Night Fever fan page" },
      {
        property: "og:description",
        content:
          "Meet the gang interviewed by the three World of Wonder founders - with their connections revealed step by step.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/guests" }],
  }),
});

function GuestsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative flex min-h-[420px] items-center overflow-hidden px-6 pb-12 pt-24 sm:min-h-[480px]">
        <img
          src={guestsHeader}
          alt=""
          width={1920}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_50%_46%,color-mix(in_oklab,var(--background)_88%,transparent),transparent_72%)]" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1 className="mt-6 text-balance text-5xl font-bold leading-[1] tracking-tight text-cream text-glow sm:text-6xl">
            The <span className="text-pink text-glow-pink">guests</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Meet the gang interviewed by the three World of Wonder founders!
            Step by step, the Timestamp and the Afterparty show how they're all
            connected. Pick a guest and dive in!
          </p>
        </div>
      </section>
      <GuestsSection />
      <SiteFooter />
    </main>
  );
}
