import { Link } from "@tanstack/react-router";
import { TEXT_LINK } from "@/lib/styles";


export function LegalLinks() {
  return (
    <span>
      <Link to="/terms" className={TEXT_LINK}>
        Terms &amp; Conditions
      </Link>{" "}
      &middot;{" "}
      <Link to="/privacy" className={TEXT_LINK}>
        Privacy Policy
      </Link>
    </span>
  );
}

export function LegalNote({ align = "center" }: { align?: "center" | "left" }) {
  return (
    <span className={`inline-flex flex-wrap items-center ${align === "left" ? "justify-start" : "justify-center"} gap-x-2 gap-y-1 text-xs text-muted-foreground/70`}>
      <span>
        No trackers, no advertising cookies, and I never sell your data. See the{" "}
      </span>
      <LegalLinks />
      <span>.</span>
    </span>
  );
}
