import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import 'mapbox-gl/dist/mapbox-gl.css';
import Mapa from '../../components/mapa';

export default function Index() {
  return (
    <div>

      {/* Navbar */}
      <nav className = "bg-black z-10 fixed w-full bottom-0">
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">

          {/* Home */}
          <Link href="/" className="flex flex-col items-center text-xs text-white">
            <Image src="/inicio_off.png" alt="Home" width={24} height={24} />
            <span className="mt-0 pt-1">Inicio</span>
          </Link>

          {/* Mapa */}
          <Link href="/mapa" className="flex flex-col items-center text-xs text-white">
            <Image src="/mapa_on.png" alt="Mapa" width={26} height={26} />
            <span className="mt-0 pt-1">Mapa</span>
          </Link>
        
          {/* Datos */}
          <Link href="/datos" className="flex flex-col items-center text-xs text-white">
            <Image src="/datos_off.png" alt="Datos" width={26} height={26} />
            <span className="mt-0 pt-1">Datos</span>
          </Link>

        </div>
      </nav>

      {/* Mapa */}
      <Mapa />

    </div>
  );
}