import { wedding } from "../config/wedding";
import { Section, Title, LinkButton, ActionButton } from "../components/ui";
import { ClockTower, Tree, Flower } from "../components/Scenery";
import { useToast } from "../components/Toast";
import { copyText, hasValue } from "../lib/utils";

/** 섹션8 — 오시는 길 (지도 앱 이동 버튼 + 주소 복사 + 안내) */
export default function Location() {
  const toast = useToast();

  const onCopy = async () => {
    const ok = await copyText(wedding.address);
    toast.show(ok ? "주소를 복사했어요!" : "주소 복사에 실패했어요. 길게 눌러 복사해 주세요.");
  };

  const infos: { icon: string; label: string; text: string }[] = [];
  if (hasValue(wedding.transport)) infos.push({ icon: "🚌", label: "교통편", text: wedding.transport });
  if (hasValue(wedding.parking)) infos.push({ icon: "🅿️", label: "주차 안내", text: wedding.parking });
  if (hasValue(wedding.shuttle)) infos.push({ icon: "🚐", label: "셔틀버스", text: wedding.shuttle });

  return (
    <Section id="location">
      <Title label="LOCATION">오시는 길</Title>

      <div className="mx-auto max-w-[360px]">
        {/* 일러스트 표지 (장식용, 실제 지도 아님) */}
        <div className="dialog relative mb-4 flex h-36 items-end justify-center overflow-hidden !rounded-2xl bg-gradient-to-b from-maple-sky to-maple-mint p-0">
          <Tree className="absolute bottom-1 left-4 w-14" />
          <Flower className="absolute bottom-2 left-24 w-7" />
          <ClockTower className="absolute bottom-1 right-6 w-16" time={wedding.timeText.includes("11") ? "11:00" : ""} />
          <div className="absolute left-1/2 top-3 -translate-x-1/2 animate-bob text-[26px]" aria-hidden>
            📍
          </div>
        </div>

        {/* 장소 정보 */}
        <div className="dialog px-5 py-5 text-center">
          <p className="text-[19px] font-extrabold text-maple-ink">{wedding.venueName}</p>
          {hasValue(wedding.venueHall) && (
            <p className="mt-0.5 text-[14px] text-maple-ink/70">{wedding.venueHall}</p>
          )}
          <p className="mt-1.5 text-[14px] leading-relaxed text-maple-ink/80">{wedding.address}</p>
          <p className="mt-2 font-pixel text-[13px] font-bold text-maple-rosedeep">
            {wedding.dateText} {wedding.timeText}
          </p>

          {/* 지도 버튼 */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {hasValue(wedding.mapNaverUrl) && (
              <LinkButton href={wedding.mapNaverUrl} color="green" className="!min-h-[46px] !px-1 !text-[13px]">
                네이버
              </LinkButton>
            )}
            {hasValue(wedding.mapKakaoUrl) && (
              <LinkButton href={wedding.mapKakaoUrl} color="orange" className="!min-h-[46px] !px-1 !text-[13px]">
                카카오맵
              </LinkButton>
            )}
            {hasValue(wedding.mapTmapUrl) && (
              <LinkButton href={wedding.mapTmapUrl} color="blue" className="!min-h-[46px] !px-1 !text-[13px]">
                T맵
              </LinkButton>
            )}
          </div>
          <div className="mt-2">
            <ActionButton onClick={onCopy} color="cream" className="w-full">
              📋 주소 복사하기
            </ActionButton>
          </div>
        </div>

        {/* 교통/주차/셔틀 */}
        {infos.length > 0 && (
          <div className="mt-3 space-y-2">
            {infos.map((it) => (
              <div key={it.label} className="dialog flex gap-3 px-4 py-3">
                <span className="text-[18px]" aria-hidden>
                  {it.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-maple-wooddark">{it.label}</p>
                  <p className="mt-0.5 whitespace-pre-line break-words text-[13px] leading-relaxed text-maple-ink/80">
                    {it.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
