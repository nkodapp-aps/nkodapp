export type Tech = "flutter" | "flutterflow" | "apphive" | "react_native";
export type Platform = "android" | "ios";
export type Availability = "available" | "waiting" | "unavailable";

export interface ApiIntegration {
  nombre: string;
  descripcion: string;
}

export interface Metric {
  label: string;
  valor: string;
}

export interface Project {
  id: string;
  nombre: string;
  slug: string; // Asegúrate de que en Supabase la columna se llame exactamente así
  estado: "published" | "draft";
  destacado: boolean;
  tecnologia: Tech;
  plataformas: Platform[];
  industria: string;
  anio: number;
  cliente: string;
  duracion: string;
  rol_NKODAPP: string;
  descripcion_corta: string;
  reto: string;
  solucion: string;
  screenshot_principal: string;
  galeria: string[]; // Importante: en Supabase es tipo jsonb
  stack: string[];
  apis: ApiIntegration[];
  metricas: Metric[];
  url_play?: string;
  url_store?: string;
  url_github?: string;
  orden: number;
  created_at: string;
}

export interface TeamMember {
  id: string;
  nombre: string;
  rol: string;
  especialidad: string;
  foto_url: string;
  linkedin_url: string;
  orden: number;
}

export interface Testimonial {
  id: string;
  nombre: string;
  empresa: string;
  industria: string;
  foto_url: string;
  texto: string;
  rating: number;
  orden: number;
}

export interface CompanyProfile {
  nombre: string;
  tagline: string;
  subtitulo_hero: string;
  descripcion: string;
  stats_hero: Metric[];
  disponibilidad: Availability;
  disponibilidad_texto: string;
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  behance: string;
}

export interface AppConfig {
  password: string;
  nombre_sitio: string;
  meta_descripcion: string;
}

export const TECH_LABEL: Record<Tech, string> = {
  flutter: "Flutter",
  flutterflow: "FlutterFlow",
  apphive: "AppHive",
  react_native: "React Native",
};