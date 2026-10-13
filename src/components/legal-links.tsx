import { Link } from "@tanstack/react-router";

const LINK = "text-gold underline decoration-gold/40 underline-offset-2 transition hover:text-pink";

export function LegalLinks() {
  return (
    <span>
      <Link to="/terms" className={LINK}>
        Terms &amp; Conditions
      </Link>{" "}
      &middot;{" "}
      <Link to="/privacy" className={LINK}>
        Privacy Policy
      </Link>
    </span>
  );
}

export function LegalNote() {
  return (
    <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-muted-foreground/70">
      <span>
        No trackers, no advertising cookies, and I never sell your data. See the{" "}
      </span>
      <LegalLinks />
      <span>.</span>
    </span>
  );
}
