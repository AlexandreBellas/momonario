import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const websiteIcon =
  "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💬</text></svg>"

export const metadata: Metadata = {
  title: 'Momonario',
  description:
    'The easiest personal dictionary to master a language vocabulary.',
  icons: websiteIcon,
  keywords: [
    'dictionary',
    'personal',
    'language',
    'word',
    'words',
    'meaning',
    'momonario',
  ],
  openGraph: {
    title: 'Momonario',
    description:
      'The easiest personal dictionary to master a language vocabulary.',
    images: websiteIcon,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
