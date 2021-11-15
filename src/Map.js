import React from "react";
import { MapContainer as LeafletMap, TileLayer , useMap } from 'react-leaflet';
import "./Map.css";
import { showDataOnMap } from "./sorting";
// import { showDataOnMap } from "./util";

function ChangeMapView({ coords, zoom }) {
  const map = useMap();
  map.setView([coords.lat, coords.lng], zoom);

  return null;
}

function Map({countries , casesType , center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* {showDataOnMap(countries, casesType)} */}
        <ChangeMapView coords={center} zoom={zoom} />
        {showDataOnMap(countries , casesType)}
      </LeafletMap>
      
    </div>
  );
}

export default Map;