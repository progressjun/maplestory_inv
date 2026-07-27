import { useEffect, useMemo, useState } from "react";

export interface Countdown {
  days: number; // 남은 일수 (지났으면 음수)
  isToday: boolean; // 예식 당일
  isPast: boolean; // 예식일이 지남
  label: string; // "D-100" / "D-DAY" / "D+1"
}

/** 예식일까지 남은 날짜를 KST 기준 자정~자정으로 계산합니다. */
export function useCountdown(dateISO: string): Countdown {
  const target = useMemo(() => new Date(dateISO), [dateISO]);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // 하루가 넘어갈 수 있으니 1분마다 갱신 (가벼움)
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    if (isNaN(target.getTime())) {
      return { days: 0, isToday: false, isPast: false, label: "D-?" };
    }
    // KST 자정 기준으로 날짜만 비교
    const KST = 9 * 60; // 분
    const toKstMidnight = (d: Date) => {
      const utc = d.getTime() + d.getTimezoneOffset() * 60_000;
      const kst = new Date(utc + KST * 60_000);
      return Date.UTC(kst.getFullYear(), kst.getMonth(), kst.getDate());
    };
    const t = toKstMidnight(target);
    const n = toKstMidnight(now);
    const diff = Math.round((t - n) / 86_400_000);

    let label: string;
    if (diff === 0) label = "D-DAY";
    else if (diff > 0) label = `D-${diff}`;
    else label = `D+${Math.abs(diff)}`;

    return { days: diff, isToday: diff === 0, isPast: diff < 0, label };
  }, [target, now]);
}
