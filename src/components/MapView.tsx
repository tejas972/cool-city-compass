
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from './ui/card';
import { Sun, Cloud, Thermometer } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  // Example weather data - in a real app, this would come from a weather API
  const weatherData = {
    temperature: 35,
    humidity: 65,
    heatIndex: 38,
    condition: 'Sunny'
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [79.0882, 21.1458], // Nagpur coordinates
      zoom: 11
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Create a custom marker element for weather info
    const el = document.createElement('div');
    el.className = 'weather-marker';
    el.innerHTML = `<div class="p-2 bg-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-500"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    </div>`;

    // Add the custom marker to the map
    new mapboxgl.Marker(el)
      .setLngLat([79.0882, 21.1458])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`
            <div class="p-2">
              <div class="font-bold text-lg">${weatherData.temperature}°C</div>
              <div class="text-sm">Humidity: ${weatherData.humidity}%</div>
              <div class="text-sm">Heat Index: ${weatherData.heatIndex}°C</div>
              <div class="text-sm">${weatherData.condition}</div>
            </div>
          `)
      )
      .addTo(map.current);

    // Add a heat circle overlay
    map.current.on('load', () => {
      map.current?.addSource('heat-source', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: [79.0882, 21.1458]
          }
        }
      });

      map.current?.addLayer({
        id: 'heat-layer',
        type: 'circle',
        source: 'heat-source',
        paint: {
          'circle-radius': 100,
          'circle-color': '#ff4444',
          'circle-opacity': 0.4,
          'circle-blur': 0.5
        }
      });
    });

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
      <div className="relative">
        <div ref={mapContainer} className="w-full h-[500px] rounded-lg overflow-hidden" />
        
        {/* Weather info legend */}
        <Card className="absolute top-4 left-4 p-4 bg-white/90 backdrop-blur-sm">
          <h3 className="font-semibold mb-2">Weather Conditions</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-red-500" />
              <span className="text-sm">Temperature: {weatherData.temperature}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Cloud className="h-4 w-4 text-blue-500" />
              <span className="text-sm">Humidity: {weatherData.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4 text-orange-500" />
              <span className="text-sm">Heat Index: {weatherData.heatIndex}°C</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Weather info tooltip */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="text-sm text-muted-foreground cursor-help">
            ℹ️ Hover for more information about the weather data
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-semibold">About the Weather Data</h4>
            <p className="text-sm text-muted-foreground">
              The map shows current weather conditions in Nagpur. The red circle indicates areas of higher temperature. 
              Click on the weather marker to see detailed information.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default MapView;
