import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Navbar({ currentPage }) {
  return (
    <nav  className="bg-white z-10 fixed w-full bottom-0 flex-col shadow-lg lg:z-auto lg:w-2/12 lg:h-screen lg:static lg:flex lg:flex-col lg:py-10">
      <div className="container mx-auto px-2 pt-3 pb-2 flex justify-around items-center h-full lg:flex-col lg:justify-start lg:items-start lg:py-10 lg:ml-8">
        
        {/* Home */}
        <Link href="/">
          <div className="flex flex-col items-center text-xs text-black lg:flex-row lg:text-base lg:mb-16">
            <Image src={currentPage === 'inicio' ? "/inicio_on.png" : "/inicio_off.png"} alt="Inicio" width={22} height={22} className="lg:w-6 lg:h-6" />
            <span className={`mt-0 lg:mt-0 lg:ml-4 pt-1 ${currentPage === 'inicio' ? "font-bold" : ""}`}>Inicio</span>
          </div>
        </Link>

        {/* Mapa */}
        <Link href="/mapa">
          <div className="flex flex-col lg:flex-row items-center text-xs lg:text-base text-black lg:mb-16">
            <Image src={currentPage === 'mapa' ? "/mapa_on.png" : "/mapa_off.png"} alt="Mapa" width={22} height={22} className="lg:w-6 lg:h-6 lg:mt-1" />
            <span className={`mt-0 lg:mt-0 lg:ml-4 pt-1 ${currentPage === 'mapa' ? "font-bold" : ""}`}>Mapa</span>
          </div>
        </Link>

        {/* Datos */}
        <Link href="/datos">
          <div className="flex flex-col lg:flex-row items-center text-xs lg:text-base text-black lg:mb-16">
            <Image src={currentPage === 'datos' ? "/datos_on.png" : "/datos_off.png"} alt="Datos" width={22} height={22} className="lg:w-6 lg:h-6" />
            <span className={`mt-0 lg:mt-0 lg:ml-4 pt-1 ${currentPage === 'datos' ? "font-bold" : ""}`}>Datos</span>
          </div>
        </Link>

        {/* Acerca de */}
        <Link href="/acerca-de">
          <div className="flex flex-col lg:flex-row items-center text-xs lg:text-base text-black lg:mb-16">
            <Image src={currentPage === 'acerca-de' ? "/info_on.png" : "/info_off.png"} alt="Acerca de" width={22} height={22} className="lg:w-6 lg:h-6" />
            <span className={`mt-0 lg:mt-0 lg:ml-4 pt-1 ${currentPage === 'acerca-de' ? "font-bold" : ""}`}>Acerca</span>
          </div>
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
























