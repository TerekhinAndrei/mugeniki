import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";

const industries = [
  {
    icon: "◈",
    title: "Hospitality",
    desc: "Create authentic Japanese experiences for hotels, resorts, restaurants, and ryokan-inspired concepts.",
    examples: ["Custom tableware", "Interior elements", "Guest experiences", "Premium amenities"],
  },
  {
    icon: "◇",
    title: "Retail & Luxury Brands",
    desc: "Discover unique Japanese products for your customers — exclusive collections that set your brand apart.",
    examples: ["Exclusive collections", "Limited editions", "Private label products"],
  },
  {
    icon: "○",
    title: "Corporate Gifting",
    desc: "Create memorable business gifts that communicate quality, culture, and intent.",
    examples: ["Executive gifts", "Anniversary collections", "Premium Japanese experiences"],
  },
  {
    icon: "□",
    title: "Designers & Agencies",
    desc: "Access Japanese materials, techniques, and manufacturers for your creative and design projects.",
    examples: ["Material sourcing", "Artisan collaboration", "Technique consultancy"],
  },
];

export default function SectionIndustries() {
  return (
    <section id="industries" className="py-28 px-16" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto">
        <RevealWrapper>
          <SectionLabel>Who We Serve</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Industries We Serve
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {industries.map((ind, i) => (
            <RevealWrapper key={ind.title} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div
                className="p-10 bg-white border border-[var(--rule)] h-full transition-all duration-250 hover:-translate-y-1 hover:border-[var(--dark)]"
              >
                <p className="text-2xl mb-4 opacity-60">{ind.icon}</p>
                <h3
                  className="mb-3"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.2rem", fontWeight: 400 }}
                >
                  {ind.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--mid)", lineHeight: 1.7 }}>{ind.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, marginTop: "1.25rem" }}>
                  {ind.examples.map((ex) => (
                    <li
                      key={ex}
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--mid)",
                        padding: "0.25rem 0",
                        borderBottom: "1px solid var(--rule)",
                      }}
                    >
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
