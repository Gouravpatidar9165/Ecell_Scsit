
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 px-4 sm:px-6 border-t">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <a href="#" className="inline-block mb-6">
              <img 
                src="/lovable-uploads/499b3589-d0d9-48f7-80dd-6ce910174b88.png" 
                alt="E-Cell Logo" 
                className="h-16 w-auto mb-3"
              />
            </a>
            <p className="text-muted-foreground mb-6">
              Empowering students to innovate and lead through entrepreneurship.
            </p>
            <div className="flex space-x-4">
              {[
                { name: "twitter", icon: <Twitter size={20} />, color: "bg-[#1DA1F2]" },
                { name: "facebook", icon: <Facebook size={20} />, color: "bg-[#1877F2]" },
                { name: "instagram", icon: <Instagram size={20} />, color: "bg-[#E4405F]" },
                { name: "linkedin", icon: <Linkedin size={20} />, color: "bg-[#0A66C2]" }
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className={`w-10 h-10 flex items-center justify-center rounded-full ${social.color} text-white hover:opacity-90 transition-opacity duration-300`}
                  aria-label={social.name}
                >
                  {social.icon}
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
