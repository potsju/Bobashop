import React, { useState } from 'react';
import { Star } from 'lucide-react';
import type { BobaShop } from '../types';

interface ReviewFormProps {
  shop: BobaShop;
  onSubmit: (rating: number, comment: string) => Promise<void>;
}

export function ReviewForm({ shop, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(rating, comment);
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Write a Review for {shop.name}</h3>
      
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((value) => (
          <Star
            key={value}
            className={`w-8 h-8 cursor-pointer ${
              value <= (hoveredRating || rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
            onClick={() => setRating(value)}
            onMouseEnter={() => setHoveredRating(value)}
            onMouseLeave={() => setHoveredRating(0)}
          />
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Share your experience..."
        className="w-full p-2 border rounded-md h-32"
        required
      />

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
}