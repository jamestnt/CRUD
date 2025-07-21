import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://rljxpjsylbtjelbxpbfb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsanhwanN5bGJ0amVsYnhwYmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwNDI4ODMsImV4cCI6MjA2ODYxODg4M30.agz-pXW9FDo7rFKPn_RfbrlB2bcIuPF5TcF0jxs3Ssw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
