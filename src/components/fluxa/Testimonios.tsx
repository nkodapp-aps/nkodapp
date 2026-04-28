import { Star, Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Especialidades";
import { useTestimonials } from "@/lib/store";

export function Testimonios() {
  const [items] = useTestimonials();
  const sorted = [...items].sort((a, b) => a.orden - b.orden);

  return (
    <section className="bg-surface-1 py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            kicker="Clientes"
            title="Lo que dicen de nosotros"
            sub="Founders y directores que confiaron en Fluxa para llevar su app a las tiendas."
          />
        </Reveal>
        <div className="mt-14 -mx-4 flex snap-x gap-6 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
          {sorted.map((t, i) => (
            <Reveal key={t.id} delay={i * 80} className="min-w-[85%] snap-center md:min-w-0">
              <div className="relative h-full rounded-2xl border border-border bg-gradient-card p-7">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/20" />
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mt-4 text-foreground">"{t.texto}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <img
                    src={t.foto_url}
                    alt={t.nombre}
                    loading="lazy"
                    className="h-11 w-11 rounded-full border border-border-strong object-cover"
                  />
                  <div>
                    <div className="font-semibold">{t.nombre}</div>
                    <div className="text-xs text-foreground-muted">
                      {t.empresa} · {t.industria}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}