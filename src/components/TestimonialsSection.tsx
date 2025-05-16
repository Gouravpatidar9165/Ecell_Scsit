
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const testimonials = [
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
  const [current, setCurrent] = React.useState(0);

  // Auto-slide effect for infinite loop
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, AUTO_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="testimonials-section px-4 py-8"
      style={{ backgroundColor: "#252c3b" }}
    >
      <h2 className="text-2xl font-bold mb-8 text-center text-white">
        Testimonials
      </h2>
      <div className="max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto relative">
        <Carousel
          opts={{
            loop: true,
          }}
          className="w-full"
          // set index manually for auto-slide
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
                className="flex justify-center items-stretch"
              >
                <div className="testimonial-card flex flex-col p-6 border rounded-lg shadow-lg bg-white w-full max-w-md min-h-[280px] mx-auto">
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
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;

