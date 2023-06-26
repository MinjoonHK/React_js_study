import React, { useState, useRef, useMemo, useCallback } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon, LatLngLiteral } from 'leaflet';

const center: LatLngLiteral = {
  lat: 22.353285,
  lng: 114.166350,
}

const locations : LatLngLiteral[] = [
  { lat: 22.357643, lng: 114.123710 }, // Yee Lim Industrial Center
  { lat: 22.35762, lng: 114.13080 }, // Wyler Center
  { lat: 22.37253, lng: 114.11523 }, //Kai Chi Building
  { lat: 22.37342, lng: 114.11444 }, //Wing Ting house
  { lat: 22.30350, lng: 113.93406 }, //Cathay Catering Services
  { lat: 22.302434, lng: 113.934329 }, //Chek Lap Kok 
  { lat: 22.23843, lng: 114.15302 }, // Dah Chong Hong
  { lat: 22.454493, lng: 113.992949 }, //Ha Tsuen
]

const markers = locations.map((location, index) => (
  <Marker
  key = {index}
    position={location}
    icon={
      new Icon({
        iconUrl: markerIconPng,
        iconSize: [25, 41],
        iconAnchor: [12, 50],
      })
    }
  >
  </Marker>
))


const TestMap = () => {
  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        width:"100%",
        height: "1000px",
        aspectRatio: "16/9",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
    </MapContainer>
  )
}

export default TestMap