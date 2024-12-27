import React from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Stylizacja markera
const markerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const normalizeLongitude = (lng) => {
  // Normalizacja długości geograficznej za pomocą modulo
  const normalizedLng = ((lng + 180) % 360 + 360) % 360 - 180;
  return normalizedLng;
};

const Map = ({ setLocation }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setLocation({ 
        lat: lat.toFixed(6), 
        lon: normalizeLongitude(lng).toFixed(6) 
      });
    },
  });

  return null; // Obsługa zdarzeń, bez renderowania
};

const MapWithMarker = ({ location, setLocation }) => (
  <MapContainer
    center={[location.lat || 0, location.lon || 0]}
    zoom={3}
    style={{ height: "300px", width: "100%", marginTop: "1rem" }}
    className="map-container"
  >
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    {location.lat && location.lon && (
      <Marker position={[location.lat, location.lon]} icon={markerIcon} />
    )}
    <Map setLocation={setLocation} />
  </MapContainer>
);

export default MapWithMarker;
