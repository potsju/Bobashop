import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ShopGrid } from './components/ShopGrid';
import { ShopDetail } from './components/ShopDetail';
import { ReviewForm } from './components/ReviewForm';
import { LocationAwareMap } from './components/LocationAwareMap';
import type { BobaShop, Review } from './types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function App() {
  const [activeTab, setActiveTab] = useState('discover');
  const [shops, setShops] = useState<BobaShop[]>([]);
  const [selectedShop, setSelectedShop] = useState<BobaShop | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchShops();
  }, []);

  useEffect(() => {
    if (selectedShop) {
      fetchReviews(selectedShop.id);
    }
  }, [selectedShop]);

  const fetchShops = async () => {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching shops:', error);
      return;
    }

    setShops(data);
  };

  const fetchReviews = async (shopId: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('shop_id', shopId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
      return;
    }

    setReviews(data);
  };

  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!selectedShop) return;

    const { error } = await supabase.from('reviews').insert([
      {
        shop_id: selectedShop.id,
        rating,
        comment,
      },
    ]);

    if (error) {
      console.error('Error submitting review:', error);
      return;
    }

    fetchReviews(selectedShop.id);
    fetchShops();
  };

  const filteredShops = shops.filter((shop) =>
    shop.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (selectedShop) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <button
              onClick={() => setSelectedShop(null)}
              className="mb-4 text-purple-600 hover:text-purple-700"
            >
              ← Back to all shops
            </button>
            <ShopDetail shop={selectedShop} reviews={reviews} />
          </div>
          <div>
            <ReviewForm shop={selectedShop} onSubmit={handleSubmitReview} />
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'discover':
        return (
          <>
            <LocationAwareMap shops={filteredShops} onShopSelect={setSelectedShop} />
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4">Nearby Boba Shops</h2>
              <ShopGrid shops={filteredShops} onShopSelect={setSelectedShop} />
            </div>
          </>
        );
      case 'bookmarks':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Bookmarks</h2>
            <p className="text-gray-600">Sign in to see your bookmarked boba shops</p>
          </div>
        );
      case 'profile':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors">
              Sign In
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16 md:pb-0 md:pt-16">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;