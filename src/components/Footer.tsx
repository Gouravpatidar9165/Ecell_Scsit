
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-4 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <a href="#" className="text-2xl font-bold tracking-tighter mb-6 inline-block">E-Cell</a>
            <p className="text-muted-foreground mb-6">
              Empowering students to innovate and lead through entrepreneurship.
            </p>
            <div className="flex space-x-4">
              {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors duration-300"
                  aria-label={social}
                >
                  <i className={`fab fa-${social}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["About Us", "Our Team", "Events", "Initiatives", "Contact"].map((link) => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {["Blog", "Podcasts", "Startup Guide", "Mentorship", "FAQs"].map((resource) => (
                <li key={resource}>
                  <a 
                    href="#"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-muted-foreground mb-4">
              Stay updated with our latest news and events.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Entrepreneurship Cell. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
