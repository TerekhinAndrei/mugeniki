import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";
import CatalogueGrid from "@/components/CatalogueGrid";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Catalogue — Japanese Ceramics, Tea Wares and Lacquer",
  description:
    "Donburi, plates, mugs, tea bowls and lacquer from workshops in Arita and Kyoto, with retail prices in Japan. Wholesale terms quoted per order.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Catalogue"
          title="Pieces from Arita and Kyoto, priced as the workshops price them"
          lead="Donburi, plates, mugs, tea bowls, a water jar for tea ceremony — thirteen pieces from two workshops, with the retail price in Japan shown on each card."
        />

        <PageSection label="Prices" title="Japanese retail, shown in yen">
          <Prose
            paragraphs={[
              "Prices are what a customer pays in the workshop's own shop, consumption tax included. They give you a sense of where a piece sits against your own retail, and where a collection could be built.",
              "Wholesale is a separate conversation: ex-works price, minimum order, packing and lead time are quoted for your design, your volume and your market. Pieces marked “price on request” are made to order at a level the workshop prices per commission rather than per item.",
              "Most of the tableware is made to order rather than pulled from a shelf. Allow four to eight weeks from confirmation to a fired batch, longer for a new mould or a new glaze.",
            ]}
          />
        </PageSection>

        <PageSection label="The collection" title="Filter by what you need" tone="dark">
          <CatalogueGrid products={products} />
        </PageSection>

        <PageSection label="Next step" title="From a page to a purchase order">
          <Prose
            paragraphs={[
              "Choose the pieces you want to see and we come back with the workshop's own answers: whether the design can be made at your volume, what it costs ex-works, and how long from order to a pallet ready for export.",
              "Samples come before a purchase order, always. For ceramics that means a fired piece from the same mould and glaze batch, not a photograph.",
            ]}
          />
          <Related
            items={[
              { href: "/wholesale", label: "Wholesale terms", note: "Volumes, quotation and lead times." },
              { href: "/hospitality", label: "For hospitality", note: "Tableware built for daily service." },
              { href: "/makers", label: "The workshops", note: "Where they work and what they make." },
            ]}
          />
        </PageSection>
      </main>
      <SectionContact />
      <Footer />
    </>
  );
}