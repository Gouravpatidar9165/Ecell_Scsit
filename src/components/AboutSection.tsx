
import React from 'react';
import RevealAnimation from './RevealAnimation';
import ImageWithFallback from './ImageWithFallback';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <RevealAnimation>
          <span className="inline-block py-1 px-3 mb-3 text-xs tracking-wider uppercase rounded-full bg-secondary text-primary font-medium">About Us</span>
        </RevealAnimation>
        
        <RevealAnimation delay={100}>
          <h2 className="text-3xl md:text-4xl font-bold mb-10 tracking-tight">Fostering Innovation & Entrepreneurship</h2>
        </RevealAnimation>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <RevealAnimation delay={200}>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                alt="Students collaborating"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          </RevealAnimation>
          
          <div className="space-y-6">
            <RevealAnimation delay={300}>
              <p className="text-lg text-muted-foreground">
                The Entrepreneurship Cell (E-Cell) is a student-run organization dedicated to promoting the spirit of entrepreneurship among students. We provide a platform for aspiring entrepreneurs to transform their innovative ideas into successful ventures.
              </p>
            </RevealAnimation>
            
            <RevealAnimation delay={400}>
              <p className="text-lg text-muted-foreground">
                Through workshops, speaker sessions, mentorship programs, and competitions, we aim to equip students with the knowledge, skills, and network necessary to thrive in the entrepreneurial ecosystem.
              </p>
            </RevealAnimation>
            
            <RevealAnimation delay={500}>
              <div className="pt-4 grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="text-5xl font-bold text-primary">50+</h3>
                  <p className="text-sm text-muted-foreground">Events Organized</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-5xl font-bold text-primary">5000+</h3>
                  <p className="text-sm text-muted-foreground">Students Impacted</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-5xl font-bold text-primary">20+</h3>
                  <p className="text-sm text-muted-foreground">Startups Incubated</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-5xl font-bold text-primary">100+</h3>
                  <p className="text-sm text-muted-foreground">Industry Partners</p>
                </div>
              </div>
            </RevealAnimation>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
