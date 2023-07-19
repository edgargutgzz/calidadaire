"use client";

import * as React from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { createClient } from '@supabase/supabase-js';

// Create a single Supabase client for interacting with your database 
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Mapa() {
  const [data, setData] = React.useState([]);
  const [selectedMarker, setSelectedMarker] = React.useState(null);

  // Fetch data on component mount
  React.useEffect(() => {
    fetchData();
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
              backgroundColor: "rgba(255, 0, 0, 0.8)",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              cursor: "pointer"
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedMarker(sensor);
            }}
          ></div>
        </Marker>
      ))}

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
            <p>PM2.5: {selectedMarker.pm25 != null ? selectedMarker.pm25.toFixed(2) : 'N/A'}</p>
          </div>
        </Popup>
      ) : null}

    </Map>
  );
}














































