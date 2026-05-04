import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCompany } from "@/lib/store";
import type { Availability } from "@/lib/types";
import { toast } from "sonner";

export function CompanyAdmin() {
  const [c, setC] = useCompany();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Empresa</h1>
      <p className="text-sm text-foreground-muted">Datos generales de NKODAPP.</p>
      <div className="mt-6 grid gap-4 rounded-xl border border-border bg-surface-2 p-5">
        <Field label="Tagline"><Input value={c.tagline} onChange={e => setC({ ...c, tagline: e.target.value })} /></Field>
        <Field label="Subtítulo del hero"><Textarea rows={2} value={c.subtitulo_hero} onChange={e => setC({ ...c, subtitulo_hero: e.target.value })} /></Field>
        <Field label="Descripción"><Textarea rows={3} value={c.descripcion} onChange={e => setC({ ...c, descripcion: e.target.value })} /></Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Disponibilidad">
            <Select value={c.disponibilidad} onValueChange={v => setC({ ...c, disponibilidad: v as Availability })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Aceptando proyectos</SelectItem>
                <SelectItem value="waiting">Lista de espera</SelectItem>
                <SelectItem value="unavailable">No disponible</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Texto de disponibilidad"><Input value={c.disponibilidad_texto} onChange={e => setC({ ...c, disponibilidad_texto: e.target.value })} /></Field>
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wider text-foreground-dim">Stats del hero (4)</Label>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {c.stats_hero.map((s, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <Input value={s.label} onChange={e => {
                  const next = [...c.stats_hero]; next[i] = { ...next[i], label: e.target.value }; setC({ ...c, stats_hero: next });
                }} />
                <Input value={s.valor} onChange={e => {
                  const next = [...c.stats_hero]; next[i] = { ...next[i], valor: e.target.value }; setC({ ...c, stats_hero: next });
                }} />
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Email"><Input value={c.email} onChange={e => setC({ ...c, email: e.target.value })} /></Field>
          <Field label="WhatsApp URL"><Input value={c.whatsapp} onChange={e => setC({ ...c, whatsapp: e.target.value })} /></Field>
          <Field label="LinkedIn"><Input value={c.linkedin} onChange={e => setC({ ...c, linkedin: e.target.value })} /></Field>
          <Field label="GitHub"><Input value={c.github} onChange={e => setC({ ...c, github: e.target.value })} /></Field>
        </div>
        <Button variant="hero" onClick={() => toast.success("Cambios guardados")}>Guardar</Button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1"><Label className="text-xs uppercase tracking-wider text-foreground-dim">{label}</Label>{children}</div>;
}