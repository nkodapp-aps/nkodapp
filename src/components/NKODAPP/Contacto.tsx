import { useState } from "react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import { Mail, MessageCircle } from "lucide-react";
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

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Estos nombres deben ser EXACTAMENTE iguales a los que pusiste entre {{}} en EmailJS
    const templateParams = {
      user_name: data.nombre,
      user_email: data.email,
      user_phone: data.whatsapp,
      project_name: data.empresa,
      industry: data.industria,
      tech: data.tecnologia,
      platform: platforms.join(", "),
      message: data.descripcion,
      has_designs: hasDesign ? "Sí" : "No",
    };

    emailjs.send(
      'service_1nvfmgo', // Tu Service ID que vimos en la imagen
      'template_b34izbr',  // REEMPLAZA CON: El ID de tu plantilla (pestaña Email Templates)
      templateParams,
      'JbHWH2Xr0r9hQ8Uch'    // REEMPLAZA CON: Tu Public Key (pestaña Account)
    )
    .then(() => {
      toast.success("¡Solicitud enviada! Nos pondremos en contacto pronto.");
      (e.target as HTMLFormElement).reset(); // Limpia el formulario
      setPlatforms(["Ambas"]);
      setHasDesign(false);
    })
    .catch((error) => {
      console.error("Error EmailJS:", error);
      toast.error("Hubo un error al enviar. Por favor, intenta de nuevo.");
    })
    .finally(() => {
      setSubmitting(false);
    });
  };
  const badge = {
    available: { label: "Aceptando proyectos", color: "bg-[#6ca925]" },
    waiting: { label: "Lista de espera", color: "bg-warning" },
    unavailable: { label: "No disponible", color: "bg-foreground-dim" },
  }[company.disponibilidad];

  return (
    <section id="contacto" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-[#6ca925]/5 blur-3xl" />
      
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
              <Field label="WhatsApp" name="whatsapp" required placeholder="+57 ..." />
              <Field label="Empresa / proyecto" name="empresa" required />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Industria</Label>
                <Select name="industria" defaultValue="Otro">
                  <SelectTrigger className="bg-surface-3 border-border focus:ring-[#6ca925]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["Fintech","Salud","E-commerce","Educación","Logística","Servicios","Otro"].map(i => (
                      <SelectItem key={i} value={i}>{i}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tecnología preferida</Label>
                <Select name="tecnologia" defaultValue="No sé">
                  <SelectTrigger className="bg-surface-3 border-border focus:ring-[#6ca925]"><SelectValue /></SelectTrigger>
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
                    key={p}
                    type="button"
                    onClick={() => togglePlatform(p)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-all",
                      platforms.includes(p)
                        ? "border-transparent bg-[#6ca925] text-black font-bold"
                        : "border-border bg-surface-3 text-foreground-muted hover:border-[#6ca925]/50"
                    )}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Descripción del proyecto</Label>
              <Textarea
                name="descripcion"
                required
                rows={4}
                placeholder="Cuéntanos qué hace tu app y quién la usará"
                className="bg-surface-3 border-border focus-visible:ring-[#6ca925]"
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-3 px-4 py-3">
              <Label htmlFor="design">¿Tienes diseños previos?</Label>
              <Switch 
                id="design" 
                checked={hasDesign} 
                onCheckedChange={setHasDesign}
                className="data-[state=checked]:bg-[#6ca925]"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-[#6ca925] text-black hover:bg-[#5a8d1f] font-bold h-12 rounded-xl" 
              disabled={submitting}
            >
              {submitting ? "Procesando..." : "Enviar solicitud"}
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

            {/* WHATSAPP ACTUALIZADO */}
            <ContactCard
              icon={MessageCircle}
              title="WhatsApp"
              value="Chat directo"
              href="https://wa.me/573005514200" 
            />
            
            {/* EMAIL ACTUALIZADO */}
            <ContactCard 
              icon={Mail} 
              title="Email" 
              value="nkodapp@gmail.com" 
              href="mailto:nkodapp@gmail.com" 
            />
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
      <Input 
        {...rest} 
        className="bg-surface-3 border-border focus-visible:ring-[#6ca925]" 
      />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-4 rounded-2xl border border-border bg-surface-3 p-5 transition-all hover:border-[#6ca925]/50 hover:-translate-y-0.5"
    >
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#6ca925]/10 text-[#6ca925]">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <div className="text-xs uppercase tracking-wide text-[#6ca925] font-bold">{title}</div>
        <div className="font-medium text-white">{value}</div>
      </div>
    </a>
  );
}