import React from 'react';
import Link from 'next/link';

function Navbar({ currentPage }) {
  return (
    <nav style={{ boxShadow: '0 -4px 5px -2px rgba(0, 0, 0, 0.1)' }} className="bg-white z-10 fixed w-full bottom-0 flex-col shadow-lg lg:z-auto lg:w-3/12 lg:h-screen lg:static lg:flex lg:flex-col lg:py-10">
      <div className="container mx-auto px-2 pt-3 pb-2 flex justify-around items-center h-full lg:flex-col lg:justify-start lg:items-start lg:px-6">

        {/* Logo */}
        <div className="lg:w-full lg:mb-10 lg:pl-4 hidden lg:block">
          <img src="/aire_claro.png" alt="Aire Claro" className="w-40" />
        </div>
        
        {/* Home */}
        <div className="text-black lg:hover:bg-gray-100 rounded-lg lg:w-full lg:mb-4 lg:pr-6">
          <Link href="/">
            <div className="flex flex-col items-center text-xs lg:text-base lg:flex-row lg:py-3 lg:p-4">
              <img src={currentPage === 'inicio' ? "/inicio_on.png" : "/inicio_off.png"} alt="Inicio" width={22} height={22} className="lg:w-6 lg:h-6" />
              <span className={`mt-0 lg:mt-0 lg:ml-4 pt-1 ${currentPage === 'inicio' ? "font-bold" : ""}`}>Inicio</span>
            </div>
          </Link>
        </div>

        {/* Mapa */}
        <div className="text-black lg:hover:bg-gray-100 rounded-lg lg:w-full lg:mb-4 lg:pr-6">
          <Link href="/mapa">
            <div className="flex flex-col items-center text-xs lg:text-base lg:flex-row lg:py-3 lg:p-4">
              <img src={currentPage === 'mapa' ? "/mapa_on.png" : "/mapa_off.png"} alt="Inicio" width={22} height={22} className="lg:w-6 lg:h-6" />
              <span className={`mt-0 lg:mt-0 lg:ml-4 pt-1 ${currentPage === 'mapa' ? "font-bold" : ""}`}>Mapa</span>
            </div>
          </Link>
        </div>

        {/* Datos */}
        <div className="text-black lg:hover:bg-gray-100 rounded-lg lg:w-full lg:mb-4 lg:pr-6">
          <Link href="/datos">
            <div className="flex flex-col items-center text-xs lg:text-base lg:flex-row lg:py-3 lg:p-4">
              <img src={currentPage === 'datos' ? "/datos_on.png" : "/datos_off.png"} alt="Inicio" width={22} height={22} className="lg:w-6 lg:h-6" />
              <span className={`mt-0 lg:mt-0 lg:ml-4 pt-1 ${currentPage === 'datos' ? "font-bold" : ""}`}>Datos</span>
            </div>
          </Link>
        </div>

        {/* Datos */}
        <div className="text-black lg:hover:bg-gray-100 rounded-lg lg:w-full lg:mb-4 lg:pr-6">
          <Link href="/acerca-de">
            <div className="flex flex-col items-center text-xs lg:text-base lg:flex-row lg:py-3 lg:p-4">
              <img src={currentPage === 'acerca-de' ? "/info_on.png" : "/info_off.png"} alt="Inicio" width={22} height={22} className="lg:w-6 lg:h-6" />
              <span className={`mt-0 lg:mt-0 lg:ml-4 pt-1 ${currentPage === 'acerca-de' ? "font-bold" : ""}`}>Acerca</span>
            </div>
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
















































