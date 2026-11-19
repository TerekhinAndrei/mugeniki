import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, Callout } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";

export const metadata: Metadata = {
  title: "Japanese Craft Techniques — Porcelain, Lacquer, Blades",
  description:
    "Three techniques we source most: Arita porcelain, Yamanaka lacquerware and Seki blades. What each region makes, and what a buyer should ask before ordering.",
  alternates: { canonical: "/crafts" },
};

export default function CraftsPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Craft"
          title="Three techniques, three regions, one conversation"
          lead="Japan's craft map is not a catalogue. A region specialises, a workshop within that region specialises further — and the differences are exactly what makes the product worth importing."
        />

        <PageSection label="Where we work" title="The techniques we source">
          <Related
            items={[
              {
                href: "/crafts/arita-porcelain",
                label: "Arita porcelain",
                note: "Saga prefecture, since the early 17th century. Blue-and-white, celadon, everyday porcelain.",
              },
              {
                href: "/crafts/yamanaka-lacquer",
                label: "Yamanaka lacquerware",
                note: "Ishikawa prefecture. Turned wood and urushi — bowls, trays, bento boxes.",
              },
              {
                href: "/crafts/seki-blades",
                label: "Seki blades",
                note: "Gifu prefecture. Kitchen knives and scissors, forged and finished by hand.",
              },
            ]}
          />
        </PageSection>

        <PageSection tone="dark" label="How to read a craft region">
          <Prose
            dark
            paragraphs={[
              "A region tells you about technique and material. It does not tell you about capacity. Two workshops a kilometre apart in Arita can differ tenfold in output, export experience and willingness to work with a foreign buyer.",
              "That is why we name the workshop in every quote and keep the region as context, not as a substitute for due diligence. A famous place name is not a quality guarantee; the kiln's last three years of work is.",
            ]}
          />
          <Callout>
            We publish a workshop&apos;s name and contact details only with its agreement. Until then a card
            describes the region and the technique, and the name is shared in conversation.
          </Callout>
        </PageSection>

        <PageSection label="Coverage" title="What is in onboarding now">
          <Prose
            paragraphs={[
              "Our first wave covers seven workshops across Arita, Kyoto, Yamanaka and Seki: porcelain kilns of five to twenty people, two lacquer workshops, one blade maker and one workshop working for hotels and patissiers.",
              "Fields we confirm for each of them before a card goes anywhere: name in Japanese and Latin script, region, technique, founding year, products, price range, minimum order, capacity, lead time, export experience, languages spoken, and the risks we see.",
            ]}
          />
          <Related
            items={[
              { href: "/makers", label: "Maker index", note: "What a verified card contains, and what we do not publish." },
              { href: "/wholesale", label: "Wholesale", note: "Volumes, quoting and export." },
            ]}
          />
        </PageSection>

        <SectionContact />
      </main>
      <Footer />
    </>
  );
}