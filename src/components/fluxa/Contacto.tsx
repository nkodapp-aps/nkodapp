import { useState } from "react";
import { toast } from "sonner";
import { Mail, MessageCircle, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Especialidades";
import { useCompany } from "@/lib/store";
import { cn } from "@/lib/utils";

const PLATFORM_OPTS = ["Android", "iOS", "Ambas"] as const;

export function Contacto() {
  const [company] = useCompany();
  const [platforms, setPlatforms] = useState<string[]>(["Ambas"]);
  const [hasDesign, setHasDesign] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const togglePlatform = (p: string) => {
    setPlatforms((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      setPlatforms(["Ambas"]);
      setHasDesign(false);
      toast.success("¡Recibido! Te contactamos en menos de 48h.");
    }, 700);
  };

  const badge = {
    available: { label: "Aceptando proyectos", color: "bg-success" },
    waiting: { label: "Lista de espera", color: "bg-warning" },
    unavailable: { label: "No disponible", color: "bg-foreground-dim" },
  }[company.disponibilidad];

  return (
    <section id="contacto" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="container relative grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <SectionHeader
            kicker="Contacto"
            title="¿Tienes una idea para una app?"
            sub="Cuéntanos y te damos una propuesta en 48 horas."
          />
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-5 rounded-2xl border border-border bg-gradient-card p-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nombre completo" name="nombre" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="WhatsApp" name="whatsapp" required placeholder="+52 ..." />
              <Field label="Empresa / proyecto" name="empresa" required />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Industria</Label>
                <Select defaultValue="Otro">
                  <SelectTrigger className="bg-surface-3 border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Fintech","Salud","E-commerce","Educación","Logística","Servicios","Otro"].map(i => (
                      <SelectItem key={i} value={i}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tecnología preferida</Label>
                <Select defaultValue="No sé">
                  <SelectTrigger className="bg-surface-3 border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Flutter","FlutterFlow","AppHive","React Native","No sé, recomiéndenme"].map(i => (
                      <SelectItem key={i} value={i}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Plataforma deseada</Label>
              <div className="flex flex-wrap gap-2">
                {PLATFORM_OPTS.map((p) => (
                  <button
                    type="button"
                    key={p}
                    onClick={() => togglePlatform(p)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-all",
                      platforms.includes(p)
                        ? "border-transparent bg-gradient-brand text-background font-semibold"
                        : "border-border bg-surface-3 text-foreground-muted hover:text-foreground"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Presupuesto estimado</Label>
              <Select defaultValue="Por definir">
                <SelectTrigger className="bg-surface-3 border-border"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Menos de $50k MXN","$50k-$150k","$150k-$300k","Más de $300k","Por definir"].map(i => (
                    <SelectItem key={i} value={i}>{i}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Descripción del proyecto</Label>
              <Textarea
                required
                rows={4}
                placeholder="Cuéntanos qué hace tu app y quién la usará"
                className="bg-surface-3 border-border"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-3 px-4 py-3">
              <Label htmlFor="design">¿Tienes diseños previos?</Label>
              <Switch id="design" checked={hasDesign} onCheckedChange={setHasDesign} />
            </div>

            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar solicitud"}
            </Button>
          </form>
        </Reveal>

        <Reveal delay={120}>
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-gradient-card p-6">
              <div className="flex items-center gap-2">
                <span className={cn("h-2.5 w-2.5 rounded-full", badge.color)} />
                <span className="text-sm font-medium">{company.disponibilidad_texto || badge.label}</span>
              </div>
              <p className="mt-2 text-sm text-foreground-muted">
                Respondemos en menos de 48 horas hábiles.
              </p>
            </div>

            <ContactCard
              icon={MessageCircle}
              title="WhatsApp"
              value="Chat directo"
              href={company.whatsapp}
              accent
            />
            <ContactCard icon={Mail} title="Email" value={company.email} href={`mailto:${company.email}`} />
            <ContactCard icon={Linkedin} title="LinkedIn" value="@fluxa" href={company.linkedin} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  ...rest
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-2">
      <Label>{label}{rest.required && " *"}</Label>
      <Input {...rest} className="bg-surface-3 border-border" />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  href,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href: string;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        "flex items-center gap-4 rounded-2xl border p-5 transition-all hover:-translate-y-0.5",
        accent
          ? "border-accent/30 bg-accent/5 hover:border-accent hover:shadow-cyan"
          : "border-border bg-gradient-card hover:border-border-strong"
      )}
    >
      <span
        className={cn(
          "grid h-11 w-11 place-items-center rounded-xl",
          accent ? "bg-accent text-accent-foreground" : "bg-surface-3 text-accent"
        )}
      >
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wide text-foreground-dim">{title}</div>
        <div className="font-medium">{value}</div>
      </div>
    </a>
  );
}