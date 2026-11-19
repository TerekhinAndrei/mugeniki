export default function PageHero({
  label,
  title,
  lead,
  image,
}: {
  label: string;
  title: React.ReactNode;
  lead?: string;
  image?: string;
}) {
  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{
        background: "var(--black)",
        minHeight: image ? "72svh" : "52svh",
        paddingTop: "9rem",
      }}
    >
      {image && (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, rgba(0,0,0,.35) 0%, rgba(0,0,0,.78) 100%), url('${image}') center/cover no-repeat`,
          }}
        />
      )}

      <div className="relative w-full px-6 md:px-16 pb-16" style={{ maxWidth: 1200, margin: "0 auto" }}>
        <p
          className="mb-5 text-[var(--light)]"
          style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase" }}
        >
          {label}
        </p>
        <h1
          className="text-white leading-[1.1] mb-6"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
            fontWeight: 300,
            maxWidth: 880,
          }}
        >
          {title}
        </h1>
        {lead && (
          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "rgba(255,255,255,.72)",
              maxWidth: 620,
            }}
          >
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}