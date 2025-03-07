
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://geabaryxhysdqlrnnffz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlYWJhcnl4aHlzZHFscm5uZmZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwMDU2MDYsImV4cCI6MjA1NjU4MTYwNn0.riLT2y51iw0z9_p89Vkv5oMrO3ITxEAtbo0wcxeCJBc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  global: {
    fetch: fetch,
  },
});

// Initialize storage bucket if it doesn't exist
(async () => {
  try {
    // Check if uploads bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const uploadsBucketExists = buckets?.some(bucket => bucket.name === 'uploads');
    
    // If bucket doesn't exist yet, this is informational - 
    // it should be created via SQL in the Supabase dashboard
    if (!uploadsBucketExists) {
      console.info('Note: "uploads" storage bucket needs to be created in Supabase');
    }
    
    // Check if admin credentials exist
    const { data: adminCredentials, error } = await supabase
      .from('admin_credentials')
      .select('*');
      
    if (error) {
      console.error('Error checking admin credentials:', error);
    } else if (!adminCredentials || adminCredentials.length === 0) {
      // Create default admin credentials if none exist
      console.info('No admin credentials found. Creating default admin account...');
      const { error: createError } = await supabase
        .from('admin_credentials')
        .insert([
          { username: 'admin', password: 'admin123' }
        ]);
        
      if (createError) {
        console.error('Error creating default admin credentials:', createError);
      } else {
        console.info('Default admin credentials created. Username: admin, Password: admin123');
      }
    }
  } catch (error) {
    console.error('Error during initialization:', error);
  }
})();
