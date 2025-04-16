
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from './ui/card';
import { Thermometer } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  // Sample heat data points across Nagpur (in a real app, this would come from an API)
  const heatData = {
    type: 'FeatureCollection',
    features: [
      { type: 'Feature', properties: { temperature: 38 }, geometry: { type: 'Point', coordinates: [79.0882, 21.1458] } },
      { type: 'Feature', properties: { temperature: 37 }, geometry: { type: 'Point', coordinates: [79.0950, 21.1500] } },
      { type: 'Feature', properties: { temperature: 39 }, geometry: { type: 'Point', coordinates: [79.0800, 21.1400] } },
      { type: 'Feature', properties: { temperature: 36 }, geometry: { type: 'Point', coordinates: [79.0920, 21.1420] } },
      { type: 'Feature', properties: { temperature: 40 }, geometry: { type: 'Point', coordinates: [79.0850, 21.1480] } },
      // Add more points to cover the city
      { type: 'Feature', properties: { temperature: 38 }, geometry: { type: 'Point', coordinates: [79.1000, 21.1550] } },
      { type: 'Feature', properties: { temperature: 41 }, geometry: { type: 'Point', coordinates: [79.0750, 21.1350] } },
      { type: 'Feature', properties: { temperature: 37 }, geometry: { type: 'Point', coordinates: [79.0980, 21.1480] } },
      { type: 'Feature', properties: { temperature: 39 }, geometry: { type: 'Point', coordinates: [79.0830, 21.1520] } },
      { type: 'Feature', properties: { temperature: 40 }, geometry: { type: 'Point', coordinates: [79.0900, 21.1390] } },
    ]
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [79.0882, 21.1458], // Nagpur coordinates
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.current.on('load', () => {
      // Add the heatmap source
      map.current?.addSource('heat', {
        type: 'geojson',
        data: heatData
      });

      // Add the heatmap layer
      map.current?.addLayer({
        id: 'heatmap-layer',
        type: 'heatmap',
        source: 'heat',
        paint: {
          // Increase the heatmap weight based on temperature
          'heatmap-weight': [
            'interpolate',
            ['linear'],
            ['get', 'temperature'],
            35, 0,
            42, 1
          ],
          // Increase the heatmap color weight by zoom level
          'heatmap-intensity': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 1,
            15, 3
          ],
          // Color gradient from cool to hot
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            0, 'rgba(33,102,172,0)',
            0.2, 'rgb(103,169,207)',
            0.4, 'rgb(209,229,240)',
            0.6, 'rgb(253,219,199)',
            0.8, 'rgb(239,138,98)',
            1, 'rgb(178,24,43)'
          ],
          // Adjust the radius by zoom level
          'heatmap-radius': [
            'interpolate',
            ['linear'],
            ['zoom'],
            0, 2,
            15, 20
          ],
          'heatmap-opacity': 0.8
        }
      });

      // Add temperature point markers
      heatData.features.forEach((feature) => {
        const temp = feature.properties.temperature;
        const el = document.createElement('div');
        el.className = 'temperature-marker';
        el.innerHTML = `<div class="bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow text-sm">
          ${temp}°C
        </div>`;
        
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .addTo(map.current!);
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
        
        {/* Temperature legend */}
        <Card className="absolute top-4 left-4 p-4 bg-white/90 backdrop-blur-sm">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            Temperature Heatmap
          </h3>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[rgb(178,24,43)]" />
              <span className="text-sm">Very Hot (40°C+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[rgb(239,138,98)]" />
              <span className="text-sm">Hot (38-40°C)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[rgb(253,219,199)]" />
              <span className="text-sm">Warm (36-38°C)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-[rgb(103,169,207)]" />
              <span className="text-sm">Cool (≤35°C)</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Information tooltip */}
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="text-sm text-muted-foreground cursor-help">
            ℹ️ Hover for more information about the heatmap
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="space-y-2">
            <h4 className="font-semibold">About the Heatmap</h4>
            <p className="text-sm text-muted-foreground">
              This heatmap shows temperature variations across Nagpur. Red areas indicate higher temperatures, 
              while blue areas are relatively cooler. The visualization is based on temperature readings from 
              various points across the city.
            </p>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default MapView;
