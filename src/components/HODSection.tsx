
import React from 'react';
import { motion } from 'framer-motion';
import RevealAnimation from './RevealAnimation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import ImageWithFallback from './ImageWithFallback';

const HODSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-blue-950/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <RevealAnimation>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Message from <span className="text-blue-400">HOD</span></h2>
            <p className="text-gray-300">School of Computer Science & Information Technology</p>
          </div>
        </RevealAnimation>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* HOD Photo */}
          <RevealAnimation className="lg:col-span-4 flex justify-center" delay={200}>
            <Card className="bg-gradient-to-br from-blue-950/40 to-purple-900/30 border-none shadow-xl backdrop-blur-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 opacity-70 z-0"></div>
                  <div className="relative p-6 flex flex-col items-center gap-6">
                    <div className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-70 blur-sm"></div>
                      <div className="relative h-56 w-56 md:h-64 md:w-64 rounded-full overflow-hidden border-4 border-white/80 shadow-2xl">
                        <ImageWithFallback
                          src="/lovable-uploads/18c996a0-29a4-44dd-b049-6893f8b6f568.png"
                          alt="Head of Department"
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    
                    <div className="text-center mt-2 pb-4 z-10">
                      <h3 className="text-xl md:text-2xl font-bold text-white">Dr. Ugrasen Suman</h3>
                      <p className="text-blue-200 font-medium mt-1">Head of Department</p>
                      <p className="text-gray-300 text-sm mt-2">Ph.D., M.Tech</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </RevealAnimation>
          
          {/* Message */}
          <RevealAnimation className="lg:col-span-8" delay={300}>
            <Card className="bg-gradient-to-br from-white/5 to-blue-900/5 border border-white/10 shadow-xl backdrop-blur-sm overflow-hidden h-full">
              <CardContent className="p-6 md:p-8 relative">
                <Quote className="text-blue-400/20 absolute top-4 left-4 h-16 w-16" />
                <Quote className="text-blue-400/20 absolute bottom-4 right-4 h-16 w-16 rotate-180" />
                
                <div className="relative z-10 mt-8 mb-2 space-y-6">
                  <p className="text-gray-200 leading-relaxed pl-6 pr-2 text-lg">
                    SCSIT, established in 1986, is a hub for cutting-edge tech education, offering M.Tech, M.Sc., MBA, PGDCA, and BCA programs tailored to industry needs. With a strong focus on research, innovation, and entrepreneurship, the school provides state-of-the-art labs, ICT-enabled infrastructure, and collaborations with top organizations like DRDO, ISRO, and C-DAC.
                  </p>
                  
                  <Separator className="bg-gradient-to-r from-transparent via-gray-500/50 to-transparent my-6" />
                  
                  <p className="text-gray-200 leading-relaxed pl-2 pr-6 text-lg">
                    Students gain hands-on experience through projects, internships, and real-world problem-solving, fostering technical expertise and leadership. Supported by various student development initiatives and backed by experienced faculty, SCSIT is committed to shaping future-ready IT professionals equipped to drive technological advancements and entrepreneurship.
                  </p>
                  
                  <div className="mt-8 flex justify-end">
                    <div className="flex items-end gap-4">
                      <div className="flex flex-col items-end">
                        <span className="font-semibold text-blue-300 text-lg">Dr. Ugrasen Suman</span>
                        <span className="text-sm text-gray-400">Head of Department, SCSIT</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default HODSection;
