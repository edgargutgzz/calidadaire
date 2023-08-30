"use client";

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Mapa, {getMarkerColor} from '../components/mapa';

// Calidad del Aire
function QualityBar({ pm25 }) {

  // Quality Bar
  const calculateLeft = () => {
    if (pm25 <= 25) return ((pm25 / 25) * 12) + 6;  // 0-25 range is 12% of total, shifted by half (6%)
    if (pm25 <= 45) return 22 + ((pm25 - 26) / 20) * 12 + 6;  // 26-45 range is 12% of total, shifted by half (6%)
    if (pm25 <= 79) return 44 + ((pm25 - 46) / 34) * 12 + 6;  // 46-79 range is 12% of total, shifted by half (6%)
    if (pm25 <= 147) return 66 + ((pm25 - 80) / 68) * 12 + 6;  // 80-147 range is 12% of total, shifted by half (6%)
    return 88 + 6; // for PM2.5 > 147, shifted by half (6%)
  };
  
  // Texto con nivel de calidad del aire
  const getQualityText = () => {
    if (pm25 <= 25) return "Buena";
    if (pm25 > 25 && pm25 <= 45) return "Aceptable";
    if (pm25 > 45 && pm25 <= 79) return "Mala";
    if (pm25 > 79 && pm25 <= 147) return "Muy Mala";
    if (pm25 > 147) return "Extremadamente Mala";
    return "No Disponible";  // default text in case the value is null or undefined
  };

  return (
    <>
      <div className="text-left font-semibold text-4xl">{getQualityText()}</div>
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
        <div style={{ left: `${calculateLeft()}%`, borderColor: "white" }} className="absolute w-4 h-4 bg-gray-200 rounded-full border-4 transform -translate-y-1/2 top-1/2"></div>
      </div>
    </>
  );
}

