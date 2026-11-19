import photos from "@/data/photos.json";

export type PhotoCredit = {
  title: string;
  thumb: string;
  page: string;
  w: number;
  h: number;
  license: string;
  licenseUrl: string;
  artist: string;
  credit: string;
  local: string;
  bytes: number;
};

const table = photos as Record<string, PhotoCredit>;

export function getPhoto(slug: string): PhotoCredit | null {
  return table[slug] ?? null;
}

/** Short line for a card: licence and collection */
export function photoLine(p: PhotoCredit): string {
  return `${p.license} · ${p.artist}`;
}

/** Museum / collection name pulled out of the Commons credit field */
export function photoCollection(p: PhotoCredit): string {
  const raw = (p.credit || "").replace(/\s+/g, " ").trim();
  return raw.length > 0 ? raw.slice(0, 120) : "Wikimedia Commons";
}