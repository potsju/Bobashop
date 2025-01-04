import React from 'react';
import Map, { Marker } from 'react-map-gl';
import type { BobaShop } from '../types';
import { MAPBOX_CONFIG } from '../config/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

interface BobaMapProps {
  shops: BobaShop[];
  onShopSelect: (shop: BobaShop) => void;
}

export function BobaMap({ shops, onShopSelect }: BobaMapProps) {
  return (
    <Map
      mapboxAccessToken={MAPBOX_CONFIG.accessToken}
      initialViewState={{
        longitude: MAPBOX_CONFIG.defaultCenter.longitude,
        latitude: MAPBOX_CONFIG.defaultCenter.latitude,
        zoom: MAPBOX_CONFIG.defaultZoom
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={MAPBOX_CONFIG.style}
    >
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
  );
}