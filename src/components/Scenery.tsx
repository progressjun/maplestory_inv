import { cx } from "../lib/utils";

/** 오리지널 판타지 마을 장식 요소 모음 (SVG). 모두 장식용 → aria-hidden. */

export function Cloud({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden focusable="false">
      <g fill="#ffffff">
        <ellipse cx="40" cy="38" rx="30" ry="20" />
        <ellipse cx="70" cy="34" rx="26" ry="22" />
        <ellipse cx="92" cy="42" rx="22" ry="16" />
        <ellipse cx="24" cy="44" rx="20" ry="14" />
      </g>
    </svg>
  );
}

export function Star({ className, color = "#ffe89b" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <path
        d="M12 2 l2.6 6.4 6.9 .5 -5.3 4.5 1.7 6.8 -5.9 -3.7 -5.9 3.7 1.7 -6.8 -5.3 -4.5 6.9 -.5z"
        fill={color}
        stroke="#f0c04a"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Heart({ className, color = "#ff9dc0" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden focusable="false">
      <path
        d="M12 21 C 3 14 3 6 8.5 6 C 11 6 12 8 12 8 C 12 8 13 6 15.5 6 C 21 6 21 14 12 21 Z"
        fill={color}
      />
    </svg>
  );
}

export function Petal({ className, color = "#ffd0e0" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} aria-hidden focusable="false">
      <path d="M10 2 C 4 6 4 14 10 18 C 16 14 16 6 10 2Z" fill={color} />
    </svg>
  );
}

export function Flower({ className, color = "#ff9dc0" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 30 34" className={className} aria-hidden focusable="false">
      <rect x="14" y="16" width="2.4" height="16" fill="#63b55a" />
      <path d="M8 20 q4 -2 6 0" stroke="#63b55a" strokeWidth="2" fill="none" />
      <g fill={color}>
        <circle cx="15" cy="8" r="5" />
        <circle cx="8" cy="13" r="5" />
        <circle cx="22" cy="13" r="5" />
        <circle cx="11" cy="20" r="5" />
        <circle cx="19" cy="20" r="5" />
      </g>
      <circle cx="15" cy="14" r="4" fill="#ffe89b" />
    </svg>
  );
}

export function Tree({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 80" className={className} aria-hidden focusable="false">
      <rect x="26" y="46" width="8" height="30" rx="3" fill="#a9743f" />
      <circle cx="30" cy="30" r="22" fill="#8fd67a" />
      <circle cx="16" cy="38" r="14" fill="#7bc866" />
      <circle cx="44" cy="38" r="14" fill="#7bc866" />
      <circle cx="24" cy="22" r="4" fill="#ffd0e0" />
      <circle cx="40" cy="26" r="4" fill="#fff3a8" />
      <circle cx="32" cy="16" r="4" fill="#d9c9ff" />
    </svg>
  );
}

export function Windmill({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 90 120" className={className} aria-hidden focusable="false">
      <rect x="34" y="50" width="22" height="66" fill="#ffe9c7" stroke="#c99a6b" strokeWidth="2" />
      <path d="M34 50 l11 -14 11 14z" fill="#ef6ba0" />
      <g className="origin-center motion-safe:animate-[spin_12s_linear_infinite]" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <g transform="translate(45,58)">
          <path d="M0 0 L0 -30 L7 -28 Z" fill="#b79bff" />
          <path d="M0 0 L30 0 L28 -7 Z" fill="#7cc0ff" />
          <path d="M0 0 L0 30 L-7 28 Z" fill="#ff9dc0" />
          <path d="M0 0 L-30 0 L-28 7 Z" fill="#8fd67a" />
          <circle r="4" fill="#fff3dd" stroke="#c99a6b" strokeWidth="1.5" />
        </g>
      </g>
    </svg>
  );
}

export function ClockTower({ className, time = "11:00" }: { className?: string; time?: string }) {
  return (
    <svg viewBox="0 0 80 150" className={className} aria-hidden focusable="false">
      <rect x="22" y="40" width="36" height="106" fill="#ffe9c7" stroke="#c99a6b" strokeWidth="2" />
      <path d="M18 40 l22 -26 22 26z" fill="#7cc0ff" stroke="#5a9fe0" strokeWidth="2" />
      <circle cx="40" cy="8" r="4" fill="#ffd94d" />
      <circle cx="40" cy="64" r="15" fill="#fff6e6" stroke="#8a5f3c" strokeWidth="2.5" />
      <line x1="40" y1="64" x2="40" y2="54" stroke="#5b4636" strokeWidth="2" strokeLinecap="round" />
      <line x1="40" y1="64" x2="47" y2="66" stroke="#5b4636" strokeWidth="2" strokeLinecap="round" />
      <text x="40" y="92" textAnchor="middle" fontSize="9" fontWeight="700" fill="#8a5f3c">
        {time}
      </text>
      <rect x="34" y="108" width="12" height="38" rx="6" fill="#c99a6b" />
    </svg>
  );
}

export function Castle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 130" className={className} aria-hidden focusable="false">
      {/* 뒤 탑 */}
      <rect x="16" y="46" width="26" height="80" fill="#ffe9c7" stroke="#c99a6b" strokeWidth="2" />
      <path d="M12 46 l17 -20 17 20z" fill="#b79bff" />
      <rect x="118" y="46" width="26" height="80" fill="#ffe9c7" stroke="#c99a6b" strokeWidth="2" />
      <path d="M114 46 l17 -20 17 20z" fill="#b79bff" />
      {/* 본관 */}
      <rect x="48" y="60" width="64" height="66" fill="#fff6e6" stroke="#c99a6b" strokeWidth="2" />
      <path d="M44 60 l36 -30 36 30z" fill="#ff9dc0" />
      <circle cx="80" cy="24" r="4" fill="#ffd94d" />
      {/* 창문/문 */}
      <rect x="70" y="92" width="20" height="34" rx="10" fill="#7cc0ff" stroke="#5a9fe0" strokeWidth="2" />
      <circle cx="62" cy="78" r="5" fill="#ffe89b" />
      <circle cx="98" cy="78" r="5" fill="#ffe89b" />
      <rect x="26" y="66" width="8" height="10" rx="2" fill="#7cc0ff" />
      <rect x="126" y="66" width="8" height="10" rx="2" fill="#7cc0ff" />
    </svg>
  );
}

