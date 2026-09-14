"use client";

// Progressive enhancement: HTML server-render đã là giá trị cuối.
// Count-up chỉ chạy thêm một lần khi vào viewport và bị tắt khi prefers-reduced-motion.
import { useEffect, useRef, useState } from "react";

type Parsed = { prefix: string; suffix: string; separator: string; target: number };

function parseValue(value: string): Parsed | null {
  const match = value.match(/^(\D*)(\d[\d.,]*)(\D*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  const separator = digits.includes(".") ? "." : digits.includes(",") ? "," : "";
  const target = Number(digits.replace(/[.,]/g, ""));
  if (!Number.isFinite(target)) return null;
  return { prefix, suffix, separator, target };
}

function formatValue(current: number, parsed: Parsed) {
  const digits = parsed.separator ? current.toLocaleString("vi-VN").replace(/[.,]/g, parsed.separator) : String(current);
  return `${parsed.prefix}${digits}${parsed.suffix}`;
}

export function CountUpValue({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const parsed = parseValue(value);
    if (!parsed || parsed.target === 0) return;

    let frame = 0;
    let startedAt = 0;
    let started = false;
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (!entry?.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      const step = (now: number) => {
        if (!startedAt) startedAt = now;
        const progress = Math.min((now - startedAt) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(progress === 1 ? value : formatValue(Math.round(parsed.target * eased), parsed));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.4 });

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
