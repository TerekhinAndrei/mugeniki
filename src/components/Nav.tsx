"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/collections", label: "Catalogue" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/hospitality", label: "Hospitality" },
  { href: "/crafts", label: "Craft" },
  { href: "/makers", label: "Makers" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const dark = solid && !open;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 md:px-16 transition-all duration-300"
        style={{
          paddingTop: dark ? "0.9rem" : "1.4rem",
          paddingBottom: dark ? "0.9rem" : "1.4rem",
          background: dark ? "rgba(248,246,242,0.94)" : "transparent",
          backdropFilter: dark ? "saturate(180%) blur(10px)" : "none",
          borderBottom: `1px solid ${dark ? "var(--line)" : "transparent"}`,
        }}
      >
        <Link
          href="/"
          className="no-underline tracking-widest text-lg tap-target"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontWeight: 500,
            color: dark ? "var(--black)" : "#ffffff",
          }}
        >
          Mugeniki
        </Link>

        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="no-underline tracking-widest uppercase tap-target"
                style={{
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  fontWeight: 400,
                  color: dark ? "var(--dark)" : "rgba(255,255,255,0.92)",
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden flex flex-col justify-center gap-[5px] bg-transparent border-0 p-2 -mr-2 tap-target"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span
            className="block w-6 h-px"
            style={{ background: dark ? "var(--black)" : "#ffffff" }}
          />
          <span
            className="block w-6 h-px"
            style={{ background: dark ? "var(--black)" : "#ffffff" }}
          />
          <span
            className="block w-6 h-px"
            style={{ background: dark ? "var(--black)" : "#ffffff" }}
          />
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[99] flex flex-col justify-center items-start gap-7 px-8 overflow-y-auto"
          style={{ background: "var(--black)" }}
        >
          <button
            className="absolute top-4 right-4 text-xl bg-transparent border-0 tap-target"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            ✕
          </button>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="no-underline tap-target"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "2rem",
                fontWeight: 400,
                color: "rgba(255,255,255,0.92)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}