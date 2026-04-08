"use client"

import { useState, useRef, useEffect } from "react"

const HEIGHTS = [
  "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\"", "6'7\" & above",
]
const LENGTHS = ["44", "46", "48", "50", "52", "54 & above"]
const WAISTS = ["28", "30", "32", "34", "36", "38", "40", "42 & Above"]
const BOTTOM_TYPES = [
  "Bootcut", "Wide Leg", "Baggy", "Gym Wears", "Casual Lowers", "Designed Embroidered Bottoms",
]

const labelStyle: React.CSSProperties = {
  color: "#d4d4d4",
  fontFamily: "var(--font-dm-sans)",
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  marginBottom: "0.5rem",
  display: "block",
}

function CustomSelect({
  options,
  value,
  onChange,
  placeholder,
  id,
}: {
  options: string[]
  value: string
  onChange: (v: string) => void
  placeholder: string
  id: string
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [])

  return (
    <div ref={ref} style={{ position: "relative", width: "100%" }} id={id}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        style={{
          width: "100%",
          backgroundColor: "#0d0d0d",
          color: value ? "#ffffff" : "#555",
          border: `1px solid ${open ? "#444" : "#2a2a2a"}`,
          fontFamily: "var(--font-dm-sans)",
          padding: "0.875rem 1rem",
          fontSize: "14px",
          letterSpacing: "0.04em",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          minHeight: "48px",
          outline: "none",
          textAlign: "left",
        }}
      >
        <span>{value || placeholder}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#888"
          strokeWidth="2"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            flexShrink: 0,
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            backgroundColor: "#111",
            border: "1px solid #2a2a2a",
            zIndex: 50,
            maxHeight: "220px",
            overflowY: "auto",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt)
                setOpen(false)
              }}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                backgroundColor: value === opt ? "#1a1a1a" : "transparent",
                color: value === opt ? "#fff" : "#888",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "13px",
                letterSpacing: "0.06em",
                textAlign: "left",
                border: "none",
                borderBottom: "1px solid #1a1a1a",
                cursor: "pointer",
                display: "block",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function MaxSelectionAlert({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        marginTop: "12px",
        padding: "12px 14px",
        backgroundColor: "rgba(220,38,38,0.08)",
        border: "1px solid rgba(220,38,38,0.25)",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f87171"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ flexShrink: 0 }}
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <span
        style={{
          fontSize: "12px",
          color: "#f87171",
          flex: 1,
          fontFamily: "var(--font-dm-sans)",
          letterSpacing: "0.04em",
        }}
      >
        YOU CAN ONLY PICK 3 — DESELECT ONE TO CHOOSE ANOTHER.
      </span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss"
        style={{
          background: "none",
          border: "none",
          color: "#f87171",
          fontSize: "20px",
          lineHeight: 1,
          cursor: "pointer",
          padding: "0 2px",
          opacity: 0.7,
          flexShrink: 0,
        }}
      >
        ×
      </button>
    </div>
  )
}

