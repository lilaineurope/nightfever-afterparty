// What each shop on the Library's "Shops & boutiques" shelf was, where and when (Lisa, 27 Nov 2026: "shops and boutiques
// need pictures and we need to setup pages for it"). Keyed by the shop's card slug. Only plain, checkable facts - where
// a date or an address isn't sure, it is left out rather than guessed. The guests' own words stay in the episode lines.

export type ShopFacts = {
  /** Street and city, as it was when the guests went. */
  where?: string;
  /** The years it traded there. */
  when?: string;
  /** One or two sentences on what it was. */
  about: string;
  /** The pin's name in src/data/locations.ts when it differs from the shop's own name. */
  pin?: string;
};

export const SHOP_FACTS: Record<string, ShopFacts> = {
  "patricia-field-store-8th-street": {
    where: "East 8th Street, Greenwich Village, New York",
    when: "1971–2002",
    about:
      "Patricia Field's boutique on 8th Street - wigs, club clothes and young designers, run by the club kids who shopped there. It moved to the Bowery in 2002.",
  },
  "patricia-field-store-bowery": {
    where: "306 Bowery, New York",
    when: "2002–2016",
    about: "Where the 8th Street shop moved in 2002, and the last Patricia Field store - she closed it in 2016.",
  },
  "patricia-field-gallery": {
    where: "Bowery, New York",
    when: "from 2016",
    about: "ArtFashion, the small gallery Patricia Field opened after the shop closed, showing the artists and designers she loves.",
  },
  "pants-pub-washington-place": {
    where: "Washington Place, Greenwich Village, New York",
    when: "from 1966",
    about: "Patricia Field's very first shop, on NYU's doorstep, selling slim, menswear-cut trousers for women.",
  },
  fiorucci: {
    where: "127 East 59th Street, New York",
    when: "1976–1986",
    about:
      "Elio Fiorucci's Milan label and its New York store by Bloomingdale's - the windows, the plastic, the stickers and the crowd that made it the daytime Studio 54.",
    pin: "Fiorucci store, New York",
  },
  "bloomingdale-s": {
    where: "Lexington Avenue at 59th Street, New York",
    when: "at 59th Street since 1886",
    about: "The Upper East Side department store famous for its windows - and the one that carried Heatherette.",
  },
  "barneys-new-york": {
    where: "Seventh Avenue at 17th Street, then 660 Madison Avenue, New York",
    when: "1923–2020",
    about: "The menswear discount store that became New York's most fashion-forward department store, with windows to match.",
  },
  "bergdorf-goodman": {
    where: "754 Fifth Avenue at 58th Street, New York",
    when: "on Fifth Avenue since 1928",
    about: "The grand Fifth Avenue department store - a day job for more than one night-time legend.",
  },
  "henri-bendel": {
    where: "West 57th Street, then 712 Fifth Avenue, New York",
    when: "1895–2019",
    about: "The New York store of little boutiques under one roof, with its brown-and-white stripes.",
  },
  "macy-s": {
    where: "Herald Square, 34th Street, New York",
    when: "at Herald Square since 1902",
    about: "The giant Herald Square department store - it carried Heatherette's junior line.",
  },
  "saks-fifth-avenue": {
    where: "611 Fifth Avenue, New York",
    when: "since 1924",
    about: "The Fifth Avenue department store across from Rockefeller Center.",
  },
  "trash-and-vaudeville": {
    where: "4 St. Marks Place, East Village, New York",
    when: "1975–2016, then East 7th Street",
    about: "The punk and rock'n'roll clothes shop on St. Marks Place - leather, creepers and stage clothes for the CBGB crowd.",
  },
  "pop-shop": {
    where: "292 Lafayette Street, SoHo, New York",
    when: "1986–2005",
    about:
      "Keith Haring's own shop, painted floor to ceiling by him, selling his images on T-shirts, badges and posters so everyone could own one.",
  },
  "worlds-end": {
    where: "430 King's Road, Chelsea, London",
    when: "Worlds End from 1980 (Let It Rock 1971, SEX 1974, Seditionaries 1976)",
    about: "Vivienne Westwood and Malcolm McLaren's shop at the far end of the King's Road, with the clock that runs backwards.",
  },
  "screaming-mimi-s": {
    where: "New York",
    when: "since 1978",
    about: "The New York vintage clothing shop where club kids and stylists dug for looks.",
  },
  charivari: {
    where: "Upper West Side, New York",
    when: "1967–1998",
    about: "The Weiser family's boutiques that brought Japanese and Belgian designers to New York.",
  },
  "thompson-street-store": {
    where: "Thompson Street, SoHo, New York",
    about: "Susanne Bartsch's first tiny shop, in an old English-panelled shopfront, selling young London designers.",
  },
  "west-broadway-store": {
    where: "West Broadway, SoHo, New York",
    about: "Susanne Bartsch's bigger, colourful shop - tour buses drove past it.",
  },
  "diane-b": {
    where: "SoHo, New York",
    about: "The most chic shop downtown, Michael Schmidt says - his chain-mail dress went in its window.",
  },
  "lee-s-mardi-gras": {
    where: "West 14th Street, New York",
    about: "The crossdressers' boutique: \"Let Lee dress you. He understands.\"",
  },
  "reade-street-shoe-warehouse": {
    where: "Reade Street, Tribeca, New York",
    about: "A warehouse full of never-worn vintage shoes from the 1920s to the 60s - Debbie Harry's tip.",
  },
  browns: {
    where: "South Molton Street, London",
    when: "since 1970",
    about: "Joan Burstein's London boutique, the first to buy many of the young designers.",
  },
  parco: {
    about: "The Japanese department-store chain behind the tour - Shibuya Parco opened in Tokyo in 1973.",
  },
  ultimo: {
    where: "Oak Street, Chicago",
    when: "from 1969",
    about: "Joan Weinstein's Chicago designer boutique.",
  },
  jax: {
    where: "Beverly Hills, California",
    about: "Jack Hanson's chic Beverly Hills shop, where everybody bought their slacks.",
  },
  "if-boutique": {
    where: "SoHo, New York",
    about: "The SoHo boutique where Lincoln spent his savings on fashion-forward clothes.",
  },
  ibiza: { about: "A boutique whose window copied James St. James's hula-skirt shawl." },
  revenge: { about: "The shop where Ann Magnuson got a one-dollar punk haircut on her first college trip - no record of it online." },
  sears: { about: "The American department-store chain - where Michael Musto's mother bought his zippered turtleneck." },
  "salvation-army": { about: "The thrift shops where the first costumes came from." },
  "susan-bennis-warren-edwards": { where: "New York", about: "The New York shoe shop where a salesman held Lauren's size until the sale." },
};
