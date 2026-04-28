import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Apple, Smartphone, ExternalLink, Github, X } from "lucide-react";
import { Header } from "@/components/fluxa/Header";
import { Footer } from "@/components/fluxa/Footer";
import { PhoneFrame } from "@/components/fluxa/PhoneFrame";
import { Reveal } from "@/components/fluxa/Reveal";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/lib/store";
import { TECH_LABEL } from "@/lib/types";

export default function ProjectPage() {
  const { slug } = useParams();
  const [projects] = useProjects();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug && p.estado === "published");
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container pt-40 pb-20 text-center">
          <h1 className="font-display text-4xl">Proyecto no encontrado</h1>
          <Button className="mt-6" variant="hero" onClick={() => navigate("/")}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  const related = projects
    .filter((p) => p.estado === "published" && p.id !== project.id &&
      (p.tecnologia === project.tecnologia || p.industria === project.industria))
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-16">
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div className="container relative">
          <Link to="/#proyectos" className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Volver a proyectos
          </Link>
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-accent">{project.industria}</div>
              <h1 className="mt-3 font-display text-5xl font-bold leading-tight sm:text-6xl">
                {project.nombre}
              </h1>
              <p className="mt-4 text-lg text-foreground-muted">{project.descripcion_corta}</p>
              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Meta label="Plataforma" value={project.plataformas.map(p => p === "ios" ? "iOS" : "Android").join(" + ")} />
                <Meta label="Tecnología" value={TECH_LABEL[project.tecnologia]} />
                <Meta label="Industria" value={project.industria} />
                <Meta label="Duración" value={project.duracion} />
                <Meta label="Año" value={String(project.anio)} />
                <Meta label="Rol Fluxa" value={project.rol_fluxa} />
              </div>
            </div>
            <div className="relative flex h-[460px] items-center justify-center">
              <div className="absolute inset-0 bg-gradient-brand opacity-20 blur-3xl" />
              {project.plataformas.includes("android") && (
                <div className="absolute -left-2 bottom-0 -rotate-6" style={{ animation: "float-y 7s ease-in-out infinite" }}>
                  <PhoneFrame src={project.screenshot_principal} variant="android" className="w-44" />
                </div>
              )}
              <div className="relative z-10" style={{ animation: "float-y 6s ease-in-out infinite", animationDelay: "0.5s" }}>
                <PhoneFrame src={project.screenshot_principal} variant="ios" className="w-60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container grid gap-12 lg:grid-cols-2">
          <Reveal>
            <Block kicker="El reto" title="El problema" body={project.reto} />
          </Reveal>
          <Reveal delay={100}>
            <Block kicker="La solución" title="Lo que construimos" body={project.solucion} />
          </Reveal>
        </div>
      </section>

      <section className="bg-surface-1 py-16">
        <div className="container">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">Stack del proyecto</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="rounded-md border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">{s}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {project.galeria.length > 0 && (
        <section className="py-16">
          <div className="container">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">Galería</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {project.galeria.map((src, i) => (
                <Reveal key={i} delay={i * 60}>
                  <button
                    onClick={() => setLightbox(src)}
                    className="group flex w-full justify-center rounded-2xl border border-border bg-surface-2 p-4 transition-all hover:-translate-y-1 hover:border-border-strong hover:shadow-card"
                  >
                    <PhoneFrame src={src} variant="ios" className="max-h-[340px] w-auto" />
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.metricas.length > 0 && (
        <section className="bg-surface-1 py-16">
          <div className="container">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">Resultados</h2>
            </Reveal>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
              {project.metricas.map((m) => (
                <div key={m.label} className="bg-surface-2 p-8 text-center">
                  <div className="font-display text-4xl font-bold text-gradient-brand">{m.valor}</div>
                  <div className="mt-2 text-xs uppercase tracking-wider text-foreground-dim">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.apis.length > 0 && (
        <section className="py-16">
          <div className="container">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">Integraciones de API</h2>
            </Reveal>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {project.apis.map((a, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div className="rounded-2xl border border-border bg-gradient-card p-5">
                    <div className="flex items-start gap-4">
                      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/15 font-display font-bold text-accent">
                        {a.nombre.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{a.nombre}</div>
                        <div className="text-sm text-foreground-muted">{a.descripcion}</div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {(project.url_play || project.url_store || project.url_github) && (
        <section className="bg-surface-1 py-16">
          <div className="container flex flex-wrap items-center justify-center gap-3">
            {project.url_store && (
              <Button asChild variant="hero" size="xl">
                <a href={project.url_store} target="_blank" rel="noreferrer">
                  <Apple className="h-4 w-4" /> Ver en App Store
                </a>
              </Button>
            )}
            {project.url_play && (
              <Button asChild variant="cyan" size="xl">
                <a href={project.url_play} target="_blank" rel="noreferrer">
                  <Smartphone className="h-4 w-4" /> Ver en Google Play
                </a>
              </Button>
            )}
            {project.url_github && (
              <Button asChild variant="outline" size="xl">
                <a href={project.url_github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" /> Ver código
                </a>
              </Button>
            )}
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="container">
          <div className="rounded-3xl border border-border bg-gradient-card p-10 text-center shadow-card">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">¿Necesitas algo similar?</h2>
            <p className="mt-3 text-foreground-muted">Construyamos juntos tu próxima app móvil.</p>
            <Button asChild variant="hero" size="xl" className="mt-6">
              <Link to="/#contacto">Cuéntanos tu proyecto <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-surface-1 py-16">
          <div className="container">
            <h2 className="font-display text-2xl font-semibold">Proyectos relacionados</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <Link key={p.id} to={`/proyecto/${p.slug}`} className="group flex items-center gap-5 rounded-2xl border border-border bg-gradient-card p-5 transition-all hover:-translate-y-1 hover:border-border-strong">
                  <PhoneFrame src={p.screenshot_principal} variant="ios" className="w-20 shrink-0" />
                  <div className="flex-1">
                    <div className="text-xs font-mono uppercase tracking-wider text-foreground-dim">{p.industria}</div>
                    <div className="mt-1 font-display text-lg font-semibold">{p.nombre}</div>
                    <div className="mt-1 text-sm text-foreground-muted">{TECH_LABEL[p.tecnologia]}</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-foreground-muted transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {lightbox && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-6 backdrop-blur" onClick={() => setLightbox(null)}>
          <button className="absolute right-6 top-6 text-foreground" aria-label="Cerrar">
            <X className="h-6 w-6" />
          </button>
          <PhoneFrame src={lightbox} variant="ios" className="max-h-[80vh] w-auto" />
        </div>
      )}
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-wider text-foreground-dim">{label}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}

function Block({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-wider text-accent">{kicker}</div>
      <h2 className="mt-2 font-display text-3xl font-bold">{title}</h2>
      <p className="mt-4 leading-relaxed text-foreground-muted">{body}</p>
    </div>
  );
}