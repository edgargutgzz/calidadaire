import React from 'react';
import Link from 'next/link';
import Image from 'next/image'

function Navbar({ currentPage }) {
  return (
    <nav className = "bg-black z-10 fixed w-full bottom-0">
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">

          {/* Home */}
          <Link href="/">
            <div className="flex flex-col items-center text-xs text-white">
              <Image src={currentPage === 'inicio' ? "/inicio_on.png" : "/inicio_off.png"} alt="Inicio" width={25} height={25} />
              <span className="mt-0 pt-2">Inicio</span>
            </div>
          </Link>

          {/* Mapa */}
          <Link href="/mapa">
            <div className="flex flex-col items-center text-xs text-white">
              <Image src={currentPage === 'mapa' ? "/mapa_on.png" : "/mapa_off.png"} alt="Mapa" width={26} height={26} />
              <span className="mt-0 pt-1">Mapa</span>
            </div>
          </Link>
        
          {/* Datos */}
          <Link href="/datos">
            <div className="flex flex-col items-center text-xs text-white">
              <Image src={currentPage === 'datos' ? "/datos_on.png" : "/datos_off.png"} alt="Datos" width={26} height={26} />
              <span className="mt-0 pt-1">Datos</span>
            </div>
          </Link>

        </div>
      </nav>
  );
}

export default Navbar;

