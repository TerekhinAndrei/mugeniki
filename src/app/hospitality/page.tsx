import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, FactGrid, NumberedList, Callout } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";

export const metadata: Metadata = {
  title: "Japanese Tableware for Hotels and Restaurants",
  description:
    "Tableware and in-room objects for hotels, restaurants and hospitality groups — sourced from Japanese workshops, with replacement and restoration support.",
  alternates: { canonical: "/hospitality" },
};

export default function HospitalityPage() {
  return (
    <>
      <Nav />
      <main>
        <PageHero
          label="Hospitality"
          title="Tableware that survives a hundred covers a night"
          lead="For hotels, ryokan-inspired concepts and restaurants: a collection that matches the room, replaces what breaks, and can still be reordered in two years."
        />

        <PageSection label="What hotels ask for" title="Three things, every time">
          <FactGrid
            items={[
              { label: "A collection, not a product", value: "Tableware for the dining room, the bar and the room itself, in one visual language." },
              { label: "Repeatable quality", value: "A workshop that can produce the same plate next season, to the same glaze and weight." },
              { label: "A plan for breakage", value: "Either a stocked replacement line or a repair route, agreed before the first order." },
            ]}
          />
        </PageSection>

        <PageSection tone="dark" label="How a hotel project runs" title="From concept to the first service">
          <NumberedList
            items={[
              { title: "Brief and references", text: "Photos of the room, the menu, the light. We translate the look into techniques: glaze, clay body, wood or lacquer, blade finish." },
              { title: "Two workshops, three samples", text: "We approach more than one maker for the same brief, because capacity and willingness to export differ more than skill does." },
              { title: "Samples and testing", text: "Physical samples to your kitchen, plus food-contact documentation for the market you serve." },
              { title: "Production and delivery", text: "We sit in the workshop during the run, check the batch, and coordinate export and delivery dates against your opening." },
            ]}
          />
          <div style={{ color: "rgba(255,255,255,.7)" }}>
            <Prose
              dark
              paragraphs={[
                "Discontinued patterns are the quiet problem in hospitality. A hotel orders four hundred plates, breaks sixty in three years, and finds the line has ended. We ask each workshop what it can still make in five years and build the collection around that answer.",
              ]}
            />
          </div>
        </PageSection>

        <PageSection label="Compliance" title="What the kitchen and the auditor will ask">
          <Prose
            paragraphs={[
              "Anything that touches food needs documentation, and for ceramics that means migration testing for lead and cadmium, not a certificate of authenticity. Test results come with the sample; where a workshop has never had its glaze tested, we arrange the test before a piece is sold.",
              "For the European Union the frame is Regulation (EC) 1935/2004 with the ceramics directive 84/500/EEC and its amendments; Germany adds LFGB, the United States adds FDA requirements. For lacquerware we check the finish — urushi, cashew or synthetic — because that decides whether the piece is food-safe at all.",
            ]}
          />
          <Callout>
            Requirements differ by destination and are revised often. We confirm the current ones for your
            market before production starts.
          </Callout>
        </PageSection>

        <PageSection tone="dark" label="Related">
          <Related
            items={[
              { href: "/wholesale", label: "Wholesale", note: "How quoting, volumes and lead times work." },
              { href: "/restoration", label: "Restoration", note: "Repair instead of replacing a discontinued line." },
              { href: "/crafts", label: "Techniques", note: "Porcelain, lacquer and blades, region by region." },
            ]}
          />
        </PageSection>

        <SectionContact />
      </main>
      <Footer />
    </>
  );
}