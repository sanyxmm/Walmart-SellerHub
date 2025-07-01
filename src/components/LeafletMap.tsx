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

// Fix leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Hardcoded warehouse locations
const warehouses = [
  { id: 1, name: "Noida Warehouse", location: [28.5355, 77.391] },
  { id: 2, name: "Gurgaon Warehouse", location: [28.4595, 77.0266] },
];

// Haversine formula to calculate straight-line distance
function haversineDistance(
  coords1: [number, number],
  coords2: [number, number]
): number {
  const toRad = (x: number) => (x * Math.PI) / 180;
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

// Map click handler
function LocationMarker({
  updateLocation,
}: {
  updateLocation: (latlng: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      updateLocation([lat, lng]);
    },
  });
  return null;
}

export default function LeafletMap() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );
  const [nearestWarehouse, setNearestWarehouse] = useState<
    [number, number] | null
  >(null);
  const [routePath, setRoutePath] = useState<[number, number][]>([]);
  const [eta, setEta] = useState<number | null>(null);
  const [distance, setDistance] = useState<string | null>(null);
  const [deliveryCharge, setDeliveryCharge] = useState<number | null>(null);
  const [truckIndex, setTruckIndex] = useState(0);

  const updateUserLocation = async (location: [number, number]) => {
    setRoutePath([]); // Reset route before confirming
    setEta(null);
    setDistance(null);
    setDeliveryCharge(null);
    setTruckIndex(0);
    setUserLocation(location);

    // 1. Find nearest warehouse
    let minDistance = Infinity;
    let closest: [number, number] | null = null;

    for (const wh of warehouses) {
      const dist = haversineDistance(location, wh.location as [number, number]);
      if (dist < minDistance) {
        minDistance = dist;
        closest = wh.location as [number, number];
      }
    }

    setNearestWarehouse(closest);

    // 2. Get route from OpenRouteService
    if (closest) {
      const apiKey = process.env.NEXT_PUBLIC_ORS_API_KEY;

      const body = {
        coordinates: [
          [closest[1], closest[0]], // lon, lat
          [location[1], location[0]],
        ],
      };

      try {
        const response = await axios.post(
          "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
          body,
          {
            headers: {
              Authorization: apiKey!,
              "Content-Type": "application/json",
            },
          }
        );

        const coords = response.data.features[0].geometry.coordinates;
        const leafletCoords = coords.map((c: number[]) => [c[1], c[0]]);
        setRoutePath(leafletCoords);

        const summary = response.data.features[0].properties.summary;
        setDistance((summary.distance / 1000).toFixed(2));
        setEta(Math.ceil(summary.duration / 60));

        // 3. Delivery Charge Logic
        const baseCharge = 30;
        const perKm = 5;
        let charge = baseCharge;

        if (summary.distance / 1000 > 5) {
          charge += Math.ceil((summary.distance / 1000 - 5) * perKm);
        }

        setDeliveryCharge(charge);

        // 4. Truck Animation
        let i = 0;
        const interval = setInterval(() => {
          i++;
          if (i >= leafletCoords.length) clearInterval(interval);
          else setTruckIndex(i);
        }, 150);
      } catch (err) {
        console.error("ORS API Error:", err);
      }
    }
  };

  return (
    <>
      {/* Floating Confirm Box */}
      {userLocation && !routePath.length && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white border border-gray-300 shadow-lg rounded-xl p-4 z-[1000] w-80 text-center">
          <p className="font-semibold text-gray-800 mb-2">
            Confirm this delivery location?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => updateUserLocation(userLocation)}
              className="px-4 py-1 bg-[#0071dc] text-white rounded shadow hover:bg-blue-700"
            >
              Confirm ✅
            </button>
            <button
              onClick={() => setUserLocation(null)}
              className="px-4 py-1 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400"
            >
              Cancel ❌
            </button>
          </div>
        </div>
      )}

      {/* Info Box */}
      {nearestWarehouse && (
        <div className="mb-4 p-4 bg-[#e0f2fe] border-l-4 border-[#0071dc] rounded shadow-md text-sm font-medium text-gray-800">
          <p>
            <strong>Nearest Warehouse:</strong>{" "}
            {
              warehouses.find(
                (w) =>
                  w.location[0] === nearestWarehouse[0] &&
                  w.location[1] === nearestWarehouse[1]
              )?.name
            }
          </p>
          <p>
            <strong>Distance:</strong> {distance} km
          </p>
          <p>
            <strong>ETA:</strong> {eta} minutes
          </p>
          {deliveryCharge !== null && (
            <p>
              <strong>Delivery Charges:</strong> ₹{deliveryCharge}
            </p>
          )}
        </div>
      )}

      {/* Map */}
      <MapContainer
        center={[28.6139, 77.209]}
        zoom={10}
        scrollWheelZoom={true}
        style={{
          height: "60vh",
          width: "100%",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker updateLocation={setUserLocation} />

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your Delivery Location</Popup>
          </Marker>
        )}

        {warehouses.map((w) => (
          <Marker key={w.id} position={w.location as [number, number]}>
            <Popup>{w.name}</Popup>
          </Marker>
        ))}

        {routePath.length > 0 && (
          <Polyline positions={routePath} pathOptions={{ color: "green" }} />
        )}

        {routePath.length > 0 && truckIndex < routePath.length && (
          <Marker position={routePath[truckIndex]}>
            <Popup>🚚 On the way</Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
}