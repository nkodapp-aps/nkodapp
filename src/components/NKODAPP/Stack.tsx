import { Reveal } from "./Reveal";
import { SectionHeader } from "./Especialidades";

const GROUPS = [
  {
    title: "Desarrollo móvil",
    items: ["Flutter", "FlutterFlow", "AppHive", "React Native", "Dart", "JavaScript"],
  },
  {
    title: "Backend y APIs",
    items: ["Firebase", "Supabase", "Node.js", "REST APIs", "GraphQL", "WebSockets"],
  },
  {
    title: "Integraciones frecuentes",
    items: ["Stripe", "PayPal", "WhatsApp API", "Google Maps", "OneSignal", "Twilio", "Auth0"],
  },
  {
    title: "Herramientas",
    items: ["Figma", "Git", "GitHub", "VS Code", "Postman", "TestFlight", "Play Console"],
  },
];

export function Stack() {
  return (
    <section className="bg-surface-1 py-24 lg:py-32">
      <div className="container">
        <Reveal>
          <SectionHeader
            kicker="Stack"
            title="Nuestro arsenal técnico"
            sub="Las herramientas con las que construimos apps que funcionan."
          />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {GROUPS.map((g, i) => (
            <Reveal key={g.title} delay={i * 80}>
              <div className="rounded-2xl border border-border bg-gradient-card p-7">
                <h3 className="font-display text-lg font-semibold text-[#6ca925]">
                  {g.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-md border border-border bg-surface-3 px-2.5 py-1 font-mono text-xs text-foreground-muted transition-all hover:border-[#6ca925] hover:bg-[#6ca925]/10 hover:text-[#6ca925]"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}