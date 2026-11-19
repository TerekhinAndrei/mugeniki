import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";

export default function PageSection({
  label,
  title,
  children,
  tone = "light",
  id,
}: {
  label?: string;
  title?: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  id?: string;
}) {
  const dark = tone === "dark";
  return (
    <section
      id={id}
      className="py-24 px-6 md:px-16"
      style={{ background: dark ? "var(--offblack)" : "var(--bg)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {(label || title) && (
          <RevealWrapper>
            {label && <SectionLabel light={dark}>{label}</SectionLabel>}
            {title && (
              <h2
                className={dark ? "text-white" : ""}
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
                  fontWeight: 400,
                  lineHeight: 1.2,
                  marginBottom: "2.5rem",
                }}
              >
                {title}
              </h2>
            )}
          </RevealWrapper>
        )}
        {children}
      </div>
    </section>
  );
}

export function Prose({
  paragraphs,
  dark = false,
}: {
  paragraphs: string[];
  dark?: boolean;
}) {
  return (
    <div style={{ maxWidth: 700 }}>
      {paragraphs.map((p, i) => (
        <RevealWrapper key={i} delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}>
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.85,
              color: dark ? "rgba(255,255,255,.6)" : "var(--dark)",
              marginBottom: "1.25rem",
            }}
          >
            {p}
          </p>
        </RevealWrapper>
      ))}
    </div>
  );
}

export function FactGrid({
  items,
  columns = 3,
}: {
  items: { label: string; value: string }[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      style={{
        gap: "1px",
        background: "var(--rule)",
        border: "1px solid var(--rule)",
        marginTop: "1rem",
        ...(columns === 2 ? { gridTemplateColumns: undefined } : {}),
      }}
    >
      {items.map((it) => (
        <div key={it.label} style={{ background: "var(--bg)", padding: "1.75rem 1.5rem" }}>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mid)",
              marginBottom: "0.6rem",
            }}
          >
            {it.label}
          </p>
          <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--black)" }}>{it.value}</p>
        </div>
      ))}
    </div>
  );
}

export function NumberedList({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "2rem 3rem", marginTop: "1rem" }}>
      {items.map((it, i) => (
        <RevealWrapper key={it.title} delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}>
          <div>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.1rem",
                color: "var(--muted)",
                marginBottom: "0.35rem",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 style={{ fontSize: "1rem", fontWeight: 500, marginBottom: "0.4rem" }}>{it.title}</h3>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.75, color: "var(--mid)" }}>{it.text}</p>
          </div>
        </RevealWrapper>
      ))}
    </div>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        borderLeft: "2px solid var(--black)",
        paddingLeft: "1.5rem",
        margin: "2rem 0 0",
        maxWidth: 700,
      }}
    >
      <p style={{ fontSize: "0.88rem", lineHeight: 1.8, color: "var(--dark)" }}>{children}</p>
    </div>
  );
}