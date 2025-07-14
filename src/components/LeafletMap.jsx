"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import truck from './truck.png'
// Fix Leaflet icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
const truckImage = new L.Icon({
  iconUrl: truck, // Place your truck image in public folder
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const warehouses = [
  { id: 1, name: "Noida Warehouse", location: [28.5355, 77.391] },
  { id: 2, name: "Gurgaon Warehouse", location: [28.4595, 77.0266] },
];

function haversineDistance(coords1, coords2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function LocationMarker({ onMapClick }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onMapClick([lat, lng]);
    },
  });
  return null;
}

export default function LeafletMap() {
  const [pendingLocation, setPendingLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestWarehouse, setNearestWarehouse] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const [eta, setEta] = useState(null);
  const [distance, setDistance] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(null);
  const [truckIndex, setTruckIndex] = useState(0);

  const confirmLocation = async (location) => {
    setRoutePath([]);
    setEta(null);
    setDistance(null);
    setDeliveryCharge(null);
    setTruckIndex(0);
    setUserLocation(location);

    // Find nearest warehouse
    let minD = Infinity;
    let closest = null;
    warehouses.forEach((w) => {
      const d = haversineDistance(location, w.location);
      if (d < minD) {
        minD = d;
        closest = w.location;
      }
    });
    setNearestWarehouse(closest);

    if (!closest) return;


    const body = {
      coordinates: [
        [closest[1], closest[0]],
        [location[1], location[0]],
      ],
    };

    try {
      const res = await axios.post(
        "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
        body,
        {
          headers: {
            Authorization: "5b3ce3597851110001cf6248160c8a911413409ab2725af9e71bd5a2",
            "Content-Type": "application/json",
          },
        }
      );

      const coords = res.data.features[0].geometry.coordinates;
      const leafletCoords = coords.map((c) => [c[1], c[0]]);
      setRoutePath(leafletCoords);

      const summary = res.data.features[0].properties.summary;
      const km = summary.distance / 1000;
      setDistance(km.toFixed(2));
      setEta(Math.ceil(summary.duration / 60));

      const base = 30;
      const perKm = 5;
      const charge = km > 5 ? base + Math.ceil((km - 5) * perKm) : base;
      setDeliveryCharge(charge);

      let i = 0;
      const int = setInterval(() => {
        i += 1;
        if (i >= leafletCoords.length) return clearInterval(int);
        setTruckIndex(i);
      }, 150);
    } catch (err) {
      console.error("OpenRouteService error", err);
    }
  };

  return (
    <>
      {/* Confirm popup */}
      {pendingLocation && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white border rounded-xl shadow-lg p-4 w-80 z-[1000] text-center">
          <p className="font-semibold mb-2">Confirm this delivery location?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                confirmLocation(pendingLocation);
                setPendingLocation(null);
              }}
              className="px-4 py-1 bg-[#0071dc] text-white rounded hover:bg-blue-700"
            >
              Confirm ✅
            </button>
            <button
              onClick={() => setPendingLocation(null)}
              className="px-4 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel ❌
            </button>
          </div>
        </div>
      )}

      {/* Info panel */}
      {nearestWarehouse && (
        <div className="mb-4 p-4 bg-[#e0f2fe] border-l-4 border-[#0071dc] rounded shadow text-sm font-medium text-gray-800">
          <p>
            <strong>Nearest Warehouse:</strong>{" "}
            {
              warehouses.find((w) =>
                w.location.every((val, i) => val === nearestWarehouse[i])
              )?.name
            }
          </p>
          <p>
            <strong>Distance:</strong> {distance ? `${distance} km` : "—"}
          </p>
          <p>
            <strong>ETA:</strong> {eta ? `${eta} min` : "—"}
          </p>
          {deliveryCharge !== null && (
            <p>
              <strong>Delivery Charge:</strong> ₹{deliveryCharge}
            </p>
          )}
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={10}
        scrollWheelZoom
        style={{
          height: "60vh",
          width: "100%",
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker onMapClick={setPendingLocation} />

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your Delivery Location</Popup>
          </Marker>
        )}

        {warehouses.map((w) => (
          <Marker key={w.id} position={w.location}>
            <Popup>{w.name}</Popup>
          </Marker>
        ))}

        {routePath.length > 0 && (
          <Polyline positions={routePath} pathOptions={{ color: "green" }} />
        )}

        {routePath.length > 0 && truckIndex < routePath.length && (
          <Marker position={routePath[truckIndex]} icon={truckImage}>
            <Popup>🚚 On the way</Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
}
