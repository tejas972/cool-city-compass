
import React from 'react';
import { Thermometer, Droplet, Wind } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const HeatMap = () => {
  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-100 h-[500px] md:h-[600px] w-full animate-fade-in">
      {/* City Map Background */}
      <div 
        className="h-full w-full bg-cover bg-center" 
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop')`,
          filter: 'brightness(0.9) grayscale(0.3)',
        }}
      ></div>
      
      {/* Heatmap Overlay - Using SVG for better control */}
      <svg 
        className="absolute inset-0 h-full w-full" 
        style={{ mixBlendMode: 'multiply' }}
      >
        {/* Downtown Area - Hot */}
        <circle 
          cx="50%" 
          cy="45%" 
          r="120" 
          fill="#ea384c" 
          opacity="0.7" 
          className="animate-pulse"
        />
        
        {/* Industrial Zone - Very Warm */}
        <circle 
          cx="75%" 
          cy="35%" 
          r="100" 
          fill="#F97316" 
          opacity="0.6" 
        />
        
        {/* Residential Area 1 - Warm */}
        <circle 
          cx="30%" 
          cy="60%" 
          r="80" 
          fill="#FEC6A1" 
          opacity="0.5" 
        />
        
        {/* Park Area - Cool */}
        <circle 
          cx="20%" 
          cy="30%" 
          r="70" 
          fill="#F2FCE2" 
          opacity="0.6" 
        />
        
        {/* Waterfront - Coolest */}
        <ellipse 
          cx="60%" 
          cy="80%" 
          rx="150" 
          ry="70" 
          fill="#D3E4FD" 
          opacity="0.5" 
        />
      </svg>
      
      {/* Interactive Hotspots */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="p-2 rounded-full bg-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
          <Thermometer className="h-5 w-5 text-dangerzone" />
        </div>
      </div>
      
      <div className="absolute top-4/5 left-3/5 transform -translate-x-1/2 -translate-y-1/2">
        <div className="p-2 rounded-full bg-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
          <Droplet className="h-5 w-5 text-accent-blue" />
        </div>
      </div>
      
      <div className="absolute top-1/4 left-1/5 transform -translate-x-1/2 -translate-y-1/2">
        <div className="p-2 rounded-full bg-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
          <Wind className="h-5 w-5 text-ecogreen" />
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white p-3 rounded-md shadow-md">
        <h4 className="text-sm font-semibold mb-2">Temperature</h4>
        <div className="flex items-center gap-2">
          <div className="heatmap-legend-item bg-coolblue"></div>
          <span className="text-xs">Cool</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="heatmap-legend-item bg-ecogreen"></div>
          <span className="text-xs">Mild</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="heatmap-legend-item bg-warmzone"></div>
          <span className="text-xs">Warm</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="heatmap-legend-item bg-hotzone"></div>
          <span className="text-xs">Hot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="heatmap-legend-item bg-dangerzone"></div>
          <span className="text-xs">Very Hot</span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded-md shadow-md">
        <div className="flex flex-col gap-2">
          <button className="bg-gray-100 hover:bg-gray-200 p-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 11 5-5 5 5"/><path d="m7 13 5 5 5-5"/></svg>
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 p-1 rounded">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
