// Person polaroids on the A–Z pages (Lisa, 2 Nov 2026, "combo 3"): the polaroid photo fills the header, the name sits on a
// taped paper card, and the framed polaroid is taped on the right with its credit. Only people who are not guests;
// never Michael Alig or Donald Trump. Sources and licences: People/People portraits - sources.xlsx in Lisa's folder.
import warholPhoto from "@/assets/people/andy-warhol-photo.webp";
import warholPolaroid from "@/assets/people/andy-warhol-polaroid.webp";
import rupaulPhoto from "@/assets/people/rupaul-photo.webp";
import rupaulPolaroid from "@/assets/people/rupaul-polaroid.webp";
import randyPhoto from "@/assets/people/randy-barbato-photo.webp";
import randyPolaroid from "@/assets/people/randy-barbato-polaroid.webp";
import madonnaPhoto from "@/assets/people/madonna-photo.webp";
import madonnaPolaroid from "@/assets/people/madonna-polaroid.webp";
import mclarenPhoto from "@/assets/people/malcolm-mclaren-photo.webp";
import mclarenPolaroid from "@/assets/people/malcolm-mclaren-polaroid.webp";
import haringPhoto from "@/assets/people/keith-haring-photo.webp";
import haringPolaroid from "@/assets/people/keith-haring-polaroid.webp";
import georgePhoto from "@/assets/people/boy-george-photo.webp";
import georgePolaroid from "@/assets/people/boy-george-polaroid.webp";
import ivanaPhoto from "@/assets/people/ivana-trump-photo.webp";
import ivanaPolaroid from "@/assets/people/ivana-trump-polaroid.webp";
import fentonPhoto from "@/assets/people/fenton-bailey-photo.webp";
import fentonPolaroid from "@/assets/people/fenton-bailey-polaroid.webp";
import nomiPhoto from "@/assets/people/klaus-nomi-photo.webp";
import nomiPolaroid from "@/assets/people/klaus-nomi-polaroid.webp";
import aileenPhoto from "@/assets/people/aileen-mehle-photo.webp";
import aileenPolaroid from "@/assets/people/aileen-mehle-polaroid.webp";

import anitaSarkoPhoto from "@/assets/people/anita-sarko-photo.webp";
import anitaSarkoPolaroid from "@/assets/people/anita-sarko-polaroid.webp";
import jeanMichelBasquiatPhoto from "@/assets/people/jean-michel-basquiat-photo.webp";
import jeanMichelBasquiatPolaroid from "@/assets/people/jean-michel-basquiat-polaroid.webp";
import lizaMinnelliPhoto from "@/assets/people/liza-minnelli-photo.webp";
import lizaMinnelliPolaroid from "@/assets/people/liza-minnelli-polaroid.webp";
import davidBowiePhoto from "@/assets/people/david-bowie-photo.webp";
import davidBowiePolaroid from "@/assets/people/david-bowie-polaroid.webp";
import lizSmithPhoto from "@/assets/people/liz-smith-photo.webp";
import lizSmithPolaroid from "@/assets/people/liz-smith-polaroid.webp";
import nelsonSullivanPhoto from "@/assets/people/nelson-sullivan-photo.webp";
import nelsonSullivanPolaroid from "@/assets/people/nelson-sullivan-polaroid.webp";
import davidLachapellePhoto from "@/assets/people/david-lachapelle-photo.webp";
import davidLachapellePolaroid from "@/assets/people/david-lachapelle-polaroid.webp";
import leighBoweryPhoto from "@/assets/people/leigh-bowery-photo.webp";
import leighBoweryPolaroid from "@/assets/people/leigh-bowery-polaroid.webp";
import debbieHarryPhoto from "@/assets/people/debbie-harry-photo.webp";
import debbieHarryPolaroid from "@/assets/people/debbie-harry-polaroid.webp";
import marilynPhoto from "@/assets/people/marilyn-photo.webp";
import marilynPolaroid from "@/assets/people/marilyn-polaroid.webp";
import jeanPaulGaultierPhoto from "@/assets/people/jean-paul-gaultier-photo.webp";
import jeanPaulGaultierPolaroid from "@/assets/people/jean-paul-gaultier-polaroid.webp";
import marcJacobsPhoto from "@/assets/people/marc-jacobs-photo.webp";
import marcJacobsPolaroid from "@/assets/people/marc-jacobs-polaroid.webp";
import edieSedgwickPhoto from "@/assets/people/edie-sedgwick-photo.webp";
import edieSedgwickPolaroid from "@/assets/people/edie-sedgwick-polaroid.webp";
import stephenSabanPhoto from "@/assets/people/stephen-saban-photo.webp";
import stephenSabanPolaroid from "@/assets/people/stephen-saban-polaroid.webp";
import vivienneWestwoodPhoto from "@/assets/people/vivienne-westwood-photo.webp";
import vivienneWestwoodPolaroid from "@/assets/people/vivienne-westwood-polaroid.webp";
import cherPhoto from "@/assets/people/cher-photo.webp";
import cherPolaroid from "@/assets/people/cher-polaroid.webp";
import steveRubellPhoto from "@/assets/people/steve-rubell-photo.webp";
import steveRubellPolaroid from "@/assets/people/steve-rubell-polaroid.webp";
import malcolmForbesPhoto from "@/assets/people/malcolm-forbes-photo.webp";
import malcolmForbesPolaroid from "@/assets/people/malcolm-forbes-polaroid.webp";
import sisterDimensionPhoto from "@/assets/people/sister-dimension-photo.webp";
import sisterDimensionPolaroid from "@/assets/people/sister-dimension-polaroid.webp";
import mathuAndersenPhoto from "@/assets/people/mathu-andersen-photo.webp";
import mathuAndersenPolaroid from "@/assets/people/mathu-andersen-polaroid.webp";
import bernardZettePhoto from "@/assets/people/bernard-zette-photo.webp";
import bernardZettePolaroid from "@/assets/people/bernard-zette-polaroid.webp";

