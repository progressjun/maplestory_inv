import { forwardRef, useEffect, useRef, useState } from "react";
import { wedding } from "../config/wedding";
import { GroomChar, BrideChar } from "../components/Characters";
import { Cloud, Heart, Star, Hills } from "../components/Scenery";
import { DriftingClouds } from "../components/Particles";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { hasValue, cx } from "../lib/utils";

const SEEN_KEY = "maple_intro_seen_v1";

/** 섹션1 — 전체화면 오프닝. 인트로 영상이 있으면 재생, 없으면 캐릭터 걷기 연출. */
export default function Opening({ onEnter }: { onEnter: () => void }) {
  const reduced = useReducedMotion();
  const [seen, setSeen] = useState(false);
  const [play, setPlay] = useState(false); // 캐릭터 걷기 연출 시작
  const [replay, setReplay] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const hasIntroVideo = hasValue(wedding.introVideo);

  useEffect(() => {
    let already = false;
    try {
      already = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* 프라이빗 모드 등 접근 불가 시 무시 */
    }
    setSeen(already);
    if (!already && !reduced) {
      const t = window.setTimeout(() => setPlay(true), 400);
      return () => window.clearTimeout(t);
    }
    setPlay(true);
    return;
  }, [reduced]);

  const markSeen = () => {
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* 무시 */
    }
  };

  const handleEnter = () => {
    markSeen();
    onEnter();
  };

  const doReplay = () => {
    setReplay(true);
    setPlay(false);
    window.setTimeout(() => setPlay(true), 60);
    const v = videoRef.current;
    if (v) {
      try {
        v.currentTime = 0;
        void v.play();
      } catch {
        /* 무시 */
      }
    }
  };

  const walk = play && !reduced;

  return (
    <header
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden"
      style={{
        paddingTop: "calc(env(safe-area-inset-top,0px) + 8px)",
        background: "linear-gradient(180deg,#bfe3ff 0%,#dcefff 40%,#eafaf0 100%)",
      }}
    >
      <DriftingClouds />
      <Star className="absolute left-6 top-24 w-6 animate-twinkle" />
      <Star className="absolute right-8 top-32 w-4 animate-twinkle" />
      <Cloud className="absolute left-2 top-16 w-24 opacity-90" />

      {/* 상단 로고형 제목 */}
      <div className="relative z-10 mt-2 flex flex-col items-center px-6 text-center">
        <span className="dialog !rounded-full px-4 py-1 font-pixel text-[12px] font-bold text-maple-purple">
          WEDDING INVITATION
        </span>
        <h1 className="mt-4 font-pixelbold text-[26px] leading-tight text-maple-ink">
          {wedding.groom.name}
          <span className="mx-2 inline-block animate-bob text-maple-rosedeep">♥</span>
          {wedding.bride.name}
        </h1>
        <p className="mt-1.5 max-w-[19rem] text-[14px] font-medium text-maple-ink/80">
          {wedding.subtitle}
        </p>
      </div>

      {/* 인트로 영상 or 캐릭터 무대 */}
      <div className="relative z-10 mt-4 flex w-full flex-1 items-end justify-center">
        {hasIntroVideo ? (
          <IntroVideo ref={videoRef} replay={replay} />
        ) : (
          <div className="relative h-[46vh] max-h-[360px] w-full max-w-[420px]">
            {/* 신랑: 왼쪽 → 중앙(살짝 왼편) */}
            <div
              className={cx(
                "absolute bottom-10 h-[42%] w-[28%]",
                walk ? "transition-all duration-[1600ms] ease-out" : "",
                walk ? "left-[24%]" : "left-[3%]"
              )}
            >
              <div className={walk ? "h-full animate-walk" : "h-full"}>
                <GroomChar image={wedding.groom.image} alt={`신랑 ${wedding.groom.name}`} />
              </div>
            </div>
            {/* 신부: 오른쪽 → 중앙(살짝 오른편) */}
            <div
              className={cx(
                "absolute bottom-10 h-[42%] w-[28%]",
                walk ? "transition-all duration-[1600ms] ease-out" : "",
                walk ? "right-[24%]" : "right-[3%]"
              )}
            >
              <div className={walk ? "h-full animate-walk" : "h-full"} style={{ animationDelay: "0.25s" }}>
                <BrideChar image={wedding.bride.image} alt={`신부 ${wedding.bride.name}`} />
              </div>
            </div>
            {/* 만남의 순간 하트/반짝이 */}
            {walk && <MeetSparkles />}
            {/* 중앙 꽃길/다리 */}
            <div className="absolute bottom-6 left-1/2 h-2.5 w-40 -translate-x-1/2 rounded-full bg-maple-woodlight" />
            <div className="absolute bottom-[52px] left-1/2 -translate-x-1/2 text-[13px]" aria-hidden>
              🌷🌼🌷
            </div>
          </div>
        )}
      </div>

      {/* 날짜 + 입장 버튼 */}
      <div
        className="relative z-10 flex w-full flex-col items-center gap-3 px-6 pb-8 text-center"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 24px)" }}
      >
        <p className="font-pixel text-[15px] font-bold tracking-wide text-maple-wooddark">
          2026.10.18 SUN 11:00
        </p>
        <button
          type="button"
          onClick={handleEnter}
          className="btn-pixel animate-bobslow bg-maple-rose px-7 text-[16px] text-white"
        >
          초대장 열기 ✉️
        </button>
        {seen && (
          <button
            type="button"
            onClick={doReplay}
            className="text-[13px] font-semibold text-maple-purple underline underline-offset-2"
          >
            ↺ 오프닝 다시 보기
          </button>
        )}
      </div>

      {/* 하단 언덕 */}
      <Hills className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full" />
    </header>
  );
}

