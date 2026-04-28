import { Zap } from "lucide-react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-3xl",
  };
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand shadow-glow">
        <Zap className="h-4 w-4 text-background" strokeWidth={2.5} />
      </span>
      <span className={`font-display font-bold tracking-tight ${sizes[size]}`}>
        Fluxa
      </span>
    </div>
  );
}