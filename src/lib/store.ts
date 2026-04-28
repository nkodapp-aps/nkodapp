import { useEffect, useState, useCallback } from "react";
import type {
  Project,
  TeamMember,
  Testimonial,
  CompanyProfile,
  AppConfig,
} from "./types";
import {
  SEED_PROJECTS,
  SEED_TEAM,
  SEED_TESTIMONIALS,
  SEED_COMPANY,
  SEED_CONFIG,
} from "@/data/seed";

const KEYS = {
  projects: "fluxa.projects",
  team: "fluxa.team",
  testimonials: "fluxa.testimonials",
  company: "fluxa.company",
  config: "fluxa.config",
} as const;

const EVT = "fluxa:store-change";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(EVT, { detail: { key } }));
}

export function resetDemo() {
  localStorage.setItem(KEYS.projects, JSON.stringify(SEED_PROJECTS));
  localStorage.setItem(KEYS.team, JSON.stringify(SEED_TEAM));
  localStorage.setItem(KEYS.testimonials, JSON.stringify(SEED_TESTIMONIALS));
  localStorage.setItem(KEYS.company, JSON.stringify(SEED_COMPANY));
  localStorage.setItem(KEYS.config, JSON.stringify(SEED_CONFIG));
  window.dispatchEvent(new CustomEvent(EVT, { detail: { key: "all" } }));
}

function useStored<T>(key: string, seed: T) {
  const [value, setValue] = useState<T>(() => read<T>(key, seed));

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || detail.key === key || detail.key === "all") {
        setValue(read<T>(key, seed));
      }
    };
    const storage = (e: StorageEvent) => {
      if (e.key === key) setValue(read<T>(key, seed));
    };
    window.addEventListener(EVT, handler);
    window.addEventListener("storage", storage);
    return () => {
      window.removeEventListener(EVT, handler);
      window.removeEventListener("storage", storage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        write(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return [value, update] as const;
}

export const useProjects = () => useStored<Project[]>(KEYS.projects, SEED_PROJECTS);
export const useTeam = () => useStored<TeamMember[]>(KEYS.team, SEED_TEAM);
export const useTestimonials = () =>
  useStored<Testimonial[]>(KEYS.testimonials, SEED_TESTIMONIALS);
export const useCompany = () =>
  useStored<CompanyProfile>(KEYS.company, SEED_COMPANY);
export const useConfig = () => useStored<AppConfig>(KEYS.config, SEED_CONFIG);

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}