import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, FactGrid, NumberedList, Callout } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";

export const metadata: Metadata = {
  title: "Restoration of Japanese Ceramics and Lacquerware",
  description:
    "Repair and restoration of Japanese ceramics and lacquerware by the workshops that made them — chips, cracks, re-lacquering, foot replacement, and an honest answer on food safety.",
  alternates: { canonical: "/restoration" },
};

export default function RestorationPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Restoration"
          title="Repair, by the people who made it"
          lead="A cracked bowl is not always the end of a bowl. Where a workshop still has the technique, we take the piece back and have it repaired — and we tell you plainly when it cannot be."
        />

        <PageSection label="What can be repaired" title="Four kinds of damage">
          <FactGrid
            items={[
              { label: "Lacquerware", value: "Re-lacquering a worn surface, re-joining a split body, replacing a foot or a lid." },
              { label: "Ceramic chips", value: "Small chips on a rim or foot, filled and finished to match the glaze." },
              { label: "Cracks", value: "Stabilised so the piece can be handled again — not always invisibly." },
              { label: "Lost pieces", value: "A broken handle or a missing element, reconstructed where the workshop can match it." },
            ]}
          />
        </PageSection>

        <PageSection tone="dark" label="The honest part" title="Kintsugi is not a food-safe guarantee">
          <Prose
            dark
            paragraphs={[
              "Kintsugi — a break repaired with a gold seam — is beautiful and much of it is decorative. Traditional finishes used urushi, which is food-safe when correctly cured; many modern kits use epoxy that is not intended for drinking vessels or for hot food.",
              "A repair at a table is only as safe as the material in it. Urushi, cashew and epoxy behave differently under hot food, and a piece repaired with epoxy belongs on a shelf, not in service.",
            ]}
          />
          <Callout>
            A repaired piece is called food-safe only when the material and its curing are known and documented.
          </Callout>
        </PageSection>

        <PageSection label="How it works" title="From photograph to decision">
          <NumberedList
            items={[
              { title: "Send photographs", text: "One wide shot, one close-up of the damage, and one of any maker's mark on the base." },
              { title: "Assessment first", text: "Whether it can be repaired, by whom, and what it would cost — before anything is shipped." },
              { title: "Decision", text: "You get a yes with a price and a time, or an honest no. Not every piece is worth the shipping." },
              { title: "Repair and return", text: "The piece travels to Japan, is repaired by the relevant trade, and comes back with a note on what was done." },
            ]}
          />
        </PageSection>

        <PageSection tone="dark" label="Who this is for">
          <Prose
            dark
            paragraphs={[
              "Hotels with a discontinued pattern and sixty broken plates; restaurants with a set they still serve on; collectors with a piece that matters more than its price; and anyone who bought a bowl in Japan and would rather not throw it away.",
              "This is not a mail-in repair service and it is not measured in days. It is a small, deliberate job done by workshops that still practise the trade.",
            ]}
          />
        </PageSection>

        <PageSection label="Related">
          <Related
            items={[
              { href: "/crafts/yamanaka-lacquer", label: "Yamanaka lacquerware", note: "Where most of the repairs are done." },
              { href: "/hospitality", label: "For hospitality", note: "Planning for breakage before it happens." },
              { href: "/crafts/arita-porcelain", label: "Arita porcelain", note: "Replacing what cannot be repaired." },
            ]}
          />
        </PageSection>

        <SectionContact />
      </main>
      <Footer />
    </>
  );
}