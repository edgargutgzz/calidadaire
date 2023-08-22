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
    if (pm25 > 45 && pm25 <= 79) return "Es posible realizar actividades al aire libre. Si presentas síntomas como tos o falta de aire, toma más descansos y realiza actividades menos vigorosas.";
    if (pm25 > 79 && pm25 <= 147) return "Evita la actividad física vigorosa o prolongada al aire libre. Mantente informado sobre la evolución  de la calidad del aire.";
    if (pm25 > 147) return "Permanece en espacios interiores, reprograma actividades al aire libre y si presentas síntomas respiratorios y/o cardiácos acude al médico.";
    return "N/A";  // default text in case the value is null or undefined
  };

  return (
    <>
      <div className="text-left font-semibold text-4xl">{getQualityText()}</div>
      {/* <div className="text-left text-sm pt-2">{getQualityRecommendations()}</div> */}
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

// Index
export default function Index() {
  const [nearestSensor, setNearestSensor] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState('vulnerable');

  // Function to render the cards based on the selected profile
  const renderCards = () => {

     // Vulnerable
    if (selectedProfile === 'vulnerable') {
      return (
        <>
          {/* Recomendación General */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-full"> 
            <p className="mt-2 text-sm">Disfruta de las actividades al aire libre.</p>
          </div>
          {/* Actividades */}
          <div className="flex flex-col justify-between mt-2"> 
            {/* Running */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-full"> 
              <div className="flex items-center space-x-2">
                <img src="/run.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Es seguro salir a correr.</p>
            </div>
            {/* Cycling */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-full"> 
              <div className="flex items-center space-x-2">
                <img src="/cycling.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Es seguro andar en bici.</p>
            </div>
            {/* Parques */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-full"> 
              <div className="flex items-center space-x-2">
                <img src="/picnic.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Es seguro realizar picnics al aire libre.</p>
            </div>
          </div>
        </>
      );
    }

    // General
    if (selectedProfile === 'general') {
      return (
        <>
          {/* Actividades */}
          <div className="flex flex-col justify-between mt-2"> {/* Updated flexbox direction */}
            {/* Running */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-full"> {/* Updated width */}
              <div className="flex items-center space-x-2">
                <img src="/run.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Es seguro.</p>
            </div>
            {/* Cycling */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-full"> {/* Updated width */}
              <div className="flex items-center space-x-2">
                <img src="/cycling.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Es seguro.</p>
            </div>
            {/* Parques */}
            <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-full"> {/* Updated width */}
              <div className="flex items-center space-x-2">
                <img src="/picnic.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Es seguro.</p>
            </div>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Navbar currentPage="inicio" />
      <div className="lg:ml-20 lg:mr-20 lg:mt-10 pb-20 lg:pt-0 pt-4 lg:w-9/12 lg:flex-grow">

        {/* Hidden Mapa component to fetch the nearest sensor data */}
        <div style={{ display: 'none' }}>
          <Mapa onNearestSensorChange={setNearestSensor} />
        </div>
      
        {/* Calidad del Aire */}
        {nearestSensor && (
          <div className="mx-4 lg:mx-0 mb-0 pb-4">
            {/* Quality Bar */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <QualityBar pm25={nearestSensor.pm25} />
            </div>
            {/* Población */}
            <div className="flex justify-between mt-4">
              {/* Vulnerable */}
              <div className={`rounded-lg shadow-lg w-1/2 mr-2 p-2 mb-14 bg-white ${selectedProfile === 'vulnerable' ? 'border-b-4 border-gray-400 font-bold' : 'border-b-4 border-transparent'}`}>
                <button className="w-full text-xs" onClick={() => setSelectedProfile('vulnerable')}>Población Vulnerable</button>
              </div>
              {/* General */}
              <div className={`rounded-lg shadow-lg w-1/2 ml-2 p-2 mb-14 bg-white ${selectedProfile === 'general' ? 'border-b-4 border-gray-400 font-bold' : 'border-b-4 border-transparent'}`}>
                <button className="w-full text-xs" onClick={() => setSelectedProfile('general')}>Población General</button>
              </div>
            </div>
            {renderCards()}
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
          </div>
        )}
      </div>
    </div>  
  );
}



























