import { useState } from "react";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useProjects, slugify, uid } from "@/lib/store";
import { TECH_LABEL, type Project, type Tech } from "@/lib/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const INDUSTRIES = ["Fintech", "Salud", "E-commerce", "Educación", "Logística", "Servicios", "Otro"];
const TECHS: Tech[] = ["flutter", "flutterflow", "apphive", "react_native"];

function emptyProject(): Project {
  return {
    id: uid(), nombre: "", slug: "", estado: "draft", destacado: false,
    tecnologia: "flutter", plataformas: ["android","ios"], industria: "Otro",
    anio: new Date().getFullYear(), cliente: "", duracion: "", rol_NKODAPP: "",
    descripcion_corta: "", reto: "", solucion: "",
    screenshot_principal: "", galeria: [], stack: [], apis: [], metricas: [],
    orden: 999, created_at: new Date().toISOString(),
  };
}

export function ProjectsAdmin() {
  const [projects, setProjects] = useProjects();
  const [editing, setEditing] = useState<Project | null>(null);
  const sorted = [...projects].sort((a,b) => a.orden - b.orden);

  const move = (id: string, dir: -1 | 1) => {
    setProjects((prev) => {
      const list = [...prev].sort((a,b) => a.orden - b.orden);
      const idx = list.findIndex(p => p.id === id);
      const swap = idx + dir;
      if (swap < 0 || swap >= list.length) return prev;
      [list[idx], list[swap]] = [list[swap], list[idx]];
      return list.map((p, i) => ({ ...p, orden: i + 1 }));
    });
  };

  const togglePublish = (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, estado: p.estado === "published" ? "draft" : "published" } : p));
  };
  const toggleFeatured = (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, destacado: !p.destacado } : p));
  };
  const remove = (id: string) => {
    if (!confirm("¿Eliminar este proyecto?")) return;
    setProjects(prev => prev.filter(p => p.id !== id));
    toast.success("Proyecto eliminado");
  };

  const save = (p: Project) => {
    const slug = p.slug || slugify(p.nombre);
    const next = { ...p, slug };
    setProjects(prev => prev.some(x => x.id === p.id)
      ? prev.map(x => x.id === p.id ? next : x)
      : [...prev, next]);
    toast.success("Proyecto guardado");
    setEditing(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold">Proyectos</h1>
          <p className="text-sm text-foreground-muted">{sorted.length} proyectos · {sorted.filter(p => p.estado === "published").length} publicados</p>
        </div>
        <Button variant="hero" onClick={() => setEditing(emptyProject())}>
          <Plus className="h-4 w-4" /> Nuevo proyecto
        </Button>
      </div>

      <div className="mt-6 space-y-2">
        {sorted.map((p) => (
          <div key={p.id} className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 p-3">
            <img src={p.screenshot_principal} alt="" className="h-14 w-14 rounded-lg object-cover bg-surface-3" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{p.nombre || "Sin nombre"}</span>
                {p.destacado && <Star className="h-3.5 w-3.5 fill-accent text-accent" />}
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-mono uppercase",
                  p.estado === "published" ? "bg-success/15 text-success" : "bg-warning/15 text-warning")}>
                  {p.estado === "published" ? "Publicado" : "Borrador"}
                </span>
              </div>
              <div className="text-xs text-foreground-muted truncate">
                {TECH_LABEL[p.tecnologia]} · {p.industria} · {p.duracion}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => move(p.id, -1)}><ArrowUp className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => move(p.id, 1)}><ArrowDown className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => toggleFeatured(p.id)} title="Destacar">
                <Star className={cn("h-4 w-4", p.destacado && "fill-accent text-accent")} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => togglePublish(p.id)} title="Publicar/Despublicar">
                {p.estado === "published" ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setEditing(p)}><Pencil className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => remove(p.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
            </div>
          </div>
        ))}
      </div>

      {editing && <ProjectEditor project={editing} onClose={() => setEditing(null)} onSave={save} />}
    </div>
  );
}

