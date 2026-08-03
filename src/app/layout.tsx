import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mugeniki — Japanese Craftsmanship. Global Business.",
  description:
    "Mugeniki connects exceptional Japanese manufacturers with companies worldwide. Strategic sourcing, partnership development, and export coordination.",
  openGraph: {
    title: "Mugeniki — Japanese Craftsmanship. Global Business.",
    description:
      "Connecting exceptional Japanese manufacturers with companies worldwide.",
    url: "https://www.mugeneki.com",
    siteName: "Mugeniki",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable}`}
      style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
    >
      <body>{children}</body>
    </html>
  );
}
