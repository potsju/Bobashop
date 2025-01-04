/*
  # Initial Schema Setup for Boba Shop Review Application

  1. New Tables
    - `shops`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `image_url` (text)
      - `address` (text)
      - `rating` (numeric)
      - `created_at` (timestamp)
    
    - `reviews`
      - `id` (uuid, primary key)
      - `shop_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key)
      - `rating` (integer)
      - `comment` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access
    - Add policies for authenticated users to create reviews
*/

-- Create shops table
CREATE TABLE shops (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  image_url text,
  address text NOT NULL,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  created_at timestamptz DEFAULT now()
);

-- Create reviews table
CREATE TABLE reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id uuid REFERENCES shops(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for shops
CREATE POLICY "Allow public read access to shops"
  ON shops
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create shops"
  ON shops
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policies for reviews
CREATE POLICY "Allow public read access to reviews"
  ON reviews
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create function to update shop rating
CREATE OR REPLACE FUNCTION update_shop_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE shops
  SET rating = (
    SELECT ROUND(AVG(rating)::numeric, 1)
    FROM reviews
    WHERE shop_id = NEW.shop_id
  )
  WHERE id = NEW.shop_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update shop rating when a review is added
CREATE TRIGGER update_shop_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON reviews
FOR EACH ROW
EXECUTE FUNCTION update_shop_rating();