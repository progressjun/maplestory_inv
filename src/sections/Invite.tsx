import { wedding } from "../config/wedding";
import { Section, Title } from "../components/ui";
import { Jelly } from "../components/Characters";
import { Heart } from "../components/Scenery";

/** 섹션3 — 초대 문구 (게임 대화창 느낌, 가독성 우선) */
export default function Invite() {
  return (
    <Section id="invite">
      <Title label={wedding.inviteLabel}>{wedding.inviteTitle}</Title>

      <div className="relative mx-auto max-w-[360px]">
        {/* 대화창 */}
        <div className="dialog px-6 py-7">
          {/* 상단 말풍선 꼭지 */}
          <div className="mx-auto mb-4 flex items-center justify-center gap-1.5" aria-hidden>
            <Heart className="w-4 animate-bob" />
            <span className="font-pixel text-[12px] font-bold text-maple-rosedeep">Quest · 초대장</span>
            <Heart className="w-4 animate-bob" color="#b79bff" />
          </div>

          <p className="whitespace-pre-line text-center text-[15.5px] leading-[1.9] text-maple-ink">
            {wedding.inviteMessage}
          </p>

          <div className="mt-6 text-center">
            <p className="font-pixel text-[14px] font-bold text-maple-wooddark">
              {wedding.groom.name} · {wedding.bride.name}
            </p>
          </div>
        </div>

        {/* 대화창 옆 마스코트 */}
        <div className="absolute -bottom-5 -right-2 w-14 animate-bobslow" aria-hidden>
          <Jelly color="#ffd0e0" />
        </div>
        <div className="absolute -left-2 -top-4 w-10 animate-bobslow" aria-hidden>
          <Jelly color="#b7ecd6" />
        </div>
      </div>
    </Section>
  );
}
