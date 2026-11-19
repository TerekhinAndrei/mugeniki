import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, FactGrid, NumberedList, Callout } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";

export const metadata: Metadata = {
  title: "Engraved Japanese Knives for Corporate Gifts",
  description:
    "Seki-made knives with laser or hand engraving for corporate gifts and client programmes. Small runs from fifty pieces, branded boxes, delivery to the EU.",
  alternates: { canonical: "/engraving" },
};

export default function EngravingPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Corporate gifting"
          title="A knife with a name on it"
          lead="One of the few corporate gifts that gets used every week, made in Seki and engraved for the person receiving it — in runs from fifty pieces."
        />

        <PageSection label="Why this works" title="A gift people keep">
          <Prose
            paragraphs={[
              "Most corporate gifts end in a drawer. A kitchen knife does not: it is useful, it is personal once a name is on it, and it lasts long enough that the recipient remembers where it came from.",
              "Seki has been making blades for seven hundred years, and the workshops there will engrave to order — a name, a company mark, a date, a short phrase in Latin or Japanese script. We coordinate the engraving, the handle choice and the box, and ship to the markets you operate in.",
            ]}
          />
        </PageSection>

        <PageSection tone="dark" label="A typical programme" title="Four decisions, then production">
          <NumberedList
            items={[
              { title: "The blade", text: "Santoku for a general audience, petty for something more personal, or a set for senior recipients." },
              { title: "The engraving", text: "Text, placement, depth and whether it is laser or hand-engraved. Both work; they cost differently." },
              { title: "The handle", text: "Wa handles in magnolia or lacquered wood, or a western handle if the audience expects one." },
              { title: "The presentation", text: "Branded box, Japanese paper, a printed card explaining the maker and the steel." },
            ]}
          />
        </PageSection>

        <PageSection label="Practical details" title="What a buyer needs to know">
          <FactGrid
            items={[
              { label: "Minimum run", value: "Fifty pieces for an engraved programme; fewer is a conversation, not a price list." },
              { label: "Lead time", value: "Confirmed per order — engraving and packing sit after production, not before." },
              { label: "Personalisation", value: "Names and marks in Latin or Japanese script, checked as a proof before engraving." },
              { label: "Packing", value: "Branded box, no plastic, with a card on the maker, the steel and care." },
              { label: "Shipping", value: "Consolidated to one address or split across offices, with export documents from Japan." },
              { label: "Repeatability", value: "The same blade and engraving next year, if the workshop still carries the model." },
            ]}
          />
          <Callout>
            We do not promise exclusivity on a blade model until the workshop confirms it in writing. When a gift
            programme needs it, we ask before the first order, not after.
          </Callout>
        </PageSection>

        <PageSection tone="dark" label="Related">
          <Related
            items={[
              { href: "/crafts/seki-blades", label: "Seki blades", note: "How the knives are made, and what to ask about steel." },
              { href: "/wholesale", label: "Wholesale", note: "Volumes, quoting and export from Japan." },
              { href: "/hospitality", label: "For hospitality", note: "House knives for restaurant kitchens." },
            ]}
          />
        </PageSection>

        <SectionContact />
      </main>
      <Footer />
    </>
  );
}