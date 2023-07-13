"use client";

import * as React from 'react';
import Map from 'react-map-gl';

export default function Mapa() {
  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{
        longitude: -100.31655049441096,
        latitude: 25.686464145285722,
        zoom: 11
      }}
      style={{width: "100%", height: "100vh"}}
      mapStyle="mapbox://styles/edgargutgzz/climactgb00cn01qw7amo9bbd"
    />
  );
}
















