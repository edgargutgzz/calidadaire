import React from 'react';
import Link from 'next/link';
import Image from 'next/image'

function Navbar({ currentPage }) {
  return (
    <nav className = "bg-white z-10 fixed w-full bottom-0">
        <div className="container mx-auto px-6 pt-2 pb-2 flex justify-around items-center">

          {/* Home */}
          <Link href="/">
            <div className="flex flex-col items-center text-xs text-black mx-2">
              <Image src={currentPage === 'inicio' ? "/inicio_on.png" : "/inicio_off.png"} alt="Inicio" width={24} height={24} />
              <span className={`mt-0 pt-1 ${currentPage === 'inicio' ? "font-bold" : ""}`}>Inicio</span>
            </div>
          </Link>

          {/* Mapa */}
          <Link href="/mapa">
            <div className="flex flex-col items-center text-xs text-black mx-16">
              <Image src={currentPage === 'mapa' ? "/mapa_on.png" : "/mapa_off.png"} alt="Mapa" width={24} height={24} />
              <span className={`mt-0 pt-1 ${currentPage === 'mapa' ? "font-bold" : ""}`}>Mapa</span>
            </div>
          </Link>
        
          {/* Datos */}
          <Link href="/datos">
            <div className="flex flex-col items-center text-xs text-black mx-2">
              <Image src={currentPage === 'datos' ? "/datos_on.png" : "/datos_off.png"} alt="Datos" width={24} height={24} />
              <span className={`mt-0 pt-1 ${currentPage === 'datos' ? "font-bold" : ""}`}>Datos</span>
            </div>
          </Link>

        </div>
      </nav>
  );
}

export default Navbar;








