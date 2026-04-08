export default function Footer() {
  const text =
    "COMING SOON \u2022 COMING SOON \u2022 COMING SOON \u2022 THAT TALL GUY \u2022 DROPPING SOON \u2022 STAY TUNED \u2022 COMING SOON \u2022 "

  const repeated = text.repeat(5)

  return (
    <footer
      className="relative"
      style={{
        backgroundColor: "#080808",
        borderTop: "1px solid #1a1a1a",
      }}
      aria-label="Footer"
    >
      {/* Large marquee strip — RTL */}
      <div className="w-full overflow-hidden py-4 sm:py-6" aria-hidden="true">
        <div className="flex whitespace-nowrap animate-marquee-rtl">
          <span
            className="inline-block pr-8 uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(1.25rem, 3.5vw, 3rem)",
              color: "#555555",
              letterSpacing: "0.12em",
            }}
          >
            {repeated}
          </span>
          <span
            className="inline-block pr-8 uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(1.25rem, 3.5vw, 3rem)",
              color: "#555555",
              letterSpacing: "0.12em",
            }}
          >
            {repeated}
          </span>
        </div>
      </div>

      {/* Copyright */}
      <div
        className="border-t text-center py-4 sm:py-5 px-6"
        style={{ borderColor: "#1a1a1a", paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      >
        <p
          className="text-xs tracking-[0.2em] uppercase"
          style={{ color: "#444444", fontFamily: "var(--font-dm-sans)" }}
        >
          &copy; 2025 THAT TALL GUY. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  )
}
