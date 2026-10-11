import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { entityFor } from "../data/entities";

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
  const e = entityFor(name);
  if (!e) return <span className={className}>{children ?? name}</span>;
  return (
    <Link to="/explore/$slug" params={{ slug: e.slug }} className={className}>
      {children ?? name}
    </Link>
  );
}
