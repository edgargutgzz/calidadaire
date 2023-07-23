"use client";

import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Mapa, {getMarkerColor} from '../components/mapa';

export default function Index() {
  const [nearestSensor, setNearestSensor] = useState(null);

  return (
    <div>
      <Navbar currentPage="inicio" />
      <h1 className="text-4xl text-center mt-20">Calidad del Aire</h1>
      
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






















