export default function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <>
      <p
        className={light ? "text-[var(--light)]" : "text-[var(--mid)]"}
        style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: "1rem" }}
      >
        {children}
      </p>
      <div
        className="mb-8"
        style={{ width: 40, height: 1, background: light ? "var(--dark)" : "var(--light)" }}
      />
    </>
  );
}
