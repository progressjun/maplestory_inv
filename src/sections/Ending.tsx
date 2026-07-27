import { wedding } from "../config/wedding";
import { GroomChar, BrideChar } from "../components/Characters";
import { Castle, Hills, Star } from "../components/Scenery";
import { FloatingParticles } from "../components/Particles";
import { useReducedMotion } from "../hooks/useReducedMotion";

/** 섹션12 — 엔딩 (노을 마을, 손잡고 성으로) */
export default function Ending() {
  const reduced = useReducedMotion();

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden pt-14"
      style={{
        background: "linear-gradient(180deg,#ffd9a8 0%,#ffb27a 40%,#b79bff 100%)",
        paddingBottom: "calc(env(safe-area-inset-bottom,0px) + 40px)",
      }}
    >
      <FloatingParticles kind="heart" count={8} />
      <Star className="absolute left-8 top-8 w-6 animate-twinkle" color="#fff3a8" />
      <Star className="absolute right-10 top-16 w-4 animate-twinkle" color="#fff" />
      {/* 지는 해 */}
      <div className="absolute left-1/2 top-6 h-20 w-20 -translate-x-1/2 rounded-full bg-white/60 blur-[2px]" aria-hidden />

      <div className="relative z-10 px-6 text-center">
        <p className="font-pixel text-[13px] font-bold tracking-wide text-white/90">THANK YOU</p>
        <h2 className="mx-auto mt-3 max-w-[16rem] text-[20px] font-extrabold leading-snug text-white drop-shadow">
          우리의 새로운 모험에
          <br />
          함께해 주세요
        </h2>
      </div>

      {/* 캐릭터가 성으로 걸어가는 장면 */}
      <div className="relative z-10 mx-auto mt-8 h-40 max-w-[400px]">
        <Castle className="absolute bottom-6 left-1/2 w-40 -translate-x-1/2 opacity-95" />
        <div className="absolute bottom-4 left-[26%] h-24 w-16">
          <div className={reduced ? "h-full" : "h-full animate-bobslow"}>
            <GroomChar image={wedding.groom.image} alt={`신랑 ${wedding.groom.name}`} />
          </div>
        </div>
        <div className="absolute bottom-4 left-[46%] h-24 w-16">
          <div className={reduced ? "h-full" : "h-full animate-bobslow"} style={{ animationDelay: "0.3s" }}>
            <BrideChar image={wedding.bride.image} alt={`신부 ${wedding.bride.name}`} />
          </div>
        </div>
        {/* 이어진 길 */}
        <div className="absolute bottom-3 left-1/2 h-2 w-56 -translate-x-1/2 rounded-full bg-white/40" />
      </div>

      <Hills className="relative z-0 -mt-2 h-14 w-full" front="#a98bd6" back="#c3a9e6" />

      <div className="relative z-10 mt-6 text-center">
        <p className="font-pixelbold text-[16px] text-white drop-shadow">
          2026.10.18 · {wedding.venueName}
        </p>
        <p className="mt-1 text-[13px] text-white/85">
          {wedding.groom.name} ♥ {wedding.bride.name}
        </p>

        <button
          type="button"
          onClick={toTop}
          className="btn-pixel mt-6 bg-white/90 px-5 text-[14px] text-maple-ink"
        >
          ↑ 처음으로
        </button>

        <p className="mt-8 text-[11px] text-white/70">Made with 💛 for our wedding day</p>
      </div>
    </footer>
  );
}
