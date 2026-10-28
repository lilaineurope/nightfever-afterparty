/** "1:02:03" / "02:03" -> seconds. Anything that isn't a number counts as 0. */
export const toSeconds = (t: string) => t.split(":").reduce((n, x) => n * 60 + (Number(x) || 0), 0);
