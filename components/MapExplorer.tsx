'use client';

import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// Default center of the world
const defaultCenter = { lat: 20.0, lng: 0.0 };

// Real Geographic Coordinates for your specific destinations
const cityCoordinates: Record<string, { lat: number; lng: number }> = {
  Lagos: { lat: 6.5244, lng: 3.3792 },
  Cairo: { lat: 30.0444, lng: 31.2357 },
  'Cape Town': { lat: -33.9249, lng: 18.4241 },
  Nairobi: { lat: -1.2921, lng: 36.8219 },
  Marrakech: { lat: 31.6295, lng: -7.9811 },
  Zanzibar: { lat: -6.1659, lng: 39.2026 },
  Serengeti: { lat: -2.3328, lng: 34.5667 },
  Accra: { lat: 5.6037, lng: -0.1870 },
  Dubai: { lat: 25.2048, lng: 55.2708 },
  Istanbul: { lat: 41.0082, lng: 28.9784 },
  Petra: { lat: 30.3285, lng: 35.4444 },
  Muscat: { lat: 23.5859, lng: 58.4059 },
  Doha: { lat: 25.2854, lng: 51.5310 },
  Riyadh: { lat: 24.7136, lng: 46.6753 },
  Paris: { lat: 48.8566, lng: 2.3522 },
  Rome: { lat: 41.9028, lng: 12.4964 },
  Barcelona: { lat: 41.3851, lng: 2.1734 },
  Santorini: { lat: 36.3932, lng: 25.4615 },
  London: { lat: 51.5074, lng: -0.1278 },
  Reykjavik: { lat: 64.1466, lng: -21.9426 },
  Dubrovnik: { lat: 42.6507, lng: 18.0944 },
  Amsterdam: { lat: 52.3676, lng: 4.9041 },
  Bali: { lat: -8.3405, lng: 115.0920 },
  Tokyo: { lat: 35.6762, lng: 139.6503 },
  Bangkok: { lat: 13.7563, lng: 100.5018 },
  Maldives: { lat: 3.2028, lng: 73.2207 },
  Singapore: { lat: 1.3521, lng: 103.8198 },
  Kyoto: { lat: 35.0116, lng: 135.7681 },
  Delhi: { lat: 28.7041, lng: 77.1025 },
  'Hong Kong': { lat: 22.3193, lng: 114.1694 },
  Seoul: { lat: 37.5665, lng: 126.9780 },
  'New York': { lat: 40.7128, lng: -74.0060 },
  'Rio de Janeiro': { lat: -22.9068, lng: -43.1729 },
  'Machu Picchu': { lat: -13.1631, lng: -72.5450 },
  Cancun: { lat: 21.1619, lng: -86.8515 },
  'Buenos Aires': { lat: -34.6037, lng: -58.3816 },
  Patagonia: { lat: -41.8101, lng: -68.9063 },
  Svalbard: { lat: 77.8750, lng: 20.9752 },
  Lapland: { lat: 67.9222, lng: 26.5046 },
  Sydney: { lat: -33.8688, lng: 151.2093 },
  'Bora Bora': { lat: -16.5004, lng: -151.7415 },
  Hawaii: { lat: 19.8968, lng: -155.5828 },
  Queenstown: { lat: -45.0312, lng: 168.6626 },
};

interface MapProps {
  selectedCityName: string | null;
}

export default function MapExplorerComponent({ selectedCityName }: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    if (map && selectedCityName) {
      const coords = cityCoordinates[selectedCityName];
      if (coords) {
        map.panTo(coords);
        map.setZoom(8); // Zoom smoothly into the city!
      }
    } else if (map && !selectedCityName) {
      map.panTo(defaultCenter);
      map.setZoom(2); // Zoom back out to the whole world
    }
  }, [selectedCityName, map]);

  if (loadError) return <div className="text-red-500 p-4">Error loading map! Check API key.</div>;
  if (!isLoaded) return <div className="text-gray-500 p-4 animate-pulse">Loading map...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={defaultCenter}
      zoom={2}
      onLoad={(mapInstance) => setMap(mapInstance)}
      options={{
        disableDefaultUI: false,
        zoomControl: true,
        styles: [
          {
            elementType: 'geometry',
            stylers: [{ color: '#212121' }], // Dark map vibe to match your aesthetic
          },
          {
            elementType: 'labels.text.stroke',
            stylers: [{ color: '#212121' }],
          },
          {
            elementType: 'labels.text.fill',
            stylers: [{ color: '#747474' }],
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#000000' }],
          },
        ],
      }}
    >
      {/* Render all the points on the map */}
      {Object.entries(cityCoordinates).map(([cityName, position]) => (
        <Marker 
          key={cityName} 
          position={position}
          title={cityName}
        />
      ))}
    </GoogleMap>
  );
}