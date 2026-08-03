import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";

const services = [
  {
    index: "01",
    title: "Supplier Discovery",
    desc: "Find the right Japanese partners for your business. We identify manufacturers based on your product requirements, production capacity, quality standards, pricing, and location.",
    items: ["Product requirements", "Production capacity", "Quality standards", "Pricing", "Location"],
  },
  {
    index: "02",
    title: "Partnership Development",
    desc: "From first contact to long-term cooperation. We support every stage of building a lasting relationship with Japanese manufacturers.",
    items: ["Supplier communication", "Negotiations", "Contracts", "Relationship management"],
  },
  {
    index: "03",
    title: "Quality & Production Management",
    desc: "Ensure your products meet expectations every time. We coordinate the full production cycle on the ground in Japan.",
    items: ["Prototypes", "Production oversight", "Quality checks", "Delivery schedules"],
  },
  {
    index: "04",
    title: "Export Coordination",
    desc: "A seamless bridge between Japan and your market. We handle the full export process so your team can focus on what matters.",
    items: ["Documentation", "Logistics coordination", "International communication"],
  },
];

export default function SectionServices() {
  return (
    <section id="services" className="py-28 px-16 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <RevealWrapper>
          <SectionLabel>How We Help</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Our Services
          </h2>
        </RevealWrapper>

        <div className="mt-16" style={{ borderTop: "1px solid var(--rule)" }}>
          {services.map((s) => (
            <RevealWrapper key={s.index}>
              <div
                className="grid items-start py-12 gap-12 transition-colors hover:bg-black/[0.015] cursor-default"
                style={{
                  gridTemplateColumns: "1fr 2fr 1fr",
                  borderBottom: "1px solid var(--rule)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "0.9rem",
                    color: "var(--light)",
                  }}
                >
                  {s.index}
                </span>
                <div>
                  <p
                    className="mb-3"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.5rem", fontWeight: 400 }}
                  >
                    {s.title}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "var(--mid)", lineHeight: 1.7 }}>{s.desc}</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  {s.items.map((item) => (
                    <span key={item} className="relative pl-3" style={{ fontSize: "0.8rem", color: "var(--mid)" }}>
                      <span className="absolute left-0">·</span>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
