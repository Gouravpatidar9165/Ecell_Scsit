
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface BulletinItem {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

const fetchBulletinItems = async () => {
  const { data, error } = await supabase
    .from('bulletin_items')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  if (error) throw error;
  
  return data || [];
};

const InfoBulletin: React.FC = () => {
  const { data: bulletinItems = [], isLoading, error } = useQuery({
    queryKey: ['bulletinItems'],
    queryFn: fetchBulletinItems,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Fallback data if the fetch fails or while loading
  const [localItems, setLocalItems] = useState<BulletinItem[]>([
    {
      id: '1',
      title: 'Upcoming Workshop',
      content: 'Join us for a startup workshop on May 15th. Register now!',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Pitch Competition',
      content: 'Annual pitch competition registration opens next week.',
      created_at: new Date().toISOString(),
    }
  ]);

  const displayItems = bulletinItems.length > 0 ? bulletinItems : localItems;

  return (
    <section className="py-12 px-4 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Latest Announcements</h2>
        
        <div className="grid gap-4">
          {displayItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border border-primary/10 bg-white/5 backdrop-blur-lg shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{item.title}</CardTitle>
                <CardDescription className="text-sm opacity-80">
                  {new Date(item.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-primary">{item.content}</p>
              </CardContent>
            </Card>
          ))}
          
          {displayItems.length === 0 && !isLoading && (
            <Card className="p-6 text-center bg-white/5 backdrop-blur-lg">
              <p>No announcements at this time.</p>
            </Card>
          )}
          
          {isLoading && (
            <div className="flex justify-center py-8">
              <div className="animate-pulse h-32 w-full max-w-2xl bg-secondary/30 rounded-lg"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InfoBulletin;
