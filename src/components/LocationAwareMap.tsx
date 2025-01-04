import React, { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import type { BobaShop } from '../types';
import { MAPBOX_CONFIG } from '../config/mapbox';
import { useGeolocation } from '../hooks/useGeolocation';
import 'mapbox-gl/dist/mapbox-gl.css';

interface LocationAwareMapProps {
  shops: BobaShop[];
  onShopSelect: (shop: BobaShop) => void;
}

export function LocationAwareMap({ shops, onShopSelect }: LocationAwareMapProps) {
  const { location } = useGeolocation();
  const [mapError, setMapError] = useState<string | null>(null);
  const [viewState, setViewState] = useState({
    longitude: MAPBOX_CONFIG.defaultCenter.longitude,
    latitude: MAPBOX_CONFIG.defaultCenter.latitude,
    zoom: MAPBOX_CONFIG.defaultZoom
  });

  useEffect(() => {
    if (location) {
      setViewState(prev => ({
        ...prev,
        longitude: location.longitude,
        latitude: location.latitude
      }));
    }
  }, [location]);

  if (mapError) {
    return (
      <div className="h-[calc(100vh-12rem)] bg-gray-100 flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-gray-600">Unable to load map. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-12rem)]">
      <Map
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={MAPBOX_CONFIG.accessToken}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAPBOX_CONFIG.style}
        onError={(e) => {
          console.error('Mapbox error:', e);
          setMapError(e.error.message);
        }}
      >
        {location && (
          <Marker
            longitude={location.longitude}
            latitude={location.latitude}
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full ring-2 ring-white" />
          </Marker>
        )}
        {shops.map((shop) => (
          <Marker
            key={shop.id}
            longitude={shop.longitude}
            latitude={shop.latitude}
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              onShopSelect(shop);
            }}
          >
            <div className="cursor-pointer text-2xl hover:scale-125 transition-transform">
              🧋
            </div>
          </Marker>
        ))}
      </Map>
    </div>
  );
}