"use client";

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Mapa, {getMarkerColor} from '../components/mapa';

// QualityBar
function QualityBar({ pm25 }) {
  const calculateLeft = () => {
    if (pm25 <= 25) return (pm25 / 25) * 20;  // 0-25 range is 20% of total
    if (pm25 <= 45) return 20 + ((pm25 - 26) / 20) * 20;  // 26-45 range is 20% of total
    if (pm25 <= 79) return 40 + ((pm25 - 46) / 34) * 20;  // 46-79 range is 20% of total
    if (pm25 <= 147) return 60 + ((pm25 - 80) / 68) * 20;  // 80-147 range is 20% of total
    return 100; // for PM2.5 > 147
  };

  // Function to determine quality text based on PM2.5 value
  const getQualityText = () => {
    if (pm25 <= 25) return "Buena";
    if (pm25 > 25 && pm25 <= 45) return "Aceptable";
    if (pm25 > 45 && pm25 <= 79) return "Mala";
    if (pm25 > 79 && pm25 <= 147) return "Muy Mala";
    if (pm25 > 147) return "Extremadamente Mala";
    return "N/A";  // default text in case the value is null or undefined
  };

  // Function to determine quality recommendations based on PM2.5 value
  const getQualityRecommendations = () => {
    if (pm25 <= 25) return "Disfruta las actividades al aire libre.";
    if (pm25 > 25 && pm25 <= 45) return "Disfruta las actividades al aire libre.";
    if (pm25 > 45 && pm25 <= 79) return "Reduce las actividades físicas vigorosas al aire libre.";
    if (pm25 > 79 && pm25 <= 147) return "Evita las actividades físicas moderadas y vigorosas al aire libre.";
    if (pm25 > 147) return "Permanece en espacios interiores. Acudir al médico si se presentan síntomas respiratorios o cardiacos.";
    return "N/A";  // default text in case the value is null or undefined
  };

  return (
    <>
      <div className="text-left text-3xl my-2">{getQualityText()}</div>
      <div className="text-left text-sm pb-4">{getQualityRecommendations()}</div>
      <div className="relative my-4 flex min-h-[10px] rounded-lg overflow-hidden">
        <div style={{ flexBasis: "15%" }} className="bg-custom-green" />
        <div style={{ flexBasis: "10%" }} className="bg-gradient-to-r from-custom-green to-custom-yellow" />
        <div style={{ flexBasis: "10%" }} className="bg-custom-yellow" />
        <div style={{ flexBasis: "10%" }} className="bg-gradient-to-r from-custom-yellow to-custom-orange" />
        <div style={{ flexBasis: "10%" }} className="bg-custom-orange" />
        <div style={{ flexBasis: "10%" }} className="bg-gradient-to-r from-custom-orange to-custom-red" />
        <div style={{ flexBasis: "10%" }} className="bg-custom-red" />
        <div style={{ flexBasis: "10%" }} className="bg-gradient-to-r from-custom-red to-custom-purple" />
        <div style={{ flexBasis: "15%" }} className="bg-custom-purple" />
        <div style={{ left: `${calculateLeft()}%`, borderColor: 'rgb(249, 250, 251)' }} className="absolute w-3 h-3 bg-white rounded-full border-2 transform -translate-y-1/2 top-1/2"></div>
      </div>
    </>
  );
}

// Index
export default function Index() {
  const [nearestSensor, setNearestSensor] = useState(null);

  return (
    <div className="pb-20"> {/* Added padding-bottom */}
      <Navbar currentPage="inicio" />

      {/* Page's title */}
      <div className="flex items-center justify-center mt-5 pb-0">
        <img src="/logo.png" width={20} height={20} alt="Logo" className="mr-2" />
        <h1 className="text-1xl font-semibold">Respira Claro</h1>
      </div>
      
      {/* Hidden Mapa component to fetch the nearest sensor data */}
      <div style={{ display: 'none' }}>
        <Mapa onNearestSensorChange={setNearestSensor} />
      </div>
      
      {/* Calidad del Aire */}
      {nearestSensor && (
        <div className="mx-4 mb-2 pt-8">
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <QualityBar pm25={nearestSensor.pm25} />
            <div className="text-left text-xs my-2 pt-4">Calidad de aire en {nearestSensor.address}.</div>
          </div>
          {/* Running and Cycling */}
          <div className="flex justify-between mt-8">
            {/* Running */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 mr-2">
              <div className="flex items-center space-x-2">
                <img src="/run.png" width={28} height={28} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Puedes salir a correr sin problema.</p>
            </div>
            {/* Cycling */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 ml-2">
              <div className="flex items-center space-x-2">
                <img src="/cycling.png" width={28} height={28} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Puedes salir a andar en bici sin problema.</p>
            </div>
          </div>
          {/* Personas vulnerables y parques */}
          <div className="flex justify-between mt-4">
            {/* Personas vulnerables */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 mr-2">
              <div className="flex items-center space-x-2">
                <img src="/baby.png" width={28} height={28} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Bebes y adultos mayores pueden salir sin problema.</p>
            </div>
            {/* Parques */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 ml-2">
              <div className="flex items-center space-x-2">
                <img src="/picnic.png" width={28} height={28} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Puedess realizar picnics o salir a terrazas sin problema.</p>
            </div>
          </div>
          <div className="text-left text-xs my-2">Última Actualización: {nearestSensor.lastUpdated}</div>
          <div className="text-left text-xs my-2">
            Datos de calidad de aire proporcionados por{' '} 
            <a href="https://www2.purpleair.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Purple Air
            </a>.
          </div>
        </div>
      )}
    </div>
  );
}



























