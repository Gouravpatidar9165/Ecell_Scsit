
import React, { useEffect, useState } from 'react';
import RevealAnimation from './RevealAnimation';
import ImageWithFallback from './ImageWithFallback';
import { Calendar } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  imageSrc: string;
}

const EventGallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);

  useEffect(() => {
    // Load gallery items from localStorage
    const savedGallery = localStorage.getItem('gallery_items');
    
    if (savedGallery) {
      setGallery(JSON.parse(savedGallery));
    } else {
      // Default gallery items if none in localStorage
      setGallery([
        {
          id: "1",
          title: "Entrepreneurship Summit 2023",
          description: "Annual flagship event featuring renowned speakers and workshops",
          date: "2023-10-15",
          imageSrc: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        },
        {
          id: "2",
          title: "Startup Pitch Competition",
          description: "Students presenting innovative business ideas to industry experts",
          date: "2023-09-22",
          imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        },
        {
          id: "3",
          title: "Business Plan Workshop",
          description: "Interactive session on creating effective business plans",
          date: "2023-08-10",
          imageSrc: "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        }
      ]);
    }
  }, []);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section id="gallery" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <RevealAnimation>
          <span className="inline-block py-1 px-3 mb-3 text-xs tracking-wider uppercase rounded-full bg-secondary text-primary font-medium">Our Achievements</span>
        </RevealAnimation>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <RevealAnimation delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Event Gallery</h2>
          </RevealAnimation>
          
          <RevealAnimation delay={200}>
            <p className="text-muted-foreground max-w-md mt-4 md:mt-0">
              A showcase of our past events, workshops, and achievements in fostering entrepreneurship.
            </p>
          </RevealAnimation>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gallery.map((item, index) => (
            <RevealAnimation key={item.id} delay={100 * (index + 1)} className="h-full">
              <div className="group h-full bg-card rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <p className="text-white/90 text-sm line-clamp-3">{item.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{formatDate(item.date)}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
              </div>
            </RevealAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventGallery;
