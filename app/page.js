"use client";

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Mapa, {getMarkerColor} from '../components/mapa';

export default function Index() {
  const [nearestSensor, setNearestSensor] = useState(null);

  return (
    <div>
      <Navbar currentPage="inicio" />

      {/* Page's title */}
      <div className="flex items-center justify-center mt-5">
        <img src="/logo.png" width={22} height={22} alt="Logo" className="mr-2" /> {/* Adjust the class as needed */}
        <h1 className="text-1xl font-semibold">Respira Claro</h1>
      </div>
      
      {/* Hidden Mapa component to fetch the nearest sensor data */}
      <div style={{ display: 'none' }}>
        <Mapa onNearestSensorChange={setNearestSensor} />
      </div>
      
      {/* Calidad del Aire */}
      {nearestSensor && (
        <div className={`mx-4 p-4 my-10 rounded-lg text-white ${getMarkerColor(nearestSensor.pm25)}`}>
          <p>Nearest Sensor PM2.5: {nearestSensor.pm25 != null ? Math.round(nearestSensor.pm25) : 'N/A'}</p>
        </div>
      )}
    </div>
  );
}






















