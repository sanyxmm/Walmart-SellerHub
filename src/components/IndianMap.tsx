import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Package, Truck, Clock, Users } from 'lucide-react';
import { mockDarkStores } from '../data/mockData';
import { DarkStore } from '../types';

interface IndianMapProps {
  darkStores: DarkStore[];
  selectedStore?: DarkStore | null;
  onStoreSelect?: (store: DarkStore) => void;
}

const IndianMap: React.FC<IndianMapProps> = ({ darkStores, selectedStore, onStoreSelect }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [hoveredStore, setHoveredStore] = useState<DarkStore | null>(null);

  // Indian states and major cities coordinates
  const indianCities = [
    { name: 'Mumbai', lat: 19.0760, lng: 72.8777, population: '12.4M' },
    { name: 'Delhi', lat: 28.7041, lng: 77.1025, population: '11.0M' },
    { name: 'Bangalore', lat: 12.9716, lng: 77.5946, population: '8.4M' },
    { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, population: '6.9M' },
    { name: 'Chennai', lat: 13.0827, lng: 80.2707, population: '4.6M' },
    { name: 'Kolkata', lat: 22.5726, lng: 88.3639, population: '4.5M' },
    { name: 'Pune', lat: 18.5204, lng: 73.8567, population: '3.1M' },
    { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, population: '5.6M' },
    { name: 'Jaipur', lat: 26.9124, lng: 75.7873, population: '3.1M' },
    { name: 'Surat', lat: 21.1702, lng: 72.8311, population: '4.5M' }
  ];

  const getStorePosition = (coordinates: [number, number]) => {
    // Convert lat/lng to SVG coordinates (simplified projection)
    const lat = coordinates[0];
    const lng = coordinates[1];
    
    // India bounds approximately: lat 8-37, lng 68-97
    const x = ((lng - 68) / (97 - 68)) * 100;
    const y = ((37 - lat) / (37 - 8)) * 100;
    
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const getCityPosition = (lat: number, lng: number) => {
    const x = ((lng - 68) / (97 - 68)) * 100;
    const y = ((37 - lat) / (37 - 8)) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Dark Store Network - India</h3>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Active Stores</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>High Capacity</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span>Medium Capacity</span>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* India Map SVG */}
        <div ref={mapRef} className="relative w-full h-96 bg-gradient-to-b from-blue-50 to-green-50 rounded-lg overflow-hidden">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            style={{ background: 'linear-gradient(to bottom, #dbeafe 0%, #dcfce7 100%)' }}
          >
            {/* Simplified India outline */}
            <path
              d="M20,15 L25,12 L30,10 L35,8 L40,7 L45,6 L50,5 L55,6 L60,7 L65,8 L70,10 L75,12 L80,15 L82,20 L83,25 L84,30 L85,35 L84,40 L83,45 L82,50 L80,55 L78,60 L75,65 L70,70 L65,73 L60,75 L55,76 L50,77 L45,76 L40,75 L35,73 L30,70 L25,65 L22,60 L20,55 L18,50 L17,45 L16,40 L17,35 L18,30 L19,25 L20,20 Z"
              fill="#f0f9ff"
              stroke="#0ea5e9"
              strokeWidth="0.5"
              className="drop-shadow-sm"
            />
            
            {/* State boundaries (simplified) */}
            <g stroke="#cbd5e1" strokeWidth="0.2" fill="none" opacity="0.5">
              <path d="M20,25 L30,20 L40,25 L35,35 L25,30 Z" />
              <path d="M40,25 L50,20 L60,25 L55,35 L45,30 Z" />
              <path d="M60,25 L70,20 L80,25 L75,35 L65,30 Z" />
              <path d="M25,35 L35,30 L45,35 L40,45 L30,40 Z" />
              <path d="M45,35 L55,30 L65,35 L60,45 L50,40 Z" />
              <path d="M65,35 L75,30 L80,35 L75,45 L70,40 Z" />
            </g>

            {/* Major cities */}
            {indianCities.map((city, index) => {
              const pos = getCityPosition(city.lat, city.lng);
              return (
                <g key={index}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="0.8"
                    fill="#64748b"
                    opacity="0.6"
                  />
                  <text
                    x={pos.x}
                    y={pos.y - 2}
                    fontSize="2"
                    fill="#374151"
                    textAnchor="middle"
                    className="font-medium"
                  >
                    {city.name}
                  </text>
                </g>
              );
            })}

            {/* Dark Stores */}
            {darkStores.map((store, index) => {
              const pos = getStorePosition(store.coordinates);
              const capacity = store.currentStock / store.capacity;
              const color = capacity > 0.8 ? '#10b981' : capacity > 0.5 ? '#f59e0b' : '#ef4444';
              const isSelected = selectedStore?.id === store.id;
              const isHovered = hoveredStore?.id === store.id;
              
              return (
                <g key={store.id}>
                  {/* Store marker */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isSelected || isHovered ? "2.5" : "2"}
                    fill={color}
                    stroke="white"
                    strokeWidth="0.5"
                    className="cursor-pointer transition-all duration-200"
                    style={{
                      filter: isSelected || isHovered ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none',
                      transform: isSelected || isHovered ? 'scale(1.1)' : 'scale(1)'
                    }}
                    onMouseEnter={() => setHoveredStore(store)}
                    onMouseLeave={() => setHoveredStore(null)}
                    onClick={() => onStoreSelect?.(store)}
                  />
                  
                  {/* Delivery radius */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={store.deliveryRadius / 2}
                    fill="none"
                    stroke={color}
                    strokeWidth="0.3"
                    strokeDasharray="1,1"
                    opacity="0.4"
                    className={isSelected || isHovered ? 'opacity-60' : 'opacity-20'}
                  />
                  
                  {/* Store label */}
                  <text
                    x={pos.x}
                    y={pos.y + 4}
                    fontSize="1.5"
                    fill="#374151"
                    textAnchor="middle"
                    className="font-medium pointer-events-none"
                  >
                    {store.name.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Tooltip for hovered store */}
          {hoveredStore && (
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-10">
              <h4 className="font-semibold text-gray-900 mb-2">{hoveredStore.name}</h4>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3 h-3" />
                  <span>{hoveredStore.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="w-3 h-3" />
                  <span>{hoveredStore.currentStock.toLocaleString()} / {hoveredStore.capacity.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3 h-3" />
                  <span>{hoveredStore.avgDeliveryTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-3 h-3" />
                  <span>{hoveredStore.deliveryRadius}km radius</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Store Statistics */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600">Total Stores</p>
                <p className="text-2xl font-bold text-blue-700">{darkStores.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Total Capacity</p>
                <p className="text-2xl font-bold text-green-700">
                  {darkStores.reduce((sum, store) => sum + store.capacity, 0).toLocaleString()}
                </p>
              </div>
              <Truck className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600">Avg Delivery</p>
                <p className="text-2xl font-bold text-purple-700">2.8 hrs</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Coverage Areas */}
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-900 mb-3">Coverage Areas</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {['Mumbai Metro', 'Delhi NCR', 'Bangalore Urban', 'Hyderabad', 'Chennai'].map((area, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">{area}</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndianMap;