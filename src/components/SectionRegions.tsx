import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";

const regions = [
  { name: "Kyoto", jp: "京都", desc: "Traditional crafts, textiles, ceramics, and cultural products rooted in imperial heritage." },
  { name: "Arita", jp: "有田", desc: "One of Japan's most respected ceramic traditions — porcelain crafted since the 17th century." },
  { name: "Seki", jp: "関", desc: "Known worldwide for precision blades and craftsmanship refined over 700 years." },
  { name: "Kanazawa", jp: "金沢", desc: "Gold leaf, lacquerware, and refined artisan techniques from Japan's cultural capital of the west." },
  { name: "Osaka", jp: "大阪", desc: "Manufacturing expertise, commercial networks, and the pulse of modern Japanese trade." },
];

export default function SectionRegions() {
  return (
    <section id="regions" className="py-28" style={{ background: "var(--offblack)" }}>
      <div className="max-w-[1200px] mx-auto px-16">
        <RevealWrapper>
          <SectionLabel light>Across Japan</SectionLabel>
          <h2
            className="text-white mb-16"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Featured Regions
          </h2>
        </RevealWrapper>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          style={{ gap: "1px", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.08)" }}
        >
          {regions.map((r, i) => (
            <RevealWrapper key={r.name} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
              <div
                className="region-card p-10 h-full"
                style={{ background: "var(--offblack)" }}
              >
                <p
                  className="text-white mb-1"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.4rem", fontWeight: 400 }}
                >
                  {r.name}
                </p>
                <p className="mb-5" style={{ fontSize: "0.75rem", letterSpacing: "0.12em", color: "var(--light)" }}>
                  {r.jp}
                </p>
                <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,.5)", lineHeight: 1.7 }}>{r.desc}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
