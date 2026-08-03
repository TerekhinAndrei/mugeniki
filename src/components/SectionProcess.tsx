import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";

const steps = [
  {
    num: "01",
    title: "Define Your Vision",
    desc: "We understand your brand, market, and product requirements. Every successful partnership begins with a clear brief.",
  },
  {
    num: "02",
    title: "Find the Right Partners",
    desc: "We connect you with suitable Japanese manufacturers from our trusted network across Japan's key regions.",
  },
  {
    num: "03",
    title: "Build the Partnership",
    desc: "We coordinate communication, negotiation, and production — bridging cultures and ensuring quality at every step.",
  },
  {
    num: "04",
    title: "Deliver Excellence",
    desc: "Your products arrive ready for your customers. We manage export, documentation, and delivery coordination.",
  },
];

export default function SectionProcess() {
  return (
    <section id="process" className="py-28 px-16 bg-white">
      <div className="max-w-[1200px] mx-auto">
        <RevealWrapper>
          <SectionLabel>The Journey</SectionLabel>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            From Concept to Finished Product
          </h2>
        </RevealWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mt-16 relative">
          {/* connector line on desktop */}
          <div
            className="hidden lg:block absolute"
            style={{
              top: "2.5rem",
              left: "12.5%",
              right: "12.5%",
              height: 1,
              background: "var(--rule)",
            }}
          />
          {steps.map((step, i) => (
            <RevealWrapper key={step.num} delay={(i % 4) as 0 | 1 | 2 | 3 | 4}>
              <div className="relative">
                <div
                  className="flex items-center justify-center mb-8 relative z-10 bg-white"
                  style={{
                    width: "5rem",
                    height: "5rem",
                    border: "1px solid var(--rule)",
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.4rem",
                    fontWeight: 300,
                    color: "var(--light)",
                  }}
                >
                  {step.num}
                </div>
                <p
                  className="mb-2"
                  style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.2rem", fontWeight: 400 }}
                >
                  {step.title}
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--mid)", lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
