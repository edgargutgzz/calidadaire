"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Papa from 'papaparse';
import Navbar from '../../components/navbar';
import { ClipLoader } from "react-spinners";


const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Index() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadData = async () => {
    setIsDownloading(true);
    let data = [];
    let hasMore = true;
    let lastId = null;

    while (hasMore) {
      const query = supabase.from('calidad_aire').select('*').order('id', { ascending: true }).limit(1000);
      if (lastId) {
        query.gt('id', lastId);
      }

      const { data: pageData, error } = await query;

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      if (pageData.length === 0) {
        hasMore = false;
      } else {
        lastId = pageData[pageData.length - 1].id;
        data = [...data, ...pageData];
      }
    }

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'calidad_aire.csv');
    document.body.appendChild(link);
    link.click();

    setIsDownloading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Navbar currentPage="datos" />
      <div className="mx-4 pt-4 flex-grow overflow-auto lg:w-9/12 lg:flex-grow lg:pl-4">
        <style>
          {`
          .downloading {
            background-image: linear-gradient(120deg, transparent 25%, rgba(255, 255, 255, 0.5) 50%, transparent 75%);
            background-size: 200% 100%;
            animation: downloading 1s linear infinite;
          }

          @keyframes downloading {
            from { background-position: 200% 0; }
            to { background-position: -200% 0; }
          }
          `}
        </style>

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

        {/* Download button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '8px', marginBottom: '16px', width: 'fit-content', marginLeft: 'auto' }}>
          <button
            onClick={downloadData}
            className={`text-sm text-black flex font-bold items-center px-4 py-1 cursor-pointer ${isDownloading ? 'downloading' : ''}`}
          >
            {isDownloading ? <span style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}><ClipLoader size={15} color={"#000000"} /></span> : <img src="/download.png" alt="Download" className="h-4 w-4 mr-2" />}
            {isDownloading ? 'Descargando' : 'Descargar'}
          </button>
        </div>

      </div>
    </div>
  );
}





















