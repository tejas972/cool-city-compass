
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin, Send } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const CommunityFeedback = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend
    toast.success("Thank you for your feedback! Our team will review it shortly.");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Report a Heat Island</CardTitle>
        <CardDescription>
          Share your experience with urban heat to help improve our mapping and solutions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <div className="flex gap-2">
                <Input id="location" placeholder="Enter address or intersection" />
                <Button variant="outline" size="icon" type="button">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Or click on the map icon to use your current location
              </p>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="temperature">Approximate Temperature (if known)</Label>
              <Input id="temperature" placeholder="e.g., 95°F" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="time">When did you notice this heat island?</Label>
              <Input id="time" type="datetime-local" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="details">Describe the area and your experience</Label>
              <Textarea 
                id="details" 
                placeholder="What makes this area hot? How does it affect you? What features are present (buildings, pavement, lack of trees)?"
                rows={4}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input id="email" type="email" placeholder="For updates on this area" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-accent-purple hover:bg-accent-purple/90" onClick={handleSubmit}>
          Submit Report <Send className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommunityFeedback;