export default function RegistrationForm() {
  const [height, setHeight] = useState("")
  const [length, setLength] = useState("")
  const [waist, setWaist] = useState("")
  const [selectedBottoms, setSelectedBottoms] = useState<string[]>([])
  const [showMaxAlert, setShowMaxAlert] = useState(false)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!showMaxAlert) return
    const timer = setTimeout(() => setShowMaxAlert(false), 4000)
    return () => clearTimeout(timer)
  }, [showMaxAlert])

  const toggleBottom = (val: string) => {
    setSelectedBottoms((prev) => {
      if (prev.includes(val)) {
        setShowMaxAlert(false)
        return prev.filter((v) => v !== val)
      }
      if (prev.length >= 3) {
        setShowMaxAlert(true)
        return prev
      }
      return [...prev, val]
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "{}")

    const res = await fetch("https://formspree.io/f/xkoqgaon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        height,
        length,
        waist,
        preferred_bottoms: selectedBottoms.join(", "),
        liked_bootcut: wishlist["bootcut"]?.join(", ") || "none",
        liked_baggy: wishlist["baggy"]?.join(", ") || "none",
        liked_wide_leg: wishlist["wide-leg"]?.join(", ") || "none",
        liked_straight_fit: wishlist["straight-fit"]?.join(", ") || "none",
        liked_lowers: wishlist["lowers"]?.join(", ") || "none",
        liked_nar: wishlist["nar"]?.join(", ") || "none",
      }),
    })

    if (res.ok) {
      localStorage.setItem("registered", "true")
      setSubmitted(true)
    } else {
      alert("Submission failed. Please try again.")
    }
  }

  return (
    <section
      id="register-form"
      className="relative py-16 sm:py-24 md:py-36 px-6 sm:px-8 md:px-12 lg:px-20"
      style={{ borderTop: "1px solid #1f1f1f", background: "rgba(8,8,8,0.9)" }}
      aria-labelledby="register-heading"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-24 items-start">

        {/* Left */}
        <div className="lg:sticky lg:top-32 text-center lg:text-left mb-6 lg:mb-0">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4 sm:mb-6"
            style={{ color: "#888888", fontFamily: "var(--font-dm-sans)" }}
          >
            HELP US GET TO KNOW YOU BETTER UNLIKE YOUR EX
          </p>
          <h2
            className="font-normal leading-none text-balance"
            style={{
              fontFamily: "var(--font-bebas)",
              fontSize: "clamp(2rem, 5vw, 5.5rem)",
              letterSpacing: "0.04em",
              color: "#ffffff",
            }}
            id="register-heading"
          >
            BE THE FIRST ONE TO GET NOTIFIED
          </h2>
          <p
            className="mt-4 sm:mt-6 text-xs sm:text-sm leading-relaxed"
            style={{ color: "#555555", fontFamily: "var(--font-dm-sans)" }}
          >
            Check out the collections below and let us know what you loved. Suggestions are appreciated.
          </p>
        </div>

        {/* Right */}
        <div>
          {submitted ? (
            <div className="flex flex-col items-center lg:items-start gap-4 text-center lg:text-left py-12 sm:py-16">
              <span
                className="text-3xl sm:text-5xl md:text-7xl font-normal"
                style={{ fontFamily: "var(--font-bebas)", letterSpacing: "0.05em" }}
              >
                YOU&apos;RE IN.
              </span>
              <p
                className="text-xs sm:text-sm"
                style={{ color: "#888888", fontFamily: "var(--font-dm-sans)" }}
              >
                We&apos;ll notify you as soon as THAT TALL GUY drops.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-7" noValidate>

              {/* Height */}
              <div>
                <label style={labelStyle}>How tall are you?</label>
                <CustomSelect
                  id="height"
                  options={HEIGHTS}
                  value={height}
                  onChange={setHeight}
                  placeholder="Select your height"
                />
              </div>

              {/* Length */}
              <div>
                <label style={labelStyle}>What length fits you? (Outseam)</label>
                <CustomSelect
                  id="length"
                  options={LENGTHS}
                  value={length}
                  onChange={setLength}
                  placeholder="Select"
                />
              </div>

              {/* Waist */}
              <div>
                <label style={labelStyle}>Waist size (inches)</label>
                <CustomSelect
                  id="waist"
                  options={WAISTS}
                  value={waist}
                  onChange={setWaist}
                  placeholder="Select"
                />
              </div>

              {/* Bottom types — max 3 */}
              <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
                <legend style={labelStyle}>What kind of bottoms do you want?</legend>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: "#555555",
                    marginBottom: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  Pick up to 3 &nbsp;·&nbsp; {selectedBottoms.length}/3 selected
                </p>

                <div className="flex flex-wrap gap-2">
                  {BOTTOM_TYPES.map((bt) => {
                    const active = selectedBottoms.includes(bt)
                    return (
                      <button
                        key={bt}
                        type="button"
                        onClick={() => toggleBottom(bt)}
                        className="text-xs tracking-wider uppercase transition-all duration-200"
                        style={{
                          fontFamily: "var(--font-dm-sans)",
                          padding: "0.5rem 0.875rem",
                          border: `1px solid ${active ? "#ffffff" : "#2a2a2a"}`,
                          backgroundColor: active ? "#ffffff" : "transparent",
                          color: active ? "#080808" : "#888888",
                          letterSpacing: "0.12em",
                          cursor: "pointer",
                          minHeight: "44px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        aria-pressed={active}
                      >
                        {bt}
                      </button>
                    )
                  })}
                </div>

                {showMaxAlert && (
                  <MaxSelectionAlert onDismiss={() => setShowMaxAlert(false)} />
                )}
              </fieldset>

              {/* Email */}
              <div>
                <label style={labelStyle}>Your Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="thattallguyindia@gmail.com"
                  className="ttg-input w-full"
                  style={{
                    backgroundColor: "#0d0d0d",
                    color: "#ffffff",
                    border: "1px solid #2a2a2a",
                    fontFamily: "var(--font-dm-sans)",
                    padding: "0.875rem 1rem",
                    fontSize: "16px",
                    letterSpacing: "0.04em",
                    outline: "none",
                    display: "block",
                    minHeight: "48px",
                    width: "100%",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 sm:py-4 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#080808",
                  fontFamily: "var(--font-dm-sans)",
                  letterSpacing: "0.2em",
                  border: "none",
                  cursor: "pointer",
                  minHeight: "52px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                SUBMIT
              </button>

              {/* Instagram */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pt-2 justify-center lg:justify-start">
                <p
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ color: "#555555", fontFamily: "var(--font-dm-sans)" }} >
                </p>
          
             <p
  className="text-xs tracking-[0.15em] uppercase"
  style={{ color: "#555555", fontFamily: "var(--font-dm-sans)" }}
>
  FOLLOW US ON INSTAGRAM FOR MORE
</p>

<a
  href="https://www.instagram.com/thattallguyindia/"
  target="_blank"
  rel="noopener noreferrer"
  className="ig-icon text-white transition-all duration-200 shrink-0"
  style={{
    minWidth: "44px",
    minHeight: "44px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
  aria-label="Follow us on Instagram"
>
  <InstagramIcon />
</a>
              </div>

            </form>
          )}
        </div>
      </div>
    </section>
  )
}