function ProjectEditor({ project, onClose, onSave }: { project: Project; onClose: () => void; onSave: (p: Project) => void; }) {
  const [p, setP] = useState<Project>(project);
  const set = <K extends keyof Project>(k: K, v: Project[K]) => setP(prev => ({ ...prev, [k]: v }));

  const togglePlatform = (plat: "android" | "ios") => {
    set("plataformas", p.plataformas.includes(plat) ? p.plataformas.filter(x => x !== plat) : [...p.plataformas, plat]);
  };

  const updateMetric = (i: number, key: "label" | "valor", v: string) => {
    const next = [...p.metricas]; next[i] = { ...next[i], [key]: v }; set("metricas", next);
  };
  const updateApi = (i: number, key: "nombre" | "descripcion", v: string) => {
    const next = [...p.apis]; next[i] = { ...next[i], [key]: v }; set("apis", next);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-surface-1 border-border">
        <DialogHeader><DialogTitle>Editar proyecto</DialogTitle></DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre"><Input value={p.nombre} onChange={e => { set("nombre", e.target.value); if (!p.slug) set("slug", slugify(e.target.value)); }} /></Field>
            <Field label="Slug"><Input value={p.slug} onChange={e => set("slug", slugify(e.target.value))} /></Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Tecnología">
              <Select value={p.tecnologia} onValueChange={v => set("tecnologia", v as Tech)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {TECHS.map(t => <SelectItem key={t} value={t}>{TECH_LABEL[t]}</SelectItem>)}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Industria">
              <Select value={p.industria} onValueChange={v => set("industria", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent>
              </Select>
            </Field>
            <Field label="Año"><Input type="number" value={p.anio} onChange={e => set("anio", parseInt(e.target.value) || 2025)} /></Field>
          </div>

          <Field label="Plataformas">
            <div className="flex gap-2">
              {(["android","ios"] as const).map(plat => (
                <button key={plat} type="button" onClick={() => togglePlatform(plat)}
                  className={cn("rounded-full border px-4 py-1.5 text-sm",
                    p.plataformas.includes(plat)
                      ? "border-transparent bg-gradient-brand text-background"
                      : "border-border bg-surface-3 text-foreground-muted")}>
                  {plat === "ios" ? "iOS" : "Android"}
                </button>
              ))}
            </div>
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Cliente"><Input value={p.cliente} onChange={e => set("cliente", e.target.value)} /></Field>
            <Field label="Duración"><Input value={p.duracion} onChange={e => set("duracion", e.target.value)} placeholder="8 semanas" /></Field>
            <Field label="Rol NKODAPP"><Input value={p.rol_NKODAPP} onChange={e => set("rol_NKODAPP", e.target.value)} /></Field>
          </div>

          <Field label="Descripción corta (max 120)"><Textarea rows={2} maxLength={120} value={p.descripcion_corta} onChange={e => set("descripcion_corta", e.target.value)} /></Field>
          <Field label="El reto"><Textarea rows={3} value={p.reto} onChange={e => set("reto", e.target.value)} /></Field>
          <Field label="La solución"><Textarea rows={3} value={p.solucion} onChange={e => set("solucion", e.target.value)} /></Field>

          <Field label="Screenshot principal (URL)">
            <Input value={p.screenshot_principal} onChange={e => set("screenshot_principal", e.target.value)} />
            {p.screenshot_principal && <img src={p.screenshot_principal} alt="" className="mt-2 h-32 rounded-lg object-cover" />}
          </Field>

          <Field label="Galería (una URL por línea, máx 8)">
            <Textarea rows={4} value={p.galeria.join("\n")} onChange={e => set("galeria", e.target.value.split("\n").filter(Boolean).slice(0, 8))} />
          </Field>

          <Field label="Stack (separado por comas)">
            <Input value={p.stack.join(", ")} onChange={e => set("stack", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} />
          </Field>

          <Field label="URLs (opcionales)">
            <div className="grid gap-2">
              <Input placeholder="Google Play URL" value={p.url_play || ""} onChange={e => set("url_play", e.target.value)} />
              <Input placeholder="App Store URL" value={p.url_store || ""} onChange={e => set("url_store", e.target.value)} />
              <Input placeholder="GitHub URL" value={p.url_github || ""} onChange={e => set("url_github", e.target.value)} />
            </div>
          </Field>

          <Field label="Métricas de impacto (max 3)">
            <div className="space-y-2">
              {[0,1,2].map(i => (
                <div key={i} className="grid grid-cols-2 gap-2">
                  <Input placeholder="Label" value={p.metricas[i]?.label || ""} onChange={e => {
                    const next = [...p.metricas]; next[i] = { label: e.target.value, valor: next[i]?.valor || "" }; set("metricas", next.filter(m => m.label || m.valor));
                  }} />
                  <Input placeholder="Valor" value={p.metricas[i]?.valor || ""} onChange={e => {
                    const next = [...p.metricas]; next[i] = { label: next[i]?.label || "", valor: e.target.value }; set("metricas", next.filter(m => m.label || m.valor));
                  }} />
                </div>
              ))}
            </div>
          </Field>

          <Field label="APIs integradas">
            <div className="space-y-2">
              {p.apis.map((_, i) => (
                <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2">
                  <Input placeholder="Nombre" value={p.apis[i].nombre} onChange={e => updateApi(i, "nombre", e.target.value)} />
                  <Input placeholder="Descripción" value={p.apis[i].descripcion} onChange={e => updateApi(i, "descripcion", e.target.value)} />
                  <Button variant="ghost" size="icon" onClick={() => set("apis", p.apis.filter((_, k) => k !== i))}><Trash2 className="h-4 w-4" /></Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => set("apis", [...p.apis, { nombre: "", descripcion: "" }])}>
                <Plus className="h-4 w-4" /> Agregar API
              </Button>
            </div>
          </Field>

          <div className="flex items-center justify-between rounded-xl border border-border bg-surface-3 p-3">
            <Label>Publicado</Label>
            <Switch checked={p.estado === "published"} onCheckedChange={v => set("estado", v ? "published" : "draft")} />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface-3 p-3">
            <Label>Destacado (ocupa 2 columnas)</Label>
            <Switch checked={p.destacado} onCheckedChange={v => set("destacado", v)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button variant="hero" onClick={() => onSave(p)}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-foreground-dim">{label}</Label>
      {children}
    </div>
  );
}