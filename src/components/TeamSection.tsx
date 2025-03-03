
import React, { useEffect, useState } from 'react';
import RevealAnimation from './RevealAnimation';
import ImageWithFallback from './ImageWithFallback';

interface SocialLink {
  icon: string;
  url: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  imageSrc: string;
  socialLinks: SocialLink[];
}

interface TeamMemberProps {
  name: string;
  position: string;
  imageSrc: string;
  socialLinks: { icon: string; url: string }[];
  delay?: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, position, imageSrc, socialLinks, delay = 0 }) => {
  return (
    <RevealAnimation delay={delay} className="h-full">
      <div className="team-card relative bg-white dark:bg-black rounded-lg overflow-hidden h-full">
        <div className="overflow-hidden aspect-[3/4]">
          <ImageWithFallback
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="p-5 text-center">
          <h3 className="text-xl font-semibold mb-1">{name}</h3>
          <p className="text-muted-foreground text-sm mb-3">{position}</p>
          
          <div className="flex justify-center space-x-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors duration-300"
                aria-label={`${name}'s ${link.icon}`}
              >
                <i className={`fab fa-${link.icon}`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </RevealAnimation>
  );
};

const TeamSection: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Load team members from localStorage
    const savedMembers = localStorage.getItem('team_members');
    
    if (savedMembers) {
      setTeamMembers(JSON.parse(savedMembers));
    } else {
      // Default team members if none in localStorage
      setTeamMembers([
        {
          id: "1",
          name: "Alex Johnson",
          position: "President",
          imageSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80",
          socialLinks: [
            { icon: "linkedin", url: "#" },
            { icon: "twitter", url: "#" },
            { icon: "instagram", url: "#" }
          ]
        },
        {
          id: "2",
          name: "Sophia Martinez",
          position: "Vice President",
          imageSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          socialLinks: [
            { icon: "linkedin", url: "#" },
            { icon: "twitter", url: "#" }
          ]
        },
        {
          id: "3",
          name: "David Chen",
          position: "Secretary",
          imageSrc: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=769&q=80",
          socialLinks: [
            { icon: "linkedin", url: "#" },
            { icon: "instagram", url: "#" }
          ]
        },
        {
          id: "4",
          name: "Emma Wilson",
          position: "Treasurer",
          imageSrc: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          socialLinks: [
            { icon: "linkedin", url: "#" },
            { icon: "twitter", url: "#" }
          ]
        },
        {
          id: "5",
          name: "Michael Rodriguez",
          position: "Marketing Lead",
          imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          socialLinks: [
            { icon: "linkedin", url: "#" },
            { icon: "instagram", url: "#" }
          ]
        },
        {
          id: "6",
          name: "Jessica Kim",
          position: "Events Coordinator",
          imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          socialLinks: [
            { icon: "linkedin", url: "#" },
            { icon: "twitter", url: "#" }
          ]
        }
      ]);
    }
  }, []);

  return (
    <section id="team" className="py-24 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <RevealAnimation>
          <span className="inline-block py-1 px-3 mb-3 text-xs tracking-wider uppercase rounded-full bg-secondary text-primary font-medium">Our Team</span>
        </RevealAnimation>
        
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12">
          <RevealAnimation delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Meet The Leaders</h2>
          </RevealAnimation>
          
          <RevealAnimation delay={200}>
            <p className="text-muted-foreground max-w-md mt-4 md:mt-0">
              Dedicated individuals committed to fostering innovation and entrepreneurship in our community.
            </p>
          </RevealAnimation>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember
              key={member.id}
              name={member.name}
              position={member.position}
              imageSrc={member.imageSrc}
              socialLinks={member.socialLinks}
              delay={100 * (index + 1)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
