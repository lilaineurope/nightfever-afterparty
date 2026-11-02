/** Episode header columns Lisa has looked at and set by hand (2 Nov 2026: "case by case"). Each entry says which parts go
 *  in the left card (under the buttons) and which in the right card. Episodes not listed use headerColumns' automatic
 *  choice (the most even columns); a new AFTERPARTY is shown to Lisa before publishing and added here once she approves. */
export const HEADER_LAYOUT: Record<string, { left: ("mentor" | "drop")[]; right: ("timeline" | "mentor" | "drop")[] }> = {
  s01e02: { left: ["drop"], right: ["timeline", "mentor"] }, // Michael Musto - Lisa: mentor and under the wing to the right
  s01e10: { left: ["drop"], right: ["timeline", "mentor"] }, // Joey Arias - Lisa OK'd (review 7-18)
  s02e01: { left: ["drop"], right: ["timeline"] }, // Michelle Visage - Lisa OK'd (review 7-18)
  s02e03: { left: ["drop"], right: ["timeline", "mentor"] }, // Susanne Bartsch - Lisa OK'd (review 7-18)
  s02e04: { left: [], right: ["timeline", "drop"] }, // Nikki Haskell - Lisa OK'd (review 7-18)
  s02e05: { left: [], right: ["timeline", "mentor", "drop"] }, // Connie Fleming - Lisa OK'd (review 7-18)
  s02e06: { left: ["mentor"], right: ["timeline", "drop"] }, // Michael Schmidt - Lisa OK'd (review 7-18)
  s02e07: { left: [], right: ["timeline", "mentor", "drop"] }, // Jenny Talia - Lisa OK'd (review 7-18)
  s02e08: { left: [], right: ["timeline", "mentor", "drop"] }, // Michelangelo Signorile - Lisa OK'd (review 7-18)
  s03e01: { left: ["mentor"], right: ["timeline", "drop"] }, // Patricia Field - Lisa OK'd (review 7-18)
  s03e06: { left: [], right: ["timeline", "mentor", "drop"] }, // Eric Goode - Lisa OK'd (review 7-18)
  s03e08: { left: [], right: ["timeline", "mentor", "drop"] }, // Larry Tee - Lisa OK'd (review 7-18)
  s03e10: { left: [], right: ["timeline", "mentor", "drop"] }, // Miss Guy - Lisa: looks great
  s04e04: { left: [], right: ["timeline", "mentor", "drop"] }, // Zaldy - Lisa OK'd (review 19-24)
  s04e08: { left: [], right: ["timeline", "mentor", "drop"] }, // Richie Rich - Lisa OK'd (review 19-24)
  s04e10: { left: [], right: ["timeline", "mentor", "drop"] }, // Ann Magnuson - Lisa: looks great
  s05e01: { left: ["mentor"], right: ["timeline", "drop"] }, // Nell Campbell - Lisa OK'd (review 19-24)
  s05e03: { left: [], right: ["timeline", "drop"] }, // Amanda Lepore - Lisa OK'd (review 19-24)
  s05e04: { left: [], right: ["timeline", "drop"] }, // Nick Egan - Lisa OK'd (review 19-24)
  s06e01: { left: ["drop"], right: ["timeline", "mentor"] }, // James St. James - Lisa: Top of the drop left, Mentor score right
};
