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
  madonna: { photo: madonnaPhoto, polaroid: madonnaPolaroid, focus: "22%", credit: `Portrait after a Sire Records press photo, 1987 (public domain), ${STYLE}` },
  "malcolm-mclaren": { photo: mclarenPhoto, polaroid: mclarenPolaroid, focus: "58%", credit: `Portrait after a photo by Martyn Goodacre, 1992 (CC BY-SA 3.0; our version is CC BY-SA 3.0 too), ${STYLE}` },
  "keith-haring": { photo: haringPhoto, polaroid: haringPolaroid, focus: "20%", credit: `Portrait after a photo by Bernard Gotfryd, Palladium 1985 (public domain), ${STYLE}` },
  "boy-george": { photo: georgePhoto, polaroid: georgePolaroid, focus: "12%", credit: `Portrait after a photo by Sven Mandel, 2026 (CC BY-SA 4.0; our version is CC BY-SA 4.0 too), ${STYLE}` },
  "ivana-trump": { photo: ivanaPhoto, polaroid: ivanaPolaroid, focus: "14%", credit: `Portrait after a photo by Christopher Peterson, 2007 (CC BY 3.0), ${STYLE}` },
};
