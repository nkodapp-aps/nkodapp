import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTeam, uid } from "@/lib/store";
import type { TeamMember } from "@/lib/types";

export function TeamAdmin() {
  const [team, setTeam] = useTeam();
  const update = (id: string, patch: Partial<TeamMember>) =>
    setTeam(prev => prev.map(m => m.id === id ? { ...m, ...patch } : m));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Equipo</h1>
        <Button variant="hero" onClick={() => setTeam(prev => [...prev, {
          id: uid(), nombre: "Nuevo miembro", rol: "", especialidad: "",
          foto_url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
          linkedin_url: "", orden: prev.length + 1,
        }])}><Plus className="h-4 w-4" /> Agregar</Button>
      </div>
      <div className="mt-6 space-y-3">
        {team.sort((a,b) => a.orden - b.orden).map(m => (
          <div key={m.id} className="flex items-start gap-4 rounded-xl border border-border bg-surface-2 p-4">
            <img src={m.foto_url} alt="" className="h-16 w-16 rounded-full object-cover" />
            <div className="grid flex-1 gap-2 sm:grid-cols-2">
              <Field label="Nombre"><Input value={m.nombre} onChange={e => update(m.id, { nombre: e.target.value })} /></Field>
              <Field label="Rol"><Input value={m.rol} onChange={e => update(m.id, { rol: e.target.value })} /></Field>
              <Field label="Especialidad"><Input value={m.especialidad} onChange={e => update(m.id, { especialidad: e.target.value })} /></Field>
              <Field label="LinkedIn"><Input value={m.linkedin_url} onChange={e => update(m.id, { linkedin_url: e.target.value })} /></Field>
              <Field label="Foto URL"><Input value={m.foto_url} onChange={e => update(m.id, { foto_url: e.target.value })} /></Field>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setTeam(prev => prev.filter(x => x.id !== m.id))}>
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1"><Label className="text-[10px] uppercase tracking-wider text-foreground-dim">{label}</Label>{children}</div>;
}