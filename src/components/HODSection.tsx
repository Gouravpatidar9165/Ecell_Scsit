
import React from 'react';
import { motion } from 'framer-motion';
import RevealAnimation from './RevealAnimation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Quote } from 'lucide-react';

const HODSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent to-blue-950/10">
      <div className="max-w-6xl mx-auto">
        <RevealAnimation>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Message from <span className="text-blue-400">HOD</span></h2>
            <p className="text-gray-300">School of Computer Science & Information Technology</p>
          </div>
        </RevealAnimation>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* HOD Photo */}
          <RevealAnimation className="md:col-span-1 flex justify-center" delay={200}>
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-70 blur-sm"></div>
              <div className="relative h-56 w-56 md:h-64 md:w-64 rounded-full overflow-hidden border-4 border-white">
                <img 
                  src="/lovable-uploads/18c996a0-29a4-44dd-b049-6893f8b6f568.png" 
                  alt="Head of Department" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-center">
                <h3 className="font-bold text-white">Prof. Sanjay Tanwani</h3>
                <p className="text-sm text-blue-200">Head of Department</p>
              </div>
            </div>
          </RevealAnimation>
          
          {/* Message */}
          <RevealAnimation className="md:col-span-2" delay={300}>
            <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/10 relative shadow-xl">
              <Quote className="text-blue-400/30 absolute top-4 left-4 h-12 w-12" />
              
              <p className="text-gray-200 leading-relaxed relative z-10 pl-6 pr-2">
                SCSIT, established in 1986, is a hub for cutting-edge tech education, offering M.Tech, M.Sc., MBA, PGDCA, and BCA programs tailored to industry needs. With a strong focus on research, innovation, and entrepreneurship, the school provides state-of-the-art labs, ICT-enabled infrastructure, and collaborations with top organizations like DRDO, ISRO, and C-DAC.
              </p>
              
              <Separator className="my-4 bg-gray-600/30" />
              
              <p className="text-gray-200 leading-relaxed relative z-10 pl-2 pr-6">
                Students gain hands-on experience through projects, internships, and real-world problem-solving, fostering technical expertise and leadership. Supported by various student development initiatives and backed by experienced faculty, SCSIT is committed to shaping future-ready IT professionals equipped to drive technological advancements and entrepreneurship.
              </p>
              
              <div className="mt-6 flex items-center justify-end">
                <div className="flex flex-col items-end">
                  <span className="font-semibold text-blue-300">Prof. Sanjay Tanwani</span>
                  <span className="text-sm text-gray-400">Head of Department, SCSIT</span>
                </div>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

export default HODSection;
