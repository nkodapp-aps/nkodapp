import { Logo } from "./Logo";
import { useCompany } from "@/lib/store";

const STACK = ["Flutter", "FlutterFlow", "AppHive", "React Native"];

export function Footer() {
  const [company] = useCompany();
  
  return (
    <footer className="border-t border-border bg-surface-1 py-14">
      <div className="container grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Logo />
          {/* Remplazamos {company.tagline} por el eslogan fijo */}
          <p className="mt-4 max-w-sm text-sm text-foreground-muted">
            Ideas que se convierten en activos digitales.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span key={s} className="rounded-md border border-border bg-surface-3 px-2 py-0.5 font-mono text-[11px] text-foreground-muted">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-foreground-dim">Navegación</div>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ["Proyectos", "#proyectos"],
              ["Especialidades", "#especialidades"],
              ["Proceso", "#proceso"],
              ["Contacto", "#contacto"],
            ].map(([l, h]) => (
              <li key={h}>
                <a href={h} className="text-foreground-muted hover:text-foreground">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* La sección de "Redes" ha sido eliminada de aquí */}
      </div>

      <div className="container mt-10 border-t border-border pt-6 text-center text-xs text-foreground-dim">
        © 2019 NKODAPP. Desarrollado con Flutter en el corazón.
      </div>
    </footer>
  );
}