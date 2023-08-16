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

  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Navbar currentPage="acerca-de" />
      <div className="mx-4 pt-4 flex-grow overflow-auto lg:w-9/12 lg:flex-grow lg:pl-4">

        {/* Title and Intro text */}
        <div className="mx-4 mt-4 mb-4">
          <h1 className="text-xl font-bold">Aire Claro</h1>
          <p className="text-sm mt-2">
            Creamos aire claro para informar sobre la calidad del aire al momento con mejore datos.
          </p>
        </div>

        {/* Pregunta 1 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div onClick={() => setIsOpen1(!isOpen1)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p>¿Por qué utilizar esta app sobre las otras?</p>
            <img 
              src={isOpen1 ? "/up-arrow.png" : "/down-arrow.png"} 
              alt="toggle" 
              className="h-3 w-3" 
            />
          </div>
          {isOpen1 && (
            <p className="mt-2 text-sm">
              Esta app es la única que te permite saber si puedes salir a correr o andar en bici, si puedes llevar a tus hijos o a tus padres a un parque, o si puedes hacer un picnic en el parque. Todo esto basado en la calidad del aire en tu ciudad.
            </p>
          )}
        </div>

        {/* Pregunta 2 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <div onClick={() => setIsOpen2(!isOpen2)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p>Question 2</p>
            <img 
              src={isOpen2 ? "/up-arrow.png" : "/down-arrow.png"} 
              alt="toggle" 
              className="h-3 w-3" 
            />
          </div>
          {isOpen2 && (
            <p className="mt-2 text-sm">
              Answer 2
            </p>
          )}
        </div>

        {/* Pregunta 3 */}
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

        {/* Pregunta 4 */}
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