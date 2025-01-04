import React from 'react';
import { Star, MapPin } from 'lucide-react';
import type { BobaShop, Review } from '../types';

interface ShopDetailProps {
  shop: BobaShop;
  reviews: Review[];
}

export function ShopDetail({ shop, reviews }: ShopDetailProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <img 
        src={shop.image_url} 
        alt={shop.name} 
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold">{shop.name}</h2>
          <div className="flex items-center bg-purple-100 px-3 py-1 rounded-full">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 font-semibold">{shop.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-2" />
          <p>{shop.address}</p>
        </div>

        <p className="text-gray-600">{shop.description}</p>

        <div className="border-t pt-4 mt-6">
          <h3 className="text-xl font-semibold mb-4">Reviews</h3>
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {new Date(review.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}