
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Trash2, Edit, PlusCircle, Calendar } from "lucide-react";
import ImageWithFallback from '@/components/ImageWithFallback';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  imageSrc: string;
}

const AdminGallery: React.FC = () => {
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const savedGallery = localStorage.getItem('gallery_items');
    
    if (savedGallery) {
      return JSON.parse(savedGallery);
    }
    
    // Default gallery items
    return [
      {
        id: "1",
        title: "Entrepreneurship Summit 2023",
        description: "Annual flagship event featuring renowned speakers and workshops",
        date: "2023-10-15",
        imageSrc: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      },
      {
        id: "2",
        title: "Startup Pitch Competition",
        description: "Students presenting innovative business ideas to industry experts",
        date: "2023-09-22",
        imageSrc: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      },
      {
        id: "3",
        title: "Business Plan Workshop",
        description: "Interactive session on creating effective business plans",
        date: "2023-08-10",
        imageSrc: "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
      }
    ];
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    imageSrc: ''
  });

  const { toast } = useToast();

  useEffect(() => {
    localStorage.setItem('gallery_items', JSON.stringify(gallery));
  }, [gallery]);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      imageSrc: ''
    });
  };

  const handleAddItem = () => {
    setEditingItem(null);
    resetForm();
    setIsDialogOpen(true);
  };

  const handleEditItem = (item: GalleryItem) => {
    setEditingItem(item);
    
    // Populate form with item data
    setFormData({
      title: item.title,
      description: item.description,
      date: item.date,
      imageSrc: item.imageSrc
    });
    
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      setGallery(gallery.filter(item => item.id !== id));
      toast({
        title: "Item deleted",
        description: "Gallery item has been removed successfully."
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: GalleryItem = {
      id: editingItem ? editingItem.id : Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      imageSrc: formData.imageSrc
    };
    
    if (editingItem) {
      // Update existing item
      setGallery(gallery.map(item => 
        item.id === editingItem.id ? newItem : item
      ));
      toast({
        title: "Item updated",
        description: `"${newItem.title}" has been updated.`
      });
    } else {
      // Add new item
      setGallery([...gallery, newItem]);
      toast({
        title: "Item added",
        description: `"${newItem.title}" has been added to the gallery.`
      });
    }
    
    setIsDialogOpen(false);
    resetForm();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Gallery</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddItem}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit' : 'Add'} Gallery Item</DialogTitle>
              <DialogDescription>
                {editingItem 
                  ? "Update the gallery item's information below." 
                  : "Fill in the details to add a new event or achievement."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="col-span-3"
                    required
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="col-span-3"
                    required
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
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
              </div>
              <DialogFooter>
                <Button type="submit">{editingItem ? 'Update' : 'Add'} Item</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <div className="relative h-64 overflow-hidden">
              <ImageWithFallback
                src={item.imageSrc}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="default" 
                  size="icon" 
                  className="h-8 w-8 bg-primary/80 hover:bg-primary"
                  onClick={() => handleEditItem(item)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="icon" 
                  className="h-8 w-8 bg-destructive/80 hover:bg-destructive"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                <h3 className="text-white font-semibold text-lg truncate">{item.title}</h3>
                <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="text-sm">{formatDate(item.date)}</span>
              </div>
              <h3 className="font-semibold mt-1">{item.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;
