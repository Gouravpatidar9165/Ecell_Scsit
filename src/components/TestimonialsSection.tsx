
import React from 'react';
import RevealAnimation from './RevealAnimation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useIsMobile } from '@/hooks/use-mobile';

const testimonials = [
  {
    name: "Kashvi Jain",
    message: "E-Cell has been an incredible space where ideas turn into action. It empowers dreamers to become achievers, pushing each other forward and turning visions into reality. Glad to be part of this journey..!!",
    image: "/images/Kashvi jain.jpg",
    position: "Former PR Manager, E-Cell"
  },
  {
    name: "Harsh Soni",
    message: "Founding the E-Cell wasn't about starting yet another club, it was about building a launchpad for ideas, innovation, and growth of every member. This community is all about turning big dreams into reality. What began as an idea is now a launchpad for fearless innovators and game-changers 🚀 and I'm proud to have played a part in its journey.",
    image: "/images/harsh.jpg",
    position: "Former Vice-President, E-Cell"
  },
  {
    name: "Anand Kumar Payasi",
    message: "Having worked with students from various backgrounds, I can say that the E-Cell of SCSIT, DAVV offers a unique platform for growth. As someone who grew up in the military, I understand the value of adaptability, leadership, and perseverance. These qualities are mirrored in the E-Cell, where students learn not just about business.",
    image: "/images/Anand Kumar Payasi.jpg",
    position: "Former Mentor, E-Cell"
  },
];

const TestimonialsSection: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section id="testimonials" className="py-20 px-4 bg-gradient-to-b from-blue-950/10 to-transparent">
      <div className="max-w-7xl mx-auto">
        <RevealAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">What People <span className="text-blue-400">Say</span></h2>
            <p className="text-gray-300">Hear from our community members</p>
          </div>
        </RevealAnimation>

        <RevealAnimation delay={200}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="border border-border/50 bg-background/80 backdrop-blur-sm p-6 h-full rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <Avatar className="h-12 w-12 mr-4 border-2 border-blue-500/30">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback className="bg-blue-500/20 text-blue-200">
                            {testimonial.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                          <p className="text-sm text-blue-400">{testimonial.position}</p>
                        </div>
                      </div>
                      
                      <div className="mb-3 text-yellow-400 flex">
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                        <Star size={16} fill="currentColor" />
                      </div>
                      
                      <div className="relative flex-1">
                        <Quote className="absolute -top-1 -left-1 text-blue-500/20 w-8 h-8" />
<p className="text-black relative z-10 pl-2 pt-2 line-clamp-6">

                          {testimonial.message}
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {!isMobile && (
              <>
                {/* 
                <CarouselPrevious className="left-0 bg-background/50 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white" />
                <CarouselNext className="right-0 bg-background/50 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white" />
                */}

              </>
            )}
          </Carousel>
        </RevealAnimation>
      </div>
    </section>
  );
};

export default TestimonialsSection;
