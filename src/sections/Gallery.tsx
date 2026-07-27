import { useCallback, useEffect, useState } from "react";
import { wedding } from "../config/wedding";
import { Section, Title } from "../components/ui";
import { Flower, Star } from "../components/Scenery";
import { Jelly } from "../components/Characters";

/** 섹션7 — 사진 갤러리 + 전체화면 라이트박스 (스와이프/키보드 지원) */
export default function Gallery() {
  const photos = wedding.gallery.filter(Boolean).slice(0, 20);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState<Record<number, boolean>>({});

  const usable = photos.filter((_, i) => !broken[i]);
  // 갤러리에 유효한 사진이 없으면 섹션 숨김 (App 에서도 제어하지만 이중 안전장치)
  if (photos.length === 0) return null;

  return (
    <Section id="gallery">
      <Title label="GALLERY">우리의 순간들</Title>

      <div className="relative mx-auto max-w-[360px]">
        <Flower className="absolute -left-2 -top-3 z-10 w-8 rotate-[-12deg]" />
        <Star className="absolute -right-1 top-6 z-10 w-5 animate-twinkle" />

        {/* 대표 사진 */}
        <button
          type="button"
          className="dialog block w-full overflow-hidden p-1.5"
          onClick={() => {
            setIndex(0);
            setOpen(true);
          }}
          aria-label="사진 크게 보기"
        >
          <div className="aspect-[4/3] w-full overflow-hidden rounded-[16px] bg-maple-sky2">
            <img
              src={photos[0]}
              alt="대표 웨딩 사진"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              onError={() => setBroken((b) => ({ ...b, 0: true }))}
            />
          </div>
        </button>

        {/* 썸네일 그리드 */}
        {photos.length > 1 && (
          <div className="mt-2 grid grid-cols-4 gap-2">
            {photos.slice(1).map((src, i) => {
              const realIndex = i + 1;
              if (broken[realIndex]) return null;
              return (
                <button
                  key={realIndex}
                  type="button"
                  className="aspect-square overflow-hidden rounded-xl border-2 border-maple-wooddark/40 bg-maple-sky2"
                  onClick={() => {
                    setIndex(realIndex);
                    setOpen(true);
                  }}
                  aria-label={`${realIndex + 1}번째 사진 보기`}
                >
                  <img
                    src={src}
                    alt={`웨딩 사진 ${realIndex + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    onError={() => setBroken((b) => ({ ...b, [realIndex]: true }))}
                  />
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-3 flex justify-center">
          <Jelly color="#d9c9ff" className="w-10 animate-bobslow" />
        </div>
      </div>

      {open && usable.length > 0 && (
        <Lightbox
          photos={photos}
          broken={broken}
          startIndex={index}
          onClose={() => setOpen(false)}
        />
      )}
    </Section>
  );
}

function Lightbox({
  photos,
  broken,
  startIndex,
  onClose,
}: {
  photos: string[];
  broken: Record<number, boolean>;
  startIndex: number;
  onClose: () => void;
}) {
  // 깨지지 않은 사진만 순회
  const valid = photos.map((src, i) => ({ src, i })).filter(({ i }) => !broken[i]);
  const startPos = Math.max(0, valid.findIndex((v) => v.i === startIndex));
  const [pos, setPos] = useState(startPos < 0 ? 0 : startPos);
  const touchX = { current: 0 } as { current: number };

  const go = useCallback(
    (dir: number) => {
      setPos((p) => (p + dir + valid.length) % valid.length);
    },
    [valid.length]
  );

  useEffect(() => {
    // 배경 스크롤 잠금
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [go, onClose]);

  if (valid.length === 0) return null;
  const current = valid[pos];

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="사진 크게 보기"
      onClick={onClose}
    >
      {/* 상단바 */}
      <div
        className="flex items-center justify-between px-4 pb-2 text-white"
        style={{ paddingTop: "calc(env(safe-area-inset-top,0px) + 12px)" }}
      >
        <span className="font-pixel text-[14px]">
          {pos + 1} / {valid.length}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-[20px]"
          aria-label="닫기"
        >
          ✕
        </button>
      </div>

      {/* 이미지 */}
      <div
        className="flex flex-1 items-center justify-center px-3"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
        }}
      >
        <img
          src={current.src}
          alt={`웨딩 사진 ${current.i + 1}`}
          className="max-h-full max-w-full rounded-lg object-contain"
        />
      </div>

      {/* 좌우 버튼 */}
      {valid.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-[22px] text-white"
            aria-label="이전 사진"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-[22px] text-white"
            aria-label="다음 사진"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
