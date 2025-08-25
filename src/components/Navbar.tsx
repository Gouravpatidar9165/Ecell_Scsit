
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PillNav from './PillNav';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Initiatives', href: '/#initiatives' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/#contact' },
    { label: 'Admin', href: '/admin' }
  ];

  // Add SCSIT logo alongside the PillNav
  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* PillNav with E-Cell logo */}
        <PillNav
          logo="/lovable-uploads/499b3589-d0d9-48f7-80dd-6ce910174b88.png"
          logoAlt="E-Cell Logo"
          items={navItems}
          activeHref={location.pathname}
          className=""
          ease="power2.easeOut"
          baseColor="#ffffff"
          pillColor="#000000"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
        />
        
        {/* SCSIT Logo - positioned on the right */}
        <a 
          href="https://scs.dauniv.ac.in/" 
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center"
        >
          <img 
            src="/lovable-uploads/0f47e3fe-e528-4ba8-8eb0-e8ee09167a92.png"
            alt="SCSIT Logo" 
            className="h-12 w-auto" 
          />
        </a>
      </div>
    </div>
  );
};

export default Navbar;
