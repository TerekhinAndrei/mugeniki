import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, FactGrid, Callout } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";

export const metadata: Metadata = {
  title: "Seki Blades — Kitchen Knives from Gifu",
  description:
    "Kitchen knives and scissors from Seki, Gifu prefecture: santoku, gyuto, nakiri and bunka, forged and finished by small workshops. Engraving available.",
  alternates: { canonical: "/crafts/seki-blades" },
};

export default function SekiPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Seki 関 · Gifu prefecture"
          title="Seven hundred years of edges, in a town of smiths"
          lead="Seki has made blades since the Kamakura period and still makes them in workshops small enough that the person who grinds the edge is the person who signs off on it."
        />

        <PageSection label="The technique" title="What a Seki knife is">
          <Prose
            paragraphs={[
              "The town's reputation comes from swords. What survives commercially is the skill set around it: forging, heat treatment, grinding and handle fitting, each done by workshops that specialise in one of those steps.",
              "Three families of blade matter to a buyer. San-mai and damascus constructions put a hard core between softer cladding, which is what gives a knife its visual pattern and its toughness. Honyaki blades are forged from a single piece of steel and demand far more from the smith and the user. And the finish — migaki, kurouchi, tsuchime — changes both the look and the maintenance.",
              "For kitchens and retail the practical decision is usually shape and steel. Santoku for general work, gyuto for meat and fish, nakiri for vegetables, bunka as a compromise; carbon steel takes a keener edge and rusts, stainless is forgiving and, done well, still cuts.",
            ]}
          />
        </PageSection>

        <PageSection tone="dark" label="What we source">
          <FactGrid
            items={[
              { label: "Kitchen knives", value: "Santoku, gyuto, nakiri, bunka and petty, in carbon and stainless, from small workshops in Seki." },
              { label: "House knives", value: "Sets for restaurant kitchens, with a consistent handle and an agreed sharpening plan." },
              { label: "Scissors", value: "Seki's other tradition — tailoring, kitchen and craft scissors, including OEM runs." },
              { label: "Engraving", value: "Names, marks and dates on the blade, from fifty pieces, for corporate gifts." },
              { label: "Handles and boxes", value: "Wa or western handles, magnolia and lacquered wood, with a branded box for gifting." },
            ]}
          />
        </PageSection>

        <PageSection label="Before you order" title="Steel, sharpening, and who stands behind it">
          <Prose
            paragraphs={[
              "A knife is a tool with a maintenance contract attached. Ask which steel, what hardness, whether it is clad, and who sharpens it in two years — in a restaurant that is often nobody, which is why the blade's geometry matters as much as its steel.",
              "Ask also what the workshop will do about a chipped edge or a bent tip, and whether handles can be replaced separately. For a gift programme, ask whether engraving is done before or after heat treatment, because that decides its durability.",
            ]}
          />
          <Callout>
            Engraved runs start at fifty pieces. We quote blade, engraving and packaging separately so a corporate
            buyer can see what each part costs.
          </Callout>
        </PageSection>

        <PageSection tone="dark" label="Related">
          <Related
            items={[
              { href: "/engraving", label: "Engraved gifts", note: "Knives for corporate programmes and client gifts." },
              { href: "/crafts/arita-porcelain", label: "Arita porcelain", note: "The plate the knife works on." },
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