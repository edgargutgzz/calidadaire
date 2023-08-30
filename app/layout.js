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
        {/* Existing meta data */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        
        {/* Open Graph meta tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content="https://www.aireclaro.com" />
        <meta property="og:image" content="https://www.aireclaro.com/aire_claro.png" />
      </Head>
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}



