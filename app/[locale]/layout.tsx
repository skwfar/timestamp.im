import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from "@/components/footer";
import Header from "@/components/header";
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';
import GoogleAnalytics from "@/components/analytics/ga";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Timestamp.im - Best Online Timestamp Tools for Accurate Date and Time Conversion',
  description: 'Unix timestamp converter for developers. Date and time function syntax reference for various programming languages.',
  keywords: 'timestamp tools, online timestamp generator, convert timestamp to date, Unix timestamp converter, time and date conversion, digital timestamping, epoch time converter, date to timestamp, human-readable timestamp, current timestamp generator, time formatting tools, timestamp utilities, Unix epoch time, time conversion tools',
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
          <GoogleAnalytics />
          <Header locale={locale}/>
          {children}
          <Footer />
        </main>
      </body>
    </html>
  )
}
