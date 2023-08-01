"use client";

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Mapa, {getMarkerColor} from '../components/mapa';

// QualityBar
function QualityBar({ pm25 }) {
  const calculateLeft = () => {
    if (pm25 <= 25) return ((pm25 / 25) * 12) + 6;  // 0-25 range is 12% of total, shifted by half (6%)
    if (pm25 <= 45) return 22 + ((pm25 - 26) / 20) * 12 + 6;  // 26-45 range is 12% of total, shifted by half (6%)
    if (pm25 <= 79) return 44 + ((pm25 - 46) / 34) * 12 + 6;  // 46-79 range is 12% of total, shifted by half (6%)
    if (pm25 <= 147) return 66 + ((pm25 - 80) / 68) * 12 + 6;  // 80-147 range is 12% of total, shifted by half (6%)
    return 88 + 6; // for PM2.5 > 147, shifted by half (6%)
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
      <div className="text-left font-semibold text-4xl">{getQualityText()}</div>
      <div className="text-left text-sm pt-2">{getQualityRecommendations()}</div>
      <div className="relative flex min-h-[12px] rounded-lg overflow-hidden mt-4 mb-2">
        <div style={{ flexBasis: "12%" }} className="bg-custom-green" />
        <div style={{ flexBasis: "10%" }} className="bg-gradient-to-r from-custom-green to-custom-yellow" />
        <div style={{ flexBasis: "12%" }} className="bg-custom-yellow" />
        <div style={{ flexBasis: "10%" }} className="bg-gradient-to-r from-custom-yellow to-custom-orange" />
        <div style={{ flexBasis: "12%" }} className="bg-custom-orange" />
        <div style={{ flexBasis: "10%" }} className="bg-gradient-to-r from-custom-orange to-custom-red" />
        <div style={{ flexBasis: "12%" }} className="bg-custom-red" />
        <div style={{ flexBasis: "10%" }} className="bg-gradient-to-r from-custom-red to-custom-purple" />
        <div style={{ flexBasis: "12%" }} className="bg-custom-purple" />
        <div style={{ left: `${calculateLeft()}%`, borderColor: "white" }} className="absolute w-4 h-4 bg-gray-400 rounded-full border-4 transform -translate-y-1/2 top-1/2"></div>
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
      
      {/* Hidden Mapa component to fetch the nearest sensor data */}
      <div style={{ display: 'none' }}>
        <Mapa onNearestSensorChange={setNearestSensor} />
      </div>
      
      {/* Calidad del Aire */}
      {nearestSensor && (
        <div className="mx-4 mb-2 mt-2 pt-4 pb-4">
          {/* Quality Bar */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <QualityBar pm25={nearestSensor.pm25} />
          </div>
          {/* Running and Cycling */}
          <div className="flex justify-between mt-6">
            {/* Running */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 mr-2">
              <div className="flex items-center space-x-2">
                <img src="/run.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Es seguro salir a correr.</p>
            </div>
            {/* Cycling */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 ml-2">
              <div className="flex items-center space-x-2">
                <img src="/cycling.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Es seguro andar en bici.</p>
            </div>
          </div>
          {/* Personas vulnerables y parques */}
          <div className="flex justify-between mt-2">
            {/* Personas vulnerables */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 mr-2">
              <div className="flex items-center space-x-2">
                <img src="/baby.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Bebes y adultos mayores pueden salir con seguridad.</p>
            </div>
            {/* Parques */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 ml-2">
              <div className="flex items-center space-x-2">
                <img src="/picnic.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Es seguro realizar picnics al aire libre.</p>
            </div>
          </div>
          {/* Location */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4 mt-2">
            <div className="flex items-center">
              <img src="/navigation.png" className="w-4 h-4" alt="Correr Icon" />
              <p className="ml-2 text-xs">Calidad de aire en {nearestSensor.address}.</p>
            </div>
          </div>
          {/* Hora */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4 mt-6">
            <div className="flex items-center">
              <img src="/clock.png" className="w-4 h-4" alt="Correr Icon" />
              <p className="ml-2 text-xs">Última actualización a las {nearestSensor.lastUpdated}.</p>
            </div>
          </div>
          {/* Source */}
          <div className="text-left text-xs pt-2 text-gray-500">
            Datos de calidad de aire proporcionados por{' '} 
            <a href="https://www2.purpleair.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Purple Air
            </a> y evaluados por el{' '}
            <a href="https://observatoriodelaire.com/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Observatorio Ciudadano de la Calidad del Aire
            </a>.
          </div>
        </div>
      )}
    </div>
  );
}



























