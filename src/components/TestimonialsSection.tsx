
import React, { useState, useEffect } from 'react';
import RevealAnimation from './RevealAnimation';
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ImageWithFallback from './ImageWithFallback';
import { useIsMobile } from '@/hooks/use-mobile';
import { Slider } from "@/components/ui/slider";

interface Testimonial {
  name: string;
  message: string;
  image: string;
  position: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Kashvi Jain",
    message: "E-Cell has been an incredible space where ideas turn into action. It empowers dreamers to become achievers, pushing each other forward and turning visions into reality. Glad to be part of this journey..!!",
    image: "/lovable-uploads/499b3589-d0d9-48f7-80dd-6ce910174b88.png",
    position: "Former PR Manager, E-Cell"
  },
  {
    name: "Harsh Soni",
    message: "Founding the E-Cell wasn't about starting yet another club, it was about building a launchpad for ideas, innovation, and growth of every member. This community is all about turning big dreams into reality.",
    image: "/lovable-uploads/499b3589-d0d9-48f7-80dd-6ce910174b88.png",
    position: "Former Vice-President, E-Cell"
  },
  {
    name: "Anand Kumar Payasi",
    message: "Having worked with students from various backgrounds, I can say that the E-Cell of SCSIT, DAVV offers a unique platform for growth. The dedication I've seen in the students here has been inspiring.",
    image: "/lovable-uploads/499b3589-d0d9-48f7-80dd-6ce910174b88.png",
    position: "Former Mentor, E-Cell"
  },
];

const TestimonialsSection: React.FC = () => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  
  // Auto-slide functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPlay) {
      interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % testimonials.length);
      }, 5000); // Change slide every 5 seconds
    }
    
    return () => clearInterval(interval);
  }, [autoPlay]);
  
  const handleSliderChange = (value: number[]) => {
    setActiveIndex(value[0]);
    // Temporarily pause autoplay when manually changing slides
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };
  
  return (
    <section id="testimonials" className="py-24 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <RevealAnimation>
          <span className="inline-block py-1 px-3 mb-3 text-xs tracking-wider uppercase rounded-full bg-secondary text-primary font-medium">Testimonials</span>
        </RevealAnimation>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <RevealAnimation delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What People Say</h2>
          </RevealAnimation>
          
          <RevealAnimation delay={200}>
            <p className="text-muted-foreground max-w-md mt-4 md:mt-0">
              Hear from our community members about their experiences with E-Cell SCSIT.
            </p>
          </RevealAnimation>
        </div>
        
        <RevealAnimation delay={300}>
          <Carousel 
            className="w-full max-w-5xl mx-auto" 
            opts={{
              align: "start",
              loop: true,
            }}
            // Removed the 'value' and 'onValueChange' props as they don't exist on the Carousel component
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem 
                  key={index} 
                  className={`${!isMobile ? 'md:basis-1/2 lg:basis-1/3' : 'basis-full'} p-2`}
                >
                  <div className="h-full">
                    <Card className="p-6 h-full bg-background/70 backdrop-blur-sm border border-white/10 
                      hover:border-primary/20 transition-all duration-500 hover:shadow-lg 
                      transform hover:translate-y-[-5px] group">
                      <div className="flex flex-col h-full">
                        <div className="flex items-center mb-4">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden 
                            border-2 border-primary/50 mr-4 transition-all duration-300
                            group-hover:border-primary group-hover:scale-110">
                            <ImageWithFallback
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">{testimonial.name}</h3>
                            <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                          </div>
                        </div>
                        <blockquote className="italic text-sm mb-4 flex-grow leading-relaxed 
                          transition-all duration-500 group-hover:text-foreground">
                          "{testimonial.message}"
                        </blockquote>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-end gap-2 mt-6">
              <CarouselPrevious 
                className="relative inset-auto -left-0 translate-y-0 
                transition-all duration-300 hover:bg-primary hover:text-white" 
              />
              <CarouselNext 
                className="relative inset-auto -right-0 translate-y-0 
                transition-all duration-300 hover:bg-primary hover:text-white" 
              />
            </div>
          </Carousel>
          
          <div className="mt-8 max-w-md mx-auto">
            <Slider
              defaultValue={[0]}
              max={testimonials.length - 1}
              step={1}
              value={[activeIndex]}
              onValueChange={handleSliderChange}
              className="cursor-pointer"
            />
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default TestimonialsSection;
