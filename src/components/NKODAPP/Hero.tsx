import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PhoneFrame } from "./PhoneFrame";
import { Counter } from "./Counter";
import { Reveal } from "./Reveal";
import { useCompany, useProjects } from "@/lib/store";

const PLATFORMS = ["Flutter", "FlutterFlow", "AppHive", "React Native", "APIs REST"];

export function Hero() {
  const [company] = useCompany();
  const [projects] = useProjects();
  const featured = projects.filter((p) => p.estado === "published").slice(0, 3);

  const scrollTo = (sel: string) =>
    document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-hero pt-28 pb-20 lg:pb-32">
      <div className="absolute inset-0 grid-dots opacity-40" />
      <div className="absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="container relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-3 py-1 text-xs text-foreground-muted backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Especialistas en apps móviles · México y LATAM
          </div>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Construimos <span className="text-[#6ca925]">apps</span>
            <br />
            para Android e iOS.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-foreground-muted">
            {company.subtitulo_hero}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="hero" size="xl" onClick={() => scrollTo("#proyectos")}>
              Ver nuestros proyectos
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="outline" size="xl" onClick={() => scrollTo("#proceso")}>
              ¿Cómo trabajamos?
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {PLATFORMS.map((p) => (
              <span
                key={p}
                className="rounded-full border border-border bg-surface-2/60 px-3 py-1 font-mono text-xs text-foreground-muted"
              >
                {p}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative mx-auto flex h-[440px] w-full max-w-md items-end justify-center lg:h-[520px]">
            <div className="absolute -inset-10 bg-gradient-brand opacity-20 blur-3xl" />
            
            {/* CELULAR IZQUIERDA (Aumentamos la separación con -left-16) */}
            {featured[1] && (
              <div
                className="absolute -left-10 bottom-12 -rotate-[12deg] z-0 opacity-80"
                style={{ animation: "float-y 7s ease-in-out infinite" }}
              >
                <PhoneFrame
                  src={featured[1].screenshot_principal}
                  variant="android"
                  className="w-44 lg:w-52"
                />
              </div>
            )}

            {/* CELULAR DERECHA (Aumentamos la separación con -right-16) */}
            {featured[2] && (
              <div
                className="absolute -right-10 bottom-12 rotate-[12deg] z-0 opacity-80"
                style={{ animation: "float-y 8s ease-in-out infinite", animationDelay: "1s" }}
              >
                <PhoneFrame
                  src={featured[2].screenshot_principal}
                  variant="ios"
                  className="w-44 lg:w-52"
                />
              </div>
            )}

            {/* CELULAR CENTRAL (Mantiene el foco) */}
            {featured[0] && (
              <div
                className="relative z-10 scale-105"
                style={{ animation: "float-y 6s ease-in-out infinite", animationDelay: "0.5s" }}
              >
                <PhoneFrame
                  src={featured[0].screenshot_principal}
                  variant="ios"
                  className="w-56 lg:w-64"
                />
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <div className="container relative mt-16">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {company.stats_hero.map((s) => (
            <div key={s.label} className="bg-surface-2 p-6 text-center">
              <div className="font-display text-3xl font-bold bg-gradient-to-r from-[#498536] via-[#6ca925] to-[#fefffc] bg-clip-text text-transparent md:text-4xl">
                <Counter value={s.valor} />
              </div>
              <div className="mt-1 text-xs uppercase tracking-wide text-foreground-dim">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}