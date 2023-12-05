import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from "@/components/footer";
import Header from "@/components/header";
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Timestamp - Timestamp & Date Converter',
  description: 'Unix timestamp converter for developers. Date and time function syntax reference for various programming languages.',
  keywords: 'timestamp, timestamp converter, date, date converter, datetime, datetime converter, unix timestamp, unix timestamp converter',
}

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: { locale: string };
},) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        {/* <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" /> */}
      </head>
      <body className={inter.className}>
        <main>
          <Header locale={locale}/>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
