import React from 'react';
import RevealAnimation from "./RevealAnimation";
import ImageWithFallback from "./ImageWithFallback";
const FoundersSection: React.FC = () => {
  return <section className="py-12 bg-[#2d324b]">
      <div className="container mx-auto px-4">
        <RevealAnimation>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-foreground">
            Our Leadership
          </h2>
        </RevealAnimation>
        
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Founder Card */}
          <RevealAnimation delay={200}>
            <div className="bg-card rounded-lg shadow-md p-6 border border-border">
              <div className="text-center mb-4">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                  <ImageWithFallback src="/images/suraj-karan-singh.jpg" alt="Suraj Karan Singh - Founder" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">Suraj Karan Singh</h3>
                <p className="text-primary font-semibold mb-3">Founder</p>
              </div>
              
              <blockquote className="text-center">
                <p className="text-muted-foreground leading-relaxed mb-3 italic text-sm">
                  "E-Cell was founded not as a student club, but as a mindset—a platform for dreamers, doers, and disruptors to challenge norms, driven by passion, purpose, and relentless learning."
                </p>
                <p className="text-primary font-bold">
                  "Be The Few, Be The Fearless"
                </p>
              </blockquote>
            </div>
          </RevealAnimation>

          {/* Co-Founder Card */}
          <RevealAnimation delay={400}>
            <div className="bg-card rounded-lg shadow-md p-6 border border-border">
              <div className="text-center mb-4">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                  <ImageWithFallback src="/images/harsh.jpg" alt="Harsh Soni - Co-Founder" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">Harsh Soni</h3>
                <p className="text-primary font-semibold mb-3">Co-Founder</p>
              </div>
              
              <blockquote className="text-center">
                <p className="text-muted-foreground leading-relaxed italic text-sm">
                  "Founding the E-Cell wasn't about starting yet another club, it was about building a launchpad for ideas, innovation, and growth of every member. This community is all about turning big dreams into reality."
                </p>
              </blockquote>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>;
};
export default FoundersSection;