
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeatMap from '@/components/HeatMap';
import InterventionCard from '@/components/InterventionCard';
import StatsCard from '@/components/StatsCard';
import CommunityFeedback from '@/components/CommunityFeedback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Building, Users, Info } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-6 md:py-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-10 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fade-in">
                Mapping Urban Heat Islands for Cooler Cities
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl animate-fade-in">
                Identify hot spots, understand microclimates, and discover eco-friendly cooling interventions.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <StatsCard 
                title="Average Downtown Temp" 
                value="88°F" 
                description="5.2°F above surrounding areas"
                type="temperature"
                change="3.1°F in 5 years"
                trend="up"
              />
              <StatsCard 
                title="Average Humidity" 
                value="58%" 
                description="In urban center during summer"
                type="humidity"
                change="2% from last year"
                trend="down"
              />
              <StatsCard 
                title="Green Cover" 
                value="22%" 
                description="Urban tree canopy coverage"
                type="vegetation"
                change="1.5% increase with new initiatives"
                trend="up"
              />
              <StatsCard 
                title="Air Movement" 
                value="Low" 
                description="Restricted by building density"
                type="wind"
              />
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="container py-6 md:py-10">
          <Tabs defaultValue="map" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Urban Heat Map</h2>
                <p className="text-muted-foreground">Explore temperature variations across the city</p>
              </div>
              <TabsList>
                <TabsTrigger value="map" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Heat Map
                </TabsTrigger>
                <TabsTrigger value="buildings" className="flex items-center gap-1">
                  <Building className="h-4 w-4" /> Buildings
                </TabsTrigger>
                <TabsTrigger value="community" className="flex items-center gap-1">
                  <Users className="h-4 w-4" /> Community
                </TabsTrigger>
                <TabsTrigger value="info" className="flex items-center gap-1">
                  <Info className="h-4 w-4" /> Info
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="map" className="space-y-4">
              <HeatMap />
              
              <Card>
                <CardHeader>
                  <CardTitle>Downtown Heat Island</CardTitle>
                  <CardDescription>
                    Core urban area with highest temperature differential
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Contributing Factors</h4>
                      <ul className="list-disc pl-4 text-sm space-y-1">
                        <li>Dark asphalt roads and parking lots</li>
                        <li>High building density with heat-absorbing materials</li>
                        <li>Minimal vegetation and tree cover</li>
                        <li>Waste heat from air conditioning and vehicles</li>
                        <li>Limited air circulation between tall buildings</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-2">Impact</h4>
                      <ul className="list-disc pl-4 text-sm space-y-1">
                        <li>5-7°F higher than surrounding areas during daytime</li>
                        <li>Up to 10°F differential at night</li>
                        <li>Increased energy consumption for cooling</li>
                        <li>Heat-related health risks for vulnerable populations</li>
                        <li>Elevated air pollution levels</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="buildings">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">Building layer coming soon. This feature will show building materials, efficiency ratings, and retrofit opportunities.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="community">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">Community layer coming soon. This feature will show reported heat islands and community feedback.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="info">
              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-muted-foreground">Information layer coming soon. This feature will show educational content about urban heat islands.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Intervention Solutions Section */}
        <section className="container py-6 md:py-10">
          <h2 className="text-2xl font-bold mb-2">Cooling Interventions</h2>
          <p className="text-muted-foreground mb-6">Eco-friendly solutions to reduce urban heat</p>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            <InterventionCard type="greenRoof" />
            <InterventionCard type="waterFeature" />
            <InterventionCard type="treeCanopy" />
            <InterventionCard type="coolMaterials" />
            <InterventionCard type="ventilation" />
          </div>
        </section>
        
        {/* Community Feedback Section */}
        <section className="container py-6 md:py-10">
          <div className="grid gap-6 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-2">Community Input</h2>
              <p className="text-muted-foreground mb-6">Help us identify and address heat islands in your community</p>
              
              <Card className="bg-accent-purple/5 border-accent-purple/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium mb-4">Why Your Input Matters</h3>
                  <p className="mb-4">
                    Local knowledge is invaluable for understanding urban heat islands. Your experiences help us:
                  </p>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Identify heat islands that might be missed by satellite data</li>
                    <li>Understand how heat affects daily life in different neighborhoods</li>
                    <li>Prioritize interventions where they're needed most</li>
                    <li>Measure the success of cooling initiatives over time</li>
                    <li>Build community support for green infrastructure projects</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <CommunityFeedback />
          </div>
        </section>
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; 2025 CoolCity. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:underline">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
