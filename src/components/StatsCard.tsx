
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Thermometer, Droplet, Wind, Leaf } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  type: 'temperature' | 'humidity' | 'wind' | 'vegetation';
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  description, 
  type,
  change,
  trend
}) => {
  const icons = {
    temperature: <Thermometer className="h-4 w-4 text-dangerzone" />,
    humidity: <Droplet className="h-4 w-4 text-accent-blue" />,
    wind: <Wind className="h-4 w-4 text-neutral" />,
    vegetation: <Leaf className="h-4 w-4 text-ecogreen" />
  };

  const trendColors = {
    up: type === 'temperature' ? 'text-dangerzone' : 'text-ecogreen',
    down: type === 'temperature' ? 'text-ecogreen' : 'text-dangerzone',
    neutral: 'text-neutral'
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {icons[type]}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {change && trend && (
          <div className={`text-xs mt-1 ${trendColors[trend]}`}>
            {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {change}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
