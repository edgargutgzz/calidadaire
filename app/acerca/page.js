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
  const [isOpen5, setIsOpen5] = useState(false);
  const [isOpen6, setIsOpen6] = useState(false);
  const [isOpen7, setIsOpen7] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row">
      <Navbar currentPage="acerca" />
      <div className="flex-grow mx-4 mt-6 mb-20 lg:ml-40 lg:mr-40 lg:mt-10 lg:flex-grow lg:w-9/12">

        {/* Aire Claro - Video */}
        <div className="mb-4 relative rounded-lg overflow-hidden md:pb-[56.25%] pb-[75%]" style={{ paddingBottom: "56.25%" }}> {/* 16:9 Aspect Ratio */}
          <iframe 
            style={{
              position: "absolute",
              top: "0",
              bottom: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
            src="https://www.youtube.com/embed/PLACEHOLDER" 
            title="YouTube video" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>

        {/* Title */}
        <div className="mt-16">
          <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-8 px-1">Preguntas Frecuentes</h1>
        </div>

        {/* Pregunta 1 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 lg:mb-6">
          <div onClick={() => setIsOpen3(!isOpen3)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p className='text-sm lg:text-base'>¿Qué es Aire Claro?</p>
            <img
              src={isOpen3 ? "/up-arrow.png" : "/down-arrow.png"}
              alt="toggle"
              className="h-3 w-3"
            />
          </div>
          {isOpen3 && (
            <p className="mt-4 text-sm lg:text-base">
              Aire Claro es la plataforma que muestra la calidad del aire en tiempo real de la Zona Metropolitana de Monterrey. <br />
            </p>
          )}
        </div>

        {/* Pregunta 2 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 lg:mb-6">
          <div onClick={() => setIsOpen4(!isOpen4)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p className='text-sm lg:text-base'>¿Cómo garantizan la precisión de sus recomendaciones?</p>
            <img
              src={isOpen4 ? "/up-arrow.png" : "/down-arrow.png"}
              alt="toggle"
              className="h-3 w-3"
            />
          </div>
          {isOpen4 && (
            <p className="mt-4 text-sm lg:text-base">
              Medimos sólo las partículas más dañinas para tu salud de acuerdo a las condiciones climatológicas de la Zona Metropolitana de Monterrey.
            </p>
          )}
        </div>

        {/* Pregunta 3 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 lg:mb-6">
          <div onClick={() => setIsOpen6(!isOpen6)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p className='text-sm lg:text-base'>¿Quién conforma la población sensible?</p>
            <img
              src={isOpen4 ? "/up-arrow.png" : "/down-arrow.png"}
              alt="toggle"
              className="h-3 w-3"
            />
          </div>
          {isOpen6 && (
            <p className="mt-4 text-sm lg:text-base">
              Infantes, mujeres embarazadas, personas mayores o con padecimientos.
            </p>
          )}
        </div>

        {/* Pregunta 4 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 lg:mb-6">
          <div onClick={() => setIsOpen1(!isOpen1)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p className='text-sm lg:text-base'>¿Qué información utilizan para medir la calidad del aire?</p>
            <img 
              src={isOpen1 ? "/up-arrow.png" : "/down-arrow.png"} 
              alt="toggle" 
              className="h-3 w-3" 
            />
          </div>
          {isOpen1 && (
            <p className="mt-4 text-sm lg:text-base">
              <div className="py-1">1. Las estaciones de monitoreo de la <a href="http://aire.nl.gob.mx/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Secretaría de Desarrollo Sustentable</a> del estado de Nuevo León.</div>
              <div className="py-1">2. Las estaciones de monitoreo ciudadanas de <a href="https://www2.purpleair.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Purple Air</a>.</div>
            </p>
          )}
        </div>

        {/* Pregunta 5 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 lg:mb-6">
          <div onClick={() => setIsOpen7(!isOpen7)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p className='text-sm lg:text-base'>¿Cómo agrego un ícono de enlace directo en mi celular?</p>
            <img 
              src={isOpen7 ? "/up-arrow.png" : "/down-arrow.png"}
              alt="toggle" 
              className="h-3 w-3" 
            />
          </div>
          {isOpen7 && (
            <div className="mt-4 text-sm lg:text-base">
              <div className="relative mb-8">
                <p className="text-sm lg:text-base mb-2">iPhone</p>
                <div style={{ height: '300px', position: 'relative' }} className="rounded-lg overflow-hidden">
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/B7fKs4dTeu0?start=64" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                </div>
              </div>

              <div className="relative">
                <p className="text-sm lg:text-base mb-2">Android</p> 
                <div style={{ height: '300px', position: 'relative' }} className="rounded-lg overflow-hidden"> {/* Rounded corners */}
                  <iframe 
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/O1xEXKB6tNg"  
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen>
                  </iframe>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Pregunta 6 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 lg:mb-6">
          <div onClick={() => setIsOpen2(!isOpen2)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p className='text-sm lg:text-base pr-4'>¿Quién es el Observatorio Ciudadano de la Calidad del Aire?</p>
            <img
              src={isOpen2 ? "/up-arrow.png" : "/down-arrow.png"}
              alt="toggle"
              className="h-3 w-3"
            />
          </div>
          {isOpen2 && (
            <>
              <p className="mt-4 text-sm lg:text-base">
                El <a href="https://observatoriodelaire.com/index.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">OCCAMM</a> es un organización de la sociedad civil que promueve información sobre el estado, causas y efectos de la contaminación del aire en la Zona Metropolitana de Monterrey.
              </p>
              <p className="mt-2 text-sm lg:text-base">
                El observatorio es también quién evalúa la información que utiliza Aire Claro para brindar las mejores recomendaciones posibles.
              </p>
            </>
          )}
        </div>

        {/* Pregunta 7 */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 lg:mb-6">
          <div onClick={() => setIsOpen5(!isOpen5)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p className='text-sm lg:text-base'>¿Tienes más preguntas o comentarios?</p>
            <img 
              src={isOpen5 ? "/up-arrow.png" : "/down-arrow.png"} 
              alt="toggle" 
              className="h-3 w-3" 
            />
          </div>
          {isOpen5 && (
            <p className="mt-4 text-sm lg:text-base">
              Envíanos un correo  <a href="mailto:hola@aireclaro.com" className="text-blue-500 hover:underline">hola@aireclaro.com</a>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}


