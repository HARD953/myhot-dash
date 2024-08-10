import { useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import DraggableMarker from "./DraggableMarker";

import "leaflet/dist/leaflet.css";


export default function MapsComponent({ position, setPosition, center, loading,setLoading }) {
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "calc(80vh - 32px)", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker
        position={position}
        setPosition={setPosition}
        center={center}
        loading={loading}
        setLoading={setLoading}
      />
    </MapContainer>
  );
}
