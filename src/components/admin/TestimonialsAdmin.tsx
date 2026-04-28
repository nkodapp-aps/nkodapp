import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTestimonials, uid } from "@/lib/store";
import type { Testimonial } from "@/lib/types";

export function TestimonialsAdmin() {
  const [items, setItems] = useTestimonials();
  const update = (id: string, patch: Partial<Testimonial>) =>
    setItems(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold">Testimonios</h1>
        <Button variant="hero" onClick={() => setItems(prev => [...prev, {
          id: uid(), nombre: "Nuevo cliente", empresa: "", industria: "",
          foto_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
          texto: "", rating: 5, orden: prev.length + 1,
        }])}><Plus className="h-4 w-4" /> Agregar</Button>
      </div>
      <div className="mt-6 space-y-3">
        {items.sort((a,b) => a.orden - b.orden).map(t => (
          <div key={t.id} className="rounded-xl border border-border bg-surface-2 p-4">
            <div className="flex items-start gap-3">
              <img src={t.foto_url} alt="" className="h-12 w-12 rounded-full object-cover" />
              <div className="grid flex-1 gap-2 sm:grid-cols-3">
                <Field label="Nombre"><Input value={t.nombre} onChange={e => update(t.id, { nombre: e.target.value })} /></Field>
                <Field label="Empresa"><Input value={t.empresa} onChange={e => update(t.id, { empresa: e.target.value })} /></Field>
                <Field label="Industria"><Input value={t.industria} onChange={e => update(t.id, { industria: e.target.value })} /></Field>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setItems(prev => prev.filter(x => x.id !== t.id))}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-[2fr_120px_120px]">
              <Field label="Texto"><Textarea rows={2} value={t.texto} onChange={e => update(t.id, { texto: e.target.value })} /></Field>
              <Field label="Rating (1-5)"><Input type="number" min={1} max={5} value={t.rating} onChange={e => update(t.id, { rating: Math.min(5, Math.max(1, parseInt(e.target.value) || 5)) })} /></Field>
              <Field label="Foto URL"><Input value={t.foto_url} onChange={e => update(t.id, { foto_url: e.target.value })} /></Field>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1"><Label className="text-[10px] uppercase tracking-wider text-foreground-dim">{label}</Label>{children}</div>;
}