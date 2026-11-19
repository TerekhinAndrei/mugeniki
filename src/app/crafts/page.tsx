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
              "Which is why every quotation names the workshop and treats the region as context. A famous place name is not a quality guarantee; the kiln's last three years of work is.",
            ]}
          />
          <Callout>
            A craft region has a reputation; a workshop has a production line. We work with the second, and
            tell you which ones can carry your volume.
          </Callout>
        </PageSection>

        <PageSection label="Coverage" title="Where the first collection comes from">
          <Prose
            paragraphs={[
              "The first collection comes from seven workshops across Arita, Kyoto, Yamanaka and Seki: porcelain kilns of five to twenty people, two lacquer workshops, a blade maker and a workshop that already supplies hotels and patissiers.",
              "With each of them we know production capacity, minimum order, lead time, food-contact documentation and whether anyone there answers in English — before we put a piece in front of you.",
            ]}
          />
          <Related
            items={[
              { href: "/makers", label: "The workshops", note: "Who makes what, and where." },
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