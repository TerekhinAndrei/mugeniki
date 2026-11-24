"""Генерирует src/data/products.ts из scripts/catalog_data.py.

Единственный источник данных каталога — catalog_data.CATALOG. Правки вносятся
там, этот скрипт только перекладывает их в TypeScript для сайта.
"""
import json
import pathlib

from catalog_data import CATALOG

FIELDS = [
    ("slug", "slug"), ("name", "name"), ("nameJa", "nameJa"),
    ("maker", "maker"), ("makerJa", "makerJa"),
    ("region", "region"), ("regionJa", "regionJa"),
    ("technique", "technique"), ("category", "category"), ("use", "use"),
    ("size", "size"), ("priceJpy", "priceJpy"), ("priceNote", "priceNote"),
    ("moq", "moq"), ("leadTime", "leadTime"), ("exportStatus", "exportStatus"),
    ("source", "source"), ("sourceLabel", "sourceLabel"),
    ("checked", "checked"), ("swatch", "swatch"), ("notes", "notes"),
]

HEAD = '''export type Product = {
  slug: string;
  name: string;
  nameJa: string;
  maker: string;
  makerJa: string;
  region: string;
  regionJa: string;
  technique: string;
  category: "Tableware" | "Tea" | "Lacquerware" | "Blades" | "Gifting";
  use: string;
  size: string;
  priceJpy: number | null;
  priceNote: string;
  moq: string;
  leadTime: string;
  exportStatus: string;
  source: string;
  sourceLabel: string;
  checked: string;
  swatch: string;
  notes: string;
};

/**
 * Every price below is published by the workshop itself in Japan, read on the
 * date in `checked`. Most are shop prices with consumption tax included. Where
 * a workshop has given us its own trade sheet, the price is that sheet's
 * ex-works figure and `priceNote` says so. No wholesale or export price is
 * derived here: those are quoted per order. Where a workshop publishes no
 * price, the field is null and the card says so instead of guessing.
 */
export const products: Product[] = [
'''

TAIL = '''];

export const collections = Array.from(
  new Map(products.map((p) => [p.category, products.filter((x) => x.category === p.category)])).entries()
).map(([name, items]) => ({ name, items }));

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function formatYen(v: number | null) {
  if (v === null) return "Price on request";
  return `¥${v.toLocaleString("en-US")}`;
}
'''


def ts_value(key, value):
    if key == "priceJpy":
        return "null" if value is None else str(value)
    return json.dumps(value, ensure_ascii=False)


blocks = []
for p in CATALOG:
    lines = ["  {"]
    for key, _ in FIELDS:
        lines.append(f"    {key}: {ts_value(key, p.get(key))},")
    lines.append("  },")
    blocks.append("\n".join(lines))

out = pathlib.Path("src/data/products.ts")
out.write_text(HEAD + "\n".join(blocks) + "\n" + TAIL, encoding="utf-8")

with_price = sum(1 for p in CATALOG if p.get("priceJpy"))
print(f"saved {out}: {len(CATALOG)} товаров, из них с ценой {with_price}")
print("мастерские:", sorted({p["maker"] for p in CATALOG}))
