import { createClient } from '@supabase/supabase-js';

// Esto lee las llaves que pusiste en el archivo .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ Error: No se encontraron las credenciales de Supabase en el .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);