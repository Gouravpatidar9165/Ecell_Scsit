import React from 'react';
import RevealAnimation from "./RevealAnimation";
import ImageWithFallback from "./ImageWithFallback";

const FoundersSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <RevealAnimation>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Our Leadership
          </h2>
        </RevealAnimation>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Founder Card */}
          <RevealAnimation delay={200}>
            <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20">
                  <ImageWithFallback
                    src="/images/suraj-karan-singh.jpg"
                    alt="Suraj Karan Singh - Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Suraj Karan Singh</h3>
                <p className="text-primary font-semibold mb-4">Founder</p>
              </div>
              
              <blockquote className="text-center">
                <p className="text-muted-foreground leading-relaxed mb-4 italic">
                  "E-Cell was founded not as a student club, but as a mindset—a platform for dreamers, doers, and disruptors to challenge norms, driven by passion, purpose, and relentless learning."
                </p>
                <p className="text-primary font-bold text-lg">
                  "Be The Few, Be The Fearless"
                </p>
              </blockquote>
            </div>
          </RevealAnimation>

          {/* Co-Founder Card */}
          <RevealAnimation delay={400}>
            <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
              <div className="text-center mb-6">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-primary/20">
                  <ImageWithFallback
                    src="/images/harsh.jpg"
                    alt="Harsh Soni - Co-Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Harsh Soni</h3>
                <p className="text-primary font-semibold mb-4">Co-Founder</p>
              </div>
              
              <blockquote className="text-center">
                <p className="text-muted-foreground leading-relaxed italic">
                  "Founding the E-Cell wasn't about starting yet another club, it was about building a launchpad for ideas, innovation, and growth of every member. This community is all about turning big dreams into reality."
                </p>
              </blockquote>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;