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

// ── OTP Input Block ──────────────────────────────────────────────────────────
function OtpBlock({
  email,
  onVerified,
}: {
  email: string
  onVerified: () => void
}) {
  const OTP_LENGTH = 6
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState("")
  const [cooldown, setCooldown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Send / resend OTP
  const sendOtp = async () => {
    if (sending || cooldown > 0) return
    setSending(true)
    setError("")
    try {
      // Replace this fetch with your actual OTP-send endpoint
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error("Failed to send OTP")
      setSent(true)
      startCooldown(30)
    } catch {
      setError("Could not send OTP. Please try again.")
    } finally {
      setSending(false)
    }
  }

  const startCooldown = (seconds: number) => {
    setCooldown(seconds)
    if (cooldownRef.current) clearInterval(cooldownRef.current)
    cooldownRef.current = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(cooldownRef.current!)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => () => { if (cooldownRef.current) clearInterval(cooldownRef.current) }, [])

  const handleDigit = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1)
    const next = [...digits]
    next[index] = digit
    setDigits(next)
    setError("")
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH)
    if (!pasted) return
    e.preventDefault()
    const next = Array(OTP_LENGTH).fill("")
    pasted.split("").forEach((ch, i) => { next[i] = ch })
    setDigits(next)
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  const verifyOtp = async () => {
    const code = digits.join("")
    if (code.length < OTP_LENGTH) {
      setError("Please enter the full 6-digit code.")
      return
    }
    setVerifying(true)
    setError("")
    try {
      // Replace with your actual OTP-verify endpoint
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: code }),
      })
      if (!res.ok) throw new Error("Invalid OTP")
      onVerified()
    } catch {
      setError("Incorrect code. Please try again.")
      setDigits(Array(OTP_LENGTH).fill(""))
      inputRefs.current[0]?.focus()
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <label style={labelStyle}>Verify your email</label>

      {/* Send OTP button (shown before first send) */}
      {!sent && (
        <button
          type="button"
          onClick={sendOtp}
          disabled={sending}
          style={{
            backgroundColor: "transparent",
            color: sending ? "#555" : "#ffffff",
            border: "1px solid #2a2a2a",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "0.75rem 1rem",
            cursor: sending ? "not-allowed" : "pointer",
            minHeight: "48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            transition: "border-color 0.2s",
          }}
        >
          {sending ? (
            <>
              <SpinnerIcon />
              SENDING…
            </>
          ) : (
            "SEND VERIFICATION CODE"
          )}
        </button>
      )}

      {/* OTP digit inputs */}
      {sent && (
        <>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#555555",
              textTransform: "uppercase",
            }}
          >
            Code sent to {email}
          </p>

          <div
            style={{ display: "flex", gap: "0.5rem" }}
            onPaste={handlePaste}
            role="group"
            aria-label="One-time password"
          >
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleDigit(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                aria-label={`Digit ${i + 1}`}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: "52px",
                  backgroundColor: "#0d0d0d",
                  border: `1px solid ${error ? "rgba(220,38,38,0.4)" : d ? "#444" : "#2a2a2a"}`,
                  color: "#ffffff",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "1.1rem",
                  letterSpacing: "0.1em",
                  textAlign: "center",
                  outline: "none",
                  transition: "border-color 0.15s",
                  caretColor: "#ffffff",
                }}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.12em",
                color: "#f87171",
                textTransform: "uppercase",
              }}
            >
              {error}
            </p>
          )}

          {/* Verify + Resend row */}
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button
              type="button"
              onClick={verifyOtp}
              disabled={verifying}
              style={{
                flex: 1,
                backgroundColor: "transparent",
                color: verifying ? "#555" : "#ffffff",
                border: "1px solid #2a2a2a",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                padding: "0.75rem 1rem",
                cursor: verifying ? "not-allowed" : "pointer",
                minHeight: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "border-color 0.2s",
              }}
            >
              {verifying ? (
                <>
                  <SpinnerIcon />
                  VERIFYING…
                </>
              ) : (
                "VERIFY CODE"
              )}
            </button>

            <button
              type="button"
              onClick={sendOtp}
              disabled={cooldown > 0 || sending}
              style={{
                backgroundColor: "transparent",
                color: cooldown > 0 ? "#444" : "#888",
                border: "1px solid #2a2a2a",
                fontFamily: "var(--font-dm-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "0.75rem 0.875rem",
                cursor: cooldown > 0 ? "not-allowed" : "pointer",
                minHeight: "48px",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "color 0.2s",
              }}
            >
              {cooldown > 0 ? `RESEND (${cooldown}s)` : "RESEND"}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function SpinnerIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      style={{ animation: "spin 0.8s linear infinite" }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  )
}
// ────────────────────────────────────────────────────────────────────────────

export default function RegistrationForm() {
  const [height, setHeight] = useState("")
  const [length, setLength] = useState("")
  const [waist, setWaist] = useState("")
  const [selectedBottoms, setSelectedBottoms] = useState<string[]>([])
  const [showMaxAlert, setShowMaxAlert] = useState(false)
  const [email, setEmail] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
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
    if (!emailVerified) return
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
                <div style={{ position: "relative" }}>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      // Reset verification if email changes
                      if (emailVerified) setEmailVerified(false)
                    }}
                    required
                    placeholder="thattallguyindia@gmail.com"
                    className="ttg-input w-full"
                    disabled={emailVerified}
                    style={{
                      backgroundColor: "#0d0d0d",
                      color: emailVerified ? "#888" : "#ffffff",
                      border: `1px solid ${emailVerified ? "#1f6f3a" : "#2a2a2a"}`,
                      fontFamily: "var(--font-dm-sans)",
                      padding: "0.875rem 1rem",
                      paddingRight: emailVerified ? "2.5rem" : "1rem",
                      fontSize: "16px",
                      letterSpacing: "0.04em",
                      outline: "none",
                      display: "block",
                      minHeight: "48px",
                      width: "100%",
                    }}
                  />
                  {/* Verified checkmark badge */}
                  {emailVerified && (
                    <span
                      style={{
                        position: "absolute",
                        right: "0.875rem",
                        top: "50%",
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        color: "#4ade80",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        pointerEvents: "none",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      VERIFIED
                    </span>
                  )}
                </div>
              </div>

              {/* OTP Block — shown only when email looks valid and not yet verified */}
              {!emailVerified && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                <OtpBlock email={email} onVerified={() => setEmailVerified(true)} />
              )}

              {/* Submit — disabled until email verified */}
              <button
                type="submit"
                disabled={!emailVerified}
                className="w-full py-3 sm:py-4 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: emailVerified ? "#ffffff" : "#1a1a1a",
                  color: emailVerified ? "#080808" : "#444",
                  fontFamily: "var(--font-dm-sans)",
                  letterSpacing: "0.2em",
                  border: "none",
                  cursor: emailVerified ? "pointer" : "not-allowed",
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