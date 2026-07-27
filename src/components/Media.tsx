import { useState, type ReactNode } from "react";
import { cx, hasValue } from "../lib/utils";
import { Cloud, Flower, Star } from "./Scenery";

/** 이미지 로드 실패/미등록 시 예쁜 판타지 풍경 플레이스홀더로 대체하는 이미지. */
export function SmartImage({
  src,
  alt,
  className,
  ratio = "aspect-[4/5]",
  rounded = "rounded-2xl",
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  rounded?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showPlaceholder = !hasValue(src) || failed;

  return (
    <div className={cx("relative w-full overflow-hidden", ratio, rounded, className)}>
      {showPlaceholder ? (
        <Placeholder />
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

/** 판타지 풍경 플레이스홀더 (하늘 · 언덕 · 구름 · 꽃) */
export function Placeholder({ note = "이미지 업로드 예정" }: { note?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg,#cfeaff 0%,#e7f6ff 45%,#d8f4dd 100%)" }}
      aria-hidden
    >
      <Cloud className="absolute left-4 top-5 w-20 opacity-90" />
      <Cloud className="absolute right-3 top-10 w-14 opacity-80" />
      <Star className="absolute right-8 top-4 w-5 animate-twinkle" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-maple-grass/70" style={{ borderRadius: "50% 50% 0 0 / 40% 40% 0 0" }} />
      <Flower className="absolute bottom-4 left-6 w-8" />
      <Flower className="absolute bottom-3 right-8 w-7" color="#b79bff" />
      <div className="dialog z-10 px-3 py-1.5 text-[13px] font-semibold text-maple-wooddark">
        🖼️ {note}
      </div>
    </div>
  );
}

/** 꽃·별·하트로 감싼 둥근 픽셀 미디어 프레임 */
export function DecoFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("relative", className)}>
      <div className="dialog overflow-hidden !rounded-3xl p-1.5">{children}</div>
      <Flower className="absolute -left-3 -top-3 w-9 rotate-[-12deg] animate-bobslow" />
      <Star className="absolute -right-2 -top-2 w-6 animate-twinkle" />
      <Flower className="absolute -bottom-3 -right-3 w-8 rotate-[10deg] animate-bobslow" color="#b79bff" />
    </div>
  );
}
