import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";

export default function SectionAbout() {
  return (
    <section id="about" className="py-20 md:py-28 px-6 md:px-16" style={{ background: "var(--black)" }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
        <RevealWrapper>
          <SectionLabel light>Our Story</SectionLabel>
          <h2
            className="text-white mb-8"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Preserving Tradition.
            <br />
            Creating Future Connections.
          </h2>
          <p
            className="mb-5"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.4rem",
              fontStyle: "italic",
              color: "rgba(255,255,255,.85)",
              lineHeight: 1.6,
            }}
          >
            The name Mugeniki comes from the Japanese concept of Mugen (無限) — infinity.
          </p>
          <p className="mb-5" style={{ color: "rgba(255,255,255,.65)", fontSize: "0.95rem", lineHeight: 1.9 }}>
            Japanese craftsmanship is not only a legacy of the past. It is a living tradition that
            continues to evolve through the hands of makers who have dedicated their lives to their
            craft.
          </p>
          <p style={{ color: "rgba(255,255,255,.65)", fontSize: "0.95rem", lineHeight: 1.9 }}>
            Mugeniki exists to help this heritage reach new markets and new generations — to ensure
            that what is made with extraordinary care is met with extraordinary appreciation worldwide.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={2}>
          <p
            aria-hidden
            className="hidden md:block text-right leading-none select-none"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "9rem",
              fontWeight: 300,
              color: "rgba(255,255,255,.06)",
            }}
          >
            無限
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}
