import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from "./components/Footer";
import Header from "./components/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Timestamp - Timestamp & Date Converter',
  description: 'Unix timestamp converter for developers. Date and time function syntax reference for various programming languages.',
  keywords: 'timestamp, timestamp converter, date, date converter, datetime, datetime converter, unix timestamp, unix timestamp converter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" /> */}
      </head>
      <body className={inter.className}>
        <main>
          <Header />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
