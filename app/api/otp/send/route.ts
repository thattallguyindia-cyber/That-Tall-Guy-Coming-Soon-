import { Resend } from "resend"
import { saveOtp } from "@/lib/otpStore"
import { NextRequest, NextResponse } from "next/server"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })

  const otp = Math.floor(100000 + Math.random() * 900000).toString() // 6-digit code
  saveOtp(email, otp)

  await resend.emails.send({
    from: "THAT TALL GUY <onboarding@resend.dev>", // change after domain setup
    to: email,
    subject: "Your verification code",
    html: `
      <div style="background:#080808;padding:40px;font-family:sans-serif;color:#fff;">
        <h2 style="letter-spacing:0.1em;">YOUR CODE</h2>
        <p style="font-size:36px;letter-spacing:0.3em;font-weight:bold;">${otp}</p>
        <p style="color:#555;font-size:12px;">Expires in 10 minutes. Do not share this.</p>
      </div>
    `,
  })

  return NextResponse.json({ ok: true })
}