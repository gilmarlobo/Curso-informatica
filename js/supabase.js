// js/supabase.js
const SUPABASE_URL = "https://xgixtmjvsmragjkrmvqe.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnaXh0bWp2c21yYWdqa3JtdnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMDI1MzEsImV4cCI6MjA4NDY3ODUzMX0.wUCedYSrfFEzkkhPFXvV0PxaItDjLJveI6N0vn3i0dQ";

// Importante: use 'window._supabase' para garantir que ela fique global
window._supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);