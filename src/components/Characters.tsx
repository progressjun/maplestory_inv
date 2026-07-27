import { cx } from "../lib/utils";

/**
 * 완전 오리지널 캐릭터 (메이플스토리 등 기존 게임 애셋 미사용).
 * 이미지(투명 PNG)가 준비되면 <img> 로 교체되고, 없으면 아래 SVG 가 표시됩니다.
 */

interface CharProps {
  image?: string;
  alt: string;
  className?: string;
}

/** 신랑 캐릭터 (검은 정장 · 안경) */
export function GroomChar({ image, alt, className }: CharProps) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className={cx("h-full w-full object-contain drop-shadow-md", className)}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    );
  }
  return (
    <svg viewBox="0 0 80 120" className={cx("h-full w-full", className)} role="img" aria-label={alt}>
      {/* 그림자 */}
      <ellipse cx="40" cy="115" rx="22" ry="5" fill="rgba(91,70,54,0.18)" />
      {/* 다리 */}
      <rect x="31" y="86" width="7" height="24" rx="3" fill="#3b3b45" />
      <rect x="42" y="86" width="7" height="24" rx="3" fill="#3b3b45" />
      <rect x="29" y="108" width="11" height="6" rx="3" fill="#2a2a30" />
      <rect x="40" y="108" width="11" height="6" rx="3" fill="#2a2a30" />
      {/* 몸통(정장) */}
      <path d="M26 56 q14 -8 28 0 l4 34 q-18 8 -36 0 z" fill="#33333c" />
      {/* 셔츠 + 넥타이 */}
      <path d="M40 54 l-6 6 6 6 6 -6 z" fill="#f4f4f7" />
      <path d="M40 60 l-2 16 2 4 2 -4 -2 -16z" fill="#5b4636" />
      {/* 팔 */}
      <rect x="21" y="58" width="8" height="26" rx="4" fill="#33333c" />
      <rect x="51" y="58" width="8" height="26" rx="4" fill="#33333c" />
      {/* 머리 */}
      <circle cx="40" cy="34" r="20" fill="#f7d9bd" />
      {/* 머리카락 */}
      <path d="M20 34 q0 -22 20 -22 q20 0 20 22 q-6 -12 -20 -12 q-14 0 -20 12z" fill="#3a2c22" />
      {/* 안경 */}
      <circle cx="33" cy="35" r="6" fill="none" stroke="#2a2a30" strokeWidth="2" />
      <circle cx="48" cy="35" r="6" fill="none" stroke="#2a2a30" strokeWidth="2" />
      <line x1="39" y1="35" x2="42" y2="35" stroke="#2a2a30" strokeWidth="2" />
      {/* 눈/볼/입 */}
      <circle cx="33" cy="35" r="2" fill="#3a2c22" />
      <circle cx="48" cy="35" r="2" fill="#3a2c22" />
      <circle cx="27" cy="41" r="3" fill="#ffb3c1" opacity="0.6" />
      <circle cx="53" cy="41" r="3" fill="#ffb3c1" opacity="0.6" />
      <path d="M36 45 q4 3 8 0" fill="none" stroke="#a2685a" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** 신부 캐릭터 (핑크 드레스) */
export function BrideChar({ image, alt, className }: CharProps) {
  if (image) {
    return (
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className={cx("h-full w-full object-contain drop-shadow-md", className)}
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
    );
  }
  return (
    <svg viewBox="0 0 80 120" className={cx("h-full w-full", className)} role="img" aria-label={alt}>
      <ellipse cx="40" cy="115" rx="24" ry="5" fill="rgba(91,70,54,0.18)" />
      {/* 드레스 (넓은 치마) */}
      <path d="M30 58 q10 -6 20 0 l14 48 q-24 10 -48 0 z" fill="#ffe1ec" />
      <path d="M24 96 q16 8 32 0 l3 8 q-19 9 -38 0z" fill="#ffd0e0" />
      <path d="M40 58 l-8 44 8 4 8 -4 z" fill="#fff" opacity="0.55" />
      {/* 어깨 끈 */}
      <path d="M31 58 q9 -7 18 0 l-2 5 q-7 -5 -14 0z" fill="#ffb8d3" />
      {/* 팔 */}
      <rect x="22" y="60" width="7" height="22" rx="3.5" fill="#f7d9bd" />
      <rect x="51" y="60" width="7" height="22" rx="3.5" fill="#f7d9bd" />
      {/* 머리 */}
      <circle cx="40" cy="34" r="20" fill="#f7d9bd" />
      {/* 머리카락 (묶은 머리) */}
      <path d="M20 36 q0 -24 20 -24 q20 0 20 24 q-5 -6 -10 -8 q2 8 -2 12 q-8 4 -16 0 q-4 -4 -2 -12 q-5 2 -10 8z" fill="#3a2c22" />
      <circle cx="19" cy="30" r="5" fill="#3a2c22" />
      <circle cx="61" cy="30" r="5" fill="#3a2c22" />
      {/* 눈/볼/입 */}
      <circle cx="33" cy="35" r="2.4" fill="#3a2c22" />
      <circle cx="47" cy="35" r="2.4" fill="#3a2c22" />
      <circle cx="27" cy="41" r="3.2" fill="#ff9dc0" opacity="0.7" />
      <circle cx="53" cy="41" r="3.2" fill="#ff9dc0" opacity="0.7" />
      <path d="M36 44 q4 3 8 0" fill="none" stroke="#d76a92" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** 오리지널 젤리 생명체 (슬라임 아님) — 마을 마스코트 */
export function Jelly({
  color = "#b7ecd6",
  className,
  label = "젤리 친구",
}: {
  color?: string;
  className?: string;
  label?: string;
}) {
  return (
    <svg viewBox="0 0 60 50" className={className} role="img" aria-label={label}>
      <ellipse cx="30" cy="46" rx="16" ry="3.5" fill="rgba(91,70,54,0.15)" />
      <path d="M8 40 q-4 -34 22 -34 q26 0 22 34 q-22 8 -44 0z" fill={color} />
      <path d="M8 40 q-4 -34 22 -34 q10 0 16 8 q-14 -2 -20 8 q-6 10 -18 10z" fill="#fff" opacity="0.35" />
      <circle cx="22" cy="28" r="3" fill="#5b4636" />
      <circle cx="38" cy="28" r="3" fill="#5b4636" />
      <circle cx="23" cy="27" r="1" fill="#fff" />
      <circle cx="39" cy="27" r="1" fill="#fff" />
      <path d="M26 34 q4 3 8 0" fill="none" stroke="#5b4636" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="17" cy="33" r="2.4" fill="#ff9dc0" opacity="0.7" />
      <circle cx="43" cy="33" r="2.4" fill="#ff9dc0" opacity="0.7" />
    </svg>
  );
}
