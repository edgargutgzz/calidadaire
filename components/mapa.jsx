"use client";

import React, { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';
import { createClient } from '@supabase/supabase-js';

// Create a single Supabase client for interacting with your database 
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Function to determine marker color based on PM2.5 value
export function getMarkerColor(pm25) {
  if (pm25 <= 25) return "bg-green-500";  
  if (pm25 > 25 && pm25 <= 45) return "bg-yellow-500"; 
  if (pm25 > 45 && pm25 <= 79) return "bg-orange-500";  
  if (pm25 > 79 && pm25 <= 147) return "bg-red-500"; 
  if (pm25 > 147) return "bg-purple-500";  
  return "bg-gray-500";  // default color in case the value is null or undefined
}

function calculateDistance(location1, location2) {
  const lat1 = location1.latitude;
  const lon1 = location1.longitude;
  const lat2 = location2.lat;
  const lon2 = location2.lon;

  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  }
  else {
    const radlat1 = Math.PI * lat1/180;
    const radlat2 = Math.PI * lat2/180;
    const theta = lon1-lon2;
    const radtheta = Math.PI * theta/180;
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = dist * 180/Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344; // Convert to kilometers
    return dist;
  }
}

export default function Mapa({ onNearestSensorChange }) {
  const [data, setData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestSensor, setNearestSensor] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
    getUserLocation();
  }, []);

  async function fetchData() {
    const { data: sensoresData, error: sensoresError } = await supabase.from('sensores').select('*');
    const { data: calidadAireData, error: calidadAireError } = await supabase
      .from('calidad_aire')
      .select('*')
      .order('time_stamp', { ascending: false });

    if (sensoresError) {
      console.error('Error loading sensores data:', sensoresError);
      return;
    }

    if (calidadAireError) {
      console.error('Error loading calidad_aire data:', calidadAireError);
      return;
    }

    // Create a mapping of sensor_id to the most recent "calidad_aire" record
    const mostRecentData = calidadAireData.reduce((acc, record) => {
      if (!acc[record.sensor_id]) {
        acc[record.sensor_id] = record;
      }
      return acc;
    }, {});

    // Merge the data from sensores and calidad_aire tables based on sensor_id
    const mergedData = sensoresData.map(sensor => {
      const calidadAire = mostRecentData[sensor.sensor_id];
      return {
        ...sensor,
        pm25: calidadAire ? calidadAire.pm25 : null,
      };
    });

    setData(mergedData);
  }

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  }

  useEffect(() => {
    if (userLocation && data.length > 0) {
      let nearest = data[0];
      let minDistance = calculateDistance(userLocation, nearest);

      for (let i = 1; i < data.length; i++) {
        const distance = calculateDistance(userLocation, data[i]);
        if (distance < minDistance) {
          minDistance = distance;
          nearest = data[i];
        }
      }

      setNearestSensor(nearest);
      if (onNearestSensorChange) onNearestSensorChange(nearest);
    }
  }, [userLocation, data]);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -100.31781776272842,
        latitude: 25.697469243851423,
        zoom: 10
      }}
      mapStyle="mapbox://styles/edgargutgzz/climactgb00cn01qw7amo9bbd"
      style={{ width: "100vw", height: "100vh" }}
    >
      {data.map(sensor => (
        <Marker
          key={sensor.sensor_id}
          longitude={sensor.lon}
          latitude={sensor.lat}
        >
          <div
            className={`border border-white rounded-full cursor-pointer flex items-center justify-center text-white text-sm ${getMarkerColor(sensor.pm25)}`}
            style={{
              width: "30px",
              height: "30px",
            }}
          >
            {sensor.pm25 != null ? Math.round(sensor.pm25) : 'N/A'} 
          </div>
        </Marker>
      ))}

      {userLocation && (
        <Marker
          latitude={userLocation.latitude}
          longitude={userLocation.longitude}
        >
          <div className="animate-pulse bg-blue-700 rounded-full w-4 h-4 border-2 border-white"></div>
        </Marker>
      )}

      <div className="absolute top-0 left-0 m-5 bg-white bg-opacity-80 pl-3 pr-3 pb-0 pt-2 rounded-lg">
        <h3 className="mb-1 font-bold">Calidad del Aire</h3>
        <div className="flex flex-col text-gray-500">
          <LegendItem color="bg-purple-500" text="Extremadamente Mala" />
          <LegendItem color="bg-red-500" text="Muy Mala" />
          <LegendItem color="bg-orange-500" text="Mala" />
          <LegendItem color="bg-yellow-500" text="Aceptable" />
          <LegendItem color="bg-green-500" text="Buena" />
        </div>
      </div>

    </Map>
  );
}

function LegendItem({ color, text }) {
  return (
    <div className="flex items-center mb-1">
      <div className={`${color} w-1 h-3 mr-1 rounded`} />
      <p className="text-gray-500">{text}</p>
    </div>
  );
}







































































































































































