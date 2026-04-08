export default function AnnouncementStrip() {
  const text =
    "COMING SOON \u2022 MADE FOR THE TALL \u2022 6 FEET & ABOVE \u2022 THAT TALL GUY \u2022 INDIA'S FIRST TALL MEN'S BOTTOMWEAR BRAND \u2022 DROPPING SOON \u2022 "

  // Duplicate text so the loop is seamless
  const repeated = text.repeat(6)

  return (
    <div
      className="w-full overflow-hidden relative z-10"
      style={{ backgroundColor: "#111111", borderBottom: "1px solid #1f1f1f" }}
      aria-label="Announcement banner"
    >
      <div className="flex whitespace-nowrap animate-marquee-ltr">
        <span
          className="inline-block text-white text-xs tracking-widest uppercase py-1.5 md:py-2 pr-8"
          style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "0.2em" }}
        >
          {repeated}
        </span>
        {/* Duplicate for seamless loop */}
        <span
          className="inline-block text-white text-xs tracking-widest uppercase py-1.5 md:py-2 pr-8"
          style={{ fontFamily: "var(--font-dm-sans)", letterSpacing: "0.2em" }}
          aria-hidden="true"
        >
          {repeated}
        </span>
      </div>
    </div>
  )
}
