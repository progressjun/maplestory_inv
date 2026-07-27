import { useState } from "react";
import { wedding } from "../config/wedding";
import { Section, Title } from "../components/ui";
import { DecoFrame } from "../components/Media";
import { hasValue, toEmbedUrl, isDirectVideo } from "../lib/utils";

/** 섹션6 — 웨딩 영상. URL 없으면 섹션 자체가 렌더되지 않음(App 에서 제어). */
export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const url = wedding.weddingVideoUrl;
  const embed = toEmbedUrl(url);
  const direct = isDirectVideo(url);

  if (!hasValue(url) || failed || (!embed && !direct)) return null;

  return (
    <Section id="video">
      <Title label="MOVIE">우리의 이야기</Title>
      <DecoFrame className="mx-auto max-w-[360px]">
        <div className="relative aspect-video w-full overflow-hidden rounded-[18px] bg-black">
          {!playing ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 flex items-center justify-center bg-gradient-to-br from-maple-purple/40 to-maple-rose/40"
              aria-label="웨딩 영상 재생"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border-[3px] border-white bg-white/30 backdrop-blur transition-transform group-active:scale-95">
                <span className="ml-1 text-[26px]" aria-hidden>
                  ▶
                </span>
              </span>
            </button>
          ) : direct ? (
            <video
              className="absolute inset-0 h-full w-full"
              src={url}
              controls
              autoPlay
              playsInline
              onError={() => setFailed(true)}
            />
          ) : embed ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`${embed}?autoplay=1`}
              title="웨딩 영상"
              allow="autoplay; fullscreen; encrypted-media"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : null}
        </div>
      </DecoFrame>
    </Section>
  );
}
