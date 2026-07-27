import { useRef, useState } from "react";
import { wedding } from "../config/wedding";
import { Section } from "../components/ui";
import { DecoFrame, Placeholder } from "../components/Media";
import { hasValue } from "../lib/utils";

/** 섹션2 — 대표 이미지/영상 (4:5). 영상 자동재생 차단 시 이미지로 대체. */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const hasVideo = hasValue(wedding.heroVideo) && !videoFailed;
  const hasImage = hasValue(wedding.heroImage);

  return (
    <Section id="hero" className="pt-8">
      <DecoFrame className="mx-auto max-w-[360px]">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-maple-sky2">
          {hasVideo ? (
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover"
              src={wedding.heroVideo}
              poster={hasValue(wedding.heroPoster) ? wedding.heroPoster : undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setVideoFailed(true)}
            />
          ) : hasImage ? (
            <img
              src={wedding.heroImage}
              alt="신랑 신부 대표 사진"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.visibility = "hidden";
              }}
            />
          ) : (
            <Placeholder note="대표 사진 업로드 예정" />
          )}

          {/* 하단 그라데이션 + 문구 */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent px-4 pb-4 pt-10">
            <p className="text-center font-pixel text-[15px] font-bold text-white drop-shadow">
              {wedding.heroText}
            </p>
          </div>
        </div>
      </DecoFrame>
    </Section>
  );
}
