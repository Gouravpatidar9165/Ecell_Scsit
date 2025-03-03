
import React, { useState } from 'react';
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
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
}

const AdminGallery: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    imageSrc: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch gallery items from Supabase
  const fetchGalleryItems = async (): Promise<GalleryItem[]> => {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      throw new Error(`Error fetching gallery items: ${error.message}`);
    }

    return data.map(item => ({
      ...item,
      image_url: item.image_url
    }));
  };

  const { data: galleryItems = [], isLoading, error } = useQuery({
    queryKey: ['gallery-items'],
    queryFn: fetchGalleryItems
  });

  // Add a new gallery item
  const addItemMutation = useMutation({
    mutationFn: async (newItem: Omit<GalleryItem, 'id'>) => {
      const { data, error } = await supabase
        .from('gallery_items')
        .insert({
          title: newItem.title,
          description: newItem.description,
          date: newItem.date,
          image_url: newItem.image_url
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Error adding gallery item: ${error.message}`);
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-items'] });
      toast({
        title: "Item added",
        description: "Gallery item has been added successfully."
      });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to add gallery item."
      });
    }
  });

  // Update an existing gallery item
  const updateItemMutation = useMutation({
    mutationFn: async (updatedItem: GalleryItem) => {
      const { error } = await supabase
        .from('gallery_items')
        .update({
          title: updatedItem.title,
          description: updatedItem.description,
          date: updatedItem.date,
          image_url: updatedItem.image_url
        })
        .eq('id', updatedItem.id);

      if (error) {
        throw new Error(`Error updating gallery item: ${error.message}`);
      }

      return updatedItem;
    },
    onSuccess: (updatedItem) => {
      queryClient.invalidateQueries({ queryKey: ['gallery-items'] });
      toast({
        title: "Item updated",
        description: `"${updatedItem.title}" has been updated.`
      });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update gallery item."
      });
    }
  });

  // Delete a gallery item
  const deleteItemMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Error deleting gallery item: ${error.message}`);
      }

      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-items'] });
      toast({
        title: "Item deleted",
        description: "Gallery item has been removed successfully."
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete gallery item."
      });
    }
  });

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
      imageSrc: item.image_url
    });
    
    setIsDialogOpen(true);
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      deleteItemMutation.mutate(id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (editingItem) {
      // Update existing item
      updateItemMutation.mutate({
        id: editingItem.id,
        title: formData.title,
        description: formData.description,
        date: formData.date,
        image_url: formData.imageSrc
      });
    } else {
      // Add new item
      addItemMutation.mutate({
        title: formData.title,
        description: formData.description,
        date: formData.date,
        image_url: formData.imageSrc
      });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-destructive">Error loading gallery items: {error instanceof Error ? error.message : 'Unknown error'}</p>
        <Button 
          onClick={() => queryClient.invalidateQueries({ queryKey: ['gallery-items'] })}
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }

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
                <Button type="submit" disabled={isSubmitting || addItemMutation.isPending || updateItemMutation.isPending}>
                  {isSubmitting ? "Saving..." : editingItem ? 'Update' : 'Add'} Item
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <Card key={n} className="overflow-hidden">
              <div className="h-64 bg-gray-200 animate-pulse" />
              <CardContent className="p-4">
                <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : galleryItems.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-muted-foreground mb-4">No gallery items found. Add your first event!</p>
          <Button onClick={handleAddItem}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={item.image_url}
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
      )}
    </div>
  );
};

export default AdminGallery;
