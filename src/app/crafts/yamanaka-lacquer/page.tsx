import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, FactGrid, Callout } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";

export const metadata: Metadata = {
  title: "Yamanaka Lacquerware — Turned Wood and Urushi",
  description:
    "Yamanaka lacquerware from Ishikawa prefecture: turned wood bowls, trays and bento finished in urushi. Sourced from workshops with repair support.",
  alternates: { canonical: "/crafts/yamanaka-lacquer" },
};

export default function YamanakaPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Yamanaka 山中 · Ishikawa prefecture"
          title="Wood turned thin, then lacquered for decades"
          lead="A hot-spring town in the mountains of Kaga where the whole trade is divided by hand: one workshop turns the wood, another lacquers it, a third repairs what breaks."
        />

        <PageSection label="The technique" title="Why Yamanaka is different">
          <Prose
            paragraphs={[
              "Lacquerware is made all over Japan. Yamanaka is known for rokuro-hiki — wood turning on a lathe — and for the division of labour that comes with it: a turner, a base coater, a finisher and a decorator may all be different workshops within a few streets of each other.",
              "That structure matters to a buyer. It means the person who turns a bowl and the person who lacquers it are both specialists, and it means a project can be split: your shape from the turner, your finish from the lacquerer. It also means a single 'workshop' rarely controls the whole timeline.",
              "Urushi, the lacquer itself, is a tree sap cured in humid air. It is applied in many thin coats, each dried and polished before the next, which is why a good bowl takes weeks and why the finish does not behave like paint or plastic.",
            ]}
          />
        </PageSection>

        <PageSection tone="dark" label="What we source">
          <FactGrid
            items={[
              { label: "Bowls", value: "Soup and rice bowls, lidded bowls for hospitality and retail sets." },
              { label: "Trays", value: "Ozen and serving trays, the piece a restaurant puts on every table." },
              { label: "Bento", value: "Stacked boxes with a lacquered interior, for gifts and for hotel retail." },
              { label: "Turned blanks", value: "Wood bodies for brands that want to handle the lacquer or the decoration themselves." },
              { label: "Restoration", value: "Re-lacquering, re-joining and foot replacement by workshops that do it as a trade." },
            ]}
          />
        </PageSection>

        <PageSection label="The honest questions" title="Finish, food safety and time">
          <Prose
            paragraphs={[
              "Lacquerware is not automatically food-safe: it depends on the finish. Traditional urushi cured correctly is the material Japanese tableware has used for centuries; synthetic urethane finishes are cheaper, faster and behave differently with hot liquid and with dishwashers. Ask which one is in the piece and how it was cured.",
              "Then ask about care. Most lacquerware should not go in a dishwasher, and a hotel that ignores this will destroy a collection in a year. If that is a problem for your operation, say so before sampling — there may be a better material for the job than lacquer.",
              "And ask about time. Multi-coat lacquer is measured in weeks per batch, not days, and the lacquering workshop is rarely the same business as the turner.",
            ]}
          />
          <Callout>
            We do not describe a lacquered piece as food-safe without knowing the finish and its documentation.
            Where the answer is unclear, we get it in writing from the workshop first.
          </Callout>
        </PageSection>

        <PageSection tone="dark" label="Related">
          <Related
            items={[
              { href: "/restoration", label: "Restoration", note: "What can be repaired, and what it costs to try." },
              { href: "/crafts/arita-porcelain", label: "Arita porcelain", note: "Porcelain to sit beside a lacquered bowl." },
              { href: "/hospitality", label: "For hospitality", note: "Care, breakage and replacement planned upfront." },
            ]}
          />
        </PageSection>

        <SectionContact />
      </main>
      <Footer />
    </>
  );
}