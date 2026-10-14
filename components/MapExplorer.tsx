'use client';

import { useEffect, useRef } from 'react';

const cityCoords: Record<string, [number, number]> = {
  Lagos: [6.5244, 3.3792], Cairo: [30.0444, 31.2357],
  'Cape Town': [-33.9249, 18.4241], Nairobi: [-1.2921, 36.8219],
  Marrakech: [31.6295, -7.9811], Zanzibar: [-6.1659, 39.2026],
  Serengeti: [-2.3333, 34.8333], Accra: [5.6037, -0.1870],
  Dubai: [25.2048, 55.2708], Istanbul: [41.0082, 28.9784],
  Petra: [30.3285, 35.4444], Muscat: [23.5880, 58.3829],
  Doha: [25.2854, 51.5310], Riyadh: [24.7136, 46.6753],
  Paris: [48.8566, 2.3522], Rome: [41.9028, 12.4964],
  Barcelona: [41.3851, 2.1734], Santorini: [36.3932, 25.4615],
  London: [51.5074, -0.1278], Reykjavik: [64.1355, -21.8954],
  Dubrovnik: [42.6507, 18.0944], Amsterdam: [52.3676, 4.9041],
  Bali: [-8.3405, 115.0920], Tokyo: [35.6762, 139.6503],
  Bangkok: [13.7563, 100.5018], Maldives: [3.2028, 73.2207],
  Singapore: [1.3521, 103.8198], Kyoto: [35.0116, 135.7681],
  Delhi: [28.6139, 77.2090], 'Hong Kong': [22.3193, 114.1694],
  Seoul: [37.5665, 126.9780], 'New York': [40.7128, -74.0060],
  'Rio de Janeiro': [-22.9068, -43.1729], 'Machu Picchu': [-13.1631, -72.5450],
  Cancun: [21.1619, -86.8515], 'Buenos Aires': [-34.6037, -58.3816],
  Patagonia: [-51.6230, -69.2168], Svalbard: [78.2232, 15.6267],
  Lapland: [67.9222, 26.5046], Sydney: [-33.8688, 151.2093],
  'Bora Bora': [-16.5004, -151.7415], Hawaii: [19.8968, -155.5828],
  Queenstown: [-45.0312, 168.6626],
}

interface Props {
  selectedCityName: string | null
}

export default function MapExplorerComponent({ selectedCityName }: Props) {
  const mapRef = useRef<any>(null)
  const mapInstanceRef = useRef<any>(null)
  const markerRef = useRef<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Inject Leaflet CSS
    if (!document.querySelector('#leaflet-css')) {
      const link = document.createElement('link')
      link.id = 'leaflet-css'
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)
    }

    import('leaflet').then(L => {
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      if (!mapInstanceRef.current && mapRef.current) {
        const map = L.map(mapRef.current, {
          center: [20, 20],
          zoom: 2,
          zoomControl: true,
          scrollWheelZoom: true,
        })

        // Dark luxury tile — matches your gold/black theme
        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          { attribution: '© OpenStreetMap © CARTO', maxZoom: 19 }
        ).addTo(map)

        // Plot ALL destination markers on load
        Object.entries(cityCoords).forEach(([city, coords]) => {
          const dot = L.divIcon({
            className: '',
            html: `<div style="
              width:8px;height:8px;
              background:#C8A96E;
              border:1px solid rgba(255,255,255,0.4);
              border-radius:50%;
              opacity:0.7">
            </div>`,
            iconSize: [8, 8],
            iconAnchor: [4, 4],
          })
          L.marker(coords, { icon: dot })
            .addTo(map)
            .bindTooltip(city, { className: 'leaflet-tooltip-gold' })
        })

        mapInstanceRef.current = map
      }
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Fly to selected city
  useEffect(() => {
    if (!mapInstanceRef.current || !selectedCityName) return

    import('leaflet').then(L => {
      const coords = cityCoords[selectedCityName]
      if (!coords) return

      if (markerRef.current) markerRef.current.remove()

      mapInstanceRef.current.flyTo(coords, 10, { duration: 1.5 })

      const goldIcon = L.divIcon({
        className: '',
        html: `<div style="
          width:16px;height:16px;
          background:#C8A96E;
          border:2px solid #fff;
          border-radius:50%;
          box-shadow:0 0 12px rgba(200,169,110,0.9)">
        </div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      })

      markerRef.current = L.marker(coords, { icon: goldIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`<b style="color:#C8A96E;font-family:serif">${selectedCityName}</b>`)
        .openPopup()
    })
  }, [selectedCityName])

  return (
    <>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      <style>{`
        .leaflet-tooltip-gold {
          background: #1C1B18;
          border: 1px solid #C8A96E;
          color: #C8A96E;
          font-family: Bebas Neue, sans-serif;
          font-size: 0.65rem;
          letter-spacing: 0.1em;
          padding: 3px 8px;
        }
        .leaflet-popup-content-wrapper {
          background: #1C1B18;
          border: 1px solid #C8A96E;
          border-radius: 0;
        }
        .leaflet-popup-tip { background: #1C1B18; }
      `}</style>
    </>
  )
}
