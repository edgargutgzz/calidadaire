import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Index() {
  return (
    <div>
      {/* Navbar */}
      <nav className = "bg-black z-10 fixed w-full bottom-0">
        <div className="container mx-auto px-6 py-1 flex justify-between items-center">

          {/* Home */}
          <Link href="/" className="flex flex-col items-center text-xs text-white border-b-4 pb-2 border-white">
            <Image src="/inicio.png" alt="Inicio" width={40} height={40} />
            <span className="mt-0">Inicio</span>
          </Link>

          {/* Mapa */}
          <Link href="/mapa" className="flex flex-col items-center text-xs text-white border-b-4 pb-2 border-black">
            <Image src="/inicio.png" alt="Mapa" width={40} height={40} />
            <span className="mt-0">Mapa</span>
          </Link>
        
          {/* Datos */}
          <Link href="/datos" className="flex flex-col items-center text-xs text-white border-b-4 pb-2 border-black">
            <Image src="/inicio.png" alt="Datos" width={40} height={40} />
            <span className="mt-0">Datos</span>
          </Link>

        </div>
      </nav>
      {/* Title */}
      <h1 className="text-4xl text-center mt-20">Calidad del Aire</h1>
    </div>
  );
}

















