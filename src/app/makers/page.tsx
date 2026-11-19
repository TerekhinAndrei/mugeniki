import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, FactGrid } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";

export const metadata: Metadata = {
  title: "The Workshops — Arita, Kyoto, Yamanaka and Seki",
  description:
    "The Japanese workshops behind the first collections: Arita porcelain, Kyoto tableware, Yamanaka lacquer and Seki blades. Names shared on request, with each workshop's agreement.",
  alternates: { canonical: "/makers" },
};

const coverage = [
  { region: "Arita, Saga", technique: "Porcelain", count: "2 workshops", makes: "Donburi, plates, mugs, soba cups" },
  { region: "Kyoto", technique: "Kyō-yaki ceramics", count: "2 workshops", makes: "Tea bowls, hotel tableware, mizusashi" },
  { region: "Yamanaka, Ishikawa", technique: "Lacquerware", count: "2 workshops", makes: "Bowls, trays, sake vessels" },
  { region: "Seki, Gifu", technique: "Blades and scissors", count: "1 workshop", makes: "Kitchen knives, engraved gift runs" },
];

export default function MakersPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Workshops"
          title="Arita, Kyoto, Yamanaka, Seki"
          lead="Seven workshops sit behind the first collections: porcelain kilns of five to twenty people, two lacquer workshops, a blade maker. Their names are shared with you on request, once the workshop has agreed."
        />

        <PageSection label="Coverage" title="Who makes what, and where">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr>
                  {["Region", "Craft", "Workshops", "What they make"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0.9rem 0.75rem",
                        borderBottom: "1px solid var(--line)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        fontWeight: 500,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coverage.map((r) => (
                  <tr key={r.region}>
                    <td style={{ padding: "1rem 0.75rem", borderBottom: "1px solid var(--line)", color: "var(--dark)" }}>{r.region}</td>
                    <td style={{ padding: "1rem 0.75rem", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>{r.technique}</td>
                    <td style={{ padding: "1rem 0.75rem", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>{r.count}</td>
                    <td style={{ padding: "1rem 0.75rem", borderBottom: "1px solid var(--line)", color: "var(--muted)" }}>{r.makes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PageSection>

        <PageSection tone="dark" label="Names" title="Shared with you, not published">
          <Prose
            dark
            paragraphs={[
              "A workshop's name and address belong to the workshop. We ask before we print them, and until that answer comes, a card describes the region and the technique and the name goes to you privately — in the quotation, with photographs of the actual work.",
              "In practice this takes one conversation. Tell us the category you are buying and we will name the workshops that fit, with their capacity and their export position.",
            ]}
          />
        </PageSection>

        <PageSection label="With a quotation" title="What you learn about each maker">
          <FactGrid
            items={[
              { label: "Name and place", value: "The workshop's name in Japanese and Latin script, its town, and how goods would leave it." },
              { label: "Craft", value: "The specific technique — underglaze porcelain, urushi lacquer, kasumi-finished steel." },
              { label: "What they make now", value: "Current shapes and sizes, not a catalogue from 1998." },
              { label: "Capacity", value: "Pieces a month and how far the queue is booked." },
              { label: "Lead time", value: "From order to a pallet ready for export, firing and finishing included." },
              { label: "Export position", value: "Whether the workshop has shipped abroad, and who handles it if not." },
              { label: "Language", value: "Whether the workshop answers in English, or we translate every exchange." },
              { label: "Risk", value: "What we would watch as a buyer: a clay body that varies, a single kiln, a family succession question." },
            ]}
          />
        </PageSection>

        <PageSection tone="dark" label="Related">
          <Related
            items={[
              { href: "/collections", label: "The collection", note: "Pieces in stock and made to order." },
              { href: "/wholesale", label: "Wholesale", note: "Volumes, quotation and lead times." },
              { href: "/crafts", label: "Techniques", note: "The three crafts we source most." },
            ]}
          />
        </PageSection>

        <SectionContact />
      </main>
      <Footer />
    </>
  );
}