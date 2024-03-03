

import React from 'react';
import Map from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";

export default function MyMap() {
  return (
    <div style={{ height: 'unset' }}>
      <Map
          mapboxAccessToken="pk.eyJ1IjoiYW1zaWRkaXF1aTAzIiwiYSI6ImNsdDM4N3R3YTAwcGoybG05c2hrMnZvemQifQ.b2kAnOzAvL-Ru_-AK6GyOA"
      initialViewState={{
        longitude: 77.594566,
        latitude: 12.971599,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/amsiddiqui03/clt38t1ny002d01r050x7bocg"
      />
    </div>
  );
}
