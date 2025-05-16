
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface Testimonial {
  name: string;
  message: string;
  image: string;
  position?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Kashvi Jain",
    message:
      "E-Cell has been an incredible space where ideas turn into action. It empowers dreamers to become achievers, pushing each other forward and turning visions into reality. Glad to be part of this journey..!!",
    image: "/images/Kashvi jain.jpg",
  },
  {
    name: "Harsh Soni",
    message:
      "Founding the E-Cell wasn't about starting yet another club, it was about building a launchpad for ideas, innovation, and growth of every member. This community is all about turning big dreams into reality.",
    image: "/images/harsh.jpg",
  },
  {
    name: "Anand Kumar Payasi",
    message: "Having worked with students from various backgrounds, I can say that the E-Cell of SCSIT, DAVV offers a unique platform for growth. The dedication I've seen in the students here has been inspiring.",
    image: "/images/Anand Kumar Payasi.jpg",
    position: "Former Mentor, E-Cell"
  },
];

const AUTO_SLIDE_INTERVAL = 3500; // milliseconds

const TestimonialsSection: React.FC = () => {
  const isMobile = useIsMobile();
  const [current, setCurrent] = React.useState(0);
  const cardCount = isMobile ? 1 : 3;

  // Auto-slide effect for infinite loop
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // center cards and make sure we scroll by 1 slide per time always, just show 3 at a time on desktop.
  // adjust styling for responsive card size
  return (
    <section
      className="testimonials-section px-4 py-8"
      style={{ backgroundColor: "#252c3b" }}
    >
      <h2 className="text-2xl font-bold mb-8 text-center text-white">
        Testimonials
      </h2>
      <div className="max-w-2xl md:max-w-3xl lg:max-w-6xl mx-auto relative">
        <Carousel
          opts={{
            loop: true,
            slidesToScroll: 1,
            slidesToShow: cardCount, // Only effective in Embla’s vanilla config, but this helps clarify intent.
            // axis: 'x' by default for horizontal
          }}
          className="w-full"
          setApi={(api) => {
            if (api && api.scrollTo) {
              api.scrollTo(current);
            }
          }}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className={
                  `flex justify-center items-stretch pb-8` +
                  // Responsive width for 1 per view on mobile, 3 per view on desktop
                  (isMobile
                    ? " basis-full max-w-[90vw]"
                    : " basis-1/3 max-w-[400px]") +
                  " transition-all duration-300"
                }
              >
                <div className="testimonial-card flex flex-col p-6 border rounded-lg shadow-lg bg-white w-full h-full max-w-md min-h-[220px] mx-auto">
                  <div className="flex flex-col items-center flex-1">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full mb-4 object-cover"
                    />
                    <h3 className="font-semibold text-lg mb-2 text-black text-center">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-center whitespace-pre-line break-words">
                      {testimonial.message}
                    </p>
                    {testimonial.position && (
                      <span className="mt-2 text-xs text-gray-500 italic">{testimonial.position}</span>
                    )}
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Move arrows inwards for desktop, further out for mobile */}
          <CarouselPrevious className={isMobile ? "left-2" : "left-8"} />
          <CarouselNext className={isMobile ? "right-2" : "right-8"} />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
