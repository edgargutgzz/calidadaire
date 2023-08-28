"use client";

import React, { useState } from 'react';
import { useTable } from 'react-table';
import { createClient } from '@supabase/supabase-js';
import Papa from 'papaparse';
import Navbar from '../../components/navbar';
import { ClipLoader } from 'react-spinners';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const previewData = [
  { id: 1, sensor_id: 136522, pm25: 22, temperature: 37, humidity: 36, time_stamp: "2023-07-19T12:01:02" },
  { id: 2, sensor_id: 45903, pm25: 28.4, temperature: 35, humidity: 38, time_stamp: "2023-07-19T12:01:03" },
  { id: 3, sensor_id: 24415, pm25: 9.5, temperature: 36, humidity: 37, time_stamp: "2023-07-19T12:01:04" },
  { id: 4, sensor_id: 47855, pm25: 20.2, temperature: 39, humidity: 27, time_stamp: "2023-07-19T12:01:05" },
  { id: 5, sensor_id: 39695, pm25: 14.7, temperature: 33, humidity: 42, time_stamp: "2023-07-19T12:01:06" },
];

export default function Index() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); 
  const [isExplanationOpen, setIsExplanationOpen] = useState(false);

  const columns = React.useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Sensor ID', accessor: 'sensor_id' },
      { Header: 'PM2.5', accessor: 'pm25' },
      { Header: 'Temperature', accessor: 'temperature' },
      { Header: 'Humidity', accessor: 'humidity' },
      { Header: 'Timestamp', accessor: 'time_stamp' }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: previewData });

  // Columns for the explanation table
  const explanationColumns = React.useMemo(
    () => [
      { Header: 'Nombre', accessor: 'column' },
      { Header: 'Descripción', accessor: 'description' },
    ],
    []
  );

  // Data for the explanation table
  const explanationData = [
    { column: 'ID', description: 'Identificador único de cada medición.' },
    { column: 'Sensor ID', description: ' Identificador único de cada sensor.' },
    { column: 'PM2.5', description: 'Promedio móvil de la última hora de PM2.5 ' },
    { column: 'Temperature', description: 'Temperatura en grados Celsius.' },
    { column: 'Humidity', description: 'Humedad en porcentaje.' },
    { column: 'Timestamp', description: 'Día y hora de la medición.' },
  ];

  // Use `useTable` for the explanation table
  const {
    getTableProps: getExplanationTableProps,
    getTableBodyProps: getExplanationTableBodyProps,
    headerGroups: explanationHeaderGroups,
    rows: explanationRows,
    prepareRow: prepareExplanationRow,
  } = useTable({ columns: explanationColumns, data: explanationData });

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
    <div className="flex flex-col lg:flex-row">
      <Navbar currentPage="datos" />
      <div className="flex-grow mx-4 mt-6 lg:ml-40 lg:mr-40 lg:mt-10 lg:flex-grow lg:w-9/12">

        {/* Title and Intro text */}
        <div className="mb-4 lg:mb-8">
          <h1 className="text-2xl mb-2 lg:text-4xl font-bold lg:mb-4">Datos de Calidad del Aire</h1>
          <p className="text-sm lg:text-base">
            <span className="block mb-2">
              Todos los datos que utilizamos para informarte sobre la calidad del aire en la Zona Metropolitana de Monterrey se encuentran abiertos al público.
              Creemos en la transparencia y en la apertura de datos, por lo que te invitamos a que utilices esta información como mejor te convenga.
            </span>
          </p>
        </div>

        {/* Vista Previa - Dropdown */}
        <div className="bg-white mb-4 rounded-lg shadow-lg p-4 lg:mb-8">
          <div onClick={() => setIsPreviewOpen(!isPreviewOpen)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p className='text-sm lg:text-base'>Vista Previa</p>
            <img 
              src={isPreviewOpen ? "/up-arrow.png" : "/down-arrow.png"} 
              alt="toggle" 
              className="h-3 w-3" 
            />
          </div>
        </div>

        {/* Vista Previa - Table */}
        {isPreviewOpen && (
          <div className="rounded-lg mb-4 overflow-hidden border border-gray-200 lg:mb-8">
            <div className="overflow-x-auto"> {/* Add this wrapper */}
              <table className="min-w-full bg-white text-sm" {...getTableProps()}>
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th className="text-left py-2 px-4 border-b" {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map(row => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td className="py-2 px-4 border-b" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Descripción - Button*/}
        <div className="bg-white rounded-lg shadow-lg mb-4 p-4 lg:mb-8">
          <div onClick={() => setIsExplanationOpen(!isExplanationOpen)} className="mt-2 text-sm font-bold cursor-pointer flex justify-between items-center">
            <p className='text-sm lg:text-base'>Descripción de Datos</p>
            <img 
              src={isExplanationOpen ? "/up-arrow.png" : "/down-arrow.png"} 
              alt="toggle" 
              className="h-3 w-3" 
            />
          </div>
        </div>

        {/* Descripción - Table */}
        {isExplanationOpen && (
          <div className="rounded-lg overflow-hidden border mb-4 border-gray-200 lg:mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-sm" {...getExplanationTableProps()}>
                <thead>
                  {explanationHeaderGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th className="text-left py-2 px-4 border-b" {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getExplanationTableBodyProps()}>
                  {explanationRows.map(row => {
                    prepareExplanationRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td className="py-2 px-4 border-b" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Download button */}
        <div className="flex justify-end">
          <div className="bg-white rounded p-2 mb-4 shadow-md w-auto inline-flex">
            <button
              onClick={downloadData}
              className={`text-sm lg:text-base text-black font-bold flex items-center px-4 py-1 cursor-pointer ${isDownloading ? 'downloading' : ''}`}
            >
              {isDownloading ? <span className="mr-2 flex items-center"><ClipLoader size={16} color={"#000000"} /></span> : <img src="/download.png" alt="Download" className="h-4 w-4 mr-2" />}
              {isDownloading ? 'Descargando' : 'Descargar'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}





















