"use client";

import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { createClient } from '@supabase/supabase-js';

// Create a single Supabase client for interacting with your database 
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Function to determine marker color based on PM2.5 value
function getMarkerColor(pm25) {
  if (pm25 <= 25) return "#00E400";  // green
  if (pm25 > 25 && pm25 <= 45) return "#FFFF00";  // yellow
  if (pm25 > 45 && pm25 <= 79) return "#FF7E00";  // orange
  if (pm25 > 79 && pm25 <= 147) return "#FF0000";  // red
  if (pm25 > 147) return "#8F3F97";  // purple
  return "gray";  // default color in case the value is null or undefined
}

export default function Mapa() {
  const [data, setData] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

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

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -100.31655049441096,
        latitude: 25.686464145285722,
        zoom: 11
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
            style={{
              backgroundColor: getMarkerColor(sensor.pm25),
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              cursor: "pointer",
              display: 'flex',   
              justifyContent: 'center',  
              alignItems: 'center',  
              color: 'black',  
              fontSize: '14px'
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedMarker(sensor);
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
          <div className="animate-pulse bg-blue-700 rounded-full w-4 h-4"></div>
        </Marker>
      )}

      {selectedMarker ? (
        <Popup
          latitude={selectedMarker.lat}
          longitude={selectedMarker.lon}
          onClose={() => setSelectedMarker(null)}
          closeOnClick={true}
          tipSize={5}
          anchor="top"
          style={{
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
          }}
        >
          <div>
            <h3>{selectedMarker.nombre}</h3>
            <p>{selectedMarker.description}</p>
            <p>PM2.5: {selectedMarker.pm25 != null ? Math.round(selectedMarker.pm25) : 'N/A'}</p>
          </div>
        </Popup>
      ) : null}

    </Map>
  );
}





















































