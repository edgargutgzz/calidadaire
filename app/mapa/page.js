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
            <Image src="/inicio.png" alt="Home" width={40} height={40} />
            <span className="mt-0">Inicio</span>
          </Link>

          {/* Mapa */}
          <Link href="/mapa" className="flex flex-col items-center text-xs text-white border-b-4 pb-2 border-white">
            <Image src="/mapa.png" alt="Mapa" width={25} height={25} />
            <span className="mt-2">Mapa</span>
          </Link>
        
          {/* Datos */}
          <Link href="/datos" className="flex flex-col items-center text-xs text-white">
            <Image src="/datos.png" alt="Datos" width={30} height={30} />
            <span className="mt-2">Datos</span>
          </Link>

        </div>
      </nav>

      {/* Mapa */}
      <Mapa />

    </div>
  );
}