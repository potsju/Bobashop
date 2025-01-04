import React from 'react';
import { ShopCard } from './ShopCard';
import type { BobaShop } from '../types';

interface ShopGridProps {
  shops: BobaShop[];
  onShopSelect: (shop: BobaShop) => void;
}

export function ShopGrid({ shops, onShopSelect }: ShopGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {shops.map((shop) => (
        <ShopCard
          key={shop.id}
          shop={shop}
          onClick={() => onShopSelect(shop)}
        />
      ))}
    </div>
  );
}