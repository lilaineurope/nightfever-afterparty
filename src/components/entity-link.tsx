import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { linkTo, useLinks } from "@/lib/link-index";

/** Links any name/place/title to its single overview card; plain text if unknown. */
export function EntityLink({
  name,
  className,
  children,
}: {
  name: string;
  className?: string;
  children?: ReactNode;
}) {
  const card = useLinks().cardForName(name);
  if (!card) return <span className={className}>{children ?? name}</span>;
  return (
    <Link {...linkTo(card)} className={className}>
      {children ?? name}
    </Link>
  );
}
