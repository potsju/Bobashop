import React from 'react';
import { Star } from 'lucide-react';
import type { BobaShop } from '../types';

interface ShopCardProps {
  shop: BobaShop;
  onClick: (shop: BobaShop) => void;
}

export function ShopCard({ shop, onClick }: ShopCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
      onClick={() => onClick(shop)}
    >
      <img 
        src={shop.image_url} 
        alt={shop.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{shop.name}</h3>
        <p className="text-gray-600 text-sm mb-2">{shop.address}</p>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 text-gray-700">{shop.rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}