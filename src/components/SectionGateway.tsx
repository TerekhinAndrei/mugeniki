import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";

const items = [
  { label: "Culture", text: "Business culture and negotiation practices" },
  { label: "Standards", text: "Manufacturing quality and regional specialties" },
  { label: "Networks", text: "Trusted supplier relationships across Japan" },
  { label: "Longevity", text: "Long-term partnership and relationship management" },
];

export default function SectionGateway() {
  return (
    <section id="gateway" className="py-28 px-16" style={{ background: "var(--black)" }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <RevealWrapper>
          <SectionLabel light>Local Expertise</SectionLabel>
          <h2
            className="text-white mb-6"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Your Gateway to Japanese Manufacturing
          </h2>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "1.25rem" }}>
            Working with Japanese suppliers requires more than translation. It requires deep
            understanding of culture, standards, and long-term relationship building.
          </p>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: "0.95rem", lineHeight: 1.9 }}>
            Mugeniki provides the local expertise needed to successfully operate in Japan.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={2}>
          <div
            className="grid grid-cols-2"
            style={{ gap: "1px", background: "var(--offblack)", border: "1px solid var(--offblack)" }}
          >
            {items.map((item) => (
              <div key={item.label} className="p-8" style={{ background: "var(--black)" }}>
                <p
                  className="mb-2"
                  style={{ fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--light)" }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.1rem",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "rgba(255,255,255,.75)",
                    lineHeight: 1.5,
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
