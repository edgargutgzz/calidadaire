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
];

export default function Index() {
  const [isDownloading, setIsDownloading] = useState(false);

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
          <h1 className="text-xl font-bold">Datos de Calidad del Aire</h1>
          <p className="text-sm mt-2">
            Todos los datos que utilizamos para informarte sobre la calidad del aire en tu ciudad se encuentran abiertos al público.
          </p>
          <p className="text-sm mt-2">
            Creemos en la transparencia y en la apertura de datos, por lo que te invitamos a que utilices esta información como mejor te convenga.
          </p>
        </div>

        {/* Data Preview Table */}
        <div className="rounded-lg overflow-hidden border border-gray-200 mb-8">
          <div className="overflow-x-auto"> {/* Add this wrapper */}
            <table className="min-w-full bg-white text-sm" {...getTableProps()}>
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th className="py-2 px-4 border-b" {...column.getHeaderProps()}>{column.render('Header')}</th>
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





















