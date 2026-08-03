"use client";

import { useState } from "react";
import RevealWrapper from "./RevealWrapper";
import SectionLabel from "./SectionLabel";

const interests = [
  { value: "product-sourcing", label: "Product sourcing" },
  { value: "custom-manufacturing", label: "Custom manufacturing" },
  { value: "supplier-search", label: "Japanese supplier search" },
  { value: "market-entry", label: "Market entry support" },
  { value: "partnership", label: "Partnership opportunities" },
];

const inputStyle: React.CSSProperties = {
  fontFamily: "inherit",
  fontSize: "0.9rem",
  fontWeight: 300,
  padding: "0.85rem 1rem",
  background: "var(--white)",
  border: "1px solid var(--rule)",
  color: "var(--black)",
  outline: "none",
  width: "100%",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.65rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--mid)",
  marginBottom: "0.5rem",
  display: "block",
};

export default function SectionContact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  }

  return (
    <section id="contact" className="py-28 px-16" style={{ background: "var(--bg)" }}>
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-28 items-start">
        <RevealWrapper>
          <SectionLabel>Get in Touch</SectionLabel>
          <h2
            className="mb-5"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            Become a Mugeniki Partner
          </h2>
          <p className="mb-4" style={{ fontSize: "0.9rem", color: "var(--mid)", lineHeight: 1.8 }}>
            Whether you are looking for Japanese products, manufacturing partners, or unique
            collaborations, we can help.
          </p>
          <p style={{ fontSize: "0.9rem", color: "var(--mid)", lineHeight: 1.8 }}>
            Tell us about your project and we will be in touch within two business days.
          </p>
        </RevealWrapper>

        <RevealWrapper delay={1}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label style={labelStyle} htmlFor="company">Company Name</label>
                <input id="company" name="company" type="text" placeholder="Your company" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="fname">Your Name</label>
                <input id="fname" name="name" type="text" placeholder="Full name" required style={inputStyle} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label style={labelStyle} htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@company.com" required style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle} htmlFor="industry">Industry</label>
                <select
                  id="industry"
                  name="industry"
                  required
                  style={{ ...inputStyle, paddingRight: "2.5rem", cursor: "pointer" }}
                  defaultValue=""
                >
                  <option value="" disabled>Select industry</option>
                  <option>Hospitality</option>
                  <option>Retail</option>
                  <option>Design</option>
                  <option>Corporate Services</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div>
              <span style={labelStyle}>What are you looking for?</span>
              <div className="flex flex-col gap-2">
                {interests.map((interest) => (
                  <label key={interest.value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="interest"
                      value={interest.value}
                      style={{ width: 16, height: 16, cursor: "pointer", accentColor: "var(--black)", flexShrink: 0 }}
                    />
                    <span style={{ fontSize: "0.85rem", color: "var(--dark)" }}>{interest.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label style={labelStyle} htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your project, timeline, and any specific requirements."
                rows={5}
                style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
              />
            </div>

            <div>
              {submitted ? (
                <p style={{ fontSize: "0.85rem", color: "var(--mid)" }}>
                  Thank you — we will be in touch shortly.
                </p>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-block bg-[var(--black)] text-white no-underline transition-colors hover:bg-[var(--dark)] cursor-pointer"
                  style={{
                    padding: "0.85rem 2.2rem",
                    fontSize: "0.7rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    border: "none",
                  }}
                >
                  {loading ? "Sending…" : "Submit Inquiry"}
                </button>
              )}
            </div>
          </form>
        </RevealWrapper>
      </div>
    </section>
  );
}
