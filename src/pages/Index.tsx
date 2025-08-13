
import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import InitiativesSection from '@/components/InitiativesSection';
import InfoBulletin from '@/components/InfoBulletin';
import HODSection from '@/components/HODSection';
import FoundersSection from '@/components/FoundersSection';
import EventGallery from '@/components/EventGallery';
import TestimonialsSection from '@/components/TestimonialsSection';
import BranchesSection from '@/components/BranchesSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

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
      <InfoBulletin />
      <HODSection />
      <FoundersSection />
      <AboutSection />
      <EventGallery />
      <InitiativesSection />
      <TestimonialsSection />
      <BranchesSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </main>
  );
};

export default Index;
