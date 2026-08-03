import Image from "next/image";
import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";

const cases = [
  {
    tag: "Hospitality · Europe",
    title: "Creating a Japanese-Inspired Guest Experience",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=75",
    alt: "Luxury hotel interior with Japanese design elements",
    details: [
      { label: "Challenge", text: "A European luxury hotel group wanted authentic Japanese elements for a new premium property — without the complexity of navigating Japanese suppliers alone." },
      { label: "Solution", text: "Mugeniki sourced regional manufacturers and coordinated custom production across multiple artisan categories." },
      { label: "Result", text: "A unique collection combining traditional techniques with modern hospitality requirements — delivered on time and on brief." },
    ],
  },
  {
    tag: "Retail · International",
    title: "Building a Japanese Product Collection",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=900&q=75",
    alt: "Japanese craft products in a retail setting",
    details: [
      { label: "Challenge", text: "An international retail brand wanted exclusive Japanese products for a new collection but lacked local supplier connections or cultural knowledge." },
      { label: "Solution", text: "Mugeniki identified the right manufacturers, managed negotiations in Japanese, and coordinated the full export process." },
      { label: "Result", text: "A curated product line that sold out within the first season, with manufacturer relationships in place for ongoing development." },
    ],
  },
];

export default function SectionCases() {
  return (
    <section id="cases" className="py-28 px-16 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <RevealWrapper>
          <SectionLabel>Results</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Case Studies
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          {cases.map((c, i) => (
            <RevealWrapper key={c.tag} delay={(i * 2) as 0 | 2}>
              <div
                className="border border-[var(--rule)] overflow-hidden group"
              >
                <div className="relative h-64 overflow-hidden bg-[var(--offblack)]">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    className="object-cover opacity-70 transition-all duration-500 group-hover:opacity-90 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-10">
                  <p
                    className="mb-4"
                    style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mid)" }}
                  >
                    {c.tag}
                  </p>
                  <h3
                    className="mb-6"
                    style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", fontWeight: 400 }}
                  >
                    {c.title}
                  </h3>
                  {c.details.map((d) => (
                    <div key={d.label} className="mb-5">
                      <p
                        className="mb-1.5"
                        style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--light)" }}
                      >
                        {d.label}
                      </p>
                      <p style={{ fontSize: "0.88rem", color: "var(--mid)", lineHeight: 1.7 }}>{d.text}</p>
                    </div>
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
