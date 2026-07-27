import { wedding } from "../config/wedding";
import { Section, Title, ActionButton } from "../components/ui";
import { Star } from "../components/Scenery";
import { useCountdown } from "../hooks/useCountdown";
import { useToast } from "../components/Toast";
import { cx } from "../lib/utils";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];

/** 섹션5 — 2026년 10월 달력 + D-day + 캘린더 저장 */
export default function CalendarSection() {
  const cd = useCountdown(wedding.dateISO);
  const toast = useToast();

  // 예식일 파싱
  const target = new Date(wedding.dateISO);
  const year = target.getFullYear(); // 2026
  const month = target.getMonth(); // 9 (10월)
  const weddingDay = target.getDate(); // 18

  // 달력 그리드 계산
  const firstDay = new Date(year, month, 1).getDay(); // 시작 요일
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  const saveToCalendar = () => {
    try {
      const start = new Date(wedding.dateISO);
      const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2시간
      const fmt = (d: Date) =>
        d
          .toISOString()
          .replace(/[-:]/g, "")
          .replace(/\.\d{3}/, "");
      const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//wedding//invitation//KR",
        "BEGIN:VEVENT",
        `UID:${Date.now()}@wedding`,
        `DTSTAMP:${fmt(new Date())}`,
        `DTSTART:${fmt(start)}`,
        `DTEND:${fmt(end)}`,
        `SUMMARY:${wedding.groom.name} ♥ ${wedding.bride.name} 결혼식`,
        `LOCATION:${wedding.venueName} ${wedding.address}`,
        "END:VEVENT",
        "END:VCALENDAR",
      ].join("\r\n");

      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "wedding.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.show("일정을 저장했어요!");
    } catch {
      toast.show("캘린더 앱에서 직접 추가해 주세요.");
    }
  };

  return (
    <Section id="calendar">
      <Title label="WEDDING DAY">예식 안내</Title>

      {/* 마을 게시판 스타일 달력 */}
      <div className="mx-auto max-w-[340px]">
        <div className="dialog overflow-hidden p-0">
          {/* 게시판 헤더 */}
          <div className="flex items-center justify-center gap-2 bg-maple-woodlight py-2.5">
            <Star className="w-4" />
            <span className="font-pixel text-[15px] font-bold text-maple-wooddark">
              {year}년 {month + 1}월
            </span>
            <Star className="w-4" />
          </div>

          <div className="p-4">
            {/* 요일 */}
            <div className="grid grid-cols-7 gap-y-2 text-center">
              {WEEK.map((w, i) => (
                <div
                  key={w}
                  className={cx(
                    "text-[12px] font-bold",
                    i === 0 ? "text-maple-rosedeep" : i === 6 ? "text-maple-blue" : "text-maple-ink/60"
                  )}
                >
                  {w}
                </div>
              ))}
              {/* 날짜 */}
              {cells.map((d, i) => {
                const isWedding = d === weddingDay;
                const dow = i % 7;
                return (
                  <div key={i} className="flex h-9 items-center justify-center">
                    {d === null ? (
                      <span />
                    ) : isWedding ? (
                      <span className="relative flex h-9 w-9 items-center justify-center">
                        <span className="absolute inset-0 animate-bob rounded-full bg-maple-rose" />
                        <span className="absolute -right-0.5 -top-0.5 text-[11px]" aria-hidden>
                          💍
                        </span>
                        <span className="relative text-[14px] font-extrabold text-white">{d}</span>
                      </span>
                    ) : (
                      <span
                        className={cx(
                          "text-[14px] font-medium",
                          dow === 0
                            ? "text-maple-rosedeep/80"
                            : dow === 6
                              ? "text-maple-blue/80"
                              : "text-maple-ink/80"
                        )}
                      >
                        {d}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* D-day + 일시 */}
        <div className="mt-4 flex flex-col items-center gap-2 text-center">
          <span className="dialog animate-pop px-5 py-1.5 font-pixelbold text-[20px] text-maple-rosedeep">
            {cd.label}
          </span>
          <p className="text-[15px] font-semibold text-maple-ink">
            {wedding.dateText} {wedding.timeText}
          </p>
          <p className="text-[13px] text-maple-ink/70">
            {cd.isPast
              ? "함께해 주셔서 감사합니다 :)"
              : cd.isToday
                ? "오늘은 바로 그날! 💕"
                : `예식까지 ${cd.days}일 남았어요`}
          </p>
        </div>

        <div className="mt-4 flex justify-center">
          <ActionButton onClick={saveToCalendar} color="purple" className="px-6">
            📅 일정 저장하기
          </ActionButton>
        </div>
      </div>
    </Section>
  );
}
