// Every AFTERPARTY polaroid (the episode box image) and its WebP sizes. Kept apart from episode-block.tsx so a page that only
// needs a small polaroid (In memoriam and club quote walls) doesn't load the episode boxes and their counts (page weight, 16 Nov 2026).
// A new AFTERPARTY adds its polaroid import and one line to episodePortraits here.
import diannePortrait from "@/assets/polaroid-dianne-brill.jpg";
import mustoPortrait from "@/assets/polaroid-michael-musto.jpg";
import jamesPortrait from "@/assets/polaroid-james-st-james.jpg";
import fieldPortrait from "@/assets/polaroid-patricia-field.jpg";
import bartschPortrait from "@/assets/polaroid-susanne-bartsch.jpg";
import edelsteinPortrait from "@/assets/polaroid-lisa-edelstein.jpg";
import richiePortrait from "@/assets/polaroid-richie-rich.jpg";
import makosPortrait from "@/assets/polaroid-christopher-makos.jpg";
import goodePortrait from "@/assets/polaroid-eric-goode.jpg";
import piperPortrait from "@/assets/polaroid-rudolf-piper.jpg";
import valentiDynellPortrait from "@/assets/polaroid-chi-chi-valenti-johnny-dynell.jpg";
import eganPortrait from "@/assets/polaroid-nick-egan.jpg";
import magnusonPortrait from "@/assets/polaroid-ann-magnuson.jpg";
import signorilePortrait from "@/assets/polaroid-michelangelo-signorile.jpg";
import leporePortrait from "@/assets/polaroid-amanda-lepore.jpg";
import norwichPortrait from "@/assets/polaroid-william-norwich.jpg";
import schmidtPortrait from "@/assets/polaroid-michael-schmidt.jpg";
import gatienPortrait from "@/assets/polaroid-peter-gatien.jpg";
import haskellPortrait from "@/assets/polaroid-nikki-haskell.jpg";
import randallPortrait from "@/assets/polaroid-sally-randall.jpg";
import ariasPortrait from "@/assets/polaroid-joey-arias.jpg";
import teePortrait from "@/assets/polaroid-larry-tee.jpg";
import zaldyPortrait from "@/assets/polaroid-zaldy.jpg";
import visagePortrait from "@/assets/polaroid-michelle-visage.jpg";
import waltpaperPortrait from "@/assets/polaroid-waltpaper.jpg";
import jennyPortrait from "@/assets/polaroid-jenny-talia.jpg";
import conniePortrait from "@/assets/polaroid-connie-fleming.jpg";
import missGuyPortrait from "@/assets/polaroid-miss-guy.jpg";
import nellPortrait from "@/assets/polaroid-nell-campbell.jpg";
import bochPortrait from "@/assets/polaroid-richard-boch.jpg";
import luisPortrait from "@/assets/polaroid-luis-camacho.jpg";
import manPortrait from "@/assets/polaroid-man-parrish.jpg";
import treyPortrait from "@/assets/polaroid-trey-speegle.jpg";
import tishSnookyPortrait from "@/assets/polaroid-tish-and-snooky.jpg";
import seidelmanPortrait from "@/assets/polaroid-susan-seidelman.jpg";
import erniePortrait from "@/assets/polaroid-ernie-glam.jpg";
import lincolnPortrait from "@/assets/polaroid-lincoln-palsgrove-iv.jpg";
import lindaPortrait from "@/assets/polaroid-linda-simpson.jpg";
import kevinPortrait from "@/assets/polaroid-kevin-aviance.jpg";
import bebePortrait from "@/assets/polaroid-bebe-buell.jpg";
import marthaPortrait from "@/assets/polaroid-martha-wash.jpg";
import jaynePortrait from "@/assets/polaroid-jayne-county.jpg";
import cherryPortrait from "@/assets/polaroid-cherry-vanilla.jpg";
import christinaPortrait from "@/assets/polaroid-christina-visca.jpg";
import noraPortrait from "@/assets/polaroid-nora-burns.jpg";
import compPortrait from "@/assets/polaroid-christopher-comp.jpg";
import denisePortrait from "@/assets/polaroid-really-denise.jpg";
import mobyPortrait from "@/assets/polaroid-moby.jpg";
import mickeyPortrait from "@/assets/polaroid-mickey-boardman.jpg";
import laurenPortrait from "@/assets/polaroid-lauren-ezersky.jpg";
import dustinPortrait from "@/assets/polaroid-dustin-pittman.jpg";
import brianPortrait from "@/assets/polaroid-brian-belovitch.jpg";
import domoniquePortrait from "@/assets/polaroid-domonique-echeverria.jpg";
import catMarnellPortrait from "@/assets/polaroid-cat-marnell.jpg";
import daphneGuinnessPortrait from "@/assets/polaroid-daphne-guinness.jpg";
import elyssaPortrait from "@/assets/polaroid-elyssa-maxx-goodman.jpg";
import desiSantiagoPortrait from "@/assets/polaroid-desi-santiago.jpg";
import jodieHarshPortrait from "@/assets/polaroid-jodie-harsh.jpg";
import bradGoochPortrait from "@/assets/polaroid-brad-gooch.jpg";
import aprilPalmieriPortrait from "@/assets/polaroid-april-palmieri.jpg";
import kennethHashPortrait from "@/assets/polaroid-kenneth-hash.jpg";
import screaminRachaelPortrait from "@/assets/polaroid-screamin-rachael-cain.jpg";
import rajaPortrait from "@/assets/polaroid-raja.jpg";

