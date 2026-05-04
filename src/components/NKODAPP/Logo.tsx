import { Link } from "react-router-dom";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl", // Aumenté un poco el texto para que acompañe al logo grande
    lg: "text-4xl",
  };

  const imageSizes = {
    sm: "h-8",
    md: "h-12", // Antes estaba en h-8, ahora es 50% más grande
    lg: "h-16",
  };

  return (
    <Link to="/" className="flex items-center gap-4 group">
      {/* Contenedor más amplio y con color de marca */}
      <div className="bg-[#093959] p-2 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
        <img
          src="/logo-nkodapp.png" 
          alt="Logo"
          className={`${imageSizes[size]} w-auto object-contain`}
        />
      </div>

      {/* Nombre de la marca */}
      <span className={`font-display font-bold tracking-tight text-white ${sizes[size]}`}>
        NKODAPP
      </span>
    </Link>
  );
}