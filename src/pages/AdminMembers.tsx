
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Edit, UserPlus, Link as LinkIcon } from "lucide-react";
import ImageWithFallback from '@/components/ImageWithFallback';

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

const AdminMembers: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>(() => {
    const savedMembers = localStorage.getItem('team_members');
    
    if (savedMembers) {
      return JSON.parse(savedMembers);
    }
    
    // Default team members from TeamSection
    return [
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
    ];
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    imageSrc: '',
    linkedinUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    facebookUrl: ''
  });

  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('team_members', JSON.stringify(members));
  }, [members]);

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      imageSrc: '',
      linkedinUrl: '',
      twitterUrl: '',
      instagramUrl: '',
      facebookUrl: ''
    });
  };

  const handleAddMember = () => {
    setEditingMember(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member);
    
    // Populate form with member data
    const formData = {
      name: member.name,
      position: member.position,
      imageSrc: member.imageSrc,
      linkedinUrl: member.socialLinks.find(link => link.icon === 'linkedin')?.url || '',
      twitterUrl: member.socialLinks.find(link => link.icon === 'twitter')?.url || '',
      instagramUrl: member.socialLinks.find(link => link.icon === 'instagram')?.url || '',
      facebookUrl: member.socialLinks.find(link => link.icon === 'facebook')?.url || ''
    };
    
    setFormData(formData);
    setIsDialogOpen(true);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      setMembers(members.filter(member => member.id !== id));
      toast({
        title: "Member deleted",
        description: "Team member has been removed successfully."
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const socialLinks: SocialLink[] = [];
    
    if (formData.linkedinUrl) socialLinks.push({ icon: 'linkedin', url: formData.linkedinUrl });
    if (formData.twitterUrl) socialLinks.push({ icon: 'twitter', url: formData.twitterUrl });
    if (formData.instagramUrl) socialLinks.push({ icon: 'instagram', url: formData.instagramUrl });
    if (formData.facebookUrl) socialLinks.push({ icon: 'facebook', url: formData.facebookUrl });
    
    const newMember: TeamMember = {
      id: editingMember ? editingMember.id : Date.now().toString(),
      name: formData.name,
      position: formData.position,
      imageSrc: formData.imageSrc,
      socialLinks
    };
    
    if (editingMember) {
      // Update existing member
      setMembers(members.map(member => 
        member.id === editingMember.id ? newMember : member
      ));
      toast({
        title: "Member updated",
        description: `${newMember.name}'s information has been updated.`
      });
    } else {
      // Add new member
      setMembers([...members, newMember]);
      toast({
        title: "Member added",
        description: `${newMember.name} has been added to the team.`
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Team Members</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddMember}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingMember ? 'Edit' : 'Add'} Team Member</DialogTitle>
              <DialogDescription>
                {editingMember 
                  ? "Update the team member's information below." 
                  : "Fill in the details to add a new team member."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">
                    Position
                  </Label>
                  <Input
                    id="position"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="imageSrc" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="imageSrc"
                    value={formData.imageSrc}
                    onChange={(e) => setFormData({...formData, imageSrc: e.target.value})}
                    className="col-span-3"
                    required
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right col-span-4 -mb-2 font-bold">
                    Social Links
                  </Label>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="linkedinUrl" className="text-right">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                    className="col-span-3"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="twitterUrl" className="text-right">
                    Twitter
                  </Label>
                  <Input
                    id="twitterUrl"
                    value={formData.twitterUrl}
                    onChange={(e) => setFormData({...formData, twitterUrl: e.target.value})}
                    className="col-span-3"
                    placeholder="https://twitter.com/username"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instagramUrl" className="text-right">
                    Instagram
                  </Label>
                  <Input
                    id="instagramUrl"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData({...formData, instagramUrl: e.target.value})}
                    className="col-span-3"
                    placeholder="https://instagram.com/username"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="facebookUrl" className="text-right">
                    Facebook
                  </Label>
                  <Input
                    id="facebookUrl"
                    value={formData.facebookUrl}
                    onChange={(e) => setFormData({...formData, facebookUrl: e.target.value})}
                    className="col-span-3"
                    placeholder="https://facebook.com/username"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">{editingMember ? 'Update' : 'Add'} Member</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.id} className="overflow-hidden">
            <div className="relative">
              <ImageWithFallback
                src={member.imageSrc}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <Button 
                  variant="default" 
                  size="icon" 
                  className="h-8 w-8 bg-primary/80 hover:bg-primary"
                  onClick={() => handleEditMember(member)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="h-8 w-8 bg-destructive/80 hover:bg-destructive"
                  onClick={() => handleDeleteMember(member.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-muted-foreground text-sm mb-3">{member.position}</p>
              
              <div className="flex gap-2">
                {member.socialLinks.map((link, index) => (
                  <Button 
                    key={index} 
                    variant="outline" 
                    size="icon" 
                    className="h-8 w-8 rounded-full"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      <i className={`fab fa-${link.icon}`}></i>
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminMembers;
