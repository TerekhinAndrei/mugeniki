import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, FactGrid, Callout } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";

export const metadata: Metadata = {
  title: "Arita Porcelain — Sourcing from Kilns in Saga",
  description:
    "Arita porcelain from kilns in Saga prefecture: blue-and-white, celadon and everyday porcelain for retail and hospitality. Sourced directly, with capacity and compliance confirmed.",
  alternates: { canonical: "/crafts/arita-porcelain" },
};

export default function AritaPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Arita 有田 · Saga prefecture"
          title="Porcelain made where Japanese porcelain began"
          lead="Four hundred years of kilns in a valley in Kyushu — and a working industry of small workshops that most buyers never reach directly."
        />

        <PageSection label="The technique" title="What Arita is">
          <Prose
            paragraphs={[
              "Porcelain was first fired in Japan at Arita in the early seventeenth century, after kaolin was found in the hills nearby. The clay is fine and white, the body vitrified, and the tradition splits into three families of decoration that are still distinct today.",
              "Sometsuke — underglaze blue — is painted on the raw body and fired under the glaze, so the colour sits inside the glass and cannot wear off. Seiji, celadon, relies on iron in the glaze and a reducing kiln atmosphere for its green. Iroe and kinrande add overglaze enamel and gold on a second, lower firing.",
              "What makes Arita useful to a buyer is not the history but the range: a five-person kiln can produce a plate for a restaurant and a signed piece for a gallery from the same clay, and the region still has the suppliers, moulds and finishers to support both.",
            ]}
          />
        </PageSection>

        <PageSection tone="dark" label="What we source" title="Pieces that survive a dining room">
          <FactGrid
            items={[
              { label: "Plates and share plates", value: "Blue-and-white and celadon, 15–30 cm, for restaurants and retail collections." },
              { label: "Bowls", value: "Ramen and donburi bowls, rice bowls, soup cups — the shapes a European kitchen actually uses." },
              { label: "Handleless cups", value: "Yunomi and sobachoko, for tea service and for the hotel room." },
              { label: "Glaze and shape development", value: "A workshop's existing moulds first; new shapes only where the kiln agrees to develop them." },
              { label: "Branding", value: "Kiln mark, printed box, Japanese paper — decided at sampling, not after production." },
            ]}
          />
        </PageSection>

        <PageSection label="Before you order" title="Six questions a kiln should answer">
          <Prose
            paragraphs={[
              "Whether the pattern is painted by hand or applied as a transfer decides both price and the exact repeatability of a reorder. Ask which, and ask to see a sample from the last production run rather than a showroom piece.",
              "Then: the clay body and glaze recipe stability, the firing temperature, whether the kiln tests for lead and cadmium migration, how many pieces per firing it can carry, how much breakage it expects, and who packs for export. A kiln that answers all six has done this before.",
            ]}
          />
          <Callout>
            Every Arita quotation names the kiln, its capacity and its queue. Where a glaze has never been
            tested, we arrange the lead and cadmium migration test before a pilot run.
          </Callout>
        </PageSection>

        <PageSection tone="dark" label="Related">
          <Related
            items={[
              { href: "/crafts/yamanaka-lacquer", label: "Yamanaka lacquerware", note: "The other half of a Japanese table setting." },
              { href: "/crafts/seki-blades", label: "Seki blades", note: "Knives from Gifu, engraved on request." },
              { href: "/wholesale", label: "Wholesale", note: "Volumes, quoting and export from Japan." },
            ]}
          />
        </PageSection>

        <SectionContact />
      </main>
      <Footer />
    </>
  );
}