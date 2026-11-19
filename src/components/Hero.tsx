"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      sectionRef.current?.classList.add("loaded");
    }, 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-svh flex items-end overflow-hidden"
      style={{ background: "var(--black)" }}
    >
      {/* Background image */}
      <div
        className="hero-bg absolute inset-0 transition-transform duration-[8000ms] ease-out scale-[1.04]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.15) 0%, rgba(0,0,0,.55) 100%), url('https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1800&q=80') center/cover no-repeat",
        }}
      />

      <div
        className="relative px-6 md:px-16 pb-16 md:pb-20 max-w-3xl w-full"
        style={{ paddingBottom: "clamp(3rem, 8vw, 5rem)" }}
      >
        <p
          className="mb-5 text-[var(--light)]"
          style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase" }}
        >
          Japanese Craftsmanship · Global Business
        </p>
        <h1
          className="text-white leading-[1.1] mb-6"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 300,
          }}
        >
          Connecting Japan&apos;s
          <br />
          <em style={{ fontStyle: "italic", fontWeight: 300 }}>finest makers</em>
          <br />
          with the world.
        </h1>
        <p
          className="mb-10 max-w-md"
          style={{ fontSize: "0.9rem", lineHeight: 1.8, color: "rgba(255,255,255,.72)" }}
        >
          Mugeniki helps international brands, retailers, hospitality groups, and organizations
          discover, source, and develop authentic Japanese products through trusted local partnerships.
        </p>
        <a
          href="#contact"
          className="inline-block bg-white text-[var(--black)] no-underline transition-colors hover:bg-[var(--rule)]"
          style={{
            padding: "0.85rem 2.2rem",
            fontSize: "0.7rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Start a Partnership
        </a>
      </div>

      <style>{`
        #hero.loaded .hero-bg { transform: scale(1); }
      `}</style>
    </section>
  );
}
