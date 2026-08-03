const links = ["About", "Services", "Industries", "Regions", "Case Studies", "Contact"];
const hrefs = ["#intro", "#services", "#industries", "#regions", "#cases", "#contact"];

export default function Footer() {
  return (
    <footer className="px-16 py-16" style={{ background: "var(--black)" }}>
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
        <div>
          <p
            className="text-white mb-1"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.3rem", fontWeight: 400 }}
          >
            Mugeniki
          </p>
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "rgba(255,255,255,.35)" }}>
            Japanese Craftsmanship. Global Partnerships.
          </p>
        </div>

        <ul className="flex flex-wrap gap-8 list-none p-0 m-0 justify-end">
          {links.map((link, i) => (
            <li key={link}>
              <a
                href={hrefs[i]}
                className="footer-link no-underline"
                style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,.45)" }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="max-w-[1200px] mx-auto mt-10 pt-8"
        style={{ borderTop: "1px solid rgba(255,255,255,.08)", fontSize: "0.7rem", color: "rgba(255,255,255,.2)" }}
      >
        &copy; 2026 Mugeniki. All rights reserved.
      </div>

    </footer>
  );
}
