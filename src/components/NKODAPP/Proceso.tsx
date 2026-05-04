import { Compass, Palette, Code, Plug, Rocket } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./Especialidades";

const STEPS = [
  {
    icon: Compass,
    title: "Discovery",
    desc: "Entendemos tu negocio, usuarios y objetivo de la app.",
  },
  {
    icon: Palette,
    title: "Diseño UX/UI",
    desc: "Prototipo navegable antes de escribir una línea de código.",
  },
  {
    icon: Code,
    title: "Desarrollo",
    desc: "Flutter / FlutterFlow / AppHive según el proyecto. Sprints semanales.",
  },
  {
    icon: Plug,
    title: "Integración",
    desc: "Conectamos con tus APIs, bases de datos y servicios externos.",
  },
  {
    icon: Rocket,
    title: "Publicación",
    desc: "Google Play y App Store. Te entregamos las cuentas y el código.",
  },
];

export function Proceso() {
  return (
    <section id="proceso" className="py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            kicker="Proceso"
            title="Cómo llevamos tu idea a las tiendas"
            sub="Un proceso claro, predecible y transparente. Sin sorpresas."
          />
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent lg:left-1/2 lg:hidden" />
          <div className="hidden lg:block">
            <div className="absolute left-0 right-0 top-12 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>
          <div className="grid gap-10 lg:grid-cols-5">
            {STEPS.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="relative">
                  <div className="pointer-events-none absolute -top-6 left-0 font-display text-7xl font-bold text-[#6ca925]/10 lg:text-8xl">
                    0{i + 1}
                  </div>
                  <div className="relative">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#6ca925]/20 bg-surface-2 shadow-card">
                      <s.icon className="h-5 w-5 text-[#6ca925]" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal>
          <p className="mt-14 text-center font-mono text-sm text-foreground-dim">
            ⏱ De 4 a 12 semanas según la complejidad
          </p>
        </Reveal>
      </div>
    </section>
  );
}