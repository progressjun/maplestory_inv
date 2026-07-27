import { useMemo } from "react";
import { Heart, Petal, Star, Cloud } from "./Scenery";
import { useReducedMotion } from "../hooks/useReducedMotion";

type Kind = "heart" | "petal" | "star";

/** 화면에 부드럽게 떠다니는 장식 파티클 (하트/꽃잎/별). */
export function FloatingParticles({
  kind = "petal",
  count = 10,
  className,
}: {
  kind?: Kind;
  count?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.round((i * 97 + 13) % 100),
        delay: (i * 1.7) % 8,
        dur: 7 + ((i * 3) % 6),
        size: 12 + ((i * 5) % 12),
        hue: i % 3,
      })),
    [count]
  );

  if (reduced) return null;

  const colors =
    kind === "heart"
      ? ["#ff9dc0", "#ffb27a", "#ef6ba0"]
      : kind === "star"
        ? ["#ffe89b", "#fff3a8", "#ffd94d"]
        : ["#ffd0e0", "#e7d6ff", "#fff"];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      {items.map((p) => {
        const style = {
          left: `${p.left}%`,
          width: p.size,
          height: p.size,
          animationDuration: `${p.dur}s`,
          animationDelay: `${p.delay}s`,
        } as React.CSSProperties;
        const color = colors[p.hue];
        return (
          <div key={p.id} className="absolute -top-6 animate-fall" style={style}>
            {kind === "heart" ? (
              <Heart color={color} className="h-full w-full opacity-80" />
            ) : kind === "star" ? (
              <Star color={color} className="h-full w-full opacity-80" />
            ) : (
              <Petal color={color} className="h-full w-full opacity-80" />
            )}
          </div>
        );
      })}
    </div>
  );
}

/** 반짝이는 별들 (제자리 트윙클) */
export function TwinkleStars({ count = 8, className }: { count?: number; className?: string }) {
  const reduced = useReducedMotion();
  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: (i * 53 + 7) % 100,
        top: (i * 31 + 5) % 70,
        delay: (i * 0.6) % 3,
        size: 10 + ((i * 4) % 10),
      })),
    [count]
  );
  return (
    <div className={`pointer-events-none absolute inset-0 ${className ?? ""}`} aria-hidden>
      {items.map((s) => (
        <div
          key={s.id}
          className="absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        >
          <Star className={reduced ? "h-full w-full" : "h-full w-full animate-twinkle"} />
        </div>
      ))}
    </div>
  );
}

/** 천천히 흐르는 구름 */
export function DriftingClouds({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const rows = [
    { top: "6%", scale: 1, dur: 42, delay: 0, opacity: 0.95 },
    { top: "16%", scale: 0.7, dur: 55, delay: 6, opacity: 0.8 },
    { top: "28%", scale: 0.9, dur: 48, delay: 12, opacity: 0.7 },
  ];
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      {rows.map((r, i) => (
        <div
          key={i}
          className={reduced ? "absolute left-[10%]" : "absolute animate-drift"}
          style={{
            top: r.top,
            width: 120 * r.scale,
            opacity: r.opacity,
            animationDuration: `${r.dur}s`,
            animationDelay: `${r.delay}s`,
          }}
        >
          <Cloud className="h-auto w-full" />
        </div>
      ))}
    </div>
  );
}
