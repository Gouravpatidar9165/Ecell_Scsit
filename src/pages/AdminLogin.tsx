
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, KeyRound } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasDefaultCredentials, setHasDefaultCredentials] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if default credentials exist
  useEffect(() => {
    const checkDefaultCredentials = async () => {
      try {
        const { data, error } = await supabase
          .from('admin_credentials')
          .select('username, password')
          .eq('username', 'admin')
          .eq('password', 'admin123');
          
        if (error) throw error;
        
        if (data && data.length > 0) {
          setHasDefaultCredentials(true);
        }
      } catch (error) {
        console.error('Error checking credentials:', error);
      }
    };
    
    checkDefaultCredentials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Fetch admin credentials from the database - use array query instead of single()
      const { data, error } = await supabase
        .from('admin_credentials')
        .select('username, password')
        .eq('username', username);
      
      if (error) throw error;
      
      // Check if password matches
      const isValid = data && data.length > 0 && data[0].password === password;
      
      if (isValid) {
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_username', username);
        
        // If logging in with default credentials, show a warning
        if (username === 'admin' && password === 'admin123') {
          toast({
            variant: "warning",
            title: "Default credentials detected",
            description: "Please change your credentials in the settings page for security.",
            icon: <AlertCircle className="h-4 w-4" />
          });
        } else {
          toast({
            title: "Login successful",
            description: "Welcome to the admin panel",
          });
        }
        
        // Navigate to the settings page if using default credentials
        if (username === 'admin' && password === 'admin123') {
          navigate('/admin/settings');
        } else {
          navigate('/admin/members');
        }
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Incorrect username or password. Please try again.",
          icon: <AlertCircle className="h-4 w-4" />
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
        icon: <AlertCircle className="h-4 w-4" />
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <KeyRound size={24} />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin panel.
          </CardDescription>
          {hasDefaultCredentials && (
            <div className="mt-4 p-3 bg-yellow-50 text-yellow-800 rounded-md text-sm">
              <p className="font-medium">Default credentials detected!</p>
              <p>Default username: admin</p>
              <p>Default password: admin123</p>
              <p className="mt-1">Please change these after logging in.</p>
            </div>
          )}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
