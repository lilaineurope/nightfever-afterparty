/** The show's own homes - every Listen button in the footer box points here (Lisa, 23 Oct 2026). */
const PLATFORMS = [
  { name: "Spotify", href: "https://creators.spotify.com/pod/profile/night-fever/", icon: SpotifyIcon },
  { name: "Apple Podcasts", href: "https://podcasts.apple.com/us/podcast/night-fever/id1584126843", icon: AppleIcon },
  { name: "WOW Presents Plus", href: "https://www.wowpresentsplus.com/night-fever", icon: WowIcon },
];

/**
 * "Listen wherever you party - Celebrate the Original!" box in the footer of every page (Lisa, 23 Oct 2026;
 * it used to be a section at the bottom of the home page). id="listen" so the home hero's Listen button jumps here.
 */
export function ListenBox({ className = "" }: { className?: string }) {
  return (
    <section id="listen" aria-labelledby="listen-heading" className={`scroll-mt-20 ${className}`}>
      <div className="relative w-full border-[3px] border-gold bg-card px-6 pb-7 pt-10 shadow-[8px_10px_0_var(--color-gold)] sm:px-8">
        <span
          aria-hidden="true"
          className="absolute -left-3 -top-5 -rotate-[6deg] bg-gold px-4 py-1.5 font-[family-name:var(--font-flyer)] text-2xl uppercase text-gold-foreground"
        >
          listen!
        </span>
        <h2 id="listen-heading" className="text-3xl leading-[0.95]">
          Listen wherever you party -
          <span className="mt-1 block text-pink">Celebrate the Original!</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed">New episodes drop every week - so exciting! Find the show on your favourite podcast app.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          {PLATFORMS.map((p) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-gold bg-gold px-4 py-2.5 text-sm font-semibold uppercase text-gold-foreground transition hover:bg-card hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink"
            >
              <p.icon className="h-4 w-4" />
              {p.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.369-2.1-10.56-1.14-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53-1.71-2.52-3.01-7.13.52-10.23 1.71-1.46 3.89-1.57 4.85-.95.96.62 1.77.53 3.02-.22 1.25-.75 2.35-.56 3.14.22 1.27 1.17 1.78 2.61 1.78 2.61s-2.12 1.06-2.12 3.24c0 2.57 2.26 3.42 2.26 3.42l-.02.04zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function WowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
    </svg>
  );
}
