import Link from "next/link";

export default function Related({
  items,
}: {
  items: { href: string; label: string; note: string }[];
}) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      style={{ gap: "1px", background: "var(--rule)", border: "1px solid var(--rule)" }}
    >
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="no-underline group"
          style={{ background: "var(--bg)", padding: "1.75rem 1.5rem", display: "block" }}
        >
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.25rem",
              color: "var(--black)",
              marginBottom: "0.4rem",
            }}
          >
            {it.label}
          </p>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.7, color: "var(--mid)" }}>{it.note}</p>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginTop: "1rem",
            }}
          >
            Read more →
          </p>
        </Link>
      ))}
    </div>
  );
}