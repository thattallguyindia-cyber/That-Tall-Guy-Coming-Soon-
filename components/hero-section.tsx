export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "600px" }}
      aria-label="Hero"
    >
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src=""
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.7) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        {/* Est. label */}
        {/* <p
          className="text-xs tracking-[0.35em] uppercase mb-4 sm:mb-6 text-balance"
          style={{ color: "#ffffff", fontFamily: "var(--font-dm-sans)" }}
        >
         &bull;  MADE IN INDIA  &bull;
        </p> */}

        {/* Brand name
        <h1
          className="text-white font-normal leading-none tracking-[0.08em] text-balance"
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "clamp(2rem, 16vw, 13rem)",
            letterSpacing: "0.06em",
          }}
        >
          THAT TALL GUY
        </h1> */}

        {/* Tagline */}
        {/* <p
          className="mt-4 sm:mt-6 text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase text-balance "
          style={{ color: "#ffffff", fontFamily: "var(--font-dm-sans)" }}
        >
         &bull; BOTTOMS FOR THE TALL INDIAN MEN &bull; 
        </p> */}

        {/* CTA — non-clickable */}
        <div
          className="mt-8 sm:mt-10 inline-block px-6 sm:px-10 py-2.5 sm:py-3 text-xs sm:text-sm tracking-[0.25em] font-extrabold"
          style={{ fontFamily: "var(--font-dm-sans)" }}
          role="status"
          aria-label="Coming soon"
        >
          COMING SOON
        </div>
      </div>

      {/* Bottom fade to black */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, #080808 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  )
}
