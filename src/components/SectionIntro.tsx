import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";

export default function SectionIntro() {
  return (
    <section id="intro" className="py-20 md:py-28 px-6 md:px-16 bg-white">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
        <RevealWrapper>
          <SectionLabel>The Opportunity</SectionLabel>
          <h2
            className="mb-8"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Japan&apos;s Craftsmanship Has a Global Future
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--dark)", lineHeight: 1.8 }}>
            Japan is home to thousands of manufacturers preserving unique techniques developed over
            centuries. From ceramics and textiles to woodworking and precision craftsmanship, these
            businesses represent one of the world&apos;s most valuable cultural assets.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={2}>
          <p style={{ fontSize: "0.95rem", color: "var(--mid)", marginBottom: "0.5rem", lineHeight: 1.8 }}>
            However, many exceptional producers remain difficult to access for international companies.
          </p>
          <ul style={{ listStyle: "none", margin: "2rem 0", padding: 0 }}>
            {["Language barriers", "Limited export experience", "Fragmented supplier networks"].map((item) => (
              <li
                key={item}
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                  fontWeight: 300,
                  color: "var(--mid)",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
          <p
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.15rem",
              fontWeight: 400,
              lineHeight: 1.6,
              color: "var(--black)",
              marginTop: "2rem",
            }}
          >
            Mugeniki bridges the gap between Japan&apos;s makers and the global market.
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}
