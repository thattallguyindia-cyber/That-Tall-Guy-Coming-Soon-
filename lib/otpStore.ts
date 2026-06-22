import { Redis } from "@upstash/redis"

const redis = Redis.fromEnv()

export async function saveOtp(email: string, otp: string) {
  await redis.set(`otp:${email}`, otp, { ex: 600 })
}

export async function verifyOtp(email: string, code: string): Promise<boolean> {
  const stored = await redis.get(`otp:${email}`)
  if (!stored) return false
  
  // Strip any extra quotes Upstash might add
  const storedStr = String(stored).replace(/"/g, "").trim()
  const inputStr = String(code).replace(/"/g, "").trim()
  
  if (storedStr !== inputStr) return false
  
  await redis.del(`otp:${email}`)
  return true
}