export type PersonPortrait = {
  photo: string;
  polaroid: string;
  /** Credit line shown under the polaroid. */
  credit: string;
  /** Vertical focus of the header photo (CSS background-position y). */
  focus: string;
};

const STYLE = "in our photocopy style";

export const PERSON_PORTRAITS: Record<string, PersonPortrait> = {
  "andy-warhol": { photo: warholPhoto, polaroid: warholPolaroid, focus: "18%", credit: `Portrait after a photo by Lasse Olsson / Pressens bild, Stockholm 1968 (public domain), ${STYLE}` },
  rupaul: { photo: rupaulPhoto, polaroid: rupaulPolaroid, focus: "10%", credit: `Portrait after a photo by the Government of California, 2019 (public domain), ${STYLE}` },
  "randy-barbato": { photo: randyPhoto, polaroid: randyPolaroid, focus: "30%", credit: "Illustration made with Gemini from the show, not a photo" },
  "fenton-bailey": { photo: fentonPhoto, polaroid: fentonPolaroid, focus: "8%", credit: "Illustration made with Gemini, not a photo" },
  "klaus-nomi": { photo: nomiPhoto, polaroid: nomiPolaroid, focus: "10%", credit: 'Portrait after the linocut "New Yodel" by Anomaler Circus, 2022 (CC BY-SA 4.0; our version is CC BY-SA 4.0 too)' },
  "aileen-mehle": { photo: aileenPhoto, polaroid: aileenPolaroid, focus: "18%", credit: `Portrait after a White House photo by Susan Biddle, 1991 (public domain), ${STYLE}` },
  madonna: { photo: madonnaPhoto, polaroid: madonnaPolaroid, focus: "22%", credit: `Portrait after a Sire Records press photo, 1987 (public domain), ${STYLE}` },
  "malcolm-mclaren": { photo: mclarenPhoto, polaroid: mclarenPolaroid, focus: "58%", credit: `Portrait after a photo by Martyn Goodacre, 1992 (CC BY-SA 3.0; our version is CC BY-SA 3.0 too), ${STYLE}` },
  "keith-haring": { photo: haringPhoto, polaroid: haringPolaroid, focus: "20%", credit: `Portrait after a photo by Bernard Gotfryd, Palladium 1985 (public domain), ${STYLE}` },
  "boy-george": { photo: georgePhoto, polaroid: georgePolaroid, focus: "12%", credit: `Portrait after a photo by Sven Mandel, 2026 (CC BY-SA 4.0; our version is CC BY-SA 4.0 too), ${STYLE}` },
  "ivana-trump": { photo: ivanaPhoto, polaroid: ivanaPolaroid, focus: "14%", credit: `Portrait after a photo by Christopher Peterson, 2007 (CC BY 3.0), ${STYLE}` },
  // Next 25 (Lisa, 3 Nov 2026)
  "anita-sarko": { photo: anitaSarkoPhoto, polaroid: anitaSarkoPolaroid, focus: "18%", credit: "Illustration made with Gemini, not a photo" },
  "jean-michel-basquiat": { photo: jeanMichelBasquiatPhoto, polaroid: jeanMichelBasquiatPolaroid, focus: "18%", credit: `Portrait after a passport photo, 1986 (public domain), ${STYLE}` },
  "liza-minnelli": { photo: lizaMinnelliPhoto, polaroid: lizaMinnelliPolaroid, focus: "18%", credit: `Portrait after a Creative Management Associates publicity photo, 1973 (public domain), ${STYLE}` },
  "david-bowie": { photo: davidBowiePhoto, polaroid: davidBowiePolaroid, focus: "18%", credit: `Portrait after an EMI America promo photo, 1983 (public domain), ${STYLE}` },
  "liz-smith": { photo: lizSmithPhoto, polaroid: lizSmithPolaroid, focus: "18%", credit: `Portrait after a photo by Angela George, 2011 (CC BY-SA 3.0; our version is CC BY-SA 3.0 too), ${STYLE}` },
  "nelson-sullivan": { photo: nelsonSullivanPhoto, polaroid: nelsonSullivanPolaroid, focus: "18%", credit: "Illustration made with Gemini, not a photo" },
  "david-lachapelle": { photo: davidLachapellePhoto, polaroid: davidLachapellePolaroid, focus: "18%", credit: `Portrait after a photo by Sasha Kargaltsev, 2011 (CC BY 2.0), ${STYLE}` },
  "leigh-bowery": { photo: leighBoweryPhoto, polaroid: leighBoweryPolaroid, focus: "18%", credit: "Illustration made with Gemini, not a photo" },
  "debbie-harry": { photo: debbieHarryPhoto, polaroid: debbieHarryPolaroid, focus: "18%", credit: `Portrait after a Chrysalis Records press photo, 1982 (public domain), ${STYLE}` },
  marilyn: { photo: marilynPhoto, polaroid: marilynPolaroid, focus: "18%", credit: "Illustration made with Gemini, not a photo" },
  "jean-paul-gaultier": { photo: jeanPaulGaultierPhoto, polaroid: jeanPaulGaultierPolaroid, focus: "18%", credit: `Portrait after a photo by Netaction, 2015 (CC BY-SA 4.0; our version is CC BY-SA 4.0 too), ${STYLE}` },
  "marc-jacobs": { photo: marcJacobsPhoto, polaroid: marcJacobsPolaroid, focus: "18%", credit: `Portrait after a photo by Harald Krichel, 2025 (CC BY-SA 4.0; our version is CC BY-SA 4.0 too), ${STYLE}` },
  "edie-sedgwick": { photo: edieSedgwickPhoto, polaroid: edieSedgwickPolaroid, focus: "18%", credit: `Portrait after a photo by Terry Stevenson, 1967 (public domain), ${STYLE}` },
  "stephen-saban": { photo: stephenSabanPhoto, polaroid: stephenSabanPolaroid, focus: "18%", credit: "Illustration made with Gemini, not a photo" },
  "vivienne-westwood": { photo: vivienneWestwoodPhoto, polaroid: vivienneWestwoodPolaroid, focus: "18%", credit: `Portrait after a photo by Mattia Passeri (CC BY-SA 4.0; our version is CC BY-SA 4.0 too), ${STYLE}` },
  cher: { photo: cherPhoto, polaroid: cherPolaroid, focus: "18%", credit: `Portrait after a Kapp Records trade ad, 1972 (public domain), ${STYLE}` },
  "steve-rubell": { photo: steveRubellPhoto, polaroid: steveRubellPolaroid, focus: "18%", credit: "Illustration made with Gemini, not a photo" },
  "malcolm-forbes": { photo: malcolmForbesPhoto, polaroid: malcolmForbesPolaroid, focus: "18%", credit: "Illustration made with Gemini, not a photo" },
  "sister-dimension": { photo: sisterDimensionPhoto, polaroid: sisterDimensionPolaroid, focus: "18%", credit: "Illustration made with Gemini, not a photo" },
  "mathu-andersen": { photo: mathuAndersenPhoto, polaroid: mathuAndersenPolaroid, focus: "18%", credit: "Illustration made with Gemini, not a photo" },
  "bernard-zette": { photo: bernardZettePhoto, polaroid: bernardZettePolaroid, focus: "18%", credit: "Illustration made with Gemini, not a photo" },
};
