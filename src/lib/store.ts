import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import type { Project, TeamMember, Testimonial, CompanyProfile, AppConfig } from "./types";
import { SEED_PROJECTS, SEED_TEAM, SEED_TESTIMONIALS, SEED_COMPANY, SEED_CONFIG } from "@/data/seed";

// --- HOOK PROYECTOS ---
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>(SEED_PROJECTS);
  useEffect(() => {
    async function getProjects() {
      try {
        const { data, error } = await supabase.from("projects").select("*").eq("estado", "published");
        if (error) throw error;
        if (data && data.length > 0) {
          const cleanData = data.map(p => ({
            ...p,
            screenshot_principal: p.screenshot_principal ? encodeURI(p.screenshot_principal.trim()) : ""
          }));
          setProjects(cleanData as Project[]);
        }
      } catch (err) { console.error("Error Proyectos:", err); }
    }
    getProjects();
  }, []);
  return [projects, (d: Project[]) => setProjects(d)] as const;
};

// --- HOOK EQUIPO ---
export const useTeam = () => {
  const [team, setTeam] = useState<TeamMember[]>(SEED_TEAM);
  useEffect(() => {
    async function getTeam() {
      try {
        const { data, error } = await supabase.from("team").select("*").order('orden', { ascending: true });
        if (error) throw error;
        if (data && data.length > 0) setTeam(data as TeamMember[]);
      } catch (err) { console.error("Error Equipo:", err); }
    }
    getTeam();
  }, []);
  return [team, (d: TeamMember[]) => setTeam(d)] as const;
};

// --- HOOK TESTIMONIOS ---
export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(SEED_TESTIMONIALS);
  useEffect(() => {
    async function getTestimonials() {
      try {
        const { data, error } = await supabase.from("testimonials").select("*");
        if (error) throw error;
        if (data && data.length > 0) setTestimonials(data as Testimonial[]);
      } catch (err) { console.error("Error Testimonios:", err); }
    }
    getTestimonials();
  }, []);
  return [testimonials, (d: Testimonial[]) => setTestimonials(d)] as const;
};

export const useCompany = () => [SEED_COMPANY, () => {}] as const;
export const useConfig = () => [SEED_CONFIG, () => {}] as const;

export function slugify(i: string) { return i?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || ""; }
export function uid() { return Math.random().toString(36).slice(2, 10); }
export function resetDemo() { localStorage.clear(); window.location.reload(); }