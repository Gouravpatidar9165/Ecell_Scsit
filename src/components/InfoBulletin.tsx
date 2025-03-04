
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

// Using local data since the Supabase table doesn't exist yet
const InfoBulletin: React.FC = () => {
  // Local fallback data
  const [bulletinItems] = useState<BulletinItem[]>([
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

  return (
    <section className="py-12 px-4 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">Latest Announcements</h2>
        
        <div className="grid gap-4">
          {bulletinItems.map((item) => (
            <Card key={item.id} className="overflow-hidden border border-primary/10 bg-white/10 backdrop-blur-lg shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                <CardDescription className="text-sm text-gray-200">
                  {new Date(item.created_at).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-100">{item.content}</p>
              </CardContent>
            </Card>
          ))}
          
          {bulletinItems.length === 0 && (
            <Card className="p-6 text-center bg-white/10 backdrop-blur-lg">
              <p className="text-white">No announcements at this time.</p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};

export default InfoBulletin;
