"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const links = [
  { href: "#intro", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#industries", label: "Industries" },
  { href: "#regions", label: "Regions" },
  { href: "#cases", label: "Case Studies" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-16 py-6 mix-blend-difference"
        style={{ mixBlendMode: "difference" }}
      >
        <Link
          href="#hero"
          className="text-white no-underline tracking-widest text-lg"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontWeight: 400 }}
        >
          Mugeniki
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none m-0 p-0">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-white no-underline text-xs tracking-widest uppercase opacity-85 hover:opacity-100 transition-opacity"
                style={{ fontSize: "0.68rem", letterSpacing: "0.18em" }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer bg-transparent border-0 p-0"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <span className="block w-6 h-px bg-white" />
          <span className="block w-6 h-px bg-white" />
          <span className="block w-6 h-px bg-white" />
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[99] flex flex-col justify-center items-center gap-10"
          style={{ background: "var(--black)" }}
        >
          <button
            className="absolute top-6 right-16 text-white text-2xl bg-transparent border-0 cursor-pointer opacity-60 hover:opacity-100"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white no-underline opacity-75 hover:opacity-100 transition-opacity"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "2rem",
                fontWeight: 300,
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
