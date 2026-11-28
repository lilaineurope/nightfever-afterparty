import johnLennonUfo from "@/assets/events/john-lennon-s-ufo-sighting.webp";
import actUpRatzinger from "@/assets/events/act-up-protest-at-cardinal-ratzinger-s-speech.webp";
import bittarParty from "@/assets/events/alexis-bittar-s-fake-park-avenue-party.webp";

/** Pictures for event covers (Lisa, 28 Nov 2026, Le Club: "events next door - the events need cover design"): drawn for the
 *  AFTERPARTY with Gemini - realistic, no real faces, no lettering - and used on the "Events next door" covers. Keyed by the
 *  event's A–Z slug. Events without one keep the typed pink/ink cover. */
export const EVENT_COVERS: Record<string, { src: string; alt: string }> = {
  "john-lennon-s-ufo-sighting": { src: johnLennonUfo, alt: "A glowing UFO over the East River at night, a man in silhouette on a terrace - drawn for the AFTERPARTY" },
  "act-up-protest-at-cardinal-ratzinger-s-speech": { src: actUpRatzinger, alt: "A protester shouting from a platform as police move in, seen from the back of the hall - drawn for the AFTERPARTY" },
  "alexis-bittar-s-fake-park-avenue-party": { src: bittarParty, alt: "A staged Park Avenue party with a video camera and a light in front - drawn for the AFTERPARTY" },
};
