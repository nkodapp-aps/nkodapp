import { cn } from "@/lib/utils";

interface Props {
  src: string;
  alt?: string;
  variant?: "ios" | "android";
  className?: string;
}

export function PhoneFrame({ src, alt = "App screen", variant = "ios", className }: Props) {
  const isIOS = variant === "ios";
  return (
    <div
      className={cn(
        "relative aspect-[9/19] w-full max-w-[260px] rounded-[2.4rem] border border-primary/30 bg-surface-2 p-2 shadow-card",
        className
      )}
    >
      {isIOS && (
        <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-background" />
      )}
      {!isIOS && (
        <div className="pointer-events-none absolute left-1/2 top-3 z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-foreground-dim" />
      )}
      <div className="h-full w-full overflow-hidden rounded-[1.9rem] bg-background">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="pointer-events-none absolute -inset-px rounded-[2.4rem] ring-1 ring-inset ring-white/5" />
    </div>
  );
}