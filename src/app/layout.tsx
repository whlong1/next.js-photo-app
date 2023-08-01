import "@/styles/globals.css"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

// Layout Components
import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Next VOD',
  description: 'A streaming site built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Nav />
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
