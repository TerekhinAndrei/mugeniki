import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";

const cards = [
  {
    num: "01",
    title: "Traditional Crafts",
    desc: "Centuries-old techniques in extraordinary form.",
    items: ["Ceramics", "Lacquerware", "Textiles", "Woodworking", "Metal craftsmanship", "Handmade goods"],
  },
  {
    num: "02",
    title: "Premium Regional Products",
    desc: "The best of Japan's regional producers.",
    items: ["Specialty foods", "Beverages", "Lifestyle products", "Hospitality goods"],
  },
  {
    num: "03",
    title: "Custom Manufacturing",
    desc: "Exclusive product development for discerning brands.",
    items: ["Private collections", "OEM partnerships", "Exclusive product development"],
  },
];

export default function SectionWhat() {
  return (
    <section id="what" className="py-20 md:py-28 px-6 md:px-16" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto">
        <RevealWrapper>
          <SectionLabel>Our Expertise</SectionLabel>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            What We Do
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--dark)", maxWidth: 560, lineHeight: 1.8 }}>
            Strategic sourcing from Japan — we help businesses discover reliable manufacturers and
            create unique product collections.
          </p>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          {cards.map((card, i) => (
            <RevealWrapper key={card.num} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div className="p-10 bg-white border border-[var(--rule)] h-full">
                <p
                  className="mb-5 leading-none"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "2.5rem",
                    fontWeight: 300,
                    color: "#948c80",
                  }}
                >
                  {card.num}
                </p>
                <h3
                  className="mb-3"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.45rem", fontWeight: 400 }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--mid)" }}>{card.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="relative pl-4"
                      style={{ fontSize: "0.85rem", color: "var(--mid)", padding: "0.3rem 0 0.3rem 1rem" }}
                    >
                      <span className="absolute left-0" style={{ color: "var(--muted)" }}>—</span>
                      {item}
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
