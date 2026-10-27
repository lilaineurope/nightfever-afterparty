import type { ErrorComponentProps } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { SiteMenu } from "../components/site-menu";
import { SiteStats } from "../components/site-stats";
import { EpisodePlayer } from "../components/episode-player";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">This page left the party</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page doesn't exist - or it's moved on to another club. Let's get you back!
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Oops - this page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on my end. Try again, or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "D1N8TQwOz9IS3c8V40Mwe8r72YsHRgNF2sxzCSOvN5Y" },
      // Search Console property for the own domain https://nightfever-afterparty.com/ (27 Oct 2026) - keep both tags
      { name: "google-site-verification", content: "OSmYxOhIBmHN5GpMphTNxkQz4bBQpsoNDsKShQOGQ1k" },
      { title: "Night Fever fan page | every name, place and story" },
      {
        name: "description",
        content:
          "My fan-made index of the Night Fever podcast by World of Wonder - timelines, a connection map and a timestamped list of every name, place, song and story. Dive in!",
      },
      { name: "author", content: "Lisa Lang" },
      { property: "og:title", content: "Night Fever fan page" },
      {
        property: "og:description",
        content:
          "Every name, place, song and story dropped in the Night Fever interviews - indexed, timestamped and connected!",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Night Fever fan page" },
      { property: "og:image", content: "https://nightfever-afterparty.com/og/home.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://nightfever-afterparty.com/og/home.jpg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Night Fever fan page",
          alternateName: "Night Fever Afterparty",
          url: "https://nightfever-afterparty.com/",
          description:
            "An unofficial fan-made index of the Night Fever podcast by World of Wonder: every name, club, place and look the guests mention, timestamped and connected.",
          inLanguage: "en",
          author: { "@type": "Person", name: "Lisa Lang" },
          about: {
            "@type": "PodcastSeries",
            name: "Night Fever",
            url: "https://www.wowpresentsplus.com/night-fever",
            publisher: { "@type": "Organization", name: "World of Wonder" },
          },
        }),
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <SiteMenu />
      <Outlet />
      <EpisodePlayer />
      <SiteStats />
    </QueryClientProvider>
  );
}