export function Signpost({ text, className }: { text: string; className?: string }) {
  return (
    <div className={cx("relative inline-flex flex-col items-center", className)} aria-hidden>
      <div className="dialog !rounded-md border-maple-wooddark bg-maple-woodlight px-3 py-1.5">
        <span className="font-pixel text-[13px] font-bold text-maple-wooddark">{text}</span>
      </div>
      <div className="h-8 w-2.5 rounded-b bg-maple-wood" />
    </div>
  );
}

/** 나무 다리 (섹션 연결용) */
export function Bridge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 50" className={className} aria-hidden focusable="false" preserveAspectRatio="none">
      <path d="M0 30 Q100 5 200 30 L200 42 Q100 18 0 42Z" fill="#c99a6b" />
      <path d="M0 30 Q100 5 200 30" fill="none" stroke="#8a5f3c" strokeWidth="3" />
      {[20, 50, 80, 110, 140, 170].map((x, i) => (
        <line key={i} x1={x} y1={18} x2={x} y2={40} stroke="#8a5f3c" strokeWidth="3" />
      ))}
    </svg>
  );
}

/** 초록 언덕 바닥 (섹션 하단 장식) */
export function Hills({ className, front = "#8fd67a", back = "#7bc866" }: { className?: string; front?: string; back?: string }) {
  return (
    <svg viewBox="0 0 400 90" className={className} aria-hidden focusable="false" preserveAspectRatio="none">
      <path d="M0 40 Q80 0 160 30 Q260 60 400 20 L400 90 L0 90Z" fill={back} />
      <path d="M0 60 Q100 30 220 55 Q320 75 400 50 L400 90 L0 90Z" fill={front} />
    </svg>
  );
}
