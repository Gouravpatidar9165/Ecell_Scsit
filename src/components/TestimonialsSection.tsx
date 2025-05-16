import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonials = [
  {
    name: "Kashvi Jain",
    message: "E-Cell has been an incredible space where ideas turn into action. It empowers dreamers to become achievers, pushing each other forward and turning visions into reality. Glad to be part of this journey..!!",
    image: "/images/Kashvi jain.jpg"
  },
  {
    name: "Harsh Soni",
    message: "Founding the E-Cell wasn't about starting yet another club, it was about building a launchpad for ideas, innovation, and growth of every member. This community is all about turning big dreams into reality. What began as an idea is now a launchpad for fearless innovators and game-changers 🚀 and I'm proud to have played a part in its journey. This is just the beginning. The future belongs to those who dare to build it! Remember, कायर भोगे दुःख सदा, वीर भोग्या वसुन्धरा 🪖⚔️",
    image: "/images/harsh.jpg"
  },
];

const TestimonialsSection: React.FC = () => {
  const sliderRef = useRef<Slider>(null); // Create a ref for the slider
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640); // Determine if the screen is mobile

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Update state on window resize
    };

    window.addEventListener('resize', handleResize); // Add event listener for resize
    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup event listener
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: !isMobile, // Disable arrows in mobile mode
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        }
      }
    ]
  };

  return (
    <section className="testimonials-section px-4 py-8" style={{ backgroundColor: '#252c3b' }}>
      <h2 className="text-2xl font-bold mb-8 text-center text-white">Testimonials</h2>
      <div className="max-w-6xl mx-auto">
        <Slider ref={sliderRef} {...settings}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="px-2">
              <div className="testimonial-card p-6 border rounded-lg shadow-lg bg-white">
                <div className="flex flex-col items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-20 h-20 rounded-full mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-2 text-black">{testimonial.name}</h3>
                  <p className="text-gray-600 text-center">{testimonial.message}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialsSection;
