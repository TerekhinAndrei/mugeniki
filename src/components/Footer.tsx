import Link from "next/link";

const links = [
  { label: "About", href: "/#intro" },
  { label: "Catalogue", href: "/collections" },
  { label: "Wholesale", href: "/wholesale" },
  { label: "Hospitality", href: "/hospitality" },
  { label: "Craft", href: "/crafts" },
  { label: "Engraving", href: "/engraving" },
  { label: "Restoration", href: "/restoration" },
  { label: "Makers", href: "/makers" },
  { label: "Contact", href: "/#contact" },
];

const linkStyle = {
  fontSize: "0.68rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,.72)",
  display: "inline-flex",
  alignItems: "center",
  minHeight: 44,
};

export default function Footer() {
  return (
    <footer className="px-6 md:px-16 py-16" style={{ background: "var(--black)" }}>
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
        <div>
          <p
            className="text-white mb-1"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", fontWeight: 400 }}
          >
            Mugeniki
          </p>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(255,255,255,.55)" }}>
            Japanese Craftsmanship. Global Partnerships.
          </p>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-1 list-none p-0 m-0 justify-end">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="footer-link no-underline" style={linkStyle}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="max-w-[1200px] mx-auto mt-10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        style={{ borderTop: "1px solid rgba(255,255,255,.08)", fontSize: "0.7rem", color: "rgba(255,255,255,.4)" }}
      >
        <span>&copy; 2026 Mugeniki. All rights reserved.</span>
        <a
          href="https://rankcaster.ai"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="AI visibility tracked by RankCaster AI"
          style={{ opacity: 0.55, lineHeight: 0, display: "inline-flex", alignItems: "center", minHeight: 44 }}
        >
          <picture>
            <source media="(prefers-color-scheme: dark)" srcSet="https://rankcaster.ai/badge-dark.svg" />
            <img src="https://rankcaster.ai/badge-light.svg" alt="AI Visibility tracked by RankCaster AI" width={110} height={18} style={{ display: "block" }} />
          </picture>
        </a>
      </div>

    </footer>
  );
}