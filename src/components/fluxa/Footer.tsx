import { Github, Linkedin } from "lucide-react";
import { Logo } from "./Logo";
import { useCompany } from "@/lib/store";

const STACK = ["Flutter", "FlutterFlow", "AppHive", "React Native"];

export function Footer() {
  const [company] = useCompany();
  return (
    <footer className="border-t border-border bg-surface-1 py-14">
      <div className="container grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-foreground-muted">
            {company.tagline}
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
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-foreground-dim">Redes</div>
          <div className="mt-4 flex gap-3">
            {company.linkedin && (
              <a href={company.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface-3 text-foreground-muted hover:border-primary hover:text-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {company.github && (
              <a href={company.github} target="_blank" rel="noreferrer" aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-lg border border-border bg-surface-3 text-foreground-muted hover:border-primary hover:text-foreground">
                <Github className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="container mt-10 border-t border-border pt-6 text-center text-xs text-foreground-dim">
        © {new Date().getFullYear()} Fluxa. Desarrollado con Flutter en el corazón.
      </div>
    </footer>
  );
}