// Recomendaciones
export default function Recomendaciones() {
  const [nearestSensor, setNearestSensor] = useState(null);

  // Usuarios
  const getActivityRecommendation = (activity, pm25) => {

    // Embarazadas
    if (activity === 'embarazadas') {
      if (pm25 <= 25) return 'Es seguro salir a correr.';
      if (pm25 <= 45) return 'Considera reducir el tiempo promedio que sales a correr.';
      if (pm25 <= 79) return 'Evita salir a correr.';
      if (pm25 <= 147) return 'No salgas a correr.';
      return 'Permanece en interiores. Acude al médico si presentas síntomas respiratorios o cardiacos.';
    }

    // Menores
    if (activity === 'menores') {
      if (pm25 <= 25) return 'Es seguro andar en bici.';
      if (pm25 <= 45) return 'Considera reducir el tiempo promedio que andas en bici.';
      if (pm25 <= 79) return 'Evita andar en bici.';
      if (pm25 <= 147) return 'No andes en bici.';
      return 'Permanece en interiores. Acude al médico si presentas síntomas respiratorios o cardiacos.';
    }

    // Adultos Mayores
    if (activity === 'adultos_mayores') {
      if (pm25 <= 25) return 'Es seguro andar en bici.';
      if (pm25 <= 45) return 'Considera reducir el tiempo promedio que andas en bici.';
      if (pm25 <= 79) return 'Evita andar en bici.';
      if (pm25 <= 147) return 'No andes en bici.';
      return 'Permanece en interiores. Acude al médico si presentas síntomas respiratorios o cardiacos.';
    }

    // Adultos Mayores
    if (activity === 'condiciones_medicas') {
      if (pm25 <= 25) return 'Es seguro andar en bici.';
      if (pm25 <= 45) return 'Considera reducir el tiempo promedio que andas en bici.';
      if (pm25 <= 79) return 'Evita andar en bici.';
      if (pm25 <= 147) return 'No andes en bici.';
      return 'Permanece en interiores. Acude al médico si presentas síntomas respiratorios o cardiacos.';
    }

    return 'No disponible'; // default text in case of unexpected input
  };

  // Color de recomendaciones
  const getBorderColor = (pm25) => {
    if (pm25 <= 25) return "custom-green";
    if (pm25 > 25 && pm25 <= 45) return "custom-yellow";
    if (pm25 > 45 && pm25 <= 79) return "custom-orange";
    if (pm25 > 79 && pm25 <= 147) return "custom-red";
    return "custom-purple"; // for PM2.5 > 147
  };

  // Function to render the cards based on the selected profile
  const renderCards = () => {

    return (
      <>
        {/* Embarazadas y Menores */}
        <div className="flex flex-row justify-between mt-2"> 
          {/* Embarazadas */}
          <div className={`bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 mr-2 ${getBorderColor(nearestSensor.pm25)} border-b-4`}>
            <div className="flex items-center space-x-2">
              <img src="/embarazadas.png" width={24} height={24} alt="Emabarazadas Icon" />
            </div>
            <p className="mt-2 text-sm lg:text-base">{getActivityRecommendation('embarazadas', nearestSensor.pm25)}</p>
          </div>
          {/* Menores */}
          <div className={`bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 ml-2 ${getBorderColor(nearestSensor.pm25)} border-b-4`}>
            <div className="flex items-center space-x-2">
              <img src="/menores.png" width={24} height={24} alt="Menores Icon" />
            </div>
            <p className="mt-2 text-sm lg:text-base">{getActivityRecommendation('menores', nearestSensor.pm25)}</p>
          </div>
        </div>

        {/* Adultos Mayores y Condiciones Medicas */}
        <div className="flex flex-row justify-between mt-2"> 
          {/* Adultos Mayores */}
          <div className={`bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 mr-2 ${getBorderColor(nearestSensor.pm25)} border-b-4`}>
            <div className="flex items-center space-x-2">
              <img src="/adultos_mayores2.png" width={24} height={24} alt="Adultos Mayores Icon" />
            </div>
            <p className="mt-2 text-sm lg:text-base">{getActivityRecommendation('adultos_mayores', nearestSensor.pm25)}</p>
          </div>
          {/* Condiciones Médicas */}
          <div className={`bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 ml-2 ${getBorderColor(nearestSensor.pm25)} border-b-4`}>
            <div className="flex items-center space-x-2">
              <img src="/corazon.png" width={24} height={24} alt="Condiciones Medicas Icon" />
              <img src="/pulmon.png" width={24} height={24} alt="Pulmon Icon" /> {/* Added line */}
            </div>
            <p className="mt-2 text-sm lg:text-base">{getActivityRecommendation('condiciones_medicas', nearestSensor.pm25)}</p>
          </div>
        </div>
      </>
    );

  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Navbar currentPage="inicio" />
      <div className="pt-4 pb-20 lg:ml-40 lg:mr-40 lg:mt-10 lg:pt-0 lg:flex-grow lg:w-9/12">

        {/* Hidden Mapa component to fetch the nearest sensor data */}
        <div style={{ display: 'none' }}>
          <Mapa onNearestSensorChange={setNearestSensor} />
        </div>
      
        {/* Calidad del Aire */}
        {nearestSensor && (
          <div className="mx-4 lg:mx-0 mb-0 pb-4">
            {/* Quality Bar */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
              <QualityBar pm25={nearestSensor.pm25} />
            </div>
            {renderCards()}
            {/* Location */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 mt-0">
              <div className="flex items-center">
                <img src="/navigation.png" className="w-4 h-4" alt="Correr Icon" />
                <p className="ml-2 text-xs lg:text-sm">Calidad de aire en {nearestSensor.address}.</p>
              </div>
            </div>
            {/* Hora */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-10 mt-0">
              <div className="flex items-center">
                <img src="/clock.png" className="w-4 h-4" alt="Correr Icon" />
                <p className="ml-2 text-xs lg:text-sm">Última actualización a las {nearestSensor.lastUpdated}.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>  
  );
}




















































