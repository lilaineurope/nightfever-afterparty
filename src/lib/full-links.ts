// Loads the whole A–Z so EntityLink and EntityText can link every name (src/lib/link-index.tsx). Every page except the A–Z
// card page imports it, directly or through a component - the card page gets its links from the server instead.
import "@/data/entities";
import "@/lib/name-links";
