
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import RevealAnimation from '@/components/RevealAnimation';
import ImageWithFallback from '@/components/ImageWithFallback';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SocialLink {
  id?: string;
  icon: string;
  url: string;
}

interface TeamMember {
  id: string;
  name: string;
  position: string;
  image_url: string;
  batch_year: string;
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
  const getSocialIconColor = (platform: string) => {
    switch (platform) {
      case 'linkedin': return 'bg-[#0A66C2]';
      case 'twitter': return 'bg-[#1DA1F2]';
      case 'instagram': return 'bg-[#E4405F]';
      case 'facebook': return 'bg-[#1877F2]';
      case 'github': return 'bg-[#171515]';
      default: return 'bg-[#6e5494]';
    }
  };

  return (
    <RevealAnimation delay={delay} className="h-full">
      <div className="team-card relative bg-white dark:bg-black rounded-lg overflow-hidden h-full">
        <div className="overflow-hidden aspect-[3/4]">
          <ImageWithFallback
            src={imageSrc}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-5 text-center">
          <h3 className="text-xl font-semibold mb-1 text-primary">{name}</h3>
          <p className="text-blue-500 text-sm mb-3 font-medium">{position}</p>
          
          <div className="flex justify-center space-x-3">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 flex items-center justify-center rounded-full ${getSocialIconColor(link.icon)} text-white hover:opacity-90 transition-opacity duration-300`}
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

const STAGGER_DELAY = 160;

const Team: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<string>('2024-25');
  const navigate = useNavigate();

  const fetchTeamMembers = async (): Promise<TeamMember[]> => {
    const { data: members, error } = await supabase
      .from('team_members')
      .select('*')
      .eq('batch_year', selectedBatch)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error fetching team members: ${error.message}`);
    }

    const membersWithLinks = await Promise.all(
      members.map(async (member) => {
        const { data: socialLinks, error: linksError } = await supabase
          .from('member_social_links')
          .select('*')
          .eq('member_id', member.id);

        if (linksError) {
          console.error(`Error fetching social links for member ${member.id}:`, linksError);
          return { ...member, socialLinks: [] };
        }

        return {
          ...member,
          socialLinks: socialLinks || []
        };
      })
    );

    return membersWithLinks;
  };

  const { data: members = [], isLoading, error } = useQuery({
    queryKey: ['team-members', selectedBatch],
    queryFn: fetchTeamMembers
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">Our Team</h1>
            <div className="h-10 bg-gray-200 animate-pulse rounded mb-8 w-48 mx-auto"></div>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white dark:bg-black rounded-lg overflow-hidden h-full">
                <div className="aspect-[3/4] bg-gray-200 animate-pulse"></div>
                <div className="p-5 text-center">
                  <div className="h-6 bg-gray-200 animate-pulse rounded mb-2 mx-auto w-3/4"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-3 mx-auto w-1/2"></div>
                  <div className="flex justify-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">Our Team</h1>
          <p className="text-destructive">Error loading team members. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button 
            onClick={() => navigate(-1)} 
            variant="outline" 
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>
        <RevealAnimation>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">Our Team</h1>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Meet the dedicated individuals committed to fostering innovation and entrepreneurship in our community.
            </p>
            
            <div className="flex justify-center mb-8">
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select batch year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-25">Batch 2024-25</SelectItem>
                  <SelectItem value="2023-24">Batch 2023-24</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </RevealAnimation>
        
        {members.length === 0 ? (
          <div className="text-center p-8">
            <p className="text-white/80">No team members found for the selected batch.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {members.map((member, index) => (
              <TeamMember
                key={member.id}
                name={member.name}
                position={member.position}
                imageSrc={member.image_url}
                socialLinks={member.socialLinks}
                delay={index * STAGGER_DELAY}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;
