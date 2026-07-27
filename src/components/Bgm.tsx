import { useEffect, useRef, useState } from "react";
import { wedding } from "../config/wedding";
import { hasValue } from "../lib/utils";

/** 우측 하단 배경음악 ON/OFF 버튼. 기본 꺼짐, 사용자 터치 후에만 재생. */
export default function Bgm() {
  const [on, setOn] = useState(false);
  const [available, setAvailable] = useState(hasValue(wedding.bgmUrl));
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!hasValue(wedding.bgmUrl)) return;
    const audio = new Audio(wedding.bgmUrl);
    audio.loop = true;
    audio.volume = 0.18; // 작게
    audio.addEventListener("error", () => setAvailable(false));
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  if (!available) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (on) {
        audio.pause();
        setOn(false);
      } else {
        await audio.play();
        setOn(true);
      }
    } catch {
      // 재생 정책 등으로 실패 시 조용히 비활성화
      setAvailable(false);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed right-3 z-[90] flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-maple-wooddark bg-maple-cream shadow-pixel"
      style={{ bottom: "calc(env(safe-area-inset-bottom,0px) + 16px)" }}
      aria-label={on ? "배경음악 끄기" : "배경음악 켜기"}
      aria-pressed={on}
    >
      <span className={on ? "animate-wiggle text-[18px]" : "text-[18px] opacity-60"} aria-hidden>
        {on ? "🎵" : "🔇"}
      </span>
    </button>
  );
}
