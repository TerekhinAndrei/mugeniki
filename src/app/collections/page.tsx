import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, FactGrid, Callout } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";
import CatalogueGrid from "@/components/CatalogueGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Catalogue — Japanese Ceramics, Tea Wares and Lacquer",
  description:
    "Real items from named Japanese workshops, with the workshop's own published price and the date we read it. Wholesale and export terms are quoted per order.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  const withPrice = products.filter((p) => p.priceJpy !== null).length;

  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Catalogue"
          title="What these workshops actually make"
          lead="Each entry below comes from a workshop's own shop or works page, with the price they publish and the date we read it. Where a price is not published, the field says so instead of holding a guess."
        />

        <PageSection label="How to read this" title="Prices are Japanese retail, not wholesale">
          <Prose
            paragraphs={[
              "Every figure here is the price a Japanese customer pays in the workshop's own shop, tax included. It is a floor and a reference, not an offer: wholesale is negotiated per order, and none of these workshops publishes an export price, a minimum order or a capacity figure.",
              `${withPrice} of ${products.length} entries carry a published price. The rest are real products whose price the workshop does not publish — those read "price on request", because that is what they are.`,
            ]}
          />
          <FactGrid
            items={[
              { label: "What is verified", value: "Item name, workshop, region, technique and the retail price where one is published." },
              { label: "What is not", value: "Minimum order, monthly capacity, ex-works price, packing and export documents." },
              { label: "How terms are set", value: "By written quotation from the workshop, per design and per volume." },
            ]}
          />
          <Callout>
            Nothing on this page is a stock list. Several items are made to order and the kiln says
            so openly; an order in April may be fired in May.
          </Callout>
        </PageSection>

        <PageSection label="The catalogue" title="Filter by what you need" tone="dark">
          <CatalogueGrid products={products} />
        </PageSection>

        <PageSection label="What comes next" title="From a page to a purchase order">
          <Prose
            paragraphs={[
              "Pick the pieces you want to see, and we ask the workshop three questions before any price reaches you: can they make this design at your volume, what does it cost ex-works, and how long from order to a pallet ready for export.",
              "Samples come before a purchase order, always. For ceramics that means a fired piece from the same mould and glaze batch, not a photograph.",
            ]}
          />
          <Related
            items={[
              { href: "/wholesale", label: "Wholesale terms", note: "Volumes, quotation fields and lead times." },
              { href: "/hospitality", label: "For hospitality", note: "Collections that survive daily service." },
              { href: "/makers", label: "The maker index", note: "Who we are in conversation with, and where." },
            ]}
          />
        </PageSection>
      </main>
      <SectionContact />
      <Footer />
    </>
  );
}