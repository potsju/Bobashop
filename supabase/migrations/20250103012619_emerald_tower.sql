/*
  # Add coordinates to shops table

  1. Changes
    - Add latitude and longitude columns to shops table
    - Add constraint to ensure valid coordinates
    
  2. Notes
    - Latitude must be between -90 and 90
    - Longitude must be between -180 and 180
*/

ALTER TABLE shops
ADD COLUMN latitude numeric NOT NULL DEFAULT 37.7749 
  CHECK (latitude >= -90 AND latitude <= 90),
ADD COLUMN longitude numeric NOT NULL DEFAULT -122.4194
  CHECK (longitude >= -180 AND longitude <= 180);