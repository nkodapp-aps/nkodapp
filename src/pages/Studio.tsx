import { useEffect, useState } from "react";
import {
  Smartphone,
  Users,
  Building2,
  MessageSquare,
  Settings,
  LogOut,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/fluxa/Logo";
import { useConfig, resetDemo } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ProjectsAdmin } from "@/components/admin/ProjectsAdmin";
import { TeamAdmin } from "@/components/admin/TeamAdmin";
import { CompanyAdmin } from "@/components/admin/CompanyAdmin";
import { TestimonialsAdmin } from "@/components/admin/TestimonialsAdmin";
import { ConfigAdmin } from "@/components/admin/ConfigAdmin";
import { toast } from "sonner";

const SESSION_KEY = "fluxa.studio.session";

const TABS = [
  { id: "projects", label: "Proyectos", icon: Smartphone },
  { id: "team", label: "Equipo", icon: Users },
  { id: "company", label: "Empresa", icon: Building2 },
  { id: "testimonials", label: "Testimonios", icon: MessageSquare },
  { id: "config", label: "Configuración", icon: Settings },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function Studio() {
  const [config] = useConfig();
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState<TabId>("projects");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === "ok");
  }, []);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === config.password) {
      sessionStorage.setItem(SESSION_KEY, "ok");
      setAuthed(true);
      setPwd("");
    } else {
      toast.error("Contraseña incorrecta");
    }
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
          <form onSubmit={login} className="w-full max-w-sm rounded-2xl border border-border bg-gradient-card p-8 shadow-card">
            <div className="flex justify-center"><Logo size="lg" /></div>
            <p className="mt-3 text-center text-sm text-foreground-muted">Studio · Acceso restringido</p>
            <Input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Contraseña"
              className="mt-6 bg-surface-3 border-border"
              autoFocus
            />
            <Button type="submit" variant="hero" className="mt-4 w-full" size="lg">
              Entrar al Studio
            </Button>
            <p className="mt-4 text-center text-xs text-foreground-dim">
              Pista demo: <span className="font-mono">fluxa2025</span>
            </p>
          </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-surface-1">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                Studio
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => { resetDemo(); toast.success("Demo restaurado"); }}>
                <RotateCcw className="h-4 w-4" /> Reset demo
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" /> Salir
              </Button>
            </div>
          </div>
        </header>

        <div className="container grid gap-6 py-8 lg:grid-cols-[220px_1fr]">
          <aside className="space-y-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  tab === t.id
                    ? "bg-primary/15 text-foreground border border-primary/30"
                    : "text-foreground-muted hover:bg-surface-2 hover:text-foreground border border-transparent"
                )}
              >
                <t.icon className="h-4 w-4" /> {t.label}
              </button>
            ))}
          </aside>

          <main className="min-w-0">
            {tab === "projects" && <ProjectsAdmin />}
            {tab === "team" && <TeamAdmin />}
            {tab === "company" && <CompanyAdmin />}
            {tab === "testimonials" && <TestimonialsAdmin />}
            {tab === "config" && <ConfigAdmin />}
          </main>
        </div>
    </div>
  );
}