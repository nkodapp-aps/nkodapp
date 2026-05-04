import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useCompany } from "@/lib/store";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Proceso", href: "#proceso" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [company] = useCompany();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const badge = {
    available: { label: "Disponible", color: "bg-success" },
    waiting: { label: "Lista de espera", color: "bg-warning" },
    unavailable: { label: "No disponible", color: "bg-foreground-dim" },
  }[company.disponibilidad];

  const goContact = () => {
    const el = document.querySelector("#contacto");
    el?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-border" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center" aria-label="Inicio">
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-foreground-muted transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <span className="flex items-center gap-2 rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-foreground-muted">
            <span className={cn("h-2 w-2 rounded-full", badge.color)} />
            {badge.label}
          </span>
          <Button variant="hero" onClick={goContact}>
            Cotizar mi app
          </Button>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm animate-slide-in-right bg-surface-2 p-6 shadow-glow">
            <div className="mb-8 flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Cerrar">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-foreground-muted hover:bg-surface-3 hover:text-foreground"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <Button variant="hero" className="mt-6 w-full" onClick={goContact}>
              Cotizar mi app
            </Button>
          </aside>
        </div>
      )}
    </header>
  );
}