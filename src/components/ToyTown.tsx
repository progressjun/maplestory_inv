import { useMemo } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * 루디브리엄(하늘 위 장난감 마을) 감성의 오리지널 씬.
 * 실제 게임 애셋을 복제하지 않고, 장난감 블록 · 거대 시계탑 · 사탕색 하늘 ·
 * 구름 도시 · 곰인형 등 특징 요소를 벡터로 새로 그렸습니다.
 */
export function ToyTownScene({
  className,
  initials = ["♥", "★"],
}: {
  className?: string;
  initials?: [string, string];
}) {
  const reduced = useReducedMotion();
  const spin = (s: number) =>
    reduced ? undefined : ({ animation: `spin ${s}s linear infinite`, transformOrigin: "center", transformBox: "fill-box" } as React.CSSProperties);

  const stars = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        x: (i * 71 + 20) % 390,
        y: (i * 43 + 12) % 210,
        r: 1.4 + ((i * 7) % 3),
        d: (i * 0.5) % 3,
      })),
    []
  );

  return (
    <svg
      className={className}
      viewBox="0 0 390 640"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden
      focusable="false"
    >
      <defs>
        <linearGradient id="tt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c3b8ff" />
          <stop offset="0.45" stopColor="#dcc9ff" />
          <stop offset="0.75" stopColor="#ffd6ec" />
          <stop offset="1" stopColor="#ffe8d6" />
        </linearGradient>
        <linearGradient id="tt-tower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4fb" />
          <stop offset="1" stopColor="#ffe0ef" />
        </linearGradient>
        <linearGradient id="tt-candy" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ff9dc0" />
          <stop offset="1" stopColor="#b79bff" />
        </linearGradient>
      </defs>

      {/* 하늘 */}
      <rect width="390" height="640" fill="url(#tt-sky)" />

      {/* 별 */}
      {stars.map((s, i) => (
        <g key={i} style={reduced ? undefined : { animation: `tt-tw 2.6s ease-in-out ${s.d}s infinite` }}>
          <circle cx={s.x} cy={s.y} r={s.r} fill="#fff6c9" />
        </g>
      ))}

      {/* 깃발 장식(가랜드) */}
      <g>
        <path d="M6 34 Q195 66 384 34" fill="none" stroke="#b79bff" strokeWidth="2" />
        {Array.from({ length: 11 }).map((_, i) => {
          const x = 18 + i * 35;
          const y = 40 + Math.sin((i / 10) * Math.PI) * 14;
          const cols = ["#ff9dc0", "#ffd94d", "#7cc0ff", "#8fd67a", "#b79bff"];
          return <path key={i} d={`M${x} ${y} l8 0 l-4 9 z`} fill={cols[i % cols.length]} />;
        })}
      </g>

      {/* 풍선 */}
      <g style={reduced ? undefined : { animation: "tt-bob 4s ease-in-out infinite" }}>
        <line x1="40" y1="150" x2="40" y2="120" stroke="#c9a2d8" strokeWidth="1.5" />
        <ellipse cx="40" cy="110" rx="13" ry="16" fill="#ff9dc0" />
        <path d="M40 126 l-3 6 6 0 z" fill="#ff9dc0" />
      </g>
      <g style={reduced ? undefined : { animation: "tt-bob 5s ease-in-out 1s infinite" }}>
        <line x1="352" y1="140" x2="352" y2="112" stroke="#c9a2d8" strokeWidth="1.5" />
        <ellipse cx="352" cy="102" rx="12" ry="15" fill="#7cc0ff" />
        <path d="M352 117 l-3 6 6 0 z" fill="#7cc0ff" />
      </g>

      {/* 뒤 구름 */}
      <g fill="#ffffff" opacity="0.9">
        <ellipse cx="70" cy="180" rx="34" ry="18" />
        <ellipse cx="100" cy="176" rx="26" ry="16" />
        <ellipse cx="310" cy="200" rx="36" ry="18" />
        <ellipse cx="284" cy="196" rx="24" ry="15" />
      </g>

      {/* 왼쪽 장난감 성 */}
      <g>
        <rect x="18" y="300" width="70" height="120" rx="8" fill="#ffe0ef" stroke="#e79bc0" strokeWidth="2.5" />
        <rect x="30" y="270" width="16" height="40" fill="#cbe6ff" stroke="#8fb8e0" strokeWidth="2" />
        <path d="M28 270 l10 -16 10 16 z" fill="#b79bff" />
        <rect x="60" y="278" width="16" height="32" fill="#cbe6ff" stroke="#8fb8e0" strokeWidth="2" />
        <path d="M58 278 l10 -14 10 14 z" fill="#7cc0ff" />
        <circle cx="53" cy="340" r="10" fill="#ffd94d" stroke="#e0ac45" strokeWidth="2" />
        <rect x="44" y="368" width="18" height="52" rx="9" fill="#ff9dc0" />
      </g>

      {/* 오른쪽 장난감 성 */}
      <g>
        <rect x="300" y="316" width="72" height="104" rx="8" fill="#e7f6ff" stroke="#8fb8e0" strokeWidth="2.5" />
        <path d="M300 316 l36 -26 36 26 z" fill="#8fd67a" stroke="#63b55a" strokeWidth="2" />
        <circle cx="336" cy="292" r="4" fill="#ffd94d" />
        <rect x="326" y="372" width="20" height="48" rx="10" fill="#7cc0ff" />
        <circle cx="316" cy="346" r="7" fill="#ffe89b" />
        <circle cx="356" cy="346" r="7" fill="#ffe89b" />
      </g>

      {/* ★ 중앙 거대 시계탑 (루디브리엄 상징) ★ */}
      <g>
        {/* 몸통 (사탕 줄무늬) */}
        <rect x="150" y="150" width="90" height="300" rx="12" fill="url(#tt-tower)" stroke="#e79bc0" strokeWidth="3" />
        <g clipPath="url(#tt-clip)">
          <rect x="150" y="150" width="90" height="300" fill="none" />
        </g>
        <clipPath id="tt-clip">
          <rect x="150" y="150" width="90" height="300" rx="12" />
        </clipPath>
        {/* 줄무늬 */}
        <g clipPath="url(#tt-clip)" opacity="0.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x="150" y={150 + i * 34} width="90" height="16" fill="#ffd3e6" />
          ))}
        </g>
        {/* 지붕 */}
        <path d="M144 150 l51 -46 51 46 z" fill="url(#tt-candy)" stroke="#a67bd0" strokeWidth="3" />
        <circle cx="195" cy="96" r="8" fill="#ffd94d" stroke="#e0ac45" strokeWidth="2" />
        <path d="M195 88 l2.2 5 5 .4 -3.8 3.4 1.2 5 -4.6 -2.8 -4.6 2.8 1.2 -5 -3.8 -3.4 5 -.4z" fill="#fff6c9" />
        {/* 큰 시계 */}
        <circle cx="195" cy="212" r="34" fill="#fffdf7" stroke="#c99a6b" strokeWidth="4" />
        <circle cx="195" cy="212" r="34" fill="none" stroke="#ffd94d" strokeWidth="1.5" strokeDasharray="2 6" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <circle key={i} cx={195 + Math.sin(a) * 27} cy={212 - Math.cos(a) * 27} r="1.6" fill="#c99a6b" />
          );
        })}
        <line x1="195" y1="212" x2="195" y2="192" stroke="#5b4636" strokeWidth="3" strokeLinecap="round" />
        <line x1="195" y1="212" x2="211" y2="218" stroke="#5b4636" strokeWidth="3" strokeLinecap="round" />
        <circle cx="195" cy="212" r="3" fill="#ef6ba0" />
        {/* 톱니바퀴 */}
        <g style={spin(9)}>
          <Gear cx={168} cy={272} r={13} fill="#b79bff" />
        </g>
        <g style={spin(7)}>
          <Gear cx={222} cy={288} r={10} fill="#7cc0ff" />
        </g>
        {/* 창문 */}
        <rect x="176" y="320" width="38" height="30" rx="6" fill="#cbe6ff" stroke="#8fb8e0" strokeWidth="2" />
        <line x1="195" y1="320" x2="195" y2="350" stroke="#8fb8e0" strokeWidth="2" />
        <line x1="176" y1="335" x2="214" y2="335" stroke="#8fb8e0" strokeWidth="2" />
        {/* 문 */}
        <rect x="180" y="400" width="30" height="50" rx="15" fill="url(#tt-candy)" />
        <circle cx="203" cy="426" r="2.5" fill="#fff6c9" />
      </g>

      {/* 장난감 블록 플랫폼 (바닥) */}
      <ToyBlock x={96} y={430} s={40} color="#ff9dc0" label={initials[0]} />
      <ToyBlock x={136} y={430} s={40} color="#ffd94d" label="A" />
      <ToyBlock x={214} y={430} s={40} color="#7cc0ff" label="B" />
      <ToyBlock x={254} y={430} s={40} color="#8fd67a" label={initials[1]} />
      <ToyBlock x={116} y={390} s={38} color="#b79bff" label="♪" />
      <ToyBlock x={236} y={390} s={38} color="#ffab5e" label="♥" />

      {/* 앞 구름 바닥 (도시가 구름 위에 떠 있음) */}
      <g fill="#ffffff">
        <ellipse cx="60" cy="540" rx="80" ry="40" />
        <ellipse cx="180" cy="560" rx="120" ry="52" />
        <ellipse cx="330" cy="545" rx="90" ry="42" />
        <ellipse cx="250" cy="535" rx="70" ry="34" />
      </g>

      {/* 곰인형 (오리지널) — 앞 구름 위에 앉아 보이게 */}
      <g transform="translate(52,506)" style={reduced ? undefined : { animation: "tt-bob 3.4s ease-in-out infinite" }}>
        <Teddy />
      </g>

      <g fill="#f3ecff" opacity="0.9">
        <ellipse cx="120" cy="588" rx="120" ry="42" />
        <ellipse cx="300" cy="592" rx="120" ry="42" />
      </g>
    </svg>
  );
}

