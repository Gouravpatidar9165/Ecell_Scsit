
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';

const AdminSettings: React.FC = () => {
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [adminId, setAdminId] = useState<string | null>(null);
  const { toast } = useToast();

  // Check if user is authenticated
  const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
  
  useEffect(() => {
    const fetchCurrentAdmin = async () => {
      try {
        const storedUsername = localStorage.getItem('admin_username');
        if (storedUsername) {
          setCurrentUsername(storedUsername);
          
          // Query with array response instead of single to avoid errors when no results
          const { data, error } = await supabase
            .from('admin_credentials')
            .select('id')
            .eq('username', storedUsername);
          
          if (error) throw error;
          
          // Check if we got any results
          if (data && data.length > 0) {
            setAdminId(data[0].id);
          } else {
            console.log('No admin found with the stored username');
          }
        }
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    
    if (isAuthenticated) {
      fetchCurrentAdmin();
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password mismatch",
        description: "New password and confirmation do not match.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Verify current credentials - use array query instead of single()
      const { data: verifyData, error: verifyError } = await supabase
        .from('admin_credentials')
        .select('id, password')
        .eq('username', currentUsername);
      
      if (verifyError) throw verifyError;
      
      // Check if we have valid data and matching password
      if (!verifyData || verifyData.length === 0 || verifyData[0].password !== currentPassword) {
        toast({
          variant: "destructive",
          title: "Authentication failed",
          description: "Current password is incorrect.",
        });
        setIsLoading(false);
        return;
      }
      
      // Get admin ID from the query results
      const adminIdFromQuery = verifyData[0].id;
      
      // Update credentials
      const updates: { username?: string; password?: string } = {};
      
      if (newUsername && newUsername !== currentUsername) {
        updates.username = newUsername;
      }
      
      if (newPassword) {
        updates.password = newPassword;
      }
      
      if (Object.keys(updates).length > 0) {
        const { error: updateError } = await supabase
          .from('admin_credentials')
          .update(updates)
          .eq('id', adminIdFromQuery);
        
        if (updateError) throw updateError;
        
        // Update local storage if username changed
        if (updates.username) {
          localStorage.setItem('admin_username', updates.username);
          setCurrentUsername(updates.username);
        }
        
        // Clear form fields
        setCurrentPassword('');
        setNewUsername('');
        setNewPassword('');
        setConfirmPassword('');
        
        toast({
          title: "Settings updated",
          description: "Your admin credentials have been updated successfully.",
        });
      }
    } catch (error) {
      console.error('Error updating admin settings:', error);
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "An error occurred while updating your credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Admin Settings</CardTitle>
          <CardDescription>
            Update your admin credentials
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Current Credentials</h3>
                <div className="space-y-2">
                  <Label htmlFor="current-username">Current Username</Label>
                  <Input
                    id="current-username"
                    value={currentUsername}
                    readOnly
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Enter your current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">New Credentials</h3>
                <div className="space-y-2">
                  <Label htmlFor="new-username">New Username (Optional)</Label>
                  <Input
                    id="new-username"
                    type="text"
                    placeholder="Enter new username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password (Optional)</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={!newPassword}
                    required={!!newPassword}
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || (!newUsername && !newPassword) || (!!newPassword && !confirmPassword)}
            >
              {isLoading ? "Updating..." : "Update Credentials"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AdminSettings;
