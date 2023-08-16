import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Navbar({ currentPage }) {
  return (
    <nav className="bg-white z-10 lg:z-auto fixed w-full bottom-0 lg:w-2/12 lg:h-screen lg:bottom-auto lg:left-0 lg:top-0 flex-col lg:static lg:flex lg:flex-col lg:overflow-y-auto lg:text-lg">
      <div className="container mx-auto px-6 pt-3 pb-2 flex justify-around items-center h-full lg:flex-col lg:justify-center lg:items-center lg:space-y-20 lg:py-16">
        
        {/* Home */}
        <Link href="/">
          <div className="flex flex-col lg:flex-row items-center text-xs lg:text-lg text-black lg:mb-8 mx-4">
            <Image src={currentPage === 'inicio' ? "/inicio_on.png" : "/inicio_off.png"} alt="Inicio" width={24} height={24} className="lg:w-7 lg:h-7" />
            <span className={`mt-0 lg:mt-0 lg:ml-4 pt-1 ${currentPage === 'inicio' ? "font-bold" : ""}`}>Inicio</span>
          </div>
        </Link>

        {/* Mapa */}
        <Link href="/mapa">
          <div className="flex flex-col lg:flex-row items-center text-xs lg:text-lg text-black lg:mx-auto lg:mb-8 mx-4">
            <Image src={currentPage === 'mapa' ? "/mapa_on.png" : "/mapa_off.png"} alt="Mapa" width={24} height={24} className="lg:w-7 lg:h-7" />
            <span className={`mt-0 lg:mt-0 lg:ml-4 pt-1 ${currentPage === 'mapa' ? "font-bold" : ""}`}>Mapa</span>
          </div>
        </Link>

        {/* Datos */}
        <Link href="/datos">
          <div className="flex flex-col lg:flex-row items-center text-xs lg:text-lg text-black lg:mx-auto lg:mb-8 mx-4">
            <Image src={currentPage === 'datos' ? "/datos_on.png" : "/datos_off.png"} alt="Datos" width={24} height={24} className="lg:w-7 lg:h-7" />
            <span className={`mt-0 lg:mt-0 lg:ml-4 pt-1 ${currentPage === 'datos' ? "font-bold" : ""}`}>Datos</span>
          </div>
        </Link>

        {/* Acerca de */}
        <Link href="/acerca-de">
          <div className="flex flex-col lg:flex-row items-center text-xs lg:text-lg text-black lg:mx-auto lg:mb-8 mx-4">
            <Image src={currentPage === 'acerca-de' ? "/info_on.png" : "/info_off.png"} alt="Acerca de" width={24} height={24} className="lg:w-7 lg:h-7" />
            <span className={`mt-0 lg:mt-0 lg:ml-4 pt-1 ${currentPage === 'acerca-de' ? "font-bold" : ""}`}>Acerca</span>
          </div>
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;























