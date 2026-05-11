import { cn } from "@/lib/utils";

interface Props {
  src?: string;
  alt?: string;
  variant?: "ios" | "android";
  className?: string;
}

export function PhoneFrame({ src, alt = "App screen", variant = "ios", className }: Props) {
  const isIOS = variant === "ios";

  // Si no hay src, mostramos el logo de NKODAPP como estado de carga
  if (!src) {
    return (
      <div className={cn("relative aspect-[9/19] w-full max-w-[260px] rounded-[2.4rem] border border-primary/20 bg-surface-3 shadow-card flex items-center justify-center", className)}>
        <img src="/logo-nkodapp.png" alt="Cargando..." className="w-12 opacity-50 animate-pulse" />
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
      <div 
        className="h-full w-full overflow-hidden rounded-[1.9rem] bg-background"
        style={{
          backgroundImage: 'url(/logo-nkodapp.png)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '40%',
          backgroundColor: '#0f0715'
        }}
      >
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-all duration-500"
          onLoad={(e) => {
            // Cuando carga, quitamos el fondo del logo para que no consuma recursos
            e.currentTarget.parentElement!.style.backgroundImage = 'none';
          }}
          onError={(e) => {
            console.error("Error al cargar imagen:", src);
            e.currentTarget.style.opacity = '0';
            // Si falla, dejamos el logo visible de fondo pero un poco más opaco
            e.currentTarget.parentElement!.style.opacity = '0.5';
          }}
        />
      </div>
      
      {/* Reflejo de cristal */}
      <div className="pointer-events-none absolute inset-0 rounded-[2.4rem] ring-1 ring-inset ring-white/10" />
    </div>
  );
}
