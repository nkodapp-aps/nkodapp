import { cn } from "@/lib/utils";

interface Props {
  src?: string; // Ahora es opcional para que no explote si no hay link
  alt?: string;
  variant?: "ios" | "android";
  className?: string;
}

export function PhoneFrame({ src, alt = "App screen", variant = "ios", className }: Props) {
  const isIOS = variant === "ios";

  // Si no hay src, mostramos un fondo oscuro para que no salga el icono roto
  if (!src) {
    return (
      <div className={cn("relative aspect-[9/19] w-full max-w-[260px] rounded-[2.4rem] border border-primary/20 bg-surface-3 shadow-card", className)}>
        <div className="flex h-full items-center justify-center text-[10px] text-foreground-dim">Cargando...</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-full max-w-[260px] rounded-[2.4rem] border border-primary/30 bg-surface-2 p-1.5 shadow-card transition-opacity",
        className
      )}
    >
      {/* Notch / Cámara según la variante */}
      {isIOS ? (
        <div className="pointer-events-none absolute left-1/2 top-2.5 z-10 h-4.5 w-20 -translate-x-1/2 rounded-full bg-slate-950" />
      ) : (
        <div className="pointer-events-none absolute left-1/2 top-3 z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-800" />
      )}

      {/* Contenedor de la Imagen */}
      <div className="h-full w-full overflow-hidden rounded-[1.9rem] bg-background">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-all duration-500"
          onError={(e) => {
            // Si la imagen falla (link de WhatsApp roto), ponemos un fondo neutro
            console.error("Error al cargar imagen:", src);
            e.currentTarget.style.opacity = '0';
            e.currentTarget.parentElement!.style.background = 'linear-gradient(to bottom, #1e293b, #0f172a)';
          }}
        />
      </div>
      
      {/* Reflejo de cristal para que se vea más real */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] ring-1 ring-inset ring-white/10" />
    </div>
  );
}