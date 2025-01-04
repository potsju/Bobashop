// Mapbox configuration
export const MAPBOX_CONFIG = {
  accessToken: import.meta.env.VITE_MAPBOX_TOKEN,
  defaultCenter: {
    longitude: -122.4194,
    latitude: 37.7749,
  },
  defaultZoom: 11,
  style: 'mapbox://styles/mapbox/navigation-day-v1' // Using a basic navigation style
};