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

        {/* Title and Intro text */}
        <div className="mx-1 mt-2 mb-8">
          <h1 className="text-xl font-bold">Descarga los datos</h1>
          <p className="text-sm mt-2">
            Todos los datos que utilizamos para informarte sobre la calidad de aire del área metropolitana de Monterrey se encuentran abiertos a través del botón de descarga.
          </p>
          <p className="text-sm mt-2">
            Creemos en la transparencia y en la apertura de datos, por lo que te invitamos a que utilices estos datos para crear tus propias visualizaciones y análisis.
          </p>
        </div>

        {/* Download button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '8px', marginBottom: '16px', width: 'fit-content', marginLeft: 'auto' }}>
        <button
          onClick={downloadData}
          className={`text-sm text-black flex font-bold items-center px-4 py-1 cursor-pointer ${isDownloading ? 'downloading' : ''}`}
        >
          {isDownloading ? <span style={{ marginRight: '8px', display: 'flex', alignItems: 'center' }}><ClipLoader size={16} color={"#000000"} /></span> : <img src="/download.png" alt="Download" className="h-4 w-4 mr-2" />}
          {isDownloading ? 'Descargando' : 'Descargar'}
        </button>
        </div>

      </div>
    </div>
  );
}





















