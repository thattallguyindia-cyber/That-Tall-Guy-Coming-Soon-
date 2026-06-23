import { verifyOtp } from "@/lib/otpStore"
import { NextRequest, NextResponse } from "next/server"
import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json()
  if (!email || !otp) return NextResponse.json({ error: "Missing fields" }, { status: 400 })

  const valid = await verifyOtp(email, otp)
  if (!valid) return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 })

  // Mark email as registered permanently
  await redis.set(`submitted:${email}`, "1")

  return NextResponse.json({ ok: true })
}