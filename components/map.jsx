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
    let { data, error } = await supabase.from('sensores').select('*');

    if (error) console.error('Error loading data:', error);
    else setData(data);
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
          </div>
        </Popup>
      ) : null}

    </Map>
  );
}





