export const episodePortraits: Record<string, string> = {
  s01e01: diannePortrait,
  s01e02: mustoPortrait,
  s01e03: edelsteinPortrait,
  s02e03: bartschPortrait,
  s03e01: fieldPortrait,
  s04e08: richiePortrait,
  s05e06: makosPortrait,
  s03e06: goodePortrait,
  s01e07: piperPortrait,
  s06e01: jamesPortrait,
  s06e03: valentiDynellPortrait,
  s05e04: eganPortrait,
  s04e10: magnusonPortrait,
  s02e08: signorilePortrait,
  s05e03: leporePortrait,
  s06e08: norwichPortrait,
  s02e06: schmidtPortrait,
  s01e04: gatienPortrait,
  s02e04: haskellPortrait,
  s06e07: randallPortrait,
  s01e10: ariasPortrait,
  s03e08: teePortrait,
  s04e04: zaldyPortrait,
  s02e01: visagePortrait,
  s01e06: waltpaperPortrait,
  s02e07: jennyPortrait,
  s02e05: conniePortrait,
  s03e10: missGuyPortrait,
  s05e01: nellPortrait,
  s02e11: bochPortrait,
  s01e08: luisPortrait,
  s03e04: manPortrait,
  s04e07: treyPortrait,
  s05e10: tishSnookyPortrait,
  s04e09: seidelmanPortrait,
  s01e05: erniePortrait,
  s06e06: lincolnPortrait,
  s02e09: lindaPortrait,
  s03e03: kevinPortrait,
  s04e03: bebePortrait,
  s03e02: marthaPortrait,
  s02e02: jaynePortrait,
  s03e05: cherryPortrait,
  s06e02: christinaPortrait,
  s06e05: noraPortrait,
  s05e07a: compPortrait,
  s05e07b: denisePortrait,
  s01e09: mobyPortrait,
  s04e02: mickeyPortrait,
  s04e06: laurenPortrait,
  s04e05: dustinPortrait,
  s02e10: brianPortrait,
  s03e07: domoniquePortrait,
  s03e09: catMarnellPortrait,
  s04e01: daphneGuinnessPortrait,
  s04e11: elyssaPortrait,
  s06e09: desiSantiagoPortrait,
  s05e02: jodieHarshPortrait,
  s05e05: bradGoochPortrait,
  s05e08: aprilPalmieriPortrait,
  s06e10: kennethHashPortrait,
  s05e09: screaminRachaelPortrait,
  s06e04: rajaPortrait,
};

// WebP copies of the polaroids (scripts/polaroid-thumbs.py): 1024px for the episode page header (SEO check 16 Nov 2026),
// 512px for the polaroid boxes, 240px for the tiny ones. The 1024px JPEGs are the masters - so pages stay light on phones.
const FULL_POLAROIDS = import.meta.glob("../assets/polaroid-*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const POLAROID_THUMBS = import.meta.glob("../assets/polaroid-thumbs/*.webp", { eager: true, import: "default" }) as Record<string, string>;

/** The guest's polaroid at a small size (falls back to the full photo if the thumbnail hasn't been made yet). */
export function polaroidThumb(id: string, size: 1024 | 512 | 240): string | undefined {
  const full = episodePortraits[id];
  if (!full) return undefined;
  const key = Object.keys(FULL_POLAROIDS).find((k) => FULL_POLAROIDS[k] === full);
  const name = key?.split("/").pop()?.replace(/\.jpg$/, "");
  return (name && POLAROID_THUMBS[`../assets/polaroid-thumbs/${name}-${size}.webp`]) || full;
}
