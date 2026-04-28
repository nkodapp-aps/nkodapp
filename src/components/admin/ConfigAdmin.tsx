import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useConfig } from "@/lib/store";
import { toast } from "sonner";

export function ConfigAdmin() {
  const [c, setC] = useConfig();
  return (
    <div>
      <h1 className="font-display text-2xl font-bold">Configuración</h1>
      <div className="mt-6 grid max-w-2xl gap-4 rounded-xl border border-border bg-surface-2 p-5">
        <Field label="Contraseña del Studio"><Input type="text" value={c.password} onChange={e => setC({ ...c, password: e.target.value })} /></Field>
        <p className="text-xs text-foreground-dim">⚠ Solo fricción básica. La contraseña se guarda en localStorage en texto plano.</p>
        <Field label="Nombre del sitio"><Input value={c.nombre_sitio} onChange={e => setC({ ...c, nombre_sitio: e.target.value })} /></Field>
        <Field label="Meta descripción SEO"><Textarea rows={3} value={c.meta_descripcion} onChange={e => setC({ ...c, meta_descripcion: e.target.value })} /></Field>
        <Button variant="hero" onClick={() => toast.success("Configuración guardada")}>Guardar</Button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="space-y-1"><Label className="text-xs uppercase tracking-wider text-foreground-dim">{label}</Label>{children}</div>;
}