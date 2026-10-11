import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EntityText } from "./entity-text";

type MoodEntry = {
  rank: number;
  name: string;
  time: string;
  context: string;
  fashion?: string;
  colours?: string[];
};

type Swatch = { colors: string[]; label: string };

function paletteFor(entry: MoodEntry) {
  return (entry.colours ?? []).flatMap((colour) => {
    const match = colour.match(/^(.*?)\s+(#[0-9a-fA-F]{6})$/);
    return match ? [{ name: match[1], hex: match[2] }] : [];
  });
}

export function MoodSpectrum({ moods, id, title, swatchFor, nested = false }: {
  moods: MoodEntry[];
  id: string;
  title: string;
  swatchFor: (name: string) => Swatch;
  nested?: boolean;
}) {
  const [i, setI] = useState(0);
  const active = moods[Math.min(i, moods.length - 1)];
  if (!active) return null;
  const palette = paletteFor(active);
  const sw = swatchFor(active.name);
  const Heading = nested ? "h3" : "h2";
  const LookHeading = nested ? "h4" : "h3";

  return (
    <section aria-labelledby={id} className={nested ? "pt-8" : "px-6 pb-12"}>
      <div className="mx-auto max-w-5xl">
        <Heading id={id} className={nested ? "text-xl font-bold text-cream" : "text-3xl font-bold text-cream"}>{title}</Heading>
        <div className="mt-6 flex h-16 overflow-hidden rounded-lg border border-border" role="group" aria-label={`${title} colors`}>
          {moods.map((m, k) => {
            const colours = paletteFor(m);
            const s = swatchFor(m.name);
            const colors = colours.length ? colours.map((colour) => colour.hex) : s.colors;
            const stops = colors.map((color, index) => `${color} ${index * 100 / colors.length}% ${(index + 1) * 100 / colors.length}%`).join(", ");
            return (
              <Button variant="ghost" key={m.rank} aria-pressed={k === i} aria-label={m.name} onClick={() => setI(k)}
                className={`h-full min-w-0 rounded-none p-0 flex-1 transition-all motion-reduce:transition-none ${k === i ? "flex-[2.5] ring-2 ring-inset ring-cream" : "opacity-80 hover:opacity-100"}`}
                style={{ background: `linear-gradient(${colours.length ? 90 : 135}deg, ${stops})` }} />
            );
          })}
        </div>
        <input type="range" min={0} max={moods.length - 1} value={i} onChange={(e) => setI(Number(e.target.value))}
          aria-label={`Choose a look: ${title}`} className="mt-3 w-full accent-[var(--gold)]" />
        <article className="mt-4 border-l-4 pl-5 py-2" style={{ borderLeftColor: palette[0]?.hex ?? sw.colors[0] }} aria-live="polite">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <LookHeading className="text-xl font-semibold text-cream">{active.name}</LookHeading>
            {active.time === "On camera" ? <span className="text-sm text-gold">On camera</span> : <span className="font-mono text-sm text-gold">{active.time}</span>}
          </div>
          {palette.length ? (
            <ul aria-label="Look colours" className="mt-2 flex flex-wrap gap-2">
              {palette.map((colour, index) => (
                <li key={`${colour.hex}-${index}`} className="inline-flex max-w-full flex-wrap items-center gap-1.5 rounded border border-border px-2 py-1 text-xs text-foreground">
                  <span aria-hidden="true" className="h-3 w-3 shrink-0 rounded-sm border border-border" style={{ backgroundColor: colour.hex }} />
                  <span>{colour.name}</span><span className="font-mono text-muted-foreground">{colour.hex}</span>
                </li>
              ))}
            </ul>
          ) : <p className="mt-1 text-xs uppercase tracking-[0.15em] text-pink">{sw.label}</p>}
          {active.fashion && active.fashion !== "Worn or shown in the episode" && <p className="mt-3 text-foreground">{active.fashion}</p>}
          <p className="mt-3 text-sm text-muted-foreground"><EntityText text={active.context} /></p>
        </article>
      </div>
    </section>
  );
}