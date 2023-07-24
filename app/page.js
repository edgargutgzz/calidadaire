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

  return (
    <div className="relative flex min-h-[10px] rounded-lg overflow-hidden">
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
  );
}


// Index
export default function Index() {
  const [nearestSensor, setNearestSensor] = useState(null);

  return (
    <div>
      <Navbar currentPage="inicio" />

      {/* Page's title */}
      <div className="flex items-center justify-center mt-5">
        <img src="/logo.png" width={20} height={20} alt="Logo" className="mr-2" /> {/* Adjust the class as needed */}
        <h1 className="text-1xl font-semibold">Respira Claro</h1>
      </div>
      
      {/* Hidden Mapa component to fetch the nearest sensor data */}
      <div style={{ display: 'none' }}>
        <Mapa onNearestSensorChange={setNearestSensor} />
      </div>
      
      {/* Calidad del Aire */}
      {nearestSensor && (
        <>
          {/* <div className={`mx-4 p-4 mb-10 rounded-lg text-white ${getMarkerColor(nearestSensor.pm25)}`}>
            <p>Nearest Sensor PM2.5: {nearestSensor.pm25 != null ? Math.round(nearestSensor.pm25) : 'N/A'}</p>
          </div> */}
          <div className="mx-4 mb-2 pt-10">
          <QualityBar pm25={nearestSensor.pm25} />
          </div>
        </>
      )}
    </div>
  );
}



















