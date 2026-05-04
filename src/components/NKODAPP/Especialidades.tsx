import { Reveal } from "./Reveal";
import { Smartphone, Zap, Hexagon, Code2, Plug, Rocket } from "lucide-react";

const ITEMS = [
  {
    icon: Smartphone,
    title: "Flutter",
    desc: "Apps nativas de alto rendimiento para Android e iOS desde un solo código base.",
    color: "text-accent",
  },
  {
    icon: Zap,
    title: "FlutterFlow",
    desc: "Desarrollo visual acelerado. De idea a app funcional en semanas, no meses.",
    color: "text-primary-soft",
  },
  {
    icon: Hexagon,
    title: "AppHive",
    desc: "Apps no-code / low-code potentes para MVPs y validación de negocio rápida.",
    color: "text-accent-glow",
  },
  {
    icon: Code2,
    title: "React Native",
    desc: "Apps híbridas con ecosistema JavaScript para equipos con base web.",
    color: "text-primary-soft",
  },
  {
    icon: Plug,
    title: "Conexión de APIs",
    desc: "Integración con cualquier backend: REST, GraphQL, Firebase, Supabase, Stripe, WhatsApp.",
    color: "text-accent",
  },
  {
    icon: Rocket,
    title: "Publicación",
    desc: "Gestión completa en Google Play y App Store, incluyendo ASO básico.",
    color: "text-primary-soft",
  },
];

export function Especialidades() {
  return (
    <section id="especialidades" className="py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            kicker="Especialidades"
            title="En qué somos expertos"
            sub="Comvertimos las ideas en activos digitales."
          />
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it, i) => (
            <Reveal key={it.title} delay={i * 60}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-gradient-card p-7 transition-all hover:-translate-y-1 hover:border-border-strong hover:shadow-card">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#6ca925]/10 blur-2xl transition-all group-hover:bg-[#6ca925]/20" />
                <it.icon className={`relative h-9 w-9 text-[#6ca925] drop-shadow-[0_0_8px_rgba(108,169,37,0.3)]"`} 
                strokeWidth={1.6} />
                <h3 className="relative mt-5 font-display text-xl font-semibold text-foreground">
                  {it.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-foreground-muted">
                  {it.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="font-mono text-base font-semibold uppercase tracking-[0.2em] text-[#6ca925]">
        {kicker}
      </div>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-4 text-lg text-foreground-muted">{sub}</p>}
    </div>
  );
}