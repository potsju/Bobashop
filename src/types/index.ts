export interface BobaShop {
  id: string;
  name: string;
  description: string;
  image_url: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  created_at: string;
}

export interface Review {
  id: string;
  shop_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
}