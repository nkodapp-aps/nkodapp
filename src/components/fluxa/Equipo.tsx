import { Linkedin } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Especialidades";
import { useTeam } from "@/lib/store";

export function Equipo() {
  const [team] = useTeam();
  const sorted = [...team].sort((a, b) => a.orden - b.orden);

  return (
    <section id="equipo" className="py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            kicker="Equipo"
            title="Las personas detrás de Fluxa"
            sub="Un equipo pequeño, enfocado y obsesionado con las apps."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {sorted.map((m, i) => (
            <Reveal key={m.id} delay={i * 60}>
              <div className="group rounded-2xl border border-border bg-gradient-card p-6 text-center transition-all hover:-translate-y-1 hover:border-border-strong hover:shadow-card">
                <div className="relative mx-auto h-24 w-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-0 blur-xl transition-opacity group-hover:opacity-60" />
                  <img
                    src={m.foto_url}
                    alt={m.nombre}
                    loading="lazy"
                    className="relative h-24 w-24 rounded-full border-2 border-border-strong object-cover"
                  />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">{m.nombre}</h3>
                <p className="mt-1 text-xs font-medium text-accent">{m.rol}</p>
                <p className="mt-2 text-xs text-foreground-muted">{m.especialidad}</p>
                {m.linkedin_url && (
                  <a
                    href={m.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-3 text-foreground-muted hover:border-primary hover:text-foreground"
                    aria-label={`LinkedIn de ${m.nombre}`}
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}