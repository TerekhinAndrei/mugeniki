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

const siteUrl = "https://mugeneki.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mugeniki — Japanese Craftsmanship. Global Business.",
    template: "%s | Mugeniki",
  },
  description:
    "Mugeniki connects exceptional Japanese manufacturers with companies worldwide. Strategic sourcing, partnership development, and export coordination.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mugeniki — Japanese Craftsmanship. Global Business.",
    description:
      "Connecting exceptional Japanese manufacturers with companies worldwide.",
    url: siteUrl,
    siteName: "Mugeniki",
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mugeniki",
  url: siteUrl,
  description:
    "Sourcing and export coordination for Japanese craft manufacturers — ceramics, lacquerware and blades for retail, hospitality and corporate gifting.",
  areaServed: ["DE", "FR", "GB", "US", "AE"],
  knowsLanguage: ["en", "ja"],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Japanese tableware wholesale" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Custom manufacturing in Japan" },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Restoration of Japanese ceramics and lacquerware",
      },
    },
  ],
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
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}