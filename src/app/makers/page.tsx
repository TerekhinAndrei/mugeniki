import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, FactGrid, Callout } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";

export const metadata: Metadata = {
  title: "The Maker Index — How We Verify a Workshop",
  description:
    "What a verified maker card contains: name in Japanese and Latin script, region, technique, capacity, minimum order, lead time, export experience, languages, risks.",
  alternates: { canonical: "/makers" },
};

const coverage = [
  { region: "Arita, Saga", technique: "Porcelain", count: "2 workshops", status: "In conversation" },
  { region: "Kyoto", technique: "Kyō-yaki ceramics", count: "2 workshops", status: "In conversation" },
  { region: "Yamanaka, Ishikawa", technique: "Lacquerware", count: "2 workshops", status: "In conversation" },
  { region: "Seki, Gifu", technique: "Blades and scissors", count: "1 workshop", status: "In conversation" },
];

export default function MakersPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Maker index"
          title="Every field confirmed, or marked unknown"
          lead="The card behind a quotation. If a field has not been confirmed by the workshop, it says so — we would rather show a gap than a plausible number."
        />

        <PageSection label="What a card contains" title="Eleven fields, no adjectives">
          <FactGrid
            items={[
              { label: "Name", value: "Japanese and Latin script, plus the name the workshop uses commercially." },
              { label: "Region and city", value: "Prefecture and town, so a buyer can see the logistics." },
              { label: "Technique", value: "The specific craft, not the category — underglaze porcelain, not 'ceramics'." },
              { label: "Founded", value: "Year of foundation, and whether the current maker is the second or fifth generation." },
              { label: "Products", value: "What they actually make now, in the shapes and sizes a buyer would order." },
              { label: "Price range", value: "Retail range as published by the workshop, and ex-works price at three volumes." },
              { label: "Minimum order", value: "Confirmed in writing. Marked unknown where the workshop has not decided." },
              { label: "Capacity", value: "Pieces per month and the current queue in weeks." },
              { label: "Lead time", value: "Order to ready-for-export, including firing and finishing." },
              { label: "Export experience", value: "Never exported, exported occasionally, or already working with foreign clients." },
              { label: "Languages and risks", value: "Who answers in English, and what we would worry about as a buyer." },
            ]}
          />
        </PageSection>

        <PageSection tone="dark" label="Coverage" title="The first wave">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
              <thead>
                <tr>
                  {["Region", "Technique", "Workshops", "Status"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0.9rem 0.75rem",
                        borderBottom: "1px solid rgba(255,255,255,.18)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--light)",
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
                    <td style={{ padding: "1rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,.08)", color: "#fff" }}>{r.region}</td>
                    <td style={{ padding: "1rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.6)" }}>{r.technique}</td>
                    <td style={{ padding: "1rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.6)" }}>{r.count}</td>
                    <td style={{ padding: "1rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,.08)", color: "rgba(255,255,255,.6)" }}>{r.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop: "2rem", color: "rgba(255,255,255,.7)" }}>
            <Prose
              dark
              paragraphs={[
                "Seven workshops are in conversation for the first collections. None of them has agreed to be named publicly yet, so this page describes the region and the technique and shares the name in conversation.",
                "That is deliberate. A maker's name and contact details are published only with their agreement, and a sourcing partner who puts a kiln's email on a public page before asking has not understood the business.",
              ]}
            />
          </div>
        </PageSection>

        <PageSection label="Why it matters" title="The card is the product">
          <Prose
            paragraphs={[
              "Anyone can list Japanese craft regions. What a buyer cannot get from a search engine is whether a specific kiln can produce six hundred identical plates by June, whether its glaze has been tested, and whether anyone there will answer an email in English.",
              "We check those things by asking, in Japanese, and by following up until there is an answer. Where the answer is 'no' or 'we do not know', the card says so, and the recommendation changes.",
            ]}
          />
          <Callout>
            A card is not a certificate. It is a record of what a workshop told us on a date, and it is updated
            when the workshop tells us something different.
          </Callout>
        </PageSection>

        <PageSection tone="dark" label="Related">
          <Related
            items={[
              { href: "/wholesale", label: "Wholesale", note: "How a card turns into a quotation." },
              { href: "/crafts", label: "Techniques", note: "The three regions we source most." },
            ]}
          />
        </PageSection>

        <SectionContact />
      </main>
      <Footer />
    </>
  );
}