import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventGallery from '@/components/EventGallery';

const Gallery = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10 relative overflow-hidden">
      <Navbar />
      <main className="pt-20">
        <EventGallery />
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;