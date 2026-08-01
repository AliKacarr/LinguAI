import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://khdjmhkxlrkskilsobmc.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZGptaGt4bHJrc2tpbHNvYm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYzMDA3NTEsImV4cCI6MjA2MTg3Njc1MX0.VocbAHlVSK7aa91D0bClCyZXAISjdTy3mt6KUauyo1w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface User {
  id: string;
  username: string;
  email: string;
  created_at?: string;
} 