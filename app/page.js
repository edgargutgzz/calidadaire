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

// Index
export default function Index() {
  const [nearestSensor, setNearestSensor] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState('vulnerable');

  // Function to determine general recommendation based on PM2.5 value
  const getGeneralRecommendation = (pm25) => {
    // Vulnerable
    if (selectedProfile === 'vulnerable') {
      if (pm25 <= 25) return 'Disfruta las actividades al aire libre.';
      if (pm25 > 25 && pm25 <= 45) return 'Considera reducir las actividades físicas vigorosas al aire libre.';
      if (pm25 > 45 && pm25 <= 79) return 'Evita las actividades físicas moderadas y vigorosas al aire libre.';
      if (pm25 > 79 && pm25 <= 147) return 'No realices actividades al aire libre. Acude al médico si presentas síntomas respiratorios o cardiacos.';
      return 'Permanece en interiores. Acude al médico si presentas síntomas respiratorios o cardiacos.'; // for PM2.5 > 147
    }

    // General
    if (pm25 <= 25) return 'Disfruta las actividades al aire libre.';
    if (pm25 > 25 && pm25 <= 45) return 'Disfruta las actividades al aire libre.';
    if (pm25 > 45 && pm25 <= 79) return 'Es posible realizar actividades al aire libre. Si presentas síntomas como tos o falta de aire, toma más descansos y realiza actividades menos vigorosas.';
    if (pm25 > 79 && pm25 <= 147) return 'Evita la actividad física vigorosa o prolongada al aire libre. ';
    return 'Permanece en interiores. Reprograma tus actividades al aire libre y si presentas síntomas respiratorios o cardiacos acude al médico.'; // for PM2.5 > 147
  };

  // Function to determine activity recommendation based on PM2.5 value
  const getActivityRecommendation = (activity, pm25, profile) => {
    if (activity === 'correr') {
      if (profile === 'vulnerable') {
        if (pm25 <= 25) return 'Es seguro salir a correr.';
        if (pm25 <= 45) return 'Con precaución.';
        if (pm25 <= 79) return 'Evita salir a correr.';
        if (pm25 <= 147) return 'Evita salir a correr.';
        return 'Permanece en interiores.';
      }
      if (profile === 'general') {
        if (pm25 <= 25) return 'Es seguro salir a correr.';
        if (pm25 <= 45) return 'Es seguro salir a correr.';
        if (pm25 <= 79) return 'Con precaución.';
        if (pm25 <= 147) return 'Evita salir a correr.';
        return 'Permanece en interiores.';
      }
    }
    if (activity === 'bici') {
      if (profile === 'vulnerable') {
        if (pm25 <= 25) return 'Es seguro andar en bici.';
        if (pm25 <= 45) return 'Con precaución.';
        if (pm25 <= 79) return 'Evita andar en bici.';
        if (pm25 <= 147) return 'Evita andar en bici.';
        return 'Permanece en interiores.';
      }
      if (profile === 'general') {
        if (pm25 <= 25) return 'Es seguro andar en bici.';
        if (pm25 <= 45) return 'Es seguro andar en bici.';
        if (pm25 <= 79) return 'Con precaución.';
        if (pm25 <= 147) return 'Evita andar en bici.';
        return 'Permanece en interiores.';
      }
    }
    return 'N/A'; // default text in case of unexpected input
  };

  // Function to determine card's border color
  const getBorderColor = (pm25) => {
    if (pm25 <= 25) return "custom-green";
    if (pm25 > 25 && pm25 <= 45) return "custom-yellow";
    if (pm25 > 45 && pm25 <= 79) return "custom-orange";
    if (pm25 > 79 && pm25 <= 147) return "custom-red";
    return "custom-purple"; // for PM2.5 > 147
  };

  // Function to render the cards based on the selected profile
  const renderCards = () => {

     // Vulnerable
    if (selectedProfile === 'vulnerable') {
      return (
        <>
          {/* Recomendación General */}
          <div className={`bg-white flex items-center rounded-lg shadow-lg p-4 mb-4 mt-4 w-full ${getBorderColor(nearestSensor.pm25)} border-b-4`}>
            <p className="text-sm lg:text-base">{getGeneralRecommendation(nearestSensor.pm25)}</p>
          </div>
          {/* Caminar y Picnic / Terraza */}
          {/* <div className="flex flex-row justify-between mt-2">  */}
            {/* Caminar */}
            {/* <div className={`bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 mr-2 ${getBorderColor(nearestSensor.pm25)} border-b-4`}>
              <div className="flex items-center space-x-2">
                <img src="/walking-man.png" width={14} height={14} alt="Caminar Icon" />
              </div>
              <p className="mt-2 text-sm">Es seguro salir a caminar.</p>
            </div> */}
            {/* Picnic / Terraza */}
            {/* <div className={`bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 ml-2 ${getBorderColor(nearestSensor.pm25)} border-b-4`}>
              <div className="flex items-center space-x-2">
                <img src="picnic.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm">Es seguro realizar .</p>
            </div>
          </div> */}
          {/* Correr and Bici */}
          <div className="flex flex-row justify-between mt-2"> 
            {/* Correr */}
            <div className={`bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 mr-2 ${getBorderColor(nearestSensor.pm25)} border-b-4`}>
              <div className="flex items-center space-x-2">
                <img src="/run.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm lg:text-base">{getActivityRecommendation('correr', nearestSensor.pm25, selectedProfile)}</p>
            </div>
            {/* Bici */}
            <div className={`bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 ml-2 ${getBorderColor(nearestSensor.pm25)} border-b-4`}>
              <div className="flex items-center space-x-2">
                <img src="/cycling.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm lg:text-base">{getActivityRecommendation('bici', nearestSensor.pm25, selectedProfile)}</p>
            </div>
          </div>
        </>
      );
    }

    // General
    if (selectedProfile === 'general') {
      return (
        <>
          {/* Recomendación General */}
          <div className={`bg-white flex items-center rounded-lg shadow-lg p-4 mb-4 mt-4 w-full ${getBorderColor(nearestSensor.pm25)} border-b-4`}>
            <p className="text-sm lg:text-base">{getGeneralRecommendation(nearestSensor.pm25)}</p>
          </div>
          {/* Correr y Bici */}
          <div className="flex flex-row justify-between mt-2"> 
            {/* Correr */}
            <div className={`bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 mr-2 ${getBorderColor(nearestSensor.pm25)} border-b-4`}>
              <div className="flex items-center space-x-2">
                <img src="/run.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm lg:text-base">Es seguro salir a correr.</p>
            </div>
            {/* Bici */}
            <div className={`bg-white rounded-lg shadow-lg p-4 mb-4 w-1/2 ml-2 ${getBorderColor(nearestSensor.pm25)} border-b-4`}>
              <div className="flex items-center space-x-2">
                <img src="/cycling.png" width={24} height={24} alt="Correr Icon" />
              </div>
              <p className="mt-2 text-sm lg:text-base">Es seguro andar en bici.</p>
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
      <div className="pt-4 pb-20 lg:ml-40 lg:mr-40 lg:mt-10 lg:pt-0 lg:flex-grow lg:w-9/12">

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
            {/* Población */}
            <div className="fixed bottom-0 left-0 right-0 mb-16 pb-2 px-5 flex justify-between lg:pb-0 lg:px-0 lg:mx-20 lg:static lg:pt-6">
              {/* Vulnerable */}
              <div 
                className={`flex text-sm lg:text-base items-center justify-center rounded-3xl w-1/2 mr-2 p-2 cursor-pointer text-center shadow-lg lg:mr-12 ${selectedProfile === 'vulnerable' ? 'bg-black text-white' : 'bg-white shadow-lg border-transparent'}`}
                onClick={() => setSelectedProfile('vulnerable')}>
                Población Sensible
              </div>
              {/* General */}
              <div 
                className={`flex text-sm lg:text-base items-center justify-center rounded-3xl w-1/2 ml-2 p-2 cursor-pointer text-center shadow-lg lg:ml-12 ${selectedProfile === 'general' ? 'bg-black text-white' : 'bg-white shadow-lg border-transparent'}`}
                onClick={() => setSelectedProfile('general')}>
                Población General
              </div>
            </div>
          </div>
        )}
      </div>
    </div>  
  );
}




















































