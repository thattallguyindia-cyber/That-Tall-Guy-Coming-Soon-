"use client"

import Link from "next/link"

export default function Navbar() {
  const handleRegisterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const el = document.getElementById("register-form")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 w-full flex items-center justify-between px-6 md:px-10 lg:px-16"
        style={{
          backgroundColor: "#0a0a0a",
          borderBottom: "1px solid #1f1f1f",
          height: "60px",
        }}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="text-white select-none"
          style={{
            fontFamily: "var(--font-bebas)",
            letterSpacing: "0.08em",
            fontSize: "22px",
          }}
          aria-label="That Tall Guy — Home"
        >
          THAT TALL GUY
        </Link>

        
        <a  href="#register-form"
          onClick={handleRegisterClick}
          className="text-white tracking-widest shrink-0"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "11px",
            letterSpacing: "0.2em",
          }}
        >
          REGISTER
        </a>
      </nav>
      <div style={{ height: "60px" }} />
    </>
  )
}