
import React from 'react';
import { MapPin, Info, Settings, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-accent-purple" />
          <span className="text-xl font-bold">CoolCity</span>
        </div>
        
        <nav className="hidden md:flex md:gap-6">
          <a href="#" className="text-sm font-medium hover:text-accent-purple transition-colors">Dashboard</a>
          <a href="#" className="text-sm font-medium hover:text-accent-purple transition-colors">Heat Map</a>
          <a href="#" className="text-sm font-medium hover:text-accent-purple transition-colors">Interventions</a>
          <a href="#" className="text-sm font-medium hover:text-accent-purple transition-colors">Community</a>
          <a href="#" className="text-sm font-medium hover:text-accent-purple transition-colors">About</a>
        </nav>
        
        <div className="hidden md:flex md:items-center md:gap-2">
          <Button variant="ghost" size="icon">
            <Info className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="default" className="bg-accent-purple hover:bg-accent-purple/90">
            Report Heat Zone
          </Button>
        </div>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 pt-6">
              <a 
                href="#" 
                className="text-sm font-medium" 
                onClick={() => setOpen(false)}
              >
                Dashboard
              </a>
              <a 
                href="#" 
                className="text-sm font-medium" 
                onClick={() => setOpen(false)}
              >
                Heat Map
              </a>
              <a 
                href="#" 
                className="text-sm font-medium" 
                onClick={() => setOpen(false)}
              >
                Interventions
              </a>
              <a 
                href="#" 
                className="text-sm font-medium" 
                onClick={() => setOpen(false)}
              >
                Community
              </a>
              <a 
                href="#" 
                className="text-sm font-medium" 
                onClick={() => setOpen(false)}
              >
                About
              </a>
              <Button variant="default" className="bg-accent-purple hover:bg-accent-purple/90">
                Report Heat Zone
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
