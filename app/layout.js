import Head from 'next/head';
import './globals.css'
import Navbar from '../components/navbar'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aire Claro',
  description: 'Cuida tu salud con la mejor información de calidad del aire de Monterrey.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="Aire Claro" />
        <meta property="og:description" content="Cuida tu salud con la mejor información de calidad del aire de Monterrey." />
        <meta property="og:image" content="/aire_claro.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="314" />
        <meta property="og:url" content="http://www.aireclaro.com" />
        <meta property="og:type" content="website" />
      </Head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}