/** 만남 순간 위로 올라가는 하트/별 파티클 */
function MeetSparkles() {
  const items = [
    { d: 0, x: -18, c: "#ff9dc0" },
    { d: 0.3, x: 0, c: "#ef6ba0" },
    { d: 0.6, x: 16, c: "#ffd94d" },
    { d: 0.9, x: -8, c: "#b79bff" },
    { d: 1.2, x: 10, c: "#ff9dc0" },
  ];
  return (
    <div className="absolute bottom-24 left-1/2 -translate-x-1/2" aria-hidden>
      {items.map((it, i) => (
        <div
          key={i}
          className="absolute animate-floatup"
          style={{ left: it.x, animationDelay: `${1.4 + it.d}s`, width: 20, height: 20 }}
        >
          {i % 2 === 0 ? (
            <Heart color={it.c} className="h-full w-full" />
          ) : (
            <Star color={it.c} className="h-full w-full" />
          )}
        </div>
      ))}
    </div>
  );
}

/** 인트로 영상 — 자동재생 실패해도 조용히 무시, poster 로 대체 */
const IntroVideo = forwardRef<HTMLVideoElement, { replay: boolean }>(function IntroVideo(
  { replay },
  ref
) {
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    void replay; // replay 트리거 시 부모에서 재생 처리
  }, [replay]);

  if (failed) {
    return (
      <div className="mb-4 flex h-[42vh] max-h-[340px] w-[86%] max-w-[380px] items-center justify-center">
        <div className="dialog px-4 py-3 text-center text-[13px] text-maple-wooddark">
          🎬 인트로 영상을 준비 중입니다
        </div>
      </div>
    );
  }

  return (
    <div className="mb-3 w-[88%] max-w-[400px] overflow-hidden rounded-3xl border-[3px] border-maple-wooddark shadow-pixel">
      <video
        ref={ref}
        className="h-auto w-full"
        src={wedding.introVideo}
        poster={hasValue(wedding.introPoster) ? wedding.introPoster : undefined}
        autoPlay
        muted
        playsInline
        loop
        preload="metadata"
        onError={() => setFailed(true)}
      />
    </div>
  );
});
