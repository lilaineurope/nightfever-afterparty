import { Fragment, type ReactNode } from "react";

// A tiny Markdown renderer for the shop's product docs (headings, paragraphs, lists, code blocks, tables, inline code,
// bold, italics and links). The docs are our own README files, so nothing here is user input.

function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const t = m[0];
    const k = `${key}-${i++}`;
    if (t.startsWith("`")) out.push(<code key={k} className="rounded bg-background/70 px-1.5 py-0.5 font-mono text-[0.85em] text-gold">{t.slice(1, -1)}</code>);
    else if (t.startsWith("**")) out.push(<strong key={k} className="text-cream">{t.slice(2, -2)}</strong>);
    else if (t.startsWith("*")) out.push(<em key={k}>{t.slice(1, -1)}</em>);
    else {
      const [, label, href] = t.match(/\[([^\]]+)\]\(([^)]+)\)/)!;
      const external = /^https?:/.test(href!);
      out.push(
        <a key={k} href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-gold underline underline-offset-2 hover:text-pink">
          {label}
        </a>,
      );
    }
    last = m.index + t.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function MiniMarkdown({ source }: { source: string }) {
  const lines = source.replace(/\r/g, "").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let n = 0;
  while (i < lines.length) {
    const line = lines[i]!;
    const key = `b${n++}`;
    if (line.startsWith("```")) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i]!.startsWith("```")) code.push(lines[i++]!);
      i++;
      blocks.push(
        <pre key={key} className="overflow-x-auto rounded-xl border border-border bg-background/80 p-4 text-xs leading-relaxed text-cream/90">
          <code>{code.join("\n")}</code>
        </pre>,
      );
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = h[1]!.length;
      const cls = level <= 1 ? "text-3xl font-bold text-cream" : level === 2 ? "mt-4 text-2xl font-bold text-cream" : "mt-2 text-lg font-semibold text-gold";
      blocks.push(level <= 1 ? <h2 key={key} className={cls}>{inline(h[2]!, key)}</h2> : level === 2 ? <h3 key={key} className={cls}>{inline(h[2]!, key)}</h3> : <h4 key={key} className={cls}>{inline(h[2]!, key)}</h4>);
      i++;
      continue;
    }
    if (/^\s*\|/.test(line)) {
      const rows: string[][] = [];
      while (i < lines.length && /^\s*\|/.test(lines[i]!)) {
        const cells = lines[i]!.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
        if (!cells.every((c) => /^:?-+:?$/.test(c))) rows.push(cells);
        i++;
      }
      const [head, ...body] = rows;
      blocks.push(
        <div key={key} className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>{head?.map((c, j) => <th key={j} className="border-b border-border px-3 py-2 font-semibold text-cream">{inline(c, `${key}h${j}`)}</th>)}</tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri}>{r.map((c, j) => <td key={j} className="border-b border-border/50 px-3 py-2 align-top text-muted-foreground">{inline(c, `${key}r${ri}${j}`)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\./.test(line);
      const items: string[] = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i]!)) {
        let item = lines[i]!.replace(/^\s*([-*]|\d+\.)\s+/, "");
        i++;
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]!) && !/^\s*([-*]|\d+\.)\s+/.test(lines[i]!)) item += " " + lines[i++]!.trim();
        items.push(item);
      }
      const List = ordered ? "ol" : "ul";
      blocks.push(
        <List key={key} className={`space-y-1 pl-5 text-muted-foreground ${ordered ? "list-decimal" : "list-disc"}`}>
          {items.map((it, j) => <li key={j}>{inline(it, `${key}l${j}`)}</li>)}
        </List>,
      );
      continue;
    }
    if (!line.trim()) {
      i++;
      continue;
    }
    const para: string[] = [];
    while (i < lines.length && lines[i]!.trim() && !/^(#{1,4}\s|```|\s*\||\s*([-*]|\d+\.)\s)/.test(lines[i]!)) para.push(lines[i++]!.trim());
    blocks.push(<p key={key} className="leading-relaxed text-muted-foreground">{inline(para.join(" "), key)}</p>);
  }
  return <div className="space-y-4">{blocks.map((b, j) => <Fragment key={j}>{b}</Fragment>)}</div>;
}