/** 톱니바퀴 */
function Gear({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const teeth = 8;
  const path = Array.from({ length: teeth })
    .map((_, i) => {
      const a = (i / teeth) * Math.PI * 2;
      const x = cx + Math.cos(a) * (r + 3);
      const y = cy + Math.sin(a) * (r + 3);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <g>
      <path d={`${path} Z`} fill={fill} opacity="0.5" />
      <circle cx={cx} cy={cy} r={r} fill={fill} />
      <circle cx={cx} cy={cy} r={r * 0.4} fill="#fffdf7" />
    </g>
  );
}

/** 알파벳 장난감 블록 */
function ToyBlock({
  x,
  y,
  s,
  color,
  label,
}: {
  x: number;
  y: number;
  s: number;
  color: string;
  label: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={s} height={s} rx={7} fill={color} stroke="#ffffff" strokeWidth="2.5" />
      <rect x={x + 3} y={y + 3} width={s - 6} height={(s - 6) * 0.4} rx={4} fill="#ffffff" opacity="0.25" />
      <text
        x={x + s / 2}
        y={y + s / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={s * 0.5}
        fontWeight="800"
        fill="#ffffff"
        fontFamily="'Galmuri11', monospace"
      >
        {label}
      </text>
    </g>
  );
}

/** 오리지널 곰인형 */
function Teddy() {
  return (
    <g>
      <ellipse cx="0" cy="30" rx="16" ry="4" fill="rgba(91,70,54,0.15)" />
      {/* 몸 */}
      <ellipse cx="0" cy="12" rx="13" ry="14" fill="#d9a679" />
      <ellipse cx="0" cy="14" rx="8" ry="9" fill="#f0d3b0" />
      {/* 팔다리 */}
      <circle cx="-12" cy="8" r="5" fill="#d9a679" />
      <circle cx="12" cy="8" r="5" fill="#d9a679" />
      <circle cx="-7" cy="24" r="5" fill="#d9a679" />
      <circle cx="7" cy="24" r="5" fill="#d9a679" />
      {/* 머리 */}
      <circle cx="0" cy="-8" r="12" fill="#d9a679" />
      <circle cx="-9" cy="-16" r="4.5" fill="#d9a679" />
      <circle cx="9" cy="-16" r="4.5" fill="#d9a679" />
      <circle cx="-9" cy="-16" r="2" fill="#c08a5e" />
      <circle cx="9" cy="-16" r="2" fill="#c08a5e" />
      <ellipse cx="0" cy="-4" rx="6" ry="5" fill="#f0d3b0" />
      <circle cx="-4" cy="-9" r="1.6" fill="#5b4636" />
      <circle cx="4" cy="-9" r="1.6" fill="#5b4636" />
      <circle cx="0" cy="-4" r="1.6" fill="#5b4636" />
      {/* 리본 */}
      <path d="M-10 2 l-6 -3 0 6 z" fill="#ef6ba0" />
      <path d="M10 2 l6 -3 0 6 z" fill="#ef6ba0" />
      <circle cx="0" cy="2" r="2.5" fill="#ff9dc0" />
    </g>
  );
}
