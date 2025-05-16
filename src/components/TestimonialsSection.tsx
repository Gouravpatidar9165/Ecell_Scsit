
import React from 'react';

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
  return (
    <section className="testimonials-section px-4 py-8" style={{ backgroundColor: '#252c3b' }}>
      <h2 className="text-2xl font-bold mb-8 text-center text-white">Testimonials</h2>
      <div className="max-w-6xl mx-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="h-full flex">
              <div className="testimonial-card flex flex-col flex-1 p-6 border rounded-lg shadow-lg bg-white w-full min-h-[300px]">
                <div className="flex flex-col items-center flex-1">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-20 h-20 rounded-full mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-lg mb-2 text-black text-center">{testimonial.name}</h3>
                  <p className="text-gray-600 text-center whitespace-pre-line break-words">{testimonial.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
