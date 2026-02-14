import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Real-time sync will be disabled.');
}

export const supabase = createClient(
    supabaseUrl || 'https://umutyxmptkkbwqyplqjl.supabase.co',
    supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtdXR5eG1wdGtrYndxeXBscWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEwNjIwNjAsImV4cCI6MjA4NjYzODA2MH0.ZfB_VH9NvZmONA1KTFVEi7qbfZR8D97cXK6bWh_gTno'
);
