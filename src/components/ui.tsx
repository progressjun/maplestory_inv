import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import { cx } from "../lib/utils";

/** 스크롤 시 살짝 올라오며 나타나는 섹션 래퍼 */
export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLElement>();
  return (
    <section
      id={id}
      ref={ref}
      className={cx("relative px-5 py-10", shown ? "reveal-in" : "reveal-init", className)}
    >
      {children}
    </section>
  );
}

/** 스테이지(구간) 상단 픽셀 라벨 — 게임 지역명 느낌 */
export function StageLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 flex justify-center">
      <span className="dialog !rounded-full px-4 py-1 font-pixel text-[12px] font-bold tracking-wide text-maple-wooddark">
        {children}
      </span>
    </div>
  );
}

/** 섹션 제목 */
export function Title({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="mb-5 text-center">
      {label ? (
        <p className="mb-1.5 font-pixel text-[12px] font-bold tracking-[0.2em] text-maple-purple">
          {label}
        </p>
      ) : null}
      <h2 className="text-[22px] font-extrabold text-maple-ink">{children}</h2>
      <div className="mx-auto mt-2 flex items-center justify-center gap-1.5" aria-hidden>
        <span className="h-1.5 w-1.5 rounded-full bg-maple-rose" />
        <span className="h-1.5 w-8 rounded-full bg-maple-lav" />
        <span className="h-1.5 w-1.5 rounded-full bg-maple-blue" />
      </div>
    </div>
  );
}

type BtnColor = "rose" | "blue" | "green" | "cream" | "purple" | "orange";

const btnColors: Record<BtnColor, string> = {
  rose: "bg-maple-rose text-white",
  blue: "bg-maple-blue text-white",
  green: "bg-maple-grass text-white",
  purple: "bg-maple-purple text-white",
  orange: "bg-maple-orange text-white",
  cream: "bg-maple-cream text-maple-ink",
};

/** 링크형 픽셀 버튼 (외부 링크 안전 속성 포함) */
export function LinkButton({
  href,
  color = "cream",
  children,
  className,
  ariaLabel,
  external = true,
}: {
  href: string;
  color?: BtnColor;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
}) {
  const isTelSms = href.startsWith("tel:") || href.startsWith("sms:");
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={external && !isTelSms ? "_blank" : undefined}
      rel={external && !isTelSms ? "noopener noreferrer" : undefined}
      className={cx("btn-pixel text-[15px]", btnColors[color], className)}
    >
      {children}
    </a>
  );
}

/** 동작형 픽셀 버튼 */
export function ActionButton({
  onClick,
  color = "cream",
  children,
  className,
  ariaLabel,
  type = "button",
}: {
  onClick?: () => void;
  color?: BtnColor;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cx("btn-pixel text-[15px]", btnColors[color], className)}
    >
      {children}
    </button>
  );
}
