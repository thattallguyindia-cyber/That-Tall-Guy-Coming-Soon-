
import type { Metadata } from 'next'
import { Bebas_Neue, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'THAT TALL GUY — India\'s First Tall Men\'s Bottomwear Brand',
  description: 'Premium bottomwear exclusively designed for men 6 feet and above. Dropping soon in India.',
  generator: 'v0.app',
  keywords: ['tall men clothing', 'tall pants India', 'bottomwear tall', 'tall guy jeans', 'India tall fashion'],
  themeColor: '#080808',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${dmSans.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
