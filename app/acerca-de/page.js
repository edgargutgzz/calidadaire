"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Navbar from '../../components/navbar';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Index() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Navbar currentPage="acerca-de" />
      <div className="mx-4 pt-4 flex-grow overflow-auto lg:w-9/12 lg:flex-grow lg:pl-4">

        {/* Logo */}
        <div className="mx-1 mt-2 mb-6 flex justify-center">
        <img src="/aire_claro.png" alt="Aire Claro" className="w-40" /> {/* Adjust the size here */}
        </div>

        {/* Pregunta 1 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div onClick={() => setIsOpen2(!isOpen2)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p>¿Qué información utilizamos para medir la calidad del aire?</p>
            <img 
              src={isOpen2 ? "/up-arrow.png" : "/down-arrow.png"} 
              alt="toggle" 
              className="h-3 w-3" 
            />
          </div>
          {isOpen2 && (
            <p className="mt-2 text-sm">
              Utilizamos 2 fuentes principales: <br />
              <div className="py-1">1. Las estaciones de monitoreo de la <a href="http://aire.nl.gob.mx/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Secretaría de Desarrollo Sustentable</a> del estado de Nuevo León.</div>
              <div className="py-1">2. Las estaciones de monitoreo ciudadanas de <a href="https://www2.purpleair.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Purple Air</a>.</div>
            </p>
          )}
        </div>

        {/* Pregunta 2 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div onClick={() => setIsOpen3(!isOpen3)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p>Question 3</p>
            <img 
              src={isOpen3 ? "/up-arrow.png" : "/down-arrow.png"} 
              alt="toggle" 
              className="h-3 w-3" 
            />
          </div>
          {isOpen3 && (
            <p className="mt-2 text-sm">
              Answer 3
            </p>
          )}
        </div>

        {/* Pregunta 3 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div onClick={() => setIsOpen4(!isOpen4)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p>Question 4</p>
            <img 
              src={isOpen4 ? "/up-arrow.png" : "/down-arrow.png"} 
              alt="toggle" 
              className="h-3 w-3" 
            />
          </div>
          {isOpen4 && (
            <p className="mt-2 text-sm">
              Answer 4
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
