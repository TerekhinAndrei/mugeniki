import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";
import Related from "./Related";

export default function SectionExplore() {
  return (
    <section id="explore" className="py-24 px-6 md:px-16" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto">
        <RevealWrapper>
          <SectionLabel>Work with us</SectionLabel>
          <h2
            className="mb-4"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Six ways in
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--dark)", maxWidth: 560, lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Most conversations start with one of these: a collection, a volume, a market, a date.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={1}>
          <Related
            items={[
              { href: "/collections", label: "Catalogue", note: "Thirteen pieces from Arita and Kyoto, with retail prices in Japan." },
              { href: "/wholesale", label: "Wholesale", note: "Ceramics, lacquerware and blades, priced at 300, 600 and 1,000 pieces." },
              { href: "/hospitality", label: "Hospitality", note: "Collections for hotels and restaurants, with a plan for breakage." },
              { href: "/engraving", label: "Engraved gifts", note: "Corporate programmes from fifty pieces, made in Seki." },
              { href: "/restoration", label: "Restoration", note: "Repair by the workshops that made the piece." },
              { href: "/crafts", label: "Craft regions", note: "Arita, Yamanaka and Seki — what each place actually makes." },
              { href: "/makers", label: "Maker index", note: "Arita, Kyoto, Yamanaka, Seki — who makes what." },
            ]}
          />
        </RevealWrapper>
      </div>
    </section>
  );
}