"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "cn";
import type { Metric } from "@/content/types";

function Count({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;

    if (reduced) {
      el.textContent = String(metric.value);
      return;
    }

    const target = metric.value;
    const duration = 900;
    let start: number | null = null;
    let frame = 0;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      el.textContent = String(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, metric.value, reduced]);

  return <span ref={ref}>0</span>;
}

export function StatCounters({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <article
          key={metric.body}
          className={cn("border-t-2 border-white/18 pt-5")}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <div className="font-display text-[clamp(2.4rem,4vw,3.4rem)] leading-none font-extrabold text-white tabular-nums">
            <Count metric={metric} />
            {metric.suffix ? <span className="text-accent-pink">{metric.suffix}</span> : null}
          </div>
          <p className="mt-2.5 max-w-[26ch] text-[0.92rem] leading-relaxed text-[#AEB9CC]">
            {metric.body}
          </p>
        </article>
      ))}
    </div>
  );
}
