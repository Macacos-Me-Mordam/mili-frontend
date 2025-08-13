"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;        
  duration?: number;    
  className?: string;
  startFrom?: number; 
  threshold?: number;   
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function AnimatedNumber({
  value,
  duration = 1500,
  className = "",
  startFrom = 0,
  threshold = 0.3, 
}: Props) {
  const m = value.trim().match(/^([+\-]?)(\d+(?:\.\d+)?)(%)?$/);
  const sign = m?.[1] ?? "";
  const num = m ? parseFloat(m[2]) : 0;
  const suffix = m?.[3] ?? "";
  const decimals = m?.[2].includes(".") ? m![2].split(".")[1].length : 0;
  const target = sign === "-" ? -num : num;

  const [startAnim, setStartAnim] = useState(false);
  const [display, setDisplay] = useState<number>(startFrom);
  const ref = useRef<HTMLSpanElement | null>(null);
  const raf = useRef<number | null>(null);
  
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartAnim(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  // Faz a contagem quando startAnim = true
  useEffect(() => {
    if (!startAnim) return;

    const start = performance.now();
    const from = startFrom;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(t);
      setDisplay(from + (target - from) * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [startAnim, target, duration, startFrom]);

  const formatted =
    (sign === "-" ? "" : sign) +
    display.toFixed(decimals) +
    suffix;

  return <span ref={ref} className={className}>{formatted}</span>;
}
