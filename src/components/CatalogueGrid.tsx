"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, formatYen } from "@/data/products";
import { getPhoto, photoLine } from "@/lib/photos";

function ProductImage({
  slug,
  swatch,
  name,
  nameJa,
  technique,
}: {
  slug: string;
  swatch: string;
  name: string;
  nameJa: string;
  technique: string;
}) {
  const photo = getPhoto(slug);
  if (photo) {
    return (
      <div className="swatch" style={{ background: swatch }}>
        <Image
          src={photo.local}
          alt={`${name} — archive photograph`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    );
  }
  return (
    <div className="swatch swatch-word" style={{ background: swatch }}>
      <span className="swatch-word-ja">{nameJa}</span>
      <span className="swatch-word-note">{technique}</span>
    </div>
  );
}

export default function CatalogueGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<string>("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    [products]
  );

  const shown = useMemo(
    () => (filter === "All" ? products : products.filter((p) => p.category === filter)),
    [filter, products]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((c) => {
          const active = c === filter;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              aria-pressed={active}
              className="tap-target px-4 py-2 border transition-colors"
              style={{
                borderColor: active ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.28)",
                background: active ? "rgba(255,255,255,.94)" : "transparent",
                color: active ? "var(--black)" : "rgba(255,255,255,.88)",
                fontSize: "0.7rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {shown.map((p) => {
          const photo = getPhoto(p.slug);
          return (
            <Link
              key={p.slug}
              href={`/collections/${p.slug}`}
              className="card"
              style={{ background: "var(--offblack)", borderColor: "rgba(255,255,255,.16)", color: "#fff" }}
            >
              <ProductImage
                slug={p.slug}
                swatch={p.swatch}
                name={p.name}
                nameJa={p.nameJa}
                technique={p.technique}
              />
              <div className="p-6 flex flex-col flex-1">
                <p
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,.62)",
                    marginBottom: "0.6rem",
                  }}
                >
                  {p.region} · {p.category}
                </p>
                <h3
                  className="card-title"
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    lineHeight: 1.25,
                    marginBottom: "0.3rem",
                    textDecorationThickness: "1px",
                  }}
                >
                  {p.name}
                </h3>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,.7)", marginBottom: "1rem" }}>
                  {p.nameJa} · {p.makerJa}
                </p>
                <p style={{ fontSize: "0.9rem", marginTop: "auto", color: "rgba(255,255,255,.92)" }}>
                  {formatYen(p.priceJpy)}
                  <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,.55)", marginLeft: ".5rem" }}>
                    {p.priceJpy !== null
                      ? (p.priceNote ?? "").startsWith("EXW")
                        ? "EXW Japan"
                        : "retail in Japan"
                      : ""}
                  </span>
                </p>
                {photo && (
                  <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,.5)", marginTop: ".5rem" }}>
                    Archive photograph · {photoLine(photo)}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {shown.length === 0 && (
        <p style={{ color: "rgba(255,255,255,.7)" }}>Nothing in this category yet.</p>
      )}
    </div>
  );
}