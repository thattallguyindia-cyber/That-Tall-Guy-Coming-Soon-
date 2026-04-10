import { verifyOtp } from "@/lib/otpStore"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json()
  if (!email || !otp) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

  const valid = verifyOtp(email, otp)
  if (!valid) return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })

  return NextResponse.json({ ok: true })
}