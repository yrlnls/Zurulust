import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const GoogleMap = ({ 
  destinations = [], 
  center, 
  zoom = 10, 
  height = '400px',
  onMarkerClick,
  className = ''
}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Google Maps API key - in production, this should be in environment variables
  const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with actual key

  useEffect(() => {
    const initializeMap = async () => {
      try {
        // Check if Google Maps API key is configured
        if (!GOOGLE_MAPS_API_KEY || GOOGLE_MAPS_API_KEY === 'YOUR_GOOGLE_MAPS_API_KEY') {
          setError('Google Maps API key not configured');
          setIsLoading(false);
          return;
        }

        const loader = new Loader({
          apiKey: GOOGLE_MAPS_API_KEY,
          version: 'weekly',
          libraries: ['places']
        });

        const google = await loader.load();
        
        const mapCenter = center || (destinations.length > 0 ? destinations[0].coordinates : { lat: 0, lng: 0 });
        
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: mapCenter,
          zoom: destinations.length > 1 ? 2 : zoom,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        setMap(mapInstance);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps');
        setIsLoading(false);
      }
    };

    if (mapRef.current) {
      initializeMap();
    }
  }, [GOOGLE_MAPS_API_KEY, center, zoom]);

  useEffect(() => {
    if (!map || !window.google) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    
    const newMarkers = destinations.map(destination => {
      const marker = new window.google.maps.Marker({
        position: destination.coordinates,
        map: map,
        title: destination.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#0d9488" stroke="#ffffff" stroke-width="2"/>
              <circle cx="16" cy="16" r="4" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 16)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="max-width: 200px;">
            <img src="${destination.imageUrl}" alt="${destination.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;">
            <h3 style="margin: 0 0 4px 0; font-size: 16px; font-weight: bold;">${destination.name}</h3>
            <p style="margin: 0 0 4px 0; color: #666; font-size: 14px;">${destination.country}</p>
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
              <span style="color: #f59e0b; margin-right: 4px;">★</span>
              <span style="font-size: 14px;">${destination.rating}</span>
            </div>
            <p style="margin: 0; font-size: 12px; color: #666; line-height: 1.4;">${destination.description.substring(0, 100)}...</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        if (onMarkerClick) {
          onMarkerClick(destination);
        }
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Fit map to show all markers if multiple destinations
    if (destinations.length > 1) {
      const bounds = new window.google.maps.LatLngBounds();
      destinations.forEach(destination => {
        bounds.extend(destination.coordinates);
      });
      map.fitBounds(bounds);
    } else if (destinations.length === 1) {
      map.setCenter(destinations[0].coordinates);
      map.setZoom(zoom);
    }
  }, [map, destinations, onMarkerClick, zoom]);

  if (error) {
    return (
      <div 
        className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center p-6">
          <div className="text-gray-400 mb-2">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 mb-2">{error}</p>
          <p className="text-xs text-gray-500">
            Add your Google Maps API key to enable interactive maps
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full h-full rounded-lg"
        style={{ height }}
      />
    </div>
  );
};

export default GoogleMap;