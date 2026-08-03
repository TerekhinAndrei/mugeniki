import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";

const items = [
  {
    title: "Authentic Access",
    desc: "Direct connections with Japanese manufacturers and regional producers — relationships built through years of trusted presence in Japan.",
  },
  {
    title: "Cultural Understanding",
    desc: "We combine deep Japanese business knowledge with global market experience. That combination is rare, and it makes all the difference.",
  },
  {
    title: "Long-Term Relationships",
    desc: "We believe successful partnerships are built over time. Our approach is never transactional — it is collaborative and enduring.",
  },
  {
    title: "Quality Without Compromise",
    desc: "Japanese craftsmanship deserves global recognition. We ensure every product that leaves Japan reflects the standard it was made to.",
  },
];

export default function SectionWhy() {
  return (
    <section id="why" className="py-28 px-16" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto">
        <RevealWrapper>
          <SectionLabel>Our Commitment</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Why Mugeniki
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-16">
          {items.map((item, i) => (
            <RevealWrapper key={item.title} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
              <div style={{ paddingBottom: "2.5rem", borderBottom: i < 2 ? "1px solid var(--rule)" : "none" }}>
                <h3
                  className="mb-3"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", fontWeight: 400 }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--dark)", lineHeight: 1.8 }}>{item.desc}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
