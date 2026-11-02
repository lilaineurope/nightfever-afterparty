/** Episode header columns Lisa has looked at and set by hand (2 Nov 2026: "case by case"). Each entry says which parts go
 *  in the left card (under the buttons) and which in the right card. Episodes not listed use headerColumns' automatic
 *  choice (the most even columns); a new AFTERPARTY is shown to Lisa before publishing and added here once she approves. */
export const HEADER_LAYOUT: Record<string, { left: ("mentor" | "drop")[]; right: ("timeline" | "mentor" | "drop")[] }> = {
  s01e02: { left: ["drop"], right: ["timeline", "mentor"] }, // Michael Musto - Lisa: mentor and under the wing to the right
  s03e10: { left: [], right: ["timeline", "mentor", "drop"] }, // Miss Guy - Lisa: looks great
  s04e04: { left: [], right: ["timeline", "mentor", "drop"] }, // Zaldy - Lisa OK'd (review 19-24)
  s04e08: { left: [], right: ["timeline", "mentor", "drop"] }, // Richie Rich - Lisa OK'd (review 19-24)
  s04e10: { left: [], right: ["timeline", "mentor", "drop"] }, // Ann Magnuson - Lisa: looks great
  s05e01: { left: ["mentor"], right: ["timeline", "drop"] }, // Nell Campbell - Lisa OK'd (review 19-24)
  s05e03: { left: [], right: ["timeline", "drop"] }, // Amanda Lepore - Lisa OK'd (review 19-24)
  s05e04: { left: [], right: ["timeline", "drop"] }, // Nick Egan - Lisa OK'd (review 19-24)
  s06e01: { left: ["drop"], right: ["timeline", "mentor"] }, // James St. James - Lisa: Top of the drop left, Mentor score right
};
