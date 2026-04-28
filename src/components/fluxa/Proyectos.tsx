import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Apple, Smartphone } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Especialidades";
import { PhoneFrame } from "./PhoneFrame";
import { useProjects } from "@/lib/store";
import { TECH_LABEL, type Tech } from "@/lib/types";
import { cn } from "@/lib/utils";

const FILTERS: { key: "all" | Tech; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "flutter", label: "Flutter" },
  { key: "flutterflow", label: "FlutterFlow" },
  { key: "apphive", label: "AppHive" },
  { key: "react_native", label: "React Native" },
];

export function Proyectos() {
  const [projects] = useProjects();
  const [filter, setFilter] = useState<"all" | Tech>("all");

  const list = useMemo(() => {
    return projects
      .filter((p) => p.estado === "published")
      .filter((p) => filter === "all" || p.tecnologia === filter)
      .sort((a, b) => a.orden - b.orden);
  }, [projects, filter]);

  return (
    <section id="proyectos" className="bg-surface-1 py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            kicker="Proyectos"
            title="Lo que hemos construido"
            sub="Apps reales, en tiendas reales, con usuarios reales."
          />
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-all",
                filter === f.key
                  ? "border-transparent bg-gradient-brand text-background font-semibold shadow-glow"
                  : "border-border bg-surface-2 text-foreground-muted hover:border-border-strong hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {list.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-border bg-surface-2 p-16 text-center text-foreground-muted">
            No hay proyectos publicados con este filtro.
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal
                key={p.id}
                delay={i * 50}
                className={cn(p.destacado && "lg:col-span-2")}
              >
                <Link
                  to={`/proyecto/${p.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-gradient-card transition-all hover:-translate-y-1 hover:border-border-strong hover:shadow-card"
                >
                  <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-surface-3 p-6">
                    <div className="absolute inset-0 bg-gradient-brand opacity-10" />
                    <PhoneFrame
                      src={p.screenshot_principal}
                      variant={p.plataformas.includes("ios") ? "ios" : "android"}
                      className="max-h-[260px] w-auto"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2">
                      {p.plataformas.includes("ios") && (
                        <Apple className="h-3.5 w-3.5 text-foreground-muted" />
                      )}
                      {p.plataformas.includes("android") && (
                        <Smartphone className="h-3.5 w-3.5 text-foreground-muted" />
                      )}
                      <span className="font-mono text-xs uppercase tracking-wider text-foreground-dim">
                        {p.industria}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-semibold">
                      {p.nombre}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-foreground-muted">
                      {p.descripcion_corta}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-5">
                      <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                        {TECH_LABEL[p.tecnologia]}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-foreground-muted transition-colors group-hover:text-foreground">
                        Ver caso
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}