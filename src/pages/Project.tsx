import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { Header } from "@/components/NKODAPP/Header";
import { Footer } from "@/components/NKODAPP/Footer";
import { PhoneFrame } from "@/components/NKODAPP/PhoneFrame";
import { Reveal } from "@/components/NKODAPP/Reveal";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/lib/store";

export default function ProjectPage() {
  const { slug } = useParams();
  const [projects] = useProjects();
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<string | null>(null);

  // Buscamos el proyecto por slug
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container pt-40 pb-20 text-center">
          <h1 className="font-display text-4xl text-white">Proyecto no encontrado</h1>
          <Button className="mt-6" variant="hero" onClick={() => navigate("/")}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <Header />

      <section className="relative overflow-hidden bg-gradient-hero pt-32 pb-16">
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div className="container relative">
          <Link to="/#proyectos" className="inline-flex items-center gap-2 text-sm text-foreground-muted hover:text-white transition-colors">
            <ArrowLeft className="h-4 w-4" /> Volver a proyectos
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h1 className="font-display text-6xl font-bold leading-tight sm:text-7xl lg:text-8xl capitalize">
                {project.nombre}
              </h1>
              
              {/* SECCIÓN ACTUALIZADA: PLATAFORMA Y AÑO (MÁS GRANDES Y VERDES) */}
              <div className="mt-12 flex flex-col gap-10">
                <div className="flex flex-col gap-3">
                  <div className="font-mono text-sm uppercase tracking-[0.2em] text-[#6ca925] font-bold">
                    Plataforma
                  </div>
                  <div className="text-3xl md:text-5xl font-semibold text-white">
                    {project.plataformas?.map(p => p === "ios" ? "iOS" : "Android").join(" + ") || "Android + iOS"}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="font-mono text-sm uppercase tracking-[0.2em] text-[#6ca925] font-bold">
                    Año
                  </div>
                  <div className="text-3xl md:text-5xl font-semibold text-white">
                    {project.anio || '2026'}
                  </div>
                </div>
              </div>
            </div>

            {/* Visualización de Teléfonos Principal */}
            <div className="relative flex h-[500px] items-center justify-center">
              <div className="absolute inset-0 bg-gradient-brand opacity-20 blur-3xl" />
              {project.plataformas?.includes("android") && (
                <div className="absolute -left-4 bottom-0 -rotate-6" style={{ animation: "float-y 7s ease-in-out infinite" }}>
                  <PhoneFrame src={project.screenshot_principal} variant="android" className="w-48" />
                </div>
              )}
              <div className="relative z-10" style={{ animation: "float-y 6s ease-in-out infinite", animationDelay: "0.5s" }}>
                <PhoneFrame src={project.screenshot_principal} variant="ios" className="w-64" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIONES DE TEXTO OPCIONALES */}
      {(project.reto || project.solucion) && (
        <section className="py-16">
          <div className="container grid gap-12 lg:grid-cols-2 border-t border-white/5 pt-16">
            {project.reto && (
              <Reveal>
                <Block kicker="El reto" title="El problema" body={project.reto} />
              </Reveal>
            )}
            {project.solucion && (
              <Reveal delay={100}>
                <Block kicker="La solución" title="Lo que construimos" body={project.solucion} />
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* GALERÍA UX (CON ESTILO NKODAPP) */}
      {project.galeria && Array.isArray(project.galeria) && project.galeria.length > 0 && (
        <section className="py-24 overflow-hidden bg-surface-1/30">
          <div className="container">
            <Reveal>
              <h2 className="font-display text-4xl font-bold mb-12 text-white">Experiencia de Usuario (UX)</h2>
            </Reveal>
            
            <div className="flex gap-8 overflow-x-auto pb-10 px-4 snap-x no-scrollbar">
              {project.galeria.map((src, i) => (
                <Reveal key={i} delay={i * 60} className="flex-shrink-0 snap-center">
                  <button
                    onClick={() => setLightbox(src)}
                    className="group relative flex justify-center rounded-[3rem] border border-white/10 bg-surface-2 p-4 transition-all hover:-translate-y-3 hover:border-[#6ca925]/50 hover:shadow-[0_25px_50px_rgba(108,169,37,0.2)]"
                  >
                    <PhoneFrame src={src} variant="ios" className="h-[550px] w-auto" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#6ca925]/10 rounded-[3rem]">
                      <span className="bg-[#6ca925] text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl">
                        Ampliar pantalla
                      </span>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* LIGHTBOX DE IMAGEN */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-6 backdrop-blur-sm" onClick={() => setLightbox(null)}>
          <button className="absolute right-8 top-8 text-white hover:text-[#6ca925] transition-colors">
            <X className="h-10 w-10" />
          </button>
          <div className="relative animate-in zoom-in-95 duration-300">
             <PhoneFrame src={lightbox} variant="ios" className="max-h-[85vh] w-auto" />
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponentes para mantener el orden
function Block({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div>
      <div className="font-mono text-xs uppercase tracking-wider text-[#6ca925] font-bold">{kicker}</div>
      <h2 className="mt-2 font-display text-3xl font-bold text-white">{title}</h2>
      <p className="mt-4 leading-relaxed text-foreground-muted text-lg">{body}</p>
    </div>
  );
}