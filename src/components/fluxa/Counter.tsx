import { useEffect, useRef, useState } from "react";

export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const numericMatch = value.match(/^(\d[\d,]*)(.*)$/);
    if (!numericMatch) {
      setDisplay(value);
      return;
    }
    const target = parseInt(numericMatch[1].replace(/,/g, ""), 10);
    const suffix = numericMatch[2];
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const dur = 1200;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          const n = Math.round(target * eased);
          setDisplay(n.toLocaleString() + suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.disconnect();
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return <span ref={ref}>{display}</span>;
}