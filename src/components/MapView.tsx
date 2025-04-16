
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from './ui/card';

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [79.0882, 21.1458], // Nagpur coordinates
      zoom: 11 // Closer zoom to see the city
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add a marker for Nagpur city center
    new mapboxgl.Marker()
      .setLngLat([79.0882, 21.1458])
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  return (
    <div className="space-y-4">
      {!mapboxToken && (
        <Card className="p-4">
          <p className="text-sm text-muted-foreground mb-2">
            Please enter your Mapbox public token to view the map. You can get one at{' '}
            <a 
              href="https://www.mapbox.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <input
            type="text"
            placeholder="Enter Mapbox token"
            className="w-full p-2 border rounded"
            onChange={(e) => setMapboxToken(e.target.value)}
          />
        </Card>
      )}
      <div ref={mapContainer} className="w-full h-[500px] rounded-lg overflow-hidden" />
    </div>
  );
};

export default MapView;
