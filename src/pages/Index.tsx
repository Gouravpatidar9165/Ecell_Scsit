
import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import InitiativesSection from '@/components/InitiativesSection';
import InfoBulletin from '@/components/InfoBulletin';
import HODSection from '@/components/HODSection';
import FoundersSection from '@/components/FoundersSection';

import TestimonialsSection from '@/components/TestimonialsSection';
import BranchesSection from '@/components/BranchesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollStack, { ScrollStackItem } from '@/components/ScrollStack';

const Index: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadFontAwesome = () => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
      document.head.appendChild(link);
    };
    
    loadFontAwesome();

    // Set page as loaded after a short delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <LoadingScreen />
      <Navbar />
      <HeroSection />
      
      <ScrollStack className="h-screen">
        <ScrollStackItem itemClassName="bg-background">
          <InfoBulletin />
        </ScrollStackItem>
        
        <ScrollStackItem itemClassName="bg-background">
          <HODSection />
        </ScrollStackItem>
        
        <ScrollStackItem itemClassName="bg-background">
          <FoundersSection />
        </ScrollStackItem>
        
        <ScrollStackItem itemClassName="bg-background">
          <AboutSection />
        </ScrollStackItem>
        
        <ScrollStackItem itemClassName="bg-background">
          <InitiativesSection />
        </ScrollStackItem>
        
        <ScrollStackItem itemClassName="bg-background">
          <TestimonialsSection />
        </ScrollStackItem>
        
        <ScrollStackItem itemClassName="bg-background">
          <BranchesSection />
        </ScrollStackItem>
        
        <ScrollStackItem itemClassName="bg-background">
          <ContactSection />
        </ScrollStackItem>
        
        <ScrollStackItem itemClassName="bg-background">
          <Footer />
        </ScrollStackItem>
      </ScrollStack>
      
      <Toaster />
    </main>
  );
};

export default Index;
