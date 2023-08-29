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
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}


