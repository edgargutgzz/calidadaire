"use client";

import React, { useState, useEffect } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { createClient } from '@supabase/supabase-js';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';
import Papa from 'papaparse';


// Create a single Supabase client for interacting with your database 
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// Create a Mapbox Geocoding client
const geocodingClient = mbxGeocoding({ accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN });

// Function to determine marker color based on PM2.5 value
export function getMarkerColor(pm25) {
  if (pm25 <= 15) return "bg-custom-green";  // Aligned with "Buena"
  if (pm25 > 15 && pm25 <= 25) return "bg-custom-yellow";  // Aligned with "Aceptable"
  if (pm25 > 25 && pm25 <= 79) return "bg-custom-orange";  // Aligned with "Mala"
  if (pm25 > 79 && pm25 <= 130) return "bg-custom-red";  // Aligned with "Muy Mala"
  if (pm25 > 130) return "bg-custom-purple";  // Aligned with "Extremadamente Mala"
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
  const [csvData, setCsvData] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestSensor, setNearestSensor] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [simaPopupInfo, setSimaPopupInfo] = useState(null);

  const formatHour = (date) => {
    let hour = date.getHours();
    return hour < 10 ? `0${hour}:00` : `${hour}:00`;
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
    getUserLocation();
    fetchCsvData();
  }, []);

  const fetchCsvData = () => {
    fetch('/sima.csv')
      .then(response => response.text())
      .then(text => {
        const parsedData = Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
        });
        setCsvData(parsedData.data);
      })
      .catch(error => console.error('Error reading CSV file:', error));
  };


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
        timestamp: calidadAire ? calidadAire.time_stamp : null,
      };
    });

    setData(mergedData);
  }

  function getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        // If user denies location permission or it's not available, set the default coordinates
        console.warn("User location is not available. Using default location:", error);
        setUserLocation({
          latitude: 25.68884642528181,
          longitude: -100.31533132620893,
        });
      }
    );
  }

  function reverseGeocode(location) {
    geocodingClient.reverseGeocode({
      query: [location.longitude, location.latitude],
      limit: 1
    })
    .send()
    .then(response => {
      const match = response.body;
      setUserAddress(match.features[0].place_name);
    });
  }

  useEffect(() => {
    if (userLocation) {
      reverseGeocode(userLocation);
    }
  }, [userLocation]);

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
      if (onNearestSensorChange) onNearestSensorChange({ 
        ...nearest, 
        address: userAddress, 
        lastUpdated: nearest.timestamp ? formatHour(new Date(nearest.timestamp)) : 'Unknown' 
      });
    }
  }, [userLocation, data, userAddress]);

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -100.30958999633297,
        latitude: 25.682108126585334,
        zoom: 10
      }}
      mapStyle="mapbox://styles/edgargutgzz/climactgb00cn01qw7amo9bbd"
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* Purple Air */}
      {data.map(sensor => (
        <Marker
          key={sensor.sensor_id}
          longitude={sensor.lon}
          latitude={sensor.lat}
        >
          <div
            id={`marker-${sensor.sensor_id}`}
            className={`marker relative border border-white rounded-full cursor-pointer flex items-center justify-center text-xs text-white ${getMarkerColor(sensor.pm25)}`}
            style={{
              width: "32px",
              height: "28px"
            }}
            onClick={() => setPopupInfo(sensor)} // Adding click handler here
          >
            {sensor.pm25 != null ? Math.round(sensor.pm25) : 'N/A'}
            <div className="triangle absolute w-0 h-0" />
          </div>
        </Marker>
      ))}

      {/* SIMA */}
      {csvData.map((sensor, index) => (
        <Marker
          key={index}
          longitude={parseFloat(sensor.lon)}
          latitude={parseFloat(sensor.lat)}
        >
          <div
            id={`marker-csv-${sensor.id}`}
            className={`marker relative border border-white rounded-full cursor-pointer flex items-center justify-center text-xs bg-gray-300`}
            style={{
              width: "32px",
              height: "28px"
            }}
            onClick={() => setSimaPopupInfo(sensor)} // Adding click handler here
          >
            <div className="triangle absolute w-0 h-0" />
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

      {popupInfo && (
        <Popup
          latitude={popupInfo.lat}
          longitude={popupInfo.lon}
          onClose={() => setPopupInfo(null)}
          closeOnClick={false}
          tipSize={5}
        >
          <div>
            <p><strong>Sensor:</strong> {popupInfo.sensor_id}</p>
            <p><strong>Fuente:</strong> Purple Air</p>
            <p>Concentración promedio de la última hora registrada de PM2.5 en µg/m3, contaminante más peligroso para la salud.</p>
          </div>
        </Popup>
      )}

      {simaPopupInfo && (
        <Popup
          latitude={parseFloat(simaPopupInfo.lat)}
          longitude={parseFloat(simaPopupInfo.lon)}
          onClose={() => setSimaPopupInfo(null)}
          closeOnClick={false}
          tipSize={5}
        >
          <div>
            <p><strong>Sensor:</strong> {simaPopupInfo.sensor_id}</p>
            <p><strong>Fuente:</strong> Secretaría de Medio Ambiente de Nuevo León</p>
            <p>Medición no disponible por el momento.</p>
          </div>
        </Popup>
      )}


      <div className="absolute top-0 left-0 ml-3 mt-3 bg-gray-100 bg-opacity-90 pl-3 pr-3 pb-0 pt-2 rounded-lg">
        <h3 className="mb-1 font-bold">Calidad del Aire</h3>
        <div className="flex flex-col text-gray-500">
          <LegendItem color="bg-custom-purple" text="Extremadamente Mala" />
          <LegendItem color="bg-custom-red" text="Muy Mala" />
          <LegendItem color="bg-custom-orange" text="Mala" />
          <LegendItem color="bg-custom-yellow" text="Aceptable" />
          <LegendItem color="bg-custom-green" text="Buena" />
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






























































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































