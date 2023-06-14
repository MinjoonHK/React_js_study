import React, { useState, useRef, useMemo, useCallback } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon, LatLngLiteral } from 'leaflet';

const center: LatLngLiteral = {
  lat: 22.3193,
  lng: 114.1694,
}

const DraggableMarker = () => {
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center)
  const markerRef = useRef<any>(null)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current
        if (marker != null) {
          setPosition(marker.getLatLng())
        }
      },
    }),
    []
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 50],
        })
      }
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable ? "Click to disable dragging" : "Click to enable dragging"}
        </span>
      </Popup>
    </Marker>
  )
}

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
      <DraggableMarker/>
    </MapContainer>
  )
}

export default TestMap