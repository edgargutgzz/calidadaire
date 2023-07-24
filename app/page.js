"use client";

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Mapa, {getMarkerColor} from '../components/mapa';

export default function Index() {
  const [nearestSensor, setNearestSensor] = useState(null);

  return (
    <div>
      <Navbar currentPage="inicio" />
      <div className="flex items-center justify-center mt-20">
        <img src="/logo.png" width={24} height={24} alt="Logo" className="mr-2" /> {/* Adjust the class as needed */}
        <h1 className="text-2xl">Respira Claro</h1>
      </div>
      
      {/* Hidden Mapa component to fetch the nearest sensor data */}
      <div style={{ display: 'none' }}>
        <Mapa onNearestSensorChange={setNearestSensor} />
      </div>
      
      {nearestSensor && (
        <div className={`m-4 p-4 rounded-lg text-white ${getMarkerColor(nearestSensor.pm25)}`}>
          <p>Nearest Sensor PM2.5: {nearestSensor.pm25 != null ? Math.round(nearestSensor.pm25) : 'N/A'}</p>
        </div>
      )}
    </div>
  );
}






















