import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RevealAnimation from '@/components/RevealAnimation';
import ImageWithFallback from '@/components/ImageWithFallback';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, ExternalLink, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  medium_url: string;
  author: string;
  published_date: string;
  featured_image_url?: string;
  tags: string[];
}

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('blog_posts' as any)
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;
      setBlogPosts((data as unknown as BlogPost[]) || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setError('Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <Navbar />
      <main className="pt-20">
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <RevealAnimation>
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Tech Blog
                </h1>
                <p className="text-xl text-white/80 max-w-3xl mx-auto">
                  Discover insights, tutorials, and stories from our tech community
                </p>
              </div>
            </RevealAnimation>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-white/10 rounded-lg h-64 mb-4"></div>
                    <div className="bg-white/10 rounded h-4 mb-2"></div>
                    <div className="bg-white/10 rounded h-4 w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center text-white/80">
                <p>{error}</p>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center text-white/80">
                <p>No blog posts available at the moment.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <RevealAnimation key={post.id}>
                    <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 h-full flex flex-col">
                      {post.featured_image_url && (
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <ImageWithFallback
                            src={post.featured_image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader className="flex-1">
                        <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.published_date)}</span>
                          <User className="w-4 h-4 ml-2" />
                          <span>{post.author}</span>
                        </div>
                        <CardTitle className="text-white text-xl mb-2">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-white/70 line-clamp-3">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="bg-primary/20 text-white border-primary/30">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90 text-white"
                          onClick={() => window.open(post.medium_url, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Read on Medium
                        </Button>
                      </CardContent>
                    </Card>
                  </RevealAnimation>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;