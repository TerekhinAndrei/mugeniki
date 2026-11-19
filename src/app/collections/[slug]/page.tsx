import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, FactGrid, Callout } from "@/components/PageSection";
import Related from "@/components/Related";
import SectionContact from "@/components/SectionContact";
import Image from "next/image";
import { products, getProduct, formatYen } from "@/data/products";
import { getPhoto } from "@/lib/photos";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Not found" };
  return {
    title: `${p.name} — ${p.maker} (${p.region})`,
    description: `${p.nameJa} by ${p.makerJa}, ${p.regionJa}. ${p.technique}. Retail price in Japan and wholesale enquiry.`,
    alternates: { canonical: `/collections/${p.slug}` },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();

  const others = products.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);

  return (
    <>
      <Nav />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            alternateName: p.nameJa,
            category: p.category,
            description: p.use,
            brand: { "@type": "Brand", name: p.maker },
            manufacturer: { "@type": "Organization", name: p.maker },
            countryOfOrigin: "JP",
            material: p.technique,
            offers: {
              "@type": "Offer",
              priceCurrency: "JPY",
              price: p.priceJpy ?? undefined,
              availability:
                p.priceJpy !== null
                  ? "https://schema.org/InStock"
                  : "https://schema.org/PreOrder",
              url: `https://mugeneki.com/collections/${p.slug}`,
              seller: { "@type": "Organization", name: p.maker },
              priceValidUntil: undefined,
            },
          }),
        }}
      />
      <main>
        <PageHero label={`${p.category} · ${p.region}`} title={p.name} lead={p.use} />

        <PageSection label="The piece" title={p.nameJa}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              {(() => {
                const photo = getPhoto(p.slug);
                if (!photo) {
                  return (
                    <>
                      <div className="swatch" style={{ background: p.swatch, border: "1px solid var(--line)" }} aria-hidden="true" />
                      <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "0.75rem" }}>
                        No open-licence photograph yet — we ask the workshop for one.
                      </p>
                    </>
                  );
                }
                return (
                  <>
                    <div style={{ position: "relative", aspectRatio: "4 / 3", border: "1px solid var(--line)", overflow: "hidden" }}>
                      <Image
                        src={photo.local}
                        alt={`Reference image, not the item for sale — ${photo.title.replace(/^File:/, "")}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                    <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "0.75rem", lineHeight: 1.6 }}>
                      Reference image, not the item for sale: {photo.title.replace(/^File:/, "").replace(/\.(jpg|jpeg|png|JPG)$/, "")}.
                      Photo {photo.artist}, {photo.license},{" "}
                      <a href={photo.page} target="_blank" rel="noopener noreferrer" style={{ color: "var(--dark)", textDecoration: "underline" }}>
                        Wikimedia Commons
                      </a>.
                    </p>
                  </>
                );
              })()}
            </div>
            <div>
              <FactGrid
                items={[
                  { label: "Workshop", value: `${p.maker} (${p.makerJa})` },
                  { label: "Region", value: `${p.region} — ${p.regionJa}` },
                  { label: "Technique", value: p.technique },
                  { label: "Size", value: p.size },
                  { label: "Retail price in Japan", value: formatYen(p.priceJpy) },
                  { label: "Basis of price", value: p.priceNote },
                  { label: "Minimum order", value: p.moq },
                  { label: "Lead time", value: p.leadTime },
                  { label: "Export status", value: p.exportStatus },
                ]}
              />
            </div>
          </div>
        </PageSection>

        <PageSection label="What we know, and what we do not" title="Written down, with a date" tone="dark">
          <Prose
            dark
            paragraphs={[
              p.notes,
              `Source: ${p.sourceLabel}, read on ${p.checked}. If a field above says "not published", the workshop has not stated it publicly and we will not fill the gap with an assumption — we ask them.`,
            ]}
          />
          <p style={{ marginTop: "1rem" }}>
            <a
              href={p.source}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: 4, fontSize: "0.85rem" }}
            >
              {p.sourceLabel} →
            </a>
          </p>
          <Callout>
            A price in yen, tax included, is a reference. The number that decides an order is the
            ex-works quotation at your volume, and it arrives with a lead time attached.
          </Callout>
          <Related
            items={[
              { href: "/#contact", label: "Ask for a quotation", note: `State the volume you need for ${p.name.toLowerCase()}.` },
              { href: "/wholesale", label: "How quotations work", note: "The six fields every quote carries." },
              { href: "/makers", label: "Maker index", note: "Where this workshop sits among the others." },
            ]}
          />
        </PageSection>

        {others.length > 0 && (
          <PageSection label="Same category" title="Also from this shelf">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {others.map((o) => (
                <Link key={o.slug} href={`/collections/${o.slug}`} className="card">
                  <div className="swatch" style={{ background: o.swatch }} aria-hidden="true" />
                  <div className="p-6">
                    <p style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)", marginBottom: ".5rem" }}>
                      {o.maker} · {o.region}
                    </p>
                    <h3 className="card-title" style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.15rem", fontWeight: 500 }}>
                      {o.name}
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginTop: ".4rem" }}>{formatYen(o.priceJpy)}</p>
                  </div>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: "2rem" }}>
              <Link href="/collections" style={{ color: "var(--dark)", textDecoration: "underline", textUnderlineOffset: 4 }}>
                See the whole catalogue →
              </Link>
            </p>
          </PageSection>
        )}
      </main>
      <SectionContact />
      <Footer />
    </>
  );
}