const store = new Map<string, { otp: string; expires: number }>()

export function saveOtp(email: string, otp: string) {
  store.set(email, {
    otp,
    expires: Date.now() + 10 * 60 * 1000, // 10 min
  })
}

export function verifyOtp(email: string, code: string): boolean {
  const entry = store.get(email)
  if (!entry) return false

  if (Date.now() > entry.expires) {
    store.delete(email)
    return false
  }

  if (entry.otp !== code) return false

  store.delete(email)
  return true
}