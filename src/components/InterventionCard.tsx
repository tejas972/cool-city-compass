
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Droplet, Fan, Trees, Building2, ArrowRight } from 'lucide-react';

interface InterventionCardProps {
  type: 'greenRoof' | 'waterFeature' | 'treeCanopy' | 'coolMaterials' | 'ventilation';
  className?: string;
}

const InterventionCard: React.FC<InterventionCardProps> = ({ type, className }) => {
  const interventionData = {
    greenRoof: {
      title: "Green Roofs",
      description: "Incorporate vegetation on rooftops to absorb heat and provide insulation.",
      icon: <Leaf className="h-6 w-6 text-ecogreen" />,
      impact: "High",
      cost: "Medium-High",
      timeframe: "1-2 years",
      color: "bg-ecogreen/20"
    },
    waterFeature: {
      title: "Water Features",
      description: "Add fountains, ponds, or misting systems to cool surrounding air through evaporation.",
      icon: <Droplet className="h-6 w-6 text-accent-blue" />,
      impact: "Medium",
      cost: "Medium",
      timeframe: "6-12 months",
      color: "bg-coolblue/20"
    },
    treeCanopy: {
      title: "Urban Tree Canopy",
      description: "Plant shade trees along streets and in public spaces to reduce surface temperatures.",
      icon: <Trees className="h-6 w-6 text-ecogreen" />,
      impact: "High",
      cost: "Low-Medium",
      timeframe: "5-10 years (for maturity)",
      color: "bg-ecogreen/20"
    },
    coolMaterials: {
      title: "Cool Materials",
      description: "Replace dark surfaces with high-albedo materials that reflect rather than absorb heat.",
      icon: <Building2 className="h-6 w-6 text-neutral" />,
      impact: "Medium-High",
      cost: "Medium",
      timeframe: "1-3 years",
      color: "bg-lightbg"
    },
    ventilation: {
      title: "Urban Ventilation Corridors",
      description: "Design building layouts to channel cooling breezes through urban areas.",
      icon: <Fan className="h-6 w-6 text-neutral" />,
      impact: "Medium",
      cost: "Variable",
      timeframe: "5+ years",
      color: "bg-lightbg"
    }
  };

  const data = interventionData[type];

  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      <div className={`p-4 ${data.color}`}>
        {data.icon}
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{data.title}</CardTitle>
        <CardDescription>{data.description}</CardDescription>
      </CardHeader>
      <CardContent className="text-sm pb-2">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <p className="text-xs text-muted-foreground">Impact</p>
            <p className="font-medium">{data.impact}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Cost</p>
            <p className="font-medium">{data.cost}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Timeframe</p>
            <p className="font-medium">{data.timeframe}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="text-accent-purple w-full justify-between">
          Learn more <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InterventionCard;
