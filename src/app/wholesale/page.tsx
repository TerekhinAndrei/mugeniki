import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, FactGrid, NumberedList, Callout } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";

export const metadata: Metadata = {
  title: "Japanese Tableware Wholesale — Ceramics, Lacquerware, Blades",
  description:
    "Wholesale Japanese tableware from named workshops in Arita, Kyoto, Yamanaka and Seki. Verified capacity, EU and US food-contact documentation, export handled.",
  alternates: { canonical: "/wholesale" },
};

export default function WholesalePage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Wholesale"
          title="Japanese tableware, wholesale, from workshops we can name"
          lead="Ceramics, lacquerware and blades sourced directly from manufacturers in Arita, Kyoto, Yamanaka and Seki — with production, compliance and export coordinated from Japan."
        />

        <PageSection label="The problem" title="Three or four layers between you and the kiln">
          <Prose
            paragraphs={[
              "Most Japanese tableware sold in Europe arrives through trading houses. By the time a plate reaches a hotel in Berlin, nobody in the chain can answer two questions that matter: who made it, and what happens if you need six hundred more of the same in April.",
              "We work the other way. Mugeniki deals with the workshop directly — the kiln in Arita, the turner in Yamanaka, the blade smith in Seki — and coordinates the parts a small maker cannot do alone: documentation, testing, packing, and the conversation with your buying team.",
              "Not every workshop exports. Most of these have never shipped abroad, and a few prefer not to. You hear which is which before you build a collection on one.",
            ]}
          />
        </PageSection>

        <PageSection
          tone="dark"
          label="What a quotation contains"
          title="Every quote names the workshop"
        >
          <div style={{ color: "rgba(255,255,255,.7)" }}>
            <Prose
              dark
              paragraphs={[
                "Every quotation we send carries the same six points, because they decide whether an order is possible at all.",
              ]}
            />
          </div>
          <FactGrid
            items={[
              { label: "Workshop", value: "Name, city and technique — the maker behind the price, not a trading company." },
              { label: "Capacity", value: "How many pieces a month the workshop can produce, and what is already in its queue." },
              { label: "Price at three volumes", value: "Ex-works price at 300, 600 and 1,000 pieces of one design." },
              { label: "Lead time", value: "From confirmed order to goods ready for export, in weeks, including the firing schedule." },
              { label: "Food contact", value: "Test documentation for EU 1935/2004 and LFGB, and FDA for the United States, where the workshop has it." },
              { label: "Packing and export", value: "Branded box, Japanese paper, palletisation, HS code and the export route we would use." },
            ]}
          />
        </PageSection>

        <PageSection label="Landed cost" title="How a landed price is built">
          <Prose
            paragraphs={[
              "An ex-works price in Japan is not the price you pay. Between the workshop's door and your warehouse sit five costs, and every one of them is quotable before you commit.",
            ]}
          />
          <FactGrid
            items={[
              { label: "Ex-works", value: "The workshop's own price per piece, packing materials included." },
              { label: "Freight", value: "Sea freight by volume — around €180 per m³ on the routes we use, about 45 days door to door." },
              { label: "Handling", value: "Origin and destination charges, roughly €800 a shipment, spread across the pieces in it." },
              { label: "Packing", value: "Branded box and Japanese paper, around €2.20 a piece; pallets quoted separately." },
              { label: "Risk and money", value: "Two per cent breakage on ceramics and a financing line of one and a half per cent." },
              { label: "Duty", value: "Zero today for ceramics and cutlery entering the EU; we verify the tariff code before the first shipment." },
            ]}
          />
          <Prose
            paragraphs={[
              "One example we can show, because the maker quoted it to us: a kitchen shears from Seki at ¥1,800 ex-works lands near €14 a piece at six hundred pieces, wholesale sits around €23, and the European shelf is near €46.",
              "Two of the nine workshops in the catalogue have given us trade terms. The rest price per design, and we say so on the quotation instead of estimating a number for you.",
            ]}
          />
        </PageSection>

        <PageSection label="Volumes" title="What this is built for">
          <NumberedList
            items={[
              { title: "Pilot: 300–600 pieces", text: "One design, one workshop, enough to test a market and a shelf without committing a season's budget." },
              { title: "Annual: 1,000–3,000 pieces", text: "Repeat production across a small collection, with the same workshop or a pair of workshops on one technique." },
              { title: "Custom: private collections", text: "Your shape, your glaze, your box. Development time depends on the workshop and is quoted before anything starts." },
              { title: "Below 300 pieces", text: "Possible with several of these workshops. Tell us the quantity and the date, and we will say whether it can be done." },
            ]}
          />
          <Callout>
            Below three hundred pieces we work case by case — a private label, a single restaurant or a
            corporate gift run can make sense at that size.
          </Callout>
        </PageSection>

        <PageSection tone="dark" label="Where next">
          <Related
            items={[
              { href: "/crafts/arita-porcelain", label: "Arita porcelain", note: "Blue-and-white, celadon and everyday porcelain from kilns in Saga." },
              { href: "/crafts/yamanaka-lacquer", label: "Yamanaka lacquerware", note: "Turned wood and urushi for bowls, trays and bento." },
              { href: "/crafts/seki-blades", label: "Seki blades", note: "Kitchen knives forged and finished in Gifu." },
              { href: "/hospitality", label: "For hospitality", note: "Tableware and in-room objects for hotels and restaurants." },
              { href: "/engraving", label: "Engraved gifts", note: "Knives with a name on them, from fifty pieces." },
              { href: "/restoration", label: "Restoration", note: "Repair and re-lacquering by the workshops themselves." },
            ]}
          />
        </PageSection>

        <SectionContact />
      </main>
      <Footer />
    </>
  );
}