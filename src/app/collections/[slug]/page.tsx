import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import PageSection, { Prose, FactGrid } from "@/components/PageSection";
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
                        Photography by the workshop is on its way.
                      </p>
                    </>
                  );
                }
                return (
                  <>
                    <div style={{ position: "relative", aspectRatio: "4 / 3", border: "1px solid var(--line)", overflow: "hidden" }}>
                      <Image
                        src={photo.local}
                        alt={`${p.name} — ${p.technique}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                        priority
                      />
                    </div>
                    <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "0.75rem", lineHeight: 1.6 }}>
                      Archive photograph of comparable ware. Photo {photo.artist},{" "}
                      {photo.license},{" "}
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
                  { label: "Price in Japan", value: formatYen(p.priceJpy) },
                ]}
              />
              <p style={{ marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Wholesale price, minimum order, packing and lead time are quoted for your order
                and your market.
              </p>
            </div>
          </div>
        </PageSection>

        <PageSection label="The workshop" title={p.maker} tone="dark">
          <Prose dark paragraphs={[p.notes]} />
          <p style={{ marginTop: "1rem" }}>
            <a
              href={p.source}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#fff", textDecoration: "underline", textUnderlineOffset: 4, fontSize: "0.85rem" }}
            >
              {p.maker} — the workshop&apos;s own shop →
            </a>
          </p>
          <Related
            items={[
              { href: "/#contact", label: "Ask for a quotation", note: `Tell us the volume you need for ${p.name.toLowerCase()}.` },
              { href: "/wholesale", label: "How quotations work", note: "What a quote from us contains." },
              { href: "/makers", label: "The workshops", note: "The others we work with." },
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