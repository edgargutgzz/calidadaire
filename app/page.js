import * as React from 'react';
import Mapa from '../components/map';
import Image from 'next/image'
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Home() {
  return (
    <div className="relative h-screen">
      {/* Map */}
      <Mapa />

      {/* Navbar */}
      <nav className="bg-black fixed bottom-0 w-full pb-safe">
        <div className="container mx-auto px-6 py-1 flex justify-between items-center">

          {/* Logo */}
          <a href="#">
            <Image src="/datacomun.png" alt="Logo" width={180} height={52} />
          </a>

          {/* Menu - Mobile */}
          <div className="block lg:hidden">
            <button className="flex items-center px-3 py-1 border rounded text-white hover:text-white hover:border-teal-500 appearance-none focus:outline-none">
              <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          {/* Menu - Desktop */}
          <div className="hidden lg:block">
            <ul className="inline-flex">
              <li><a className="px-4 text-white" href="#">Descargar datos</a></li>
              <li><a className="px-4 text-white" href="#">Conoce más</a></li>
            </ul>
          </div>

        </div>
      </nav>
    </div>
  );
}














