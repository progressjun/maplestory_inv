import { wedding, type Person } from "../config/wedding";
import { Section, Title, LinkButton } from "../components/ui";
import { GroomChar, BrideChar } from "../components/Characters";
import { Heart } from "../components/Scenery";
import { hasValue, telHref, smsHref, cx } from "../lib/utils";

/** 섹션4 — 신랑/신부 캐릭터 카드 */
export default function Profiles() {
  return (
    <Section id="profiles">
      <Title label="OUR PARTY">신랑 & 신부</Title>

      <div className="mx-auto flex max-w-[380px] flex-col items-center gap-3">
        <ProfileCard person={wedding.groom} role="신랑" side="groom" accent="blue" />

        {/* 연결 하트 */}
        <div className="flex items-center gap-2" aria-hidden>
          <span className="h-0.5 w-10 rounded bg-maple-lav" />
          <Heart className="w-7 animate-bob" color="#ef6ba0" />
          <span className="h-0.5 w-10 rounded bg-maple-lav" />
        </div>

        <ProfileCard person={wedding.bride} role="신부" side="bride" accent="rose" />

        {hasValue(wedding.babyName) && (
          <div className="dialog mt-1 flex items-center gap-2 px-4 py-2">
            <span aria-hidden>👶</span>
            <span className="text-[14px] font-semibold text-maple-ink">
              그리고 우리의 보물 <b className="text-maple-rosedeep">{wedding.babyName}</b>
            </span>
          </div>
        )}
      </div>
    </Section>
  );
}

function ProfileCard({
  person,
  role,
  side,
  accent,
}: {
  person: Person;
  role: string;
  side: "groom" | "bride";
  accent: "blue" | "rose";
}) {
  const showPhone = hasValue(person.phone);
  return (
    <div className="dialog flex w-full items-center gap-4 px-4 py-4">
      {/* 캐릭터 */}
      <div
        className={cx(
          "flex h-24 w-20 shrink-0 items-end justify-center rounded-2xl",
          accent === "blue" ? "bg-maple-blue/15" : "bg-maple-rose/15"
        )}
      >
        <div className="h-[92%] w-[92%] animate-bobslow">
          {side === "groom" ? (
            <GroomChar image={person.image} alt={`${role} ${person.name}`} />
          ) : (
            <BrideChar image={person.image} alt={`${role} ${person.name}`} />
          )}
        </div>
      </div>

      {/* 정보 */}
      <div className="min-w-0 flex-1">
        <span
          className={cx(
            "inline-block rounded-full px-2 py-0.5 font-pixel text-[11px] font-bold text-white",
            accent === "blue" ? "bg-maple-blue" : "bg-maple-rose"
          )}
        >
          {role}
        </span>
        <p className="mt-1 truncate text-[18px] font-extrabold text-maple-ink">{person.name}</p>
        {hasValue(person.nameEn) && (
          <p className="truncate text-[12px] font-medium text-maple-ink/60">{person.nameEn}</p>
        )}
        {hasValue(person.intro) && (
          <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-maple-ink/80">{person.intro}</p>
        )}

        {showPhone && (
          <div className="mt-2.5 flex gap-2">
            <LinkButton
              href={telHref(person.phone)}
              external={false}
              color={accent === "blue" ? "blue" : "rose"}
              className="!min-h-[40px] flex-1 !px-2 !text-[13px]"
              ariaLabel={`${role}에게 전화하기`}
            >
              📞 전화
            </LinkButton>
            <LinkButton
              href={smsHref(person.phone)}
              external={false}
              color="cream"
              className="!min-h-[40px] flex-1 !px-2 !text-[13px]"
              ariaLabel={`${role}에게 문자하기`}
            >
              ✉️ 문자
            </LinkButton>
          </div>
        )}
      </div>
    </div>
  );